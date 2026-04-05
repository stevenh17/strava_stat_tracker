import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  // Exchange code for tokens
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
    }),
  });

  const data = await res.json();

  // Extract user info
  const athlete = data.athlete;

  // Upsert (insert or update) in Postgres
  await prisma.stravaUser.upsert({
    where: { id: athlete.id },
    update: {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_at,
      firstName: athlete.firstname,
      lastName: athlete.lastname,
      profile: athlete.profile,
    },
    create: {
      id: athlete.id,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_at,
      firstName: athlete.firstname,
      lastName: athlete.lastname,
      profile: athlete.profile,
    },
  });

  console.log("Strava response:", data);

  return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
}

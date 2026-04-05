import prisma from "@/lib/prisma";

export async function getValidAccessToken(userId: number) {
  const user = await prisma.stravaUser.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");

  const now = Date.now() / 1000;

  // ✅ token still valid
  if (now < user.expiresAt) {
    return user.accessToken;
  }

  // 🔁 refresh token
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: user.refreshToken,
    }),
  });

  const data = await res.json();

  // ⚠️ IMPORTANT: update DB with NEW tokens
  await prisma.stravaUser.update({
    where: { id: userId },
    data: {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_at,
    },
  });

  return data.access_token;
}

export async function GET() {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const redirectUri = "http://localhost:3000/api/auth/callback";

  const url = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=read,activity:read_all`;

  return Response.redirect(url);
}

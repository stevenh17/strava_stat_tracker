import prisma from "@/lib/prisma";
import { getValidAccessToken } from "@/lib/strava";

interface StravaActivity {
  id: number;
  name: string;
  type: string;
  distance: number;
  start_date: string;
}

interface EnrichedRun extends StravaActivity {
  userId: number;
  firstName: string | null;
}
export async function GET() {
  const users = await prisma.stravaUser.findMany();

  const allRuns: EnrichedRun[] = [];

  const startOfYear = Math.floor(
    new Date(new Date().getFullYear(), 0, 1).getTime() / 1000,
  );

  for (const user of users) {
    const token = await getValidAccessToken(user.id);

    const res = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?after=${startOfYear}&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const activities: StravaActivity[] = await res.json();

    const runs = activities
      .filter((a) => a.type === "Run")
      .map((run) => ({
        ...run,
        userId: user.id,
        firstName: user.firstName,
      }));

    allRuns.push(...runs);
  }

  return Response.json(allRuns);
}

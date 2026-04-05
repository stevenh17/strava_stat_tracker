import StravaButton from "./components/StravaButton";
import RunDashboard from "./components/RunDashboard";
import prisma from "@/lib/prisma";
import { getValidAccessToken } from "@/lib/strava";
import { StravaActivity, EnrichedRun } from "@/lib/types";

export default async function Page() {
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
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 3600 },
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

  return (
    <main>
      <StravaButton />
      <h1>Runs</h1>
      <RunDashboard runs={allRuns} />
    </main>
  );
}

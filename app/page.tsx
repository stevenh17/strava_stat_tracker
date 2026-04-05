import StravaButton from "./components/StravaButton";
import RunDashboard from "./components/RunDashboard";

export default async function Page() {
  const res = await fetch("http://localhost:3000/api/activities", {
    next: { revalidate: 3600 },
  });

  const runs = await res.json();

  return (
    <main>
      <StravaButton />
      <h1>Runs</h1>
      <RunDashboard runs={runs} />
    </main>
  );
}

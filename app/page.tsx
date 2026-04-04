import prisma from "@/lib/prisma";

export default async function Page() {
  const users = await prisma.user.findMany();
  return (
    <main>
      <a href="/api/auth/login">
        <button>Connect with Strava</button>
      </a>

      <ol>
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.name}
          </li>
        ))}
      </ol>
    </main>
  );
}

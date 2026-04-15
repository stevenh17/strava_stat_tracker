import { revalidatePath } from "next/cache";

export async function POST() {
  try {
    // Invalidate the homepage server component cache so next request will re-run
    revalidatePath("/");

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

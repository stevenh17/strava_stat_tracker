"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RefreshButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onClick() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/refresh", { method: "POST" });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setMsg("Refreshed!");
        // Re-render server components and fetch fresh data for the current route
        try {
          router.refresh();
        } catch {
          // fallback to full reload if router.refresh() fails
          window.location.reload();
        }
      } else {
        setMsg("Refresh failed: " + (body?.error || res.statusText));
      }
    } catch (err) {
      setMsg(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <button
        onClick={onClick}
        disabled={loading}
        className="bg-orange-500 text-white px-4 py-2 rounded-md 
                 hover:bg-orange-600 transition 
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Refreshing..." : "Refresh data"}
      </button>
      {msg ? <div style={{ marginTop: 8 }}>{msg}</div> : null}
    </div>
  );
}

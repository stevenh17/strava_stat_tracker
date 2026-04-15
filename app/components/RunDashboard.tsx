"use client";

import { useState, useMemo } from "react";
import RunChart from "./RunChart";
import UserCard from "./UserCard";
import { Run } from "@/lib/types";

export default function RunDashboard({ runs }: { runs: Run[] }) {
  const [from, setFrom] = useState("2025-03-15");
  const [to, setTo] = useState("");

  const filtered = useMemo(() => {
    return runs.filter((run) => {
      const date = new Date(run.start_date);
      if (from && date < new Date(from)) return false;
      if (to && date > new Date(to)) return false;
      return true;
    });
  }, [runs, from, to]);

  const totals: Record<string, number> = {};
  const runsByUser: Record<string, Run[]> = {};

  for (const run of filtered) {
    const name = run.firstName || "Unknown";
    const km = run.distance / 1000;
    totals[name] = (totals[name] || 0) + km;
    if (!runsByUser[name]) runsByUser[name] = [];
    runsByUser[name].push(run);
  }

  const chartData = Object.entries(totals).map(([name, totalKm]) => ({
    name,
    totalKm: Number(totalKm.toFixed(2)),
  }));

  return (
    <div>
      {/* Date filter */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          margin: "20px 0",
          flexWrap: "wrap",
        }}
      >
        <label style={{ fontSize: "14px", color: "#555" }}>
          From
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            style={{
              marginLeft: "8px",
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
          />
        </label>
        <label style={{ fontSize: "14px", color: "#555" }}>
          To
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            style={{
              marginLeft: "8px",
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
          />
        </label>
        {(from || to) && (
          <button
            onClick={() => {
              setFrom("");
              setTo("");
            }}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              background: "none",
              cursor: "pointer",
              fontSize: "13px",
              color: "#888",
            }}
          >
            Clear
          </button>
        )}
        <span style={{ fontSize: "13px", color: "#aaa" }}>
          {filtered.length} run{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <RunChart data={chartData} />

      <div style={{ marginTop: "24px" }}>
        {Object.entries(runsByUser).map(([name, userRuns]) => (
          <UserCard
            key={name}
            name={name}
            totalKm={totals[name]}
            runs={userRuns}
          />
        ))}
        {filtered.length === 0 && (
          <p style={{ color: "#aaa", textAlign: "center", marginTop: "40px" }}>
            No runs in this date range.
          </p>
        )}
      </div>
    </div>
  );
}

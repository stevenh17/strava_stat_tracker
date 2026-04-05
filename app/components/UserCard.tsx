"use client";

import { useState } from "react";
import { Run } from "@/lib/types";

interface UserCardProps {
  name: string;
  totalKm: number;
  runs: Run[];
}

export default function UserCard({ name, totalKm, runs }: UserCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "12px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header / name card */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: "16px" }}>{name}</div>
          <div style={{ color: "#888", fontSize: "13px", marginTop: "2px" }}>
            {totalKm.toFixed(2)} km total · {runs.length} run
            {runs.length !== 1 ? "s" : ""}
          </div>
        </div>
        <span
          style={{
            fontSize: "18px",
            color: "#FC4C02",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          ▾
        </span>
      </button>

      {/* Expandable activity list */}
      {expanded && (
        <div style={{ borderTop: "1px solid #f0f0f0" }}>
          {runs.map((run) => (
            <div
              key={run.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 18px",
                borderBottom: "1px solid #f7f7f7",
                fontSize: "14px",
              }}
            >
              <span>{run.name}</span>
              <span style={{ color: "#FC4C02", fontWeight: 600 }}>
                {(run.distance / 1000).toFixed(2)} km
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

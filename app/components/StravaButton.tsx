"use client";

export default function StravaButton() {
  return (
    <a href="/api/auth/login">
      <button
        style={{
          backgroundColor: "#FC4C02",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "10px 20px",
          fontSize: "15px",
          fontWeight: 600,
          cursor: "pointer",
          transition: "background-color 0.2s ease",
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "#e04400";
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "#FC4C02";
        }}
      >
        Connect with Strava
      </button>
    </a>
  );
}

"use client";

import Image from "next/image";

export default function StravaButton() {
  return (
    <a href="/api/auth/login">
      <Image
        src="/btn_strava_connect_with_orange.svg"
        alt="Connect with Strava"
        width={193}
        height={48}
        loading="eager"
        style={{ cursor: "pointer", width: "auto", height: "48px" }}
      />
    </a>
  );
}

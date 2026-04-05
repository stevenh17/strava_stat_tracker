-- CreateTable
CREATE TABLE "StravaUser" (
    "athlete_id" INTEGER NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "profile" TEXT,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StravaUser_pkey" PRIMARY KEY ("athlete_id")
);

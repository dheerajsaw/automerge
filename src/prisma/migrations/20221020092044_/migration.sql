-- CreateTable
CREATE TABLE "Asset" (
    "assetId" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "assetUrl" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("assetId")
);

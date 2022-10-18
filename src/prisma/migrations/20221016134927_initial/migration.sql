-- CreateTable
CREATE TABLE "Solution" (
    "solutionId" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "encodedSolution" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Changes" (
    "solutionId" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL DEFAULT 'mychanges',
    "changes" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Solution_solutionId_key" ON "Solution"("solutionId");

-- CreateIndex
CREATE UNIQUE INDEX "Changes_solutionId_key" ON "Changes"("solutionId");

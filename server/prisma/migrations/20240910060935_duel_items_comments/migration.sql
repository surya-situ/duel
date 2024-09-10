-- CreateTable
CREATE TABLE "DuelItem" (
    "id" UUID NOT NULL,
    "duel_id" UUID NOT NULL,
    "image" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DuelItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DuelComments" (
    "id" UUID NOT NULL,
    "duel_id" UUID NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DuelComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DuelItem" ADD CONSTRAINT "DuelItem_duel_id_fkey" FOREIGN KEY ("duel_id") REFERENCES "Duel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DuelComments" ADD CONSTRAINT "DuelComments_duel_id_fkey" FOREIGN KEY ("duel_id") REFERENCES "Duel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

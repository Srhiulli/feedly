-- AlterTable
ALTER TABLE "feedback" ADD COLUMN     "category" TEXT,
ADD COLUMN     "created_by" TEXT,
ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "response" TEXT,
ADD COLUMN     "stars" INTEGER,
ADD COLUMN     "status" TEXT DEFAULT 'pending',
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "title" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ALTER COLUMN "message" DROP NOT NULL;

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'HELPER', 'CLIENT');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'CLIENT';

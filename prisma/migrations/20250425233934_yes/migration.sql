/*
  Warnings:

  - You are about to drop the column `RegistrationNumber` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `desgination` on the `doctors` table. All the data in the column will be lost.
  - Added the required column `currentWorkingPlace` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationNumber` to the `doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "RegistrationNumber",
DROP COLUMN "desgination",
ADD COLUMN     "currentWorkingPlace" TEXT NOT NULL,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "registrationNumber" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "contactNumber" TEXT,
    "address" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_id_key" ON "patients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "patients_email_key" ON "patients"("email");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

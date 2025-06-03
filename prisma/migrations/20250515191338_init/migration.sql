/*
  Warnings:

  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `carName` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_customer` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_produk` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_harga` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
DROP COLUMN "amount",
DROP COLUMN "carName",
DROP COLUMN "customerName",
DROP COLUMN "date",
DROP COLUMN "id",
ADD COLUMN     "id_customer" INTEGER NOT NULL,
ADD COLUMN     "id_produk" INTEGER NOT NULL,
ADD COLUMN     "id_transaksi" SERIAL NOT NULL,
ADD COLUMN     "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "total_harga" INTEGER NOT NULL,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id_transaksi");

-- DropTable
DROP TABLE "Car";

-- CreateTable
CREATE TABLE "Customer" (
    "id_customer" SERIAL NOT NULL,
    "nama_customer" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "alamat" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id_customer")
);

-- CreateTable
CREATE TABLE "Product" (
    "id_produk" SERIAL NOT NULL,
    "nama_produk" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL,
    "foto" TEXT,
    "deskripsi" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id_produk")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "Customer"("id_customer") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_id_produk_fkey" FOREIGN KEY ("id_produk") REFERENCES "Product"("id_produk") ON DELETE CASCADE ON UPDATE CASCADE;

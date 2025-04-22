import { PrismaClient } from "@prisma/client";
import { cars } from "../app/seed/cars"; // Hapus .ts dari import
import { transactions } from "../app/seed/transactions"; // Hapus .ts dari import

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Memulai seeding data...");

    // Insert data mobil
    await prisma.car.createMany({ data: cars });
    console.log("✔ Data mobil berhasil dimasukkan!");

    // Insert data transaksi
    await prisma.transaction.createMany({ data: transactions });
    console.log("✔ Data transaksi berhasil dimasukkan!");

  } catch (error) {
    console.error("❌ Error saat seeding:", error);
  } finally {
    await prisma.$disconnect();
    console.log("🔌 Prisma Client telah ditutup.");
  }
}

main();
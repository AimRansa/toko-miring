import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: Ambil semua transaksi beserta relasinya
export async function GET() {
  const data = await prisma.transaction.findMany({
    include: {
      customer: true,
      product: true,
    },
  });
  return NextResponse.json(data);
}

// POST: Buat transaksi baru
export async function POST(req: Request) {
  const body = await req.json();
    
  const newData = await prisma.transaction.create({
    data: {
      id_customer: Number(body.id_customer),
      id_produk: Number(body.id_produk),
      total_harga: Number(body.total_harga),
    },
  });

  return NextResponse.json(newData);
}

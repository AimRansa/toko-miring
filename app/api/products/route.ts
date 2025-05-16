import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newProduct = await prisma.product.create({
    data: {
      nama_produk: body.nama,
      stok: parseInt(body.stok),
      status: body.status || 'Tersedia', // ✅ Sudah aman
      harga: parseInt(body.harga) || 0,
      foto: body.foto || null,
      deskripsi: body.deskripsi || null,
    },
  });

  return NextResponse.json(newProduct);
}

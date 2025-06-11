import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ferrariProducts = await prisma.product.findMany({
      where: {
        nama_produk: {
          contains: "Lamborghini",
          mode: "insensitive",
        },
      },
      select: {
        id_produk: true,
        nama_produk: true,
        harga: true,
      },
    });

    return NextResponse.json(ferrariProducts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch Ferrari products" }, { status: 500 });
  }
}
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Route handler untuk GET produk berdasarkan ID
export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const idNumber = parseInt(id);

  if (isNaN(idNumber)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id_produk: idNumber },
      select: {
        nama_produk: true,
        harga: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function getIdFromUrl(req: Request): number | null {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  const idNumber = parseInt(id || "");
  return isNaN(idNumber) ? null : idNumber;
}

export async function GET(req: Request) {
  const idNumber = getIdFromUrl(req);

  if (idNumber === null) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const transaksi = await prisma.transaksi.findUnique({
      where: { id_transaksi: idNumber },
    });

    if (!transaksi) {
      return NextResponse.json({ error: "Transaksi not found" }, { status: 404 });
    }

    return NextResponse.json(transaksi);
  } catch (error) {
    console.error("Error fetching transaksi:", error);
    return NextResponse.json({ error: "Failed to fetch transaksi" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const idNumber = getIdFromUrl(req);

  if (idNumber === null) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const data = await req.json();

    const updated = await prisma.transaksi.update({
      where: { id_transaksi: idNumber },
      data: {
        // isi datanya sesuai kebutuhanmu
        status: data.status,
        total: data.total,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating transaksi:", error);
    return NextResponse.json({ error: "Failed to update transaksi" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const idNumber = getIdFromUrl(req);

  if (idNumber === null) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await prisma.transaksi.delete({
      where: { id_transaksi: idNumber },
    });

    return NextResponse.json({ message: "Transaksi deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaksi:", error);
    return NextResponse.json({ error: "Failed to delete transaksi" }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Handler PUT untuk update transaksi berdasarkan ID
export async function PUT(request: Request) {
  try {
    // Ambil ID dari URL
    const url = new URL(request.url!);
    const id = url.pathname.split('/').pop(); // ambil id dari /api/transaksi/[id]

    if (!id) {
      return NextResponse.json({ error: 'ID tidak ditemukan di URL' }, { status: 400 });
    }

    // Ambil data dari request body
    const body = await request.json();

    const { status, total, tanggal_transaksi } = body;

    // Update transaksi di database
    const updatedTransaksi = await prisma.transaksi.update({
      where: { id },
      data: {
        status,
        total,
        tanggal_transaksi: new Date(tanggal_transaksi),
      },
    });

    return NextResponse.json(updatedTransaksi, { status: 200 });
  } catch (error) {
    console.error('Gagal update transaksi:', error);
    return NextResponse.json(
      { error: 'Gagal update transaksi' },
      { status: 500 }
    );
  }
}

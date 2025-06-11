import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // pastikan kamu punya file ini

// Handler PUT untuk update transaksi berdasarkan ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Ambil data dari request body
    const body = await request.json();

    // Contoh: validasi data body (opsional, tergantung field kamu)
    const { status, total, tanggal_transaksi } = body;

    // Update transaksi di database
    const updatedTransaksi = await prisma.transaksi.update({
      where: { id },
      data: {
        status,
        total,
        tanggal_transaksi: new Date(tanggal_transaksi), // pastikan ini valid
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

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const products = await prisma.product.findMany()
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validasi field wajib
    if (!body.nama || !body.stok || !body.harga) {
      return NextResponse.json(
        { error: 'Field nama, stok, dan harga wajib diisi.' },
        { status: 400 }
      )
    }

    const newProduct = await prisma.product.create({
      data: {
        nama_produk: body.nama,
        stok: parseInt(body.stok),
        harga: parseInt(body.harga),
        status: body.status || 'Tersedia',
      },
    })

    return NextResponse.json(newProduct)
  } catch (error) {
    console.error('❌ Error API:', error)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}

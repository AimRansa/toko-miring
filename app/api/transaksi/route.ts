import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''

  const data = await prisma.transaction.findMany({
    where: {
      OR: [
        {
          customer: {
            nama_customer: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          product: {
            nama_produk: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      ],
    },
    include: {
      customer: true,
      product: true,
    },
  })

  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()

  const newData = await prisma.transaction.create({
    data: {
      id_customer: Number(body.id_customer),
      id_produk: Number(body.id_produk),
      total_harga: Number(body.total_harga),
    },
  })

  return NextResponse.json(newData)
}

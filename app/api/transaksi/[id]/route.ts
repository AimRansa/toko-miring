// api/transaksi/[id]/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const body = await req.json()
  const updated = await prisma.transaction.update({
    where: { id_transaksi: id },
    data: body,
  })
  return NextResponse.json(updated)
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  await prisma.transaction.delete({
    where: { id_transaksi: id },
  })
  return NextResponse.json({ success: true })
}

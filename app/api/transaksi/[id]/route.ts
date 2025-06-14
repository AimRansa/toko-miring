// app/api/transaksi/[id]/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  req: NextRequest,
  context: any
) {
  try {
    const id = Number(context.params.id)
    const body = await req.json()

    const updated = await prisma.transaction.update({
      where: { id_transaksi: id },
      data: body,
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update transaction', details: String(error) },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  context: any
) {
  try {
    const id = Number(context.params.id)

    await prisma.transaction.delete({
      where: { id_transaksi: id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete transaction', details: String(error) },
      { status: 500 }
    )
  }
}

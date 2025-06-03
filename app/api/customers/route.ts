import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  const newCustomer = await prisma.customer.create({
    data: {
      nama_customer: body.nama_customer,
      email: body.email,
      alamat: body.alamat || '',
    },
  })

  return NextResponse.json(newCustomer)
}

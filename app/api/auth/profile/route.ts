import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    console.log("Email yang diterima:", email)

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Jika role adalah CUSTOMER, bisa lanjut fetch data lain jika mau (opsional)
    // Contoh: ambil data alamat dari model Customer
    let customerData = null
    if (user.role === 'CUSTOMER') {
      const customer = await prisma.customer.findUnique({
        where: { email: user.email },
        select: {
          id_customer: true,
          nama_customer: true,
          alamat: true,
        },
      })

      if (customer) {
        customerData = customer
      }
    }

    return NextResponse.json({ user, customer: customerData })
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

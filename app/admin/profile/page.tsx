'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserCircle } from 'lucide-react'

export default function AdminProfile() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const role = localStorage.getItem('role')
    const email = localStorage.getItem('email')

    if (!isLoggedIn || role !== 'ADMIN') {
      router.push('/login')
      return
    }

    const fetchProfile = async () => {
      const res = await fetch('/api/auth/profile', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await res.json()
      if (res.ok) {
        setUser(data.user)
      } else {
        alert(data.error || 'Gagal mengambil data profil')
      }
    }

    fetchProfile()
  }, [router])

  if (!user) {
    return <div className="text-center text-white text-xl mt-16">Memuat data profil...</div>
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-10 tracking-wide">Profil Admin</h1>

      <div className="bg-slate-800 p-10 rounded-3xl shadow-2xl w-full max-w-xl flex flex-col items-center gap-6">
        <UserCircle size={96} className="text-white" />

        <div className="flex flex-col items-center">
          <span className="text-2xl font-semibold">{user.username}</span>
          <span className="text-zinc-400">{user.email}</span>
          <span className="mt-2 px-3 py-1 text-sm bg-green-600 text-white rounded-full">
            {user.role}
          </span>
        </div>

        <div className="w-full mt-6 space-y-5 text-lg">
          <div className="flex justify-between border-b border-slate-700 pb-2">
            <span className="text-zinc-400">Username</span>
            <span className="font-medium">{user.username}</span>
          </div>
          <div className="flex justify-between border-b border-slate-700 pb-2">
            <span className="text-zinc-400">Email</span>
            <span className="font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between border-b border-slate-700 pb-2">
            <span className="text-zinc-400">Role</span>
            <span className="font-medium">{user.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Dibuat</span>
            <span className="font-medium">
              {new Date(user.createdAt).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

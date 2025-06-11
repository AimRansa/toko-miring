'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function CustomerProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const email = localStorage.getItem('email')
    const role = localStorage.getItem('role')
    const isLoggedIn = localStorage.getItem('isLoggedIn')

    if (!isLoggedIn || role !== 'CUSTOMER') {
      setError('Anda tidak memiliki akses')
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/auth/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Gagal mengambil data profil')

        setUser(data.user)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return <div className="text-center text-black mt-16">Memuat data profil...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 mt-16">Error: {error}</div>
  }

  if (!user) {
    return <div className="text-center text-zinc-600 mt-16">Tidak ada data pengguna</div>
  }

  return (
    <main className="flex flex-col bg-gradient-to-b from-white to-teal-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-12 py-4 shadow-sm bg-white">
        <button
          onClick={() => router.back()}
          className="text-sm px-4 py-1 rounded-full border border-gray-400 hover:bg-gray-100 transition"
        >
          ← Kembali
        </button>
        <h1 className="text-xl font-bold">Profil Pelanggan</h1>
        <div></div>
      </header>

      {/* Konten Profil */}
      <section className="px-6 md:px-12 py-12 flex justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl flex flex-col items-center gap-6">
          <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user.username?.charAt(0)?.toUpperCase()}
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">{user.username}</span>
            <span className="text-zinc-600">{user.email}</span>
            <span className="mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-full">
              {user.role}
            </span>
          </div>

          <div className="w-full mt-6 space-y-5 text-lg">
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span className="text-zinc-500">Username</span>
              <span className="font-medium">{user.username}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span className="text-zinc-500">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <span className="text-zinc-500">Role</span>
              <span className="font-medium">{user.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Dibuat</span>
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
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 mt-auto px-6 md:px-12">
  <div className="container mx-auto flex flex-wrap justify-between">
    <div>
      <h3 className="text-lg font-semibold">Wilayah & Bahasa Saat Ini</h3>
      <p>United States / English</p>
      <button className="mt-2 px-4 py-2 border border-white rounded hover:bg-gray-800 transition">
        Ubah
      </button>
    </div>
    <div>
      <h3 className="text-lg font-semibold">Newsletter</h3>
      <p>Berita terbaru langsung ke kotak masuk Anda.</p>
      <button className="mt-2 px-4 py-2 border border-white rounded hover:bg-gray-800 transition">
        Berlangganan
      </button>
    </div>
    <div>
      <h3 className="text-lg font-semibold">Lokasi & Kontak</h3>
      <p>Apakah Anda memiliki pertanyaan?</p>
      <button className="mt-2 px-4 py-2 border border-white rounded hover:bg-gray-800 transition">
        Hubungi Kami
      </button>
    </div>
    <div>
      <h3 className="text-lg font-semibold">Media Sosial</h3>
      <div className="flex gap-3 mt-2">
        <span className="cursor-pointer hover:text-gray-300">FB</span>
        <span className="cursor-pointer hover:text-gray-300">IG</span>
        <span className="cursor-pointer hover:text-gray-300">PN</span>
        <span className="cursor-pointer hover:text-gray-300">YT</span>
        <span className="cursor-pointer hover:text-gray-300">TW</span>
      </div>
    </div>
  </div>
  <div className="text-center mt-6">© 2025 Toko Miring. All rights reserved.</div>
</footer>

    </main>
  )
}

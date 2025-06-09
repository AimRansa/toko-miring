'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FormulirProdukPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    nama: '',
    stok: '',
    harga: '',
    status: 'Tersedia',
  })

  useEffect(() => {
    const delayLoad = async () => {
      await new Promise((res) => setTimeout(res, 1000))
      setLoading(false)
    }
    delayLoad()
  }, [])

  const formatToCurrency = (value: number | string) => {
    const number = typeof value === 'string' ? parseInt(value) : value
    if (isNaN(number)) return 'Rp 0'
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
      const response = await fetch(`${baseUrl}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: formData.nama,
          stok: parseInt(formData.stok),
          harga: parseInt(formData.harga),
          status: formData.status,
        }),
      })

      if (!response.ok) {
        throw new Error(`Gagal menyimpan produk: ${response.status}`)
      }

      alert(`Produk ${formData.nama} berhasil disimpan!`)
      router.push('/admin/daftarProduk')
    } catch (error) {
      console.error('ERROR:', error)
      alert('Gagal menyimpan produk. Silakan coba lagi.')
    }
  }

  if (loading) {
    return (
      <div className="bg-white/50 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl animate-pulse border border-gray-200">
        <div className="h-7 bg-gray-300 rounded w-1/3 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4 pt-8">
          <div className="w-24 h-10 bg-gray-200 rounded-lg"></div>
          <div className="w-32 h-10 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/50 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200">
      <h1 className="text-2xl font-semibold mb-8 text-gray-800 border-b pb-3">Formulir Tambah Produk</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Produk
              </label>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full px-3 py-2 bg-white/60 backdrop-blur-sm border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Ferrari"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stok Produk
              </label>
              <input
                type="number"
                value={formData.stok}
                onChange={(e) => setFormData({ ...formData, stok: e.target.value })}
                className="w-full px-3 py-2 bg-white/60 backdrop-blur-sm border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: 50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga Produk
              </label>
              <input
                type="number"
                value={formData.harga}
                onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                className="w-full px-3 py-2 bg-white/60 backdrop-blur-sm border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: 1000000"
                required
              />
              <p className="text-sm text-gray-600 mt-1 font-medium">
                Tampilan: {formData.harga ? formatToCurrency(formData.harga) : 'Rp 0'}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status Produk
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 bg-white/60 backdrop-blur-sm border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Tersedia">Tersedia</option>
                <option value="Habis">Habis</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => router.push('/admin/daftarProduk')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Simpan Produk
          </button>
        </div>
      </form>
    </div>
  )
}

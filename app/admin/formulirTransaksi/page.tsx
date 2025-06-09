'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FormulirTransaksiPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    nama_customer: '',
    id_produk: '',
    tanggal: new Date().toISOString().split('T')[0],
    total_harga: '',
  })

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
      await new Promise((r) => setTimeout(r, 1000)) // delay loading for skeleton
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const customerRes = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama_customer: formData.nama_customer,
          email: `${formData.nama_customer.replace(/\s/g, '').toLowerCase()}@example.com`,
          alamat: '',
        }),
      })

      const customer = await customerRes.json()

      const transaksiRes = await fetch('/api/transaksi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_customer: customer.id_customer,
          id_produk: Number(formData.id_produk),
          total_harga: Number(formData.total_harga),
        }),
      })

      if (transaksiRes.ok) {
        const result = await transaksiRes.json()
        alert(`Transaksi TRX${result.id_transaksi} berhasil disimpan!`)
        router.push('/admin/transaksi')
      } else {
        alert('Gagal menyimpan transaksi.')
      }
    } catch (err) {
      console.error(err)
      alert('Terjadi kesalahan saat mengirim data.')
    }
  }

  const formatToCurrency = (value: string) => {
    const num = parseInt(value.replace(/\D/g, ''))
    return isNaN(num) ? 'Rp 0' : `Rp ${num.toLocaleString('id-ID')}`
  }

  if (loading) {
    return (
      <div className="bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-4">
              {[...Array(2)].map((__, j) => (
                <div key={j}>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-3 pt-6">
          <div className="w-24 h-10 bg-gray-200 rounded-md"></div>
          <div className="w-32 h-10 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-6 text-gray-800">Formulir Transaksi Baru</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Kolom Kiri */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pelanggan</label>
              <input
                type="text"
                value={formData.nama_customer}
                onChange={(e) => setFormData({ ...formData, nama_customer: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-white/60"
                placeholder="Contoh: Budi Santoso"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Transaksi</label>
              <input
                type="date"
                value={formData.tanggal}
                onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-white/60"
                required
              />
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Produk Saya</label>
              <select
                value={formData.id_produk}
                onChange={(e) => setFormData({ ...formData, id_produk: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-white/60"
                required
              >
                <option value="">Pilih Produk</option>
                {products.map((prod) => (
                  <option key={prod.id_produk} value={prod.id_produk}>
                    {prod.nama_produk}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Transaksi</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">Rp</span>
                <input
                  type="text"
                  value={formData.total_harga}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '')
                    setFormData({ ...formData, total_harga: value })
                  }}
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md bg-white/60"
                  placeholder="Contoh: 2000000"
                  required
                />
              </div>
              <p className="text-xs text-gray-600 mt-1 font-medium">
                Tampilan: {formData.total_harga ? formatToCurrency(formData.total_harga) : 'Rp 0'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/admin/transaksi')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
          >
            Simpan Transaksi
          </button>
        </div>
      </form>
    </div>
  )
}

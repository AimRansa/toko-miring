'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FormulirTransaksiPage() {
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    pelanggan: '',
    tanggal: new Date().toISOString().split('T')[0], // Default hari ini
    total: '',
    status: 'Pending'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Generate ID transaksi (contoh: TRX003)
    const newId = `TRX${Math.floor(100 + Math.random() * 900)}`
    
    // Simulasi penyimpanan data (biasanya akan mengirim ke API/database)
    console.log('Transaksi baru:', {
      id: newId,
      ...formData,
      total: formatToCurrency(formData.total) // Format ke Rp
    })
    
    alert(`Transaksi ${newId} berhasil dibuat!`)
    router.push('/admin/daftarTransaksi')
  }

  const formatToCurrency = (value: string) => {
    const num = parseInt(value.replace(/\D/g, ''))
    return isNaN(num) ? 'Rp 0' : `Rp ${num.toLocaleString('id-ID')}`
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-6">Formulir Transaksi Baru</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Kolom Kiri */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Pelanggan
              </label>
              <input
                type="text"
                value={formData.pelanggan}
                onChange={(e) => setFormData({...formData, pelanggan: e.target.value})}
                className="w-full p-2 border rounded-md"
                placeholder="Contoh: Budi Santoso"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Transaksi
              </label>
              <input
                type="date"
                value={formData.tanggal}
                onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>
          
          {/* Kolom Kanan */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Transaksi
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">
                  Rp
                </span>
                <input
                  type="text"
                  value={formData.total}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '')
                    setFormData({...formData, total: value})
                  }}
                  className="w-full p-2 pl-10 border rounded-md"
                  placeholder="Contoh: 2000000"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Tampilan: {formData.total ? formatToCurrency(formData.total) : 'Rp 0'}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status Transaksi
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full p-2 border rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Sukses">Sukses</option>
                <option value="Gagal">Gagal</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/admin/daftarTransaksi')}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Simpan Transaksi
          </button>
        </div>
      </form>
    </div>
  )
}

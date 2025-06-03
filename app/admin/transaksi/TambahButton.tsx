'use client'

import { useRouter } from 'next/navigation'

export default function TambahButton() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/admin/formulirTransaksi')
  }

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Tambah Transaksi
    </button>
  )
}
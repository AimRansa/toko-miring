'use client'

export default function TambahButton() {
  return (
    <button
      onClick={() => alert('Fitur Tambah Transaksi belum dibuat')}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Tambah Transaksi
    </button>
  )
}

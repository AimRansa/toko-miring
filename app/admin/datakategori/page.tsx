'use client'

import React from 'react'

export default function KategoriPage() {
  const dataKategori = [
    { id: 'KAT001', nama: 'Mobil Sport' },
    { id: 'KAT002', nama: 'SUV' },
    { id: 'KAT003', nama: 'MPV' },
  ]

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Data Kategori</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Tambah Kategori
        </button>
      </div>
      <table className="w-full table-auto border border-gray-300 text-sm">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="px-4 py-2 text-left">ID Kategori</th>
            <th className="px-4 py-2 text-left">Nama Kategori</th>
            <th className="px-4 py-2 text-left">Aksi</th>
            <th className="px-4 py-2 text-left">Delete</th>
          </tr>
        </thead>
        <tbody>
          {dataKategori.map((item, index) => (
            <tr key={index} className="border-t border-gray-300">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.nama}</td>
              <td className="px-4 py-2 space-x-2">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs">
                  Edit
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs">
                  Detail
                </button>
              </td>
              <td className="px-4 py-2">
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

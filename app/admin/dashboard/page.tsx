"use client";


import { ShoppingCart, Car, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Car size={32} className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Total Mobil</p>
            <h2 className="text-xl font-bold text-gray-800">15</h2>
          </div>
        
          <Users size={32} className="text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Pelanggan</p>
            <h2 className="text-xl font-bold text-gray-800">108</h2>
          </div>
        

        
          <ShoppingCart size={32} className="text-red-600" />
          <div>
            <p className="text-sm text-gray-500">Pesanan</p>
            <h2 className="text-xl font-bold text-gray-800">42</h2>
          </div>
      </div>

      {/* Bagian Laporan Sederhana */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Ringkasan Aktivitas</h2>
        <ul className="list-disc pl-6 text-gray-600 text-sm">
          <li>3 mobil ditambahkan minggu ini</li>
          <li>12 pesanan baru</li>
          <li>5 pesanan sedang diproses</li>
          <li>2 pelanggan baru bergabung</li>
        </ul>
      </div>
    </div>
  );
}

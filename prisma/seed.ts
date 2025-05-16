import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.customer.createMany({
    data: [
      { id_customer: 1, nama_customer: 'Bagus Saputro', email: 'bagus@example.com', alamat: 'Jakarta Selatan' },
      { id_customer: 2, nama_customer: 'Rina Andika', email: 'rina@example.com', alamat: 'Bandung' },
      { id_customer: 3, nama_customer: 'Dimas Prasetyo', email: 'dimas@example.com', alamat: 'Surabaya' },
      { id_customer: 4, nama_customer: 'Siti Lestari', email: 'siti@example.com', alamat: 'Yogyakarta' },
      { id_customer: 5, nama_customer: 'Andre Setiawan', email: 'andre@example.com', alamat: 'Bali' },
    ],
  })

  await prisma.product.createMany({
    data: [
      { id_produk: 1, nama_produk: 'Ferrari 488 GTB', harga: 550000000, stok: 3, foto: 'ferrari_488.jpg', deskripsi: 'Mobil sport Ferrari dengan performa tinggi dan desain elegan.' },
      { id_produk: 2, nama_produk: 'Ferrari SF90 Stradale', harga: 700000000, stok: 2, foto: 'ferrari_sf90.jpg', deskripsi: 'Mobil hybrid pertama Ferrari dengan teknologi Formula 1.' },
      { id_produk: 3, nama_produk: 'Porsche 911 Carrera', harga: 350000000, stok: 5, foto: 'porsche_911.jpg', deskripsi: 'Ikon mobil sport Porsche dengan kenyamanan dan kecepatan.' },
      { id_produk: 4, nama_produk: 'Lamborghini Aventador', harga: 800000000, stok: 1, foto: 'aventador.jpg', deskripsi: 'Supercar dengan mesin V12 yang sangat bertenaga.' },
      { id_produk: 5, nama_produk: 'Lamborghini Huracan EVO', harga: 650000000, stok: 4, foto: 'huracan_evo.jpg', deskripsi: 'Gabungan teknologi dan desain ekstrem Lamborghini.' },
    ],
  })

  await prisma.transaction.createMany({
    data: [
      { id_transaksi: 1001, id_produk: 1, id_customer: 1, tanggal: new Date('2025-05-01'), total_harga: 550000000 },
      { id_transaksi: 1002, id_produk: 3, id_customer: 2, tanggal: new Date('2025-05-02'), total_harga: 350000000 },
      { id_transaksi: 1003, id_produk: 5, id_customer: 3, tanggal: new Date('2025-05-03'), total_harga: 650000000 },
      { id_transaksi: 1004, id_produk: 4, id_customer: 4, tanggal: new Date('2025-05-04'), total_harga: 800000000 },
      { id_transaksi: 1005, id_produk: 2, id_customer: 5, tanggal: new Date('2025-05-05'), total_harga: 700000000 },
    ],
  })
}

main()
  .then(() => {
    console.log('✅ Seeding selesai!')
    prisma.$disconnect()
  })
  .catch((e) => {
    console.error('❌ Terjadi kesalahan saat seeding:', e)
    prisma.$disconnect()
    process.exit(1)
  })

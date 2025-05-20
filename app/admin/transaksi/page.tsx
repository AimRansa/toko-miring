import { Suspense } from 'react'
import Table from './Table'
import Skeleton from './Skeleton'
import TambahButton from './TambahButton'

export default function TransaksiPage() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daftar Transaksi</h2>
        <TambahButton />
         
      </div>

      <Suspense fallback={<Skeleton />}>
        <Table />
      </Suspense>
    </div>
  )
}

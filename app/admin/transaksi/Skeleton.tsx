'use client'

export default function Skeleton() {
  const dummyRows = Array.from({ length: 5 }); // 5 baris loading

  return (
    <div className="overflow-x-auto animate-pulse">
      <table className="min-w-full text-sm border border-slate-300">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Nama</th>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Stok</th>
            <th className="px-4 py-2 text-left">Harga</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {dummyRows.map((_, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="px-4 py-2">
                <div className="h-4 bg-slate-300 rounded w-24" />
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-slate-300 rounded w-16" />
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-slate-300 rounded w-12" />
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-slate-300 rounded w-24" />
              </td>
              <td className="px-4 py-2">
                <div className="h-4 bg-slate-300 rounded w-20" />
              </td>
              <td className="px-4 py-2 space-x-2">
                <div className="inline-block h-6 w-12 bg-slate-300 rounded" />
                <div className="inline-block h-6 w-12 bg-slate-300 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

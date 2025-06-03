// app/admin/components/SkeletonTransaksi.tsx
export default function SkeletonTransaksi() {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300 text-sm">
          <thead>
            <tr className="bg-slate-800 text-white">
              {Array(7).fill(0).map((_, i) => (
                <th key={i} className="px-4 py-2 text-left">
                  <div className="h-4 bg-gray-500 rounded w-24" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(5).fill(0).map((_, i) => (
              <tr key={i} className="border-t border-gray-300">
                {Array(7).fill(0).map((_, j) => (
                  <td key={j} className="px-4 py-2">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

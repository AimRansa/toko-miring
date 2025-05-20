import ClientTable from './ClientTable'

export default async function Table() {
    await new Promise((resolve) => setTimeout(resolve, 3000))
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    })

    if (!res.ok) {
      throw new Error(`Fetch gagal dengan status: ${res.status}`)
    }

    const data = await res.json()
    return <ClientTable products={data} />
  } catch (error) {
    console.error('FETCH ERROR:', error)
    return (
      <div className="text-red-600 font-semibold p-4 border border-red-300 bg-red-50 rounded">
        Gagal memuat data produk. Pastikan API server berjalan.
      </div>
    )
  }
}

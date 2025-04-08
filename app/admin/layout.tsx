// app/admin/layout.tsx
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-5 max-md:p-2.5 bg-gradient-to-b from-[#e6f0f2] to-[#4d6e71]">
        <Header />
        {children}
      </main>
    </div>
  )
}

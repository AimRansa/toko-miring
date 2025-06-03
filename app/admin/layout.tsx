// app/admin/layout.tsx
'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
// import { Header } from './Header';
import { ProductProvider } from './context/ProductContext';
import { TransaksiProvider } from './context/TransaksiContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProductProvider>
      <TransaksiProvider>
        <div className="flex min-h-screen h-screen">
          <Sidebar />
          <main className="flex-1 flex flex-col p-5 max-md:p-2.5 bg-gradient-to-b from-[#e6f0f2] to-[#4d6e71] overflow-auto">
            {/* <Header /> */}
            <div className="flex-1">{children}</div>
          </main>
        </div>
      </TransaksiProvider>
    </ProductProvider>
  );
}

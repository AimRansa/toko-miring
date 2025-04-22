// context/TransaksiContext.tsx
'use client'

import React, { createContext, useContext, useState } from 'react';

interface Transaksi {
  id: string;
  pelanggan: string;
  tanggal: string;
  total: string;
  status: string;
}

interface TransaksiContextType {
  transaksi: Transaksi[];
  setTransaksi: React.Dispatch<React.SetStateAction<Transaksi[]>>;
}

const TransaksiContext = createContext<TransaksiContextType | undefined>(undefined);

export const TransaksiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);

  return (
    <TransaksiContext.Provider value={{ transaksi, setTransaksi }}>
      {children}
    </TransaksiContext.Provider>
  );
};

export const useTransaksiContext = () => {
  const context = useContext(TransaksiContext);
  if (!context) {
    throw new Error('useTransaksiContext must be used within a TransaksiProvider');
  }
  return context;
};

'use client'

import React, { createContext, useContext, useState } from 'react'

export interface Product {
  id: string
  nama: string
  stok: number
  status: string
  
}

interface ProductContextType {
  products: Product[]
  addProduct: (product: Product) => void
  setProducts: React.Dispatch<React.SetStateAction<Product[]>> // Tambahkan ini
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([
    { id: '001', nama: 'Ferrari', stok: 1, status: 'Tersedia', },
    { id: '002', nama: 'Lamborghini', stok: 5, status: 'Tersedia', },
  ])
  

  const addProduct = (product: Product) => {
    setProducts([...products, product])
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, setProducts }}> {/* Tambahkan setProducts di sini */}
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (!context) throw new Error('useProductContext must be used within a ProductProvider')
  return context
}
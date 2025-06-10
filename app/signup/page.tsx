'use client'

import { useRouter } from "next/navigation"
import Image from "next/image"
import React, { useState } from "react"

export default function SignUpPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('CUSTOMER')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, role }),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()

    if (res.ok) {
      router.push('/login')
    } else {
      alert(data.error || 'Gagal mendaftar')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a3b8b5] via-[#1e2f38] to-[#0f1e29]">
      <div className="flex flex-col md:flex-row items-center bg-transparent rounded-3xl p-6 md:p-12 shadow-2xl backdrop-blur-md">
        <div className="bg-white/10 p-8 rounded-3xl w-[320px] md:mr-12">
          <h2 className="text-center text-2xl font-bold text-white mb-6 drop-shadow">Sign Up</h2>
          <form onSubmit={handleSignUp} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-4 pr-4 py-2 bg-transparent border-b border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-white"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-4 pr-4 py-2 bg-transparent border-b border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-white"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-4 pr-4 py-2 bg-transparent border-b border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-white"
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 text-white py-2 focus:outline-none"
            >
              <option value="CUSTOMER">Customer</option>
              <option value="ADMIN">Admin</option>
            </select>
            <button
              type="submit"
              className="w-full bg-gradient-to-b from-[#5b7773] to-[#1f2b2a] text-white font-semibold py-2 mt-4 rounded-full hover:opacity-90 transition"
            >
              Register
            </button>
          </form>
        </div>
        <div className="mt-6 md:mt-0 md:ml-12">
          <Image src="/images/logos/toko.jpg" alt="Toko Miring Logo" width={250} height={250} className="rounded-3xl" />
        </div>
      </div>
    </main>
  )
}

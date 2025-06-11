'use client'

import { useRouter } from "next/navigation"
import Image from "next/image"
import React, { useEffect, useState } from "react"

export default function SignUpPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('CUSTOMER')

  // CAPTCHA unik
  const [captchaCode, setCaptchaCode] = useState('')
  const [userCaptcha, setUserCaptcha] = useState('')

  // Generate kode CAPTCHA saat pertama render
  useEffect(() => {
    generateCaptcha()
  }, [])

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < 5; i++) {
      code += chars[Math.floor(Math.random() * chars.length)]
    }
    setCaptchaCode(code)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validasi CAPTCHA
    if (userCaptcha.toUpperCase() !== captchaCode) {
      alert("Kode verifikasi salah!")
      generateCaptcha()
      return
    }

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
      generateCaptcha()
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

            {/* CAPTCHA unik */}
            <div className="text-white">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xl tracking-widest bg-black/30 px-4 py-1 rounded">{captchaCode}</span>
                <button type="button" onClick={generateCaptcha} className="text-sm underline ml-4 hover:text-gray-300">Refresh</button>
              </div>
              <input
                type="text"
                placeholder="Masukkan kode di atas"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                className="w-full pl-4 pr-4 py-2 bg-transparent border-b border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                required
              />
            </div>

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

'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // CAPTCHA unik
  const [captchaCode, setCaptchaCode] = useState('')
  const [userCaptcha, setUserCaptcha] = useState('')

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

  const handleLogin = async () => {
    if (userCaptcha.toUpperCase() !== captchaCode) {
      alert('Kode verifikasi salah!')
      generateCaptcha()
      return
    }

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('role', data.user.role)
      localStorage.setItem('email', data.user.email)

      if (data.user.role === 'ADMIN') {
        router.push('/admin/dashboard')
      } else {
        router.push('/dashboard/customers/ferrari')
      }
    } else {
      alert(data.error || 'Login gagal')
      generateCaptcha()
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f1e29] via-[#1e2f38] to-[#a3b8b5]">
      <div className="flex flex-col md:flex-row items-center bg-transparent rounded-3xl p-6 md:p-12 shadow-2xl backdrop-blur-md">
        <div className="mb-6 md:mb-0 md:mr-12">
          <Image
            src="/images/logos/toko.jpg"
            alt="Toko Miring Logo"
            width={250}
            height={250}
            className="rounded-3xl"
          />
        </div>

        <div className="bg-white/10 p-8 rounded-3xl w-[320px]">
          <h2 className="text-center text-2xl font-bold text-white mb-6 drop-shadow">Login</h2>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-white"
            />

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
              onClick={handleLogin}
              className="w-full bg-gradient-to-b from-[#5b7773] to-[#1f2b2a] text-white font-semibold py-2 mt-4 rounded-full hover:opacity-90 transition"
            >
              Login
            </button>
            <div className="flex justify-between text-xs text-white mt-6">
              <Link href="/signup" className="hover:underline">Create an account</Link>
              <Link href="/reset" className="hover:underline">Forgot Password</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

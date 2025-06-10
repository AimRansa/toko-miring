"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Tags,
  Boxes,
  ShoppingCart,
  LogOut,
  UserCircle,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Profil", href: "/admin/profile", icon: <UserCircle size={20} /> }, // ✅ Menu Profil ditambahkan di sini
  { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
  { label: "Formulir Produk", href: "/admin/formulirProduk", icon: <Tags size={20} /> },
  { label: "Daftar Produk", href: "/admin/daftarProduk", icon: <Boxes size={20} /> },
  { label: "Transaksi", href: "/admin/transaksi", icon: <ShoppingCart size={20} /> },
  { label: "Formulir Transaksi", href: "/admin/formulirTransaksi", icon: <ShoppingCart size={20} /> },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = React.useState<{ email: string; username?: string } | null>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  return (
    <nav className="flex flex-col justify-between h-full min-h-screen p-6 bg-slate-900 w-[263px] overflow-y-auto">
      {/* Logo dan menu */}
      <div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a80eeaad196ee1ff43a447581d3864812447c69"
          alt="Logo"
          className="mb-5 h-[53px] rounded-[90px] w-[53px]"
        />
        <h1 className="mb-10 text-xl font-bold text-zinc-300">Toko Miring</h1>

        {/* Profil User */}
        {user && (
          <div className="mb-8 flex items-center gap-3 p-3 bg-slate-800 rounded-lg text-white">
            <UserCircle size={28} />
            <div>
              <div className="text-sm font-semibold">{user.username ?? user.email}</div>
              <div className="text-xs text-zinc-400">Admin</div>
            </div>
          </div>
        )}

        {/* Navigasi */}
        <div className="flex flex-col gap-2.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-2 py-2.5 rounded text-white text-lg hover:bg-slate-800 transition ${
                  isActive ? "bg-slate-800 font-semibold" : ""
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tombol Logout */}
      <div className="mt-10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xl text-red-600 hover:text-red-400 transition"
        >
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </nav>
  );
};

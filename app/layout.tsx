import "@/ui/global.css";
import { inter } from "@/ui/fonts";

export const metadata = {
  title: "Toko Miring",
  description: "Aplikasi Manajemen Toko",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <main>{children}</main>
        {children}
      </body>
    </html>
  );
}
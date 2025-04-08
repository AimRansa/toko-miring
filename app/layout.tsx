import '@/ui/global.css'; // Fix path
import { inter } from '@/ui/fonts'; // Fix path pakai alias

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* Navbar dihapus */}
        {children}
      </body>
    </html>
  );
}

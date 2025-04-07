import '@/ui/global.css'; // Fix path
import { inter } from '@/ui/fonts'; // Fix path pakai alias @

// Layout komponen utama
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

import Link from "next/link";
import Image from "next/image";

export default function FerrariPage() {
  return (
    <main className="min-h-screen px-8 py-6 bg-gradient-to-b from-white to-teal-100">
      <header className="flex justify-between items-center mb-8">
        <span className="text-lg font-semibold">menu</span>
        <nav className="flex gap-6 items-center">
          <Link href="/dashboard/about">About Us</Link>
          <Link href="#">Cart</Link>
          <Link href="#">Help</Link>
          <Link href="/login">
            <button className="bg-black text-white px-4 py-1 rounded-full">
              Login
            </button>
          </Link>
        </nav>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-4">Ferrari</h1>
          <p className="mb-4 text-sm text-gray-800">
            A Ferrari is a symbol of luxury, speed, and precision. Known for its powerful engines and sleek design, it delivers an unmatched driving experience. The prancing horse logo represents racing excellence and innovation.
          </p>
          <button className="bg-black text-white px-6 py-2 rounded-full">
            Show more cars
          </button>
        </div>
        <div>
          <Image src="/ferrari.png" alt="Ferrari Car" width={800} height={400} />
        </div>
      </div>

      <div className="flex justify-start gap-6 mt-12">
        <Link href="/dashboard/lamborghini">
          <Image src="/logos/lamborghini.png" alt="Lamborghini Logo" width={40} height={40} />
        </Link>
        <Link href="/dashboard/porsche">
          <Image src="/logos/porsche.png" alt="Porsche Logo" width={40} height={40} />
        </Link>
        <Link href="/dashboard/ferrari">
          <Image src="/logos/ferrari.png" alt="Ferrari Logo" width={40} height={40} />
        </Link>
      </div>
    </main>
  );
}
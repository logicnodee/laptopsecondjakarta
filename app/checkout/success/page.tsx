import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 lg:px-8 py-20 flex-grow flex flex-col items-center justify-center text-center">
        <div className="bg-green-100 text-green-700 w-20 h-20 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-[family-name:var(--font-outfit)]">
          Pesanan Berhasil Dibuat!
        </h1>
        <p className="text-text-secondary text-lg mb-8 max-w-lg">
          Terima kasih telah berbelanja. Pesanan Anda saat ini sedang berstatus <strong>Menunggu Konfirmasi Admin</strong>. Kami akan segera memprosesnya.
        </p>
        <Link href="/" className="btn btn-primary px-8 py-3">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

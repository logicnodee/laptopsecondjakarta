import Navbar from "@/components/Navbar";

export default async function InfoPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const resolvedParams = await searchParams;
  const topic = resolvedParams.topic || 'informasi';
  
  let title = "Informasi";
  if (topic === 'faq') title = "Frequently Asked Questions (FAQ)";
  if (topic === 'syarat') title = "Syarat & Ketentuan";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">{title}</h1>
        
        <div className="prose prose-sm text-slate-600 w-full max-w-none">
          {topic === 'faq' ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800 text-base mb-1">1. Apakah Laptop Second Malang memiliki toko fisik?</h3>
                <p>Ya, Laptop Second Malang merupakan bagian dari <strong>Winner Komputer</strong>. Anda bisa datang langsung ke toko fisik kami untuk melihat dan mengecek unit laptop secara langsung di: <br />
                  <strong>ITC Cempaka Mas Lt 4 Blok i No 630</strong><br />
                  Jl. Letjen Suprapto Kec. Kemayoran, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10640<br />
                  <br />
                  <a href="https://maps.app.goo.gl/h7K6hrkVmc72TiXG7?g_st=ic" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lihat di Google Maps</a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-base mb-1">2. Apakah laptop bekas di sini bergaransi?</h3>
                <p>Ya, semua laptop yang kami jual telah melewati proses pengecekan ketat (Quality Control) dan memiliki garansi toko selama 1 bulan (syarat & ketentuan berlaku).</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-base mb-1">3. Apakah melayani tukar tambah (trade-in)?</h3>
                <p>Bisa, silakan bawa laptop lama Anda ke toko kami untuk dilakukan pengecekan dan penaksiran harga oleh tim kami.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-base mb-1">4. Bagaimana kondisi baterai laptopnya?</h3>
                <p>Kondisi baterai bervariasi karena barang second, namun kami pastikan semua baterai masih dalam keadaan layak pakai dan kami selalu menginformasikan estimasi ketahanan baterai di deskripsi produk.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-base mb-1">5. Apakah melayani pengiriman?</h3>
                <p>Saat ini kami hanya melayani pembelian di area Kota Malang dan Kabupaten Malang. Untuk pengiriman, Anda bisa datang langsung ke toko atau memesan layanan ojek online (Gojek/Grab/Maxim) dari pihak Anda (Customer yang memesan dan menanggung ongkirnya).</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-base mb-1">6. Apakah harga masih bisa dinego?</h3>
                <p>Harga yang tertera sudah merupakan harga terbaik, namun Anda bisa mendapatkan penawaran spesial pada saat kami mengadakan promo tertentu.</p>
              </div>
            </div>
          ) : topic === 'syarat' ? (
             <div className="space-y-4">
               <p>Syarat dan Ketentuan layanan di toko kami:</p>
               <ul className="list-disc pl-5 space-y-2">
                 <li>Garansi toko berlaku selama 1 bulan sejak tanggal pembelian.</li>
                 <li>Garansi meliputi kerusakan hardware bawaan (bukan kesalahan pengguna seperti jatuh, kena air, dsb).</li>
                 <li>Segel garansi toko tidak boleh rusak atau robek.</li>
                 <li>Untuk klaim garansi, wajib menyertakan nota pembelian.</li>
               </ul>
             </div>
          ) : (
            <p>
              Halaman ini sedang dalam tahap pengembangan. Untuk informasi lebih lanjut mengenai {title.toLowerCase()}, silakan hubungi admin kami melalui WhatsApp.
            </p>
          )}
          
          <div className="mt-10 pt-6 border-t">
            <p className="mb-4 font-medium text-slate-800">Masih ada pertanyaan lain?</p>
            <a href="https://wa.me/62895626752967" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
              </svg>
              Tanya Admin via WhatsApp
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

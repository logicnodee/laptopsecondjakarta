import Navbar from "@/components/Navbar";

export default function InfoPage({ searchParams }: { searchParams: { topic?: string } }) {
  const topic = searchParams.topic || 'informasi';
  
  let title = "Informasi";
  if (topic === 'faq') title = "Frequently Asked Questions (FAQ)";
  if (topic === 'syarat') title = "Syarat & Ketentuan";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">{title}</h1>
        
        <div className="prose prose-sm text-slate-600">
          <p>
            Halaman ini sedang dalam tahap pengembangan. Untuk informasi lebih lanjut mengenai {title.toLowerCase()}, silakan hubungi admin kami melalui WhatsApp.
          </p>
          
          <div className="mt-8">
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

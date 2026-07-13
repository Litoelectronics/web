// src/app/page.tsx
import { homepageConfig } from '@/config/homepage';
import { Footer } from '@/components/Footer';
import Image from 'next/image';

export const metadata = {
  title: 'DStv Installer Near Me | CCTV, TV Mounting & Starlink in Nairobi',
  description:
    'Professional DStv installer near me, TV mounting, CCTV, and Starlink installation services in Nairobi, Kiambu, and Thika.',
  keywords: [
    'DStv installer near me',
    'DStv agent near me',
    'TV mounting Nairobi',
    'CCTV installer Nairobi',
    'Starlink installer Nairobi',
  ],
  alternates: {
    canonical: 'https://litoelectronics.com',
  },
  openGraph: {
    title: 'DStv Installer Near Me | CCTV, TV Mounting & Starlink in Nairobi',
    description:
      'Professional installation services for DStv, TV mounting, CCTV, and Starlink across Nairobi, Kiambu, and Thika.',
    url: 'https://litoelectronics.com',
    images: ['/images/featured image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DStv Installer Near Me | CCTV, TV Mounting & Starlink in Nairobi',
    description: 'Certified installation services for homes and businesses across Nairobi, Kiambu, and Thika.',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* Top Notification Bar */}
      <div className="bg-[#ffd400] text-slate-950 py-2 px-4 font-semibold text-sm overflow-hidden whitespace-nowrap">
        <p className="animate-[marquee_20s_linear_infinite] inline-block">
          {homepageConfig.hero.promo}
        </p>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#04142f] via-[#0a2d6a] to-[#0b2961] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: "url('/images/DStv fullkit.jpg')" }} />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,_rgba(255,212,0,0.16),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.12),_transparent_26%)] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="bg-blue-500/20 text-blue-200 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            {homepageConfig.hero.badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 mt-2 leading-tight">
            {homepageConfig.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto font-normal">
            {homepageConfig.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href={`https://wa.me/254${homepageConfig.contact.phone.substring(1)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl shadow-2xl transition-all transform hover:-translate-y-0.5 w-full sm:w-auto"
            >
              WhatsApp Us Now
            </a>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="max-w-6xl mx-auto py-16 px-6 bg-slate-100 rounded-[2rem] border border-slate-200 shadow-xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Featured Installations</h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            See a few examples of our work and learn more at <a href="https://www.litoelectronics.com" target="_blank" rel="noreferrer" className="font-semibold text-blue-600 underline decoration-blue-600 underline-offset-4 transition hover:text-blue-700">www.litoelectronics.com</a>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="https://www.litoelectronics.com" target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl transition hover:-translate-y-1">
            <Image width={400} height={256} src="/images/dish.png" alt="Satellite installation showcase" className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900">Quality Satellite Installations</h3>
              <p className="mt-2 text-slate-600 text-sm">Professional Dstv, Zuku and Startimes setups with clean cable management.</p>
            </div>
          </a>
          <a href="https://www.litoelectronics.com" target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl transition hover:-translate-y-1">
            <Image width={400} height={256} src="/images/CCTV-Camera installation.jpg" alt="CCTV and security installation showcase" className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900">Secure CCTV Solutions</h3>
              <p className="mt-2 text-slate-600 text-sm">CCTV and access control installs for homes and businesses.</p>
            </div>
          </a>
          <a href="https://www.litoelectronics.com" target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl transition hover:-translate-y-1">
            <Image width={400} height={256} src="/images/Starlink 1-min.jpg" alt="Starlink and internet installation showcase" className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900">Starlink & Internet Setup</h3>
              <p className="mt-2 text-slate-600 text-sm">Fast Starlink alignment and router configuration for reliable connectivity.</p>
            </div>
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto -mt-10 px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homepageConfig.features.map((feat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
              <h3 className="font-bold text-lg text-slate-900 mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-600">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="max-w-6xl mx-auto py-20 px-6 bg-slate-100 rounded-[2rem] border border-slate-200 shadow-xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Our Professional Installation Services</h2>
          <p className="text-slate-600 mt-2">Accredited and expert solutions across Kenya</p>
        </div>
        
        <div id="services" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homepageConfig.services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 flex flex-col justify-between hover:shadow-xl transition-shadow">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">{service.title}</h3>
                </div>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">From</span>
                <span className="text-lg font-black text-blue-600">{service.basePrice}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">Areas We Cover</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto text-sm">
            Lito Electronics serves a wide range of locations in and around Nairobi, Kiambu, and Thika.
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {homepageConfig.popularAreas.map((area, idx) => (
              <span key={idx} className="bg-black text-white px-3 py-1.5 rounded-lg text-xs font-medium border border-black shadow-sm">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
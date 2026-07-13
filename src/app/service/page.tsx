import { Footer } from '@/components/Footer';
import { homepageConfig } from '@/config/homepage';
import Image from 'next/image';

export const metadata = {
  title: 'Services | Lito Electronics - DStv Installer Near Me, TV Mounting, CCTV, Starlink Installation',
  description: 'Searching for a DStv installer near me or DStv agent near me in Nairobi? Lito Electronics provides accredited TV mounting, DStv, CCTV, and Starlink installation services across Nairobi, Kiambu, and Thika.',
  keywords: ['DStv installer near me', 'DStv agent near me', 'TV mounting Nairobi', 'DStv installation Nairobi', 'CCTV installation Nairobi'],
  openGraph: {
    title: 'Services | Lito Electronics',
    description: 'Searching for a DStv installer near me or DStv agent near me in Nairobi? Lito Electronics provides accredited TV mounting, DStv, CCTV, and Starlink installation services across Nairobi, Kiambu, and Thika.',
    url: 'https://litoelectronics.com/service',
    images: ['/images/Dstv dish 05.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | Lito Electronics',
    description: 'Accredited DStv, CCTV, and Starlink installation services across Nairobi, Kiambu, and Thika. Reliable setup and maintenance for homes and businesses.',
  },
}

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-200 mb-4">Professional Installation Services</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Complete Service Solutions from Lito Electronics
          </h1>
          <p className="text-base md:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Accredited Dstv, Zuku, Gotv, Startimes, CCTV and Starlink installers serving Nairobi, Kiambu,
            Thika and neighboring counties with fast, guaranteed service.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href={`https://wa.me/254${homepageConfig.contact.phone.substring(1)}`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all"
            >
              Contact via WhatsApp
            </a>
            <a
              href={`mailto:${homepageConfig.contact.email}`}
              className="border border-white/30 hover:border-white text-white font-bold py-3 px-8 rounded-full transition-all"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Trusted Service Work</h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            Explore our accredited service examples and visit <a href="https://www.litoelectronics.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-500">www.litoelectronics.com</a> for more details.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <a href="https://www.litoelectronics.com" target="_blank" rel="noreferrer" className="overflow-hidden rounded-[2rem] bg-white shadow-xl transition hover:-translate-y-1">
            <Image width={600} height={320} src="/images/Dstv dish 05.jpg" alt="Lito Electronics professional satellite installation" className="h-80 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900">Professional Satellite Installation</h3>
              <p className="mt-2 text-slate-600 text-sm">Expert installation for Dstv, Zuku, Gotv, and Startimes systems.</p>
            </div>
          </a>
          <a href="https://www.litoelectronics.com" target="_blank" rel="noreferrer" className="overflow-hidden rounded-[2rem] bg-white shadow-xl transition hover:-translate-y-1">
            <Image width={600} height={320} src="/images/CCTV-Camera installation.jpg" alt="Lito Electronics security system setup" className="h-80 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900">Security & Starlink Setup</h3>
              <p className="mt-2 text-slate-600 text-sm">CCTV and Starlink solutions for reliable home and business connectivity.</p>
            </div>
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-20 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Our Service Offerings</h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            From satellite TV installation to CCTV and Starlink setup, we cover every step with accredited workmanship,
            genuine equipment, and friendly support.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {homepageConfig.services.map((service) => (
            <article key={service.id} className="rounded-3xl bg-white p-8 shadow-xl border border-slate-100 transition hover:-translate-y-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
              </div>
              <div className="space-y-3 mb-6">
                {service.details.map((detail, index) => (
                  <p key={index} className="flex items-start gap-3 text-slate-500 text-sm">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-blue-600" />
                    {detail}
                  </p>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 uppercase tracking-[0.18em]">Starting at</span>
                <span className="text-xl font-extrabold text-blue-600">{service.basePrice}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 text-slate-100 py-20 px-6">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-3">
          <div>
            <h3 className="text-2xl font-extrabold mb-4">Why Lito Electronics?</h3>
            <p className="text-slate-300 leading-relaxed">
              We provide accredited installations with transparent pricing, flexible scheduling, and fast response for both homes and businesses.
              Our team uses quality equipment and provides reliable after-service support.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Service Benefits</h4>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li>Same-day support and fast installations</li>
              <li>Accredited installer teams</li>
              <li>Warranty-backed service</li>
              <li>Clean installation and cable management</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Quick Contact</h4>
            <p className="text-slate-300 text-sm">Phone: <a href={`https://wa.me/254${homepageConfig.contact.phone.substring(1)}`} className="text-emerald-300">{homepageConfig.contact.phone}</a></p>
            <p className="text-slate-300 text-sm">Email: <a href={`mailto:${homepageConfig.contact.email}`} className="text-emerald-300">{homepageConfig.contact.email}</a></p>
            <p className="text-slate-300 text-sm mt-4">Hours:</p>
            <p className="text-slate-300 text-sm">{homepageConfig.contact.hours.weekdays}</p>
            <p className="text-slate-300 text-sm">{homepageConfig.contact.hours.sunday}</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

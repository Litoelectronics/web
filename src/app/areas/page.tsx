import { Footer } from '@/components/Footer';
import { homepageConfig } from '@/config/homepage';

export const metadata = {
  title: 'Areas We Serve | Lito Electronics',
  description: 'Lito Electronics serves Nairobi, Kiambu, Thika and nearby counties with accredited DStv installer, DStv agent, TV mounting, CCTV, and Starlink installation services.',
  keywords: ['DStv installer near me', 'DStv agent near me', 'TV mounting Nairobi', 'CCTV service Nairobi', 'Starlink installer Nairobi'],
  openGraph: {
    title: 'Areas We Serve | Lito Electronics',
    description: 'Lito Electronics serves Nairobi, Kiambu, Thika and nearby counties with accredited DStv installer, DStv agent, TV mounting, CCTV, and Starlink installation services.',
    url: 'https://litoelectronics.com/areas',
    images: ['/images/featured image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Areas We Serve | Lito Electronics',
    description: 'Lito Electronics serves Nairobi, Kiambu, Thika and nearby counties with accredited DStv, CCTV, and Starlink installation services.',
  },
}

export default function AreasPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-4">Coverage Area</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Areas We Serve Across Nairobi, Kiambu, Thika & Beyond
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Lito Electronics provides accredited installation and support for Dstv, Zuku, Gotv, Startimes, CCTV,
            and Starlink in the following locations. Reach out today for fast service and expert work.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-20 px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homepageConfig.popularAreas.map((area) => (
            <div key={area} className="rounded-3xl bg-white p-6 shadow-lg border border-slate-200 hover:shadow-xl transition">
              <p className="text-lg font-semibold text-slate-900">{area}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-16 px-6">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-3">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Why choose us in your area?</h2>
            <p className="text-slate-600 leading-relaxed">
              We cover both residential and commercial installations with accredited teams, genuine products,
              and a strong local presence to deliver fast, reliable service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Our reach includes</h3>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li>Same-day or next-day installation calls</li>
              <li>City and suburban coverage</li>
              <li>Local technicians with fast response</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Contact now</h3>
            <p className="text-slate-600 text-sm">
              Phone: <a href={`https://wa.me/254${homepageConfig.contact.phone.substring(1)}`} className="text-blue-600">{homepageConfig.contact.phone}</a>
            </p>
            <p className="text-slate-600 text-sm">Email: <a href={`mailto:${homepageConfig.contact.email}`} className="text-blue-600">{homepageConfig.contact.email}</a></p>
            <p className="text-slate-600 text-sm mt-4">Hours:</p>
            <p className="text-slate-600 text-sm">{homepageConfig.contact.hours.weekdays}</p>
            <p className="text-slate-600 text-sm">{homepageConfig.contact.hours.sunday}</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

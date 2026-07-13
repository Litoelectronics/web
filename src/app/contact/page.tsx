import { Footer } from '@/components/Footer';
import { homepageConfig } from '@/config/homepage';

export const metadata = {
  title: 'Contact | Lito Electronics',
  description: 'Contact Lito Electronics for fast, accredited DStv installer near me, DStv agent near me, TV mounting, CCTV, and Starlink installation service in Nairobi, Kiambu, and Thika.',
  keywords: ['DStv installer near me', 'DStv agent near me', 'TV mounting Nairobi', 'CCTV installation Nairobi', 'Starlink installation Nairobi'],
  openGraph: {
    title: 'Contact | Lito Electronics',
    description: 'Contact Lito Electronics for fast, accredited DStv installer near me, DStv agent near me, TV mounting, CCTV, and Starlink installation service in Nairobi, Kiambu, and Thika.',
    url: 'https://litoelectronics.com/contact',
    images: ['/images/featured image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Lito Electronics',
    description: 'Contact Lito Electronics for fast, accredited DStv, CCTV, and Starlink installation service in Nairobi, Kiambu, and Thika.',
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: "url('/images/Tv mounted on wall.webp')" }} />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,_rgba(255,212,0,0.16),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.12),_transparent_26%)] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-200 mb-4">Get in touch</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Contact Lito Electronics
          </h1>
          <p className="text-base md:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Speak with our accredited installers for fast Dstv, Zuku, Gotv, Startimes, CCTV and Starlink service.
            We respond quickly to calls and WhatsApp messages across Nairobi, Kiambu and Thika.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-20 px-6 grid gap-10 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-10 shadow-xl border border-slate-200">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Contact Details</h2>
          <div className="space-y-5 text-slate-700 text-sm">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Phone</h3>
              <a href={`https://wa.me/254${homepageConfig.contact.phone.substring(1)}`} className="text-blue-600 hover:text-blue-700">
                {homepageConfig.contact.phone}
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
              <a href={`mailto:${homepageConfig.contact.email}`} className="text-blue-600 hover:text-blue-700">
                {homepageConfig.contact.email}
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Location</h3>
              <p>{homepageConfig.contact.location}</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Working Hours</h3>
              <p>{homepageConfig.contact.hours.weekdays}</p>
              <p>{homepageConfig.contact.hours.sunday}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-10 shadow-xl border border-slate-900 text-white">
          <h2 className="text-3xl font-extrabold mb-6">Send us a message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">Name</label>
              <input id="name" name="name" type="text" placeholder="Your full name" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 focus:border-blue-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">Email</label>
              <input id="email" name="email" type="email" placeholder="you@example.com" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 focus:border-blue-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-200 mb-2">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Tell us what you need" className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 focus:border-blue-500 focus:outline-none" />
            </div>
            <button type="button" className="w-full rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-lg transition hover:bg-blue-500">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <section className="bg-slate-100 py-16 px-6">
        <div className="max-w-6xl mx-auto rounded-3xl bg-white p-10 shadow-lg border border-slate-200">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-5">Need help choosing a service?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Our accredited teams can help you decide between satellite TV, CCTV, Starlink, and other installation services.
            Message us on WhatsApp or email and we will respond quickly.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a href={`https://wa.me/254${homepageConfig.contact.phone.substring(1)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-400">
              WhatsApp Us
            </a>
            <a href={`mailto:${homepageConfig.contact.email}`} className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50">
              Email Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

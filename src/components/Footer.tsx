import { homepageConfig } from '@/config/homepage';

export function Footer() {
  return (
    <footer className="bg-[#0b2961] text-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="text-2xl font-extrabold text-white mb-3">Lito Electronics</p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Trusted installer of Dstv, Zuku, Startimes, Gotv, CCTV and Starlink services across Nairobi, Kiambu and Thika.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Contact</h3>
          <p className="text-sm text-slate-200">
            Phone: <a href={`https://wa.me/254${homepageConfig.contact.phone.substring(1)}`} className="text-[#ffd400] hover:text-yellow-300">{homepageConfig.contact.phone}</a>
          </p>
          <p className="text-sm text-slate-200">Email: <a href={`mailto:${homepageConfig.contact.email}`} className="text-[#ffd400] hover:text-yellow-300">{homepageConfig.contact.email}</a></p>
          <p className="text-sm text-slate-200">Location: {homepageConfig.contact.location}</p>
          <div className="mt-4 text-sm text-slate-400">
            <p>{homepageConfig.contact.hours.weekdays}</p>
            <p>{homepageConfig.contact.hours.sunday}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Quick links</h3>
          <ul className="space-y-2 text-sm text-slate-200">
            <li><a href="#top" className="hover:text-white">Home</a></li>
            <li><a href="/service" className="hover:text-white">Service Page</a></li>
            <li><a href="/areas" className="hover:text-white">Areas Page</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Page</a></li>
            <li><a href="#services" className="hover:text-white">Our Services</a></li>
            <li><a href="https://www.litoelectronics.com" target="_blank" rel="noreferrer" className="text-[#ffd400] hover:text-white">Official Website</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 px-6 py-4 text-xs text-slate-500 text-center">
        <p>
          © {new Date().getFullYear()} Lito Electronics. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

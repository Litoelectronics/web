// src/config/homepage.ts
export const homepageConfig = {
  contact: {
    phone: "0725065190",
    email: "info@litoelectronics.com",
    location: "Kiambu, Kenya",
    hours: {
      weekdays: "Monday - Saturday: 7:00 – 21:00",
      sunday: "Sunday: 8:30 – 21:00"
    }
  },
  hero: {
    badge: "Accredited Installers in Nairobi & Kiambu",
    title: "Accredited Dstv, Zuku, Gotv, Startimes, CCTV, and Starlink Installers",
    subtitle: "Professional installation services for homes and businesses across Nairobi, Kiambu, Thika, and surrounding regions. 24/7 service with guaranteed quality.",
    promo: "🔥 Drop-in New Dstv Installation: Get Dstv HD Fullkit plus installation for Kes 6,000 (Was Kes 7,500)"
  },
  features: [
    { title: "Affordable Pricing", desc: "Top-quality products and services starting from Kes 1,500." },
    { title: "Flexible & Fast", desc: "Enjoy same-day installations and extended working hours to fit your schedule." },
    { title: "Premium Quality", desc: "Accredited installers using genuine products with an included warranty." }
  ],
  services: [
    {
      id: "satellite-tv",
      title: "Satellite TV Installation",
      description: "Accredited installation and setup for Dstv, Zuku, Startimes, Gotv, and Azam. Enjoy clear signal and expert support.",
      details: ["Dish & decoder setup", "Xtraview & extra TV points", "Signal repair & realignment"],
      basePrice: "Kes 1,500"
    },
    {
      id: "tv-mounting",
      title: "TV Wall Mounting",
      description: "Professional mounting for all TV sizes with tilt, swivel, or ceiling brackets. Clean finish and secure installation.",
      details: ["Swivel & tilt brackets", "Cable management", "Sound bar & home theater setup"],
      basePrice: "Kes 1,500"
    },
    {
      id: "starlink",
      title: "Starlink Internet Setup",
      description: "Get high-speed Starlink internet professionally installed for homes and businesses. Fast, reliable, and secure.",
      details: ["Mounting & alignment", "Router configuration", "Signal optimization"],
      basePrice: "Kes 4,000"
    },
    {
      id: "cctv-security",
      title: "CCTV & Security Systems",
      description: "Secure your home or business with CCTV cameras, electric fences, and alarm systems. Remote monitoring available.",
      details: ["Camera installation & servicing", "Electric fence setup", "Home security systems"],
      basePrice: "Kes 5,000"
    },
    {
      id: "central-dish",
      title: "Central Dish & Aerial",
      description: "Centralized dish and aerial installations for apartments and estates. Clean, efficient, and cost-effective solutions.",
      details: ["Shared dish systems", "Apartment cabling", "Maintenance & support"],
      basePrice: "Kes 7,000"
    },
    {
      id: "business-solutions",
      title: "Business Solutions",
      description: "Tailored installation services for hotels, pubs, schools, offices, and more. Reliable support for your business needs.",
      details: ["Dstv for businesses", "Custom cabling", "On-site support"],
      basePrice: "Kes 10,000"
    }
  ],
  popularAreas: [
    "Kiambu", "Runda", "Ruaka", "Banana", "Tigoni", "Limuru", "Ndenderu", 
    "Githunguri", "Thika", "Ruiru", "Juja", "Kasarani", "Roysambu", "Kikuyu", 
    "Ngong", "Rongai", "Kitengela", "Athi River", "Mlolongo", "Embakasi", 
    "Utawala", "Westlands", "Karen", "Lavington", "Kileleshwa", "Parklands"
  ]
};
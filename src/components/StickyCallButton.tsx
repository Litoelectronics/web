import Link from 'next/link';

export function StickyCallButton() {
  return (
    <Link 
      href="tel:0725065190"
      className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 shadow-lg shadow-blue-600/30 transition-all hover:scale-110 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 active:scale-95 group md:bottom-8 md:right-8"
      aria-label="Call Now"
    >
      <div className="absolute inset-0 rounded-full animate-ping bg-blue-600 opacity-20"></div>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 text-white group-hover:animate-bounce" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    </Link>
  );
}
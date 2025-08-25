import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <img
        src="https://imgix.cosmicjs.com/03f42b00-81e6-11f0-b0ac-f12686cb9ade-photo-1490481651871-ab68de25d43d-1756148535491.jpg?w=1600&h=900&fit=crop&auto=format,compress"
        alt="Luxury Fashion"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative z-10 text-center text-white max-w-4xl px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Luxury Fashion
          <br />
          <span className="text-accent">Redefined</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Discover exceptional pieces crafted with the finest materials and impeccable attention to detail. 
          Each item tells a story of elegance and sophistication.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/products" 
            className="btn btn-primary px-8 py-4 text-lg font-semibold"
          >
            Shop Collection
          </Link>
          <Link 
            href="/collections" 
            className="btn btn-outline px-8 py-4 text-lg font-semibold border-white text-white hover:bg-white hover:text-black"
          >
            View Collections
          </Link>
        </div>
      </div>
    </section>
  )
}
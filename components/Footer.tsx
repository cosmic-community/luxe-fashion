import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Luxe Fashion Boutique</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Curating luxury fashion pieces with exceptional quality and timeless elegance. 
              Each item in our collection is selected for its craftsmanship and sophistication.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-gray-300 hover:text-white transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=dresses" className="text-gray-300 hover:text-white transition-colors">
                  Dresses
                </Link>
              </li>
              <li>
                <Link href="/products?category=tops" className="text-gray-300 hover:text-white transition-colors">
                  Tops
                </Link>
              </li>
              <li>
                <Link href="/products?category=outerwear" className="text-gray-300 hover:text-white transition-colors">
                  Outerwear
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="text-gray-300 hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-300">
            © {currentYear} Luxe Fashion Boutique. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
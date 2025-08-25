import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Luxe Fashion Boutique',
  description: 'Learn about our passion for luxury fashion and commitment to exceptional quality. Discover the story behind Luxe Fashion Boutique.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Luxe Fashion Boutique
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are passionate about curating luxury fashion pieces that embody exceptional quality, 
              timeless elegance, and sophisticated craftsmanship.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded with a vision to make luxury fashion accessible to discerning customers, 
                Luxe Fashion Boutique has been curating exceptional pieces from renowned designers 
                and emerging talents alike.
              </p>
              <p className="text-gray-600 mb-4">
                Every item in our collection is carefully selected for its superior quality, 
                unique design, and timeless appeal. We believe that luxury fashion should be 
                an investment in both style and craftsmanship.
              </p>
              <p className="text-gray-600">
                Our commitment extends beyond just selling beautiful pieces – we aim to provide 
                an exceptional shopping experience that reflects the luxury and attention to 
                detail our customers deserve.
              </p>
            </div>
            <div className="bg-gray-200 aspect-square rounded-lg flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop&auto=format,compress" 
                alt="Luxury boutique interior" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality First</h3>
                <p className="text-gray-600">
                  We never compromise on quality. Every piece is meticulously inspected 
                  to ensure it meets our high standards.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Timeless Style</h3>
                <p className="text-gray-600">
                  Our curated selection focuses on pieces that transcend trends, 
                  offering enduring elegance and sophistication.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Exceptional Service</h3>
                <p className="text-gray-600">
                  From personalized styling advice to seamless shopping experiences, 
                  we're dedicated to exceeding your expectations.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our passionate team of fashion experts and stylists work tirelessly to bring you 
              the finest selection of luxury fashion pieces from around the world.
            </p>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <p className="text-gray-600 italic">
                "Fashion is not just about clothing – it's about expressing your unique identity 
                and feeling confident in your own skin. That's what drives us every day."
              </p>
              <p className="text-gray-900 font-semibold mt-4">- The Luxe Fashion Team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
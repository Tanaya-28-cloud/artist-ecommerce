import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const products = [
  {
    id: 1,
    name: "Handwoven Silk Saree",
    artist: "Meera Devi",
    location: "Varanasi, UP",
    price: "₹15,999",
    originalPrice: "₹19,999",
    rating: 4.8,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1611574557351-00889b20a36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZXh0aWxlJTIwd2VhdmluZ3xlbnwxfHx8fDE3NTgyODk1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Textiles",
    featured: true
  },
  {
    id: 2,
    name: "Copper Water Pot",
    artist: "Ramesh Kumar",
    location: "Moradabad, UP",
    price: "₹2,499",
    originalPrice: "₹3,299",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1580467469359-91a73a6e92ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoYW5kaWNyYWZ0cyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU4Mjg5NTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Pottery",
    featured: false
  },
  {
    id: 3,
    name: "Traditional Kundan Necklace",
    artist: "Sunita Sharma",
    location: "Jaipur, RJ",
    price: "₹8,999",
    originalPrice: "₹12,999",
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1705081803821-5562179d8247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBqZXdlbHJ5JTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU4MjY3ODk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Jewelry",
    featured: true
  },
  {
    id: 4,
    name: "Wooden Elephant Sculpture",
    artist: "Arjun Nair",
    location: "Kerala",
    price: "₹4,599",
    originalPrice: "₹5,999",
    rating: 4.8,
    reviews: 93,
    image: "https://images.unsplash.com/photo-1728633826211-4e04854e344e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b29kY3JhZnQlMjBjYXJ2aW5nfGVufDF8fHx8MTc1ODI4OTU1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Woodcraft",
    featured: false
  },
  {
    id: 5,
    name: "Madhubani Painting",
    artist: "Kavita Singh",
    location: "Bihar",
    price: "₹3,499",
    originalPrice: "₹4,999",
    rating: 4.9,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1751189293357-d08572ce7aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwYWludGluZ3MlMjBhcnR8ZW58MXx8fHwxNzU4Mjg5NTUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Paintings",
    featured: true
  },
  {
    id: 6,
    name: "Brass Diya Set",
    artist: "Deepak Agarwal",
    location: "Rajasthan",
    price: "₹1,899",
    originalPrice: "₹2,499",
    rating: 4.6,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1580467469359-91a73a6e92ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoYW5kaWNyYWZ0cyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU4Mjg5NTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Home Decor",
    featured: false
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-900 mb-4">Featured Handcrafted Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of exceptional handcrafted items, 
            each telling a unique story of traditional Indian artistry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.featured && (
                  <Badge className="absolute top-3 left-3 bg-orange-600">
                    Featured
                  </Badge>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600">by {product.artist}</p>
                    <p className="text-xs text-gray-500">{product.location}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-900">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-gray-900">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
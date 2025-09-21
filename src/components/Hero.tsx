import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-orange-50 to-amber-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-orange-600" />
              <span className="text-orange-600 font-medium">Authentic • Direct • Sustainable</span>
            </div>
            <h1 className="text-4xl lg:text-6xl text-gray-900 mb-6">
              Connect with India's
              <span className="text-orange-600 block">Master Artisans</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Discover authentic handcrafted treasures directly from skilled Indian artists and craftsmen. 
              Every purchase supports traditional art forms and empowers local communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Explore Crafts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Join Artist Community
              </Button>
            </div>
            <div className="flex items-center gap-8 mt-12 text-sm text-gray-600">
              <div>
                <div className="text-2xl text-gray-900">2,500+</div>
                <div>Active Artists</div>
              </div>
              <div>
                <div className="text-2xl text-gray-900">15,000+</div>
                <div>Authentic Products</div>
              </div>
              <div>
                <div className="text-2xl text-gray-900">50+</div>
                <div>Craft Categories</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1580467469359-91a73a6e92ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoYW5kaWNyYWZ0cyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU4Mjg5NTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Indian pottery crafts"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1705081803821-5562179d8247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBqZXdlbHJ5JTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU4MjY3ODk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Traditional Indian jewelry"
                  className="w-full h-32 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-4 mt-8">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1611574557351-00889b20a36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZXh0aWxlJTIwd2VhdmluZ3xlbnwxfHx8fDE3NTgyODk1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Indian textile weaving"
                  className="w-full h-32 object-cover rounded-lg shadow-lg"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1728633826211-4e04854e344e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b29kY3JhZnQlMjBjYXJ2aW5nfGVufDF8fHx8MTc1ODI4OTU1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Indian woodcraft carving"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
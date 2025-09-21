import { Palette, Gem, Shirt, Home, Gift, Flower } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const categories = [
  {
    id: "pottery",
    name: "Pottery & Ceramics",
    icon: Home,
    description: "Handcrafted clay masterpieces",
    count: "2,340 items",
    color: "bg-amber-100 text-amber-700"
  },
  {
    id: "textiles",
    name: "Textiles & Fabrics",
    icon: Shirt,
    description: "Traditional weaves & embroidery",
    count: "4,567 items",
    color: "bg-red-100 text-red-700"
  },
  {
    id: "jewelry",
    name: "Jewelry & Accessories",
    icon: Gem,
    description: "Precious metals & gemstones",
    count: "1,890 items",
    color: "bg-purple-100 text-purple-700"
  },
  {
    id: "paintings",
    name: "Paintings & Art",
    icon: Palette,
    description: "Traditional & contemporary art",
    count: "3,245 items",
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: "woodcraft",
    name: "Wood & Bamboo",
    icon: Gift,
    description: "Carved sculptures & furniture",
    count: "1,567 items",
    color: "bg-green-100 text-green-700"
  },
  {
    id: "decorative",
    name: "Home Decor",
    icon: Flower,
    description: "Beautiful decorative pieces",
    count: "2,890 items",
    color: "bg-pink-100 text-pink-700"
  }
];

export function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-900 mb-4">Explore Craft Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover authentic handcrafted products across diverse traditional art forms, 
            each representing centuries of skilled craftsmanship.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-lg ${category.color} mb-4`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-3">{category.description}</p>
                  <div className="text-sm text-gray-500">{category.count}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
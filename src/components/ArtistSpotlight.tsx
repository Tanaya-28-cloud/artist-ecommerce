import { MapPin, Award, Users, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const artists = [
  {
    id: 1,
    name: "Meera Devi",
    specialty: "Silk Weaving Master",
    location: "Varanasi, Uttar Pradesh",
    experience: "25+ years",
    rating: 4.9,
    followers: 2840,
    products: 127,
    image: "https://images.unsplash.com/photo-1548597180-23cc88a9a6f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhcnRpc2FuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4Mjg5NTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    story: "Preserving the ancient art of Banarasi silk weaving through five generations of family tradition.",
    achievements: ["National Craft Award 2019", "Master Weaver Certification"],
    featured: true
  },
  {
    id: 2,
    name: "Arjun Nair",
    specialty: "Wood Carving Artist",
    location: "Kerala",
    experience: "18+ years",
    rating: 4.8,
    followers: 1950,
    products: 89,
    image: "https://images.unsplash.com/photo-1756670164589-08daf1a0d236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhcnRpc2FuJTIwd29ya2luZ3xlbnwxfHx8fDE3NTgyODk1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    story: "Creating intricate wooden sculptures inspired by Kerala's rich cultural heritage and temple architecture.",
    achievements: ["State Artist Recognition", "Export Excellence Award"],
    featured: false
  },
  {
    id: 3,
    name: "Kavita Singh",
    specialty: "Madhubani Painter",
    location: "Bihar",
    experience: "15+ years",
    rating: 4.9,
    followers: 3200,
    products: 156,
    image: "https://images.unsplash.com/photo-1548597180-23cc88a9a6f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhcnRpc2FuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4Mjg5NTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    story: "Bringing ancient Mithila folk art to modern homes while teaching young women in her village.",
    achievements: ["Women Entrepreneur Award", "Cultural Ambassador"],
    featured: true
  }
];

export function ArtistSpotlight() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-900 mb-4">Meet Our Master Artisans</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect directly with skilled craftspeople who have dedicated their lives to preserving 
            and innovating traditional Indian art forms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <Card key={artist.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-64 object-cover"
                />
                {artist.featured && (
                  <Badge className="absolute top-4 left-4 bg-orange-600">
                    Featured Artist
                  </Badge>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <h3 className="text-lg text-gray-900 mb-1">{artist.name}</h3>
                    <p className="text-sm text-orange-600 mb-1">{artist.specialty}</p>
                    <div className="flex items-center text-xs text-gray-600">
                      <MapPin className="h-3 w-3 mr-1" />
                      {artist.location}
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      {artist.experience}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {artist.followers}
                    </div>
                  </div>
                  <div className="text-sm text-gray-900">
                    ⭐ {artist.rating}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {artist.story}
                </p>
                
                <div className="space-y-2 mb-4">
                  {artist.achievements.map((achievement, index) => (
                    <Badge key={index} variant="outline" className="text-xs mr-2">
                      {achievement}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                    View Products
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            Explore All Artists
          </Button>
        </div>
      </div>
    </section>
  );
}
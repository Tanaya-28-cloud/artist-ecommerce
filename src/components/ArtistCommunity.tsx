import { useState } from "react";
import { 
  Users, 
  MessageCircle, 
  Video, 
  BookOpen, 
  Trophy, 
  Heart, 
  Share2, 
  Eye,
  ThumbsUp,
  Calendar,
  MapPin,
  Star,
  Play,
  Clock,
  UserPlus
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const communityPosts = [
  {
    id: 1,
    author: {
      name: "Priya Kumari",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGFydGlzdHxlbnwxfHx8fDE3NTgyOTAzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specialization: "Pottery & Ceramics",
      verified: true
    },
    content: "Just finished this beautiful set of terracotta diyas for Diwali! The traditional technique passed down from my grandmother combined with my own artistic vision. What do you think? 🪔✨",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXlhJTIwcG90dGVyeSUyMGluZGlhbnxlbnwxfHx8fDE3NTgyOTAzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 156,
    comments: 23,
    shares: 12,
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    author: {
      name: "Rajesh Sharma",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBhcnRpc3R8ZW58MXx8fHwxNzU4MjkwMzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specialization: "Wood Carving",
      verified: true
    },
    content: "Workshop update: Teaching young artisans the traditional Rajasthani wood carving techniques. It's so rewarding to see the next generation embrace our heritage! 🌟",
    image: "https://images.unsplash.com/photo-1551795303-a865b64a1cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwY2FydmluZyUyMGluZGlhbnxlbnwxfHx8fDE3NTgyOTAzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 289,
    comments: 45,
    shares: 34,
    timestamp: "5 hours ago"
  },
  {
    id: 3,
    author: {
      name: "Meera Devi",
      avatar: "https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGVsZGVybHl8ZW58MXx8fHwxNzU4MjkwMzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      specialization: "Textiles",
      verified: true
    },
    content: "Completed this intricate Banarasi silk weaving pattern after 3 months of dedicated work. Each thread tells a story of our rich textile heritage. 🧵✨",
    image: "https://images.unsplash.com/photo-1611574557351-00889b20a36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhiYW5hcmFzaSUyMHNpbGslMjB3ZWF2aW5nfGVufDF8fHx8MTc1ODI5MDM5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    likes: 423,
    comments: 67,
    shares: 89,
    timestamp: "1 day ago"
  }
];

const workshops = [
  {
    id: 1,
    title: "Traditional Blue Pottery Techniques",
    instructor: "Master Artisan Kishan Lal",
    date: "Jan 25, 2024",
    time: "10:00 AM - 2:00 PM",
    participants: 24,
    maxParticipants: 30,
    level: "Intermediate",
    price: "₹1,200",
    image: "https://images.unsplash.com/photo-1580467469359-91a73a6e92ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwcG90dGVyeSUyMGluZGlhbnxlbnwxfHx8fDE3NTgyOTAzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    title: "Madhubani Painting Fundamentals",
    instructor: "Sita Kumari",
    date: "Jan 28, 2024",
    time: "3:00 PM - 6:00 PM",
    participants: 18,
    maxParticipants: 25,
    level: "Beginner",
    price: "₹800",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWRodWJhbmklMjBwYWludGluZ3xlbnwxfHx8fDE3NTgyOTAzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

const mentors = [
  {
    id: 1,
    name: "Guru Mohan Das",
    specialization: "Traditional Sculptures",
    experience: "40+ years",
    rating: 4.9,
    students: 150,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBlbGRlcmx5fGVufDF8fHx8MTc1ODI5MDM2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    bio: "Master sculptor with expertise in stone and bronze work. Recipient of the National Award for Traditional Arts."
  },
  {
    id: 2,
    name: "Kavita Joshi",
    specialization: "Textile Arts",
    experience: "25+ years",
    rating: 4.8,
    students: 95,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMG1pZGRsZSUyMGFnZWR8ZW58MXx8fHwxNzU4MjkwMzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    bio: "Renowned weaver specializing in traditional Indian textiles and natural dyeing techniques."
  }
];

export function ArtistCommunity() {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl text-gray-900">Artist Community</h1>
              <p className="text-sm text-gray-600">Connect, Learn, and Grow Together</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4 mr-2" />
                Join Live Session
              </Button>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                <Users className="h-4 w-4 mr-2" />
                Find Mentors
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="workshops">Workshops</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl text-gray-900">2,847</div>
                  <div className="text-sm text-gray-600">Active Artists</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl text-gray-900">1,234</div>
                  <div className="text-sm text-gray-600">Discussions</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl text-gray-900">156</div>
                  <div className="text-sm text-gray-600">Workshops</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl text-gray-900">89</div>
                  <div className="text-sm text-gray-600">Success Stories</div>
                </CardContent>
              </Card>
            </div>

            {/* Community Posts */}
            <div className="space-y-6">
              {communityPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-900">{post.author.name}</h4>
                          {post.author.verified && (
                            <Badge className="bg-orange-600 text-white">
                              <Star className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{post.author.specialization}</p>
                        <p className="text-xs text-gray-500">{post.timestamp}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Post Content */}
                    <p className="text-gray-900 mb-4">{post.content}</p>
                    
                    {/* Post Image */}
                    {post.image && (
                      <div className="mb-4">
                        <ImageWithFallback
                          src={post.image}
                          alt="Post content"
                          className="w-full h-80 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                          <Heart className="h-5 w-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <MessageCircle className="h-5 w-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                          <Share2 className="h-5 w-5" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Appreciate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="workshops" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-gray-900">Upcoming Workshops</h2>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Workshop
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workshops.map((workshop) => (
                <Card key={workshop.id} className="overflow-hidden">
                  <div className="relative">
                    <ImageWithFallback
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-orange-600">
                      {workshop.level}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg text-gray-900 mb-2">{workshop.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">by {workshop.instructor}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{workshop.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{workshop.participants}/{workshop.maxParticipants} participants</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg text-orange-600">{workshop.price}</span>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        Register Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mentorship" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-gray-900">Find Your Mentor</h2>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Users className="h-4 w-4 mr-2" />
                Become a Mentor
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={mentor.avatar} />
                        <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-lg text-gray-900">{mentor.name}</h3>
                        <p className="text-sm text-gray-600">{mentor.specialization}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{mentor.rating}</span>
                          </div>
                          <span className="text-sm text-gray-600">{mentor.experience}</span>
                          <span className="text-sm text-gray-600">{mentor.students} students</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-4">{mentor.bio}</p>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                        Connect
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg text-gray-900 mb-2">Video Tutorials</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Access hundreds of step-by-step video guides from master artisans
                    </p>
                    <Button variant="outline">Browse Videos</Button>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg text-gray-900 mb-2">Digital Library</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Comprehensive collection of traditional craft techniques and history
                    </p>
                    <Button variant="outline">Explore Library</Button>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg text-gray-900 mb-2">Community Forums</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Connect with fellow artists and share knowledge and experiences
                    </p>
                    <Button variant="outline">Join Forums</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
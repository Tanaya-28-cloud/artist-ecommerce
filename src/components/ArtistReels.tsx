import { useState } from "react";
import { 
  Video, 
  Play, 
  Pause, 
  Heart, 
  MessageCircle, 
  Share2, 
  Upload,
  Eye,
  MoreHorizontal,
  Camera,
  Mic,
  MicOff
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Reel {
  id: string;
  artist: {
    name: string;
    avatar: string;
    verified: boolean;
    specialization: string;
  };
  video: {
    thumbnail: string;
    duration: number;
    views: number;
  };
  content: {
    title: string;
    description: string;
    hashtags: string[];
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  timestamp: string;
}

const mockReels: Reel[] = [
  {
    id: "1",
    artist: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGFydGlzdHxlbnwxfHx8fDE3NTgyOTAzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      verified: true,
      specialization: "Pottery"
    },
    video: {
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwbWFraW5nfGVufDF8fHx8MTc1ODI5MDM5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: 89,
      views: 12500
    },
    content: {
      title: "Traditional Diya Making Process",
      description: "Watch me create beautiful diyas using traditional pottery techniques passed down through generations!",
      hashtags: ["#Pottery", "#Diya", "#Traditional", "#Handmade", "#Kalakaari"]
    },
    engagement: {
      likes: 856,
      comments: 45,
      shares: 23
    },
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    artist: {
      name: "Rajesh Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBhcnRpc3R8ZW58MXx8fHwxNzU4MjkwMzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      verified: true,
      specialization: "Wood Carving"
    },
    video: {
      thumbnail: "https://images.unsplash.com/photo-1551795303-a865b64a1cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwY2FydmluZ3xlbnwxfHx8fDE3NTgyOTAzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: 72,
      views: 8900
    },
    content: {
      title: "Rajasthani Wood Carving Magic",
      description: "Creating intricate patterns on sandalwood - a 500-year-old family tradition!",
      hashtags: ["#WoodCarving", "#Rajasthani", "#Heritage", "#Sandalwood", "#ArtisanSkills"]
    },
    engagement: {
      likes: 634,
      comments: 32,
      shares: 18
    },
    timestamp: "5 hours ago"
  },
  {
    id: "3",
    artist: {
      name: "Meera Devi",
      avatar: "https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGVsZGVybHl8ZW58MXx8fHwxNzU4MjkwMzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      verified: true,
      specialization: "Textile Weaving"
    },
    video: {
      thumbnail: "https://images.unsplash.com/photo-1611574557351-00889b20a36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhiYW5hcmFzaSUyMHNpbGslMjB3ZWF2aW5nfGVufDF8fHx8MTc1ODI5MDM5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      duration: 95,
      views: 15200
    },
    content: {
      title: "Banarasi Silk Weaving Secret",
      description: "60 years of experience goes into every thread. Watch the magic of Banarasi silk creation!",
      hashtags: ["#BanarasiSilk", "#Weaving", "#Silk", "#Heritage", "#MasterCraftsman"]
    },
    engagement: {
      likes: 1205,
      comments: 78,
      shares: 45
    },
    timestamp: "1 day ago"
  }
];

export function ArtistReels() {
  const [currentReel, setCurrentReel] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    hashtags: ""
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
  };

  const togglePlay = (reelId: string) => {
    if (currentReel === reelId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentReel(reelId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl text-gray-900">Artist Reels</h1>
              <p className="text-sm text-gray-600">Share your craft stories</p>
            </div>
            <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Create Reel
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create New Reel</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Video Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg text-gray-900 mb-2">Upload Your Craft Video</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Show your artistic process in 60-90 seconds
                    </p>
                    <Button variant="outline" className="mb-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Video File
                    </Button>
                    <p className="text-xs text-gray-500">
                      Recommended: 9:16 ratio, max 100MB
                    </p>
                  </div>

                  {/* Reel Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={uploadData.title}
                        onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Give your reel a catchy title..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <Textarea
                        value={uploadData.description}
                        onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Tell viewers about your craft process..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hashtags</label>
                      <input
                        type="text"
                        value={uploadData.hashtags}
                        onChange={(e) => setUploadData(prev => ({ ...prev, hashtags: e.target.value }))}
                        placeholder="#Pottery #Handmade #Traditional"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-1">Tips for Great Reels:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Show the complete process from start to finish</li>
                        <li>• Use natural lighting for best quality</li>
                        <li>• Add captions in Hindi/English for accessibility</li>
                        <li>• Include close-up shots of intricate details</li>
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" onClick={() => setShowUploadDialog(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                        Publish Reel
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockReels.map((reel) => (
            <Card key={reel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Video Thumbnail */}
              <div className="relative aspect-[9/16] bg-black">
                <ImageWithFallback
                  src={reel.video.thumbnail}
                  alt={reel.content.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Video Controls Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    onClick={() => togglePlay(reel.id)}
                  >
                    {currentReel === reel.id && isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </Button>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2">
                  <Badge className="bg-black/70 text-white text-xs">
                    {formatDuration(reel.video.duration)}
                  </Badge>
                </div>

                {/* Views Badge */}
                <div className="absolute top-2 right-2">
                  <Badge className="bg-black/70 text-white text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    {formatViews(reel.video.views)}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-4">
                {/* Artist Info */}
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={reel.artist.avatar} />
                    <AvatarFallback>{reel.artist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{reel.artist.name}</p>
                      {reel.artist.verified && (
                        <Badge className="bg-blue-600 text-white text-xs px-1 py-0">✓</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{reel.artist.specialization}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Title and Description */}
                <div className="mb-3">
                  <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                    {reel.content.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {reel.content.description}
                  </p>
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {reel.content.hashtags.slice(0, 3).map((hashtag, index) => (
                    <Badge key={index} variant="outline" className="text-xs text-blue-600 border-blue-200">
                      {hashtag}
                    </Badge>
                  ))}
                  {reel.content.hashtags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{reel.content.hashtags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Engagement */}
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                      <Heart className="h-4 w-4" />
                      <span>{reel.engagement.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span>{reel.engagement.comments}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span>{reel.engagement.shares}</span>
                    </button>
                  </div>
                  <span>{reel.timestamp}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-6">
          <h2 className="text-xl text-gray-900 mb-4">📸 Reel Creation Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Video className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">Perfect Duration</h3>
              <p className="text-sm text-gray-600">60-90 seconds is ideal for showcasing your craft process</p>
            </div>
            <div className="text-center">
              <Camera className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">Good Lighting</h3>
              <p className="text-sm text-gray-600">Natural lighting works best for authentic craft videos</p>
            </div>
            <div className="text-center">
              <Mic className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">Clear Audio</h3>
              <p className="text-sm text-gray-600">Explain your process while working for better engagement</p>
            </div>
            <div className="text-center">
              <Heart className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">Tell a Story</h3>
              <p className="text-sm text-gray-600">Share the cultural significance and personal connection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
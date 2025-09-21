import { useState, useEffect } from "react";
import { 
  Award, 
  Star, 
  TrendingUp, 
  Heart, 
  Crown, 
  Trophy, 
  Medal, 
  Target,
  Users,
  ShoppingBag,
  Camera,
  MessageCircle,
  Zap,
  Gift
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  requirements: string;
  earned: boolean;
  earnedDate?: Date;
  progress?: number;
  maxProgress?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  unlocked: boolean;
  unlockedDate?: Date;
  category: "sales" | "community" | "quality" | "engagement" | "milestone";
}

interface ArtistLevel {
  level: number;
  title: string;
  pointsRequired: number;
  benefits: string[];
  color: string;
}

const artistLevels: ArtistLevel[] = [
  {
    level: 1,
    title: "Apprentice Craftsman",
    pointsRequired: 0,
    benefits: ["Basic marketplace access", "Standard listing"],
    color: "gray"
  },
  {
    level: 2,
    title: "Skilled Artisan",
    pointsRequired: 500,
    benefits: ["Featured in category", "Custom badge", "Priority support"],
    color: "blue"
  },
  {
    level: 3,
    title: "Master Craftsman",
    pointsRequired: 1500,
    benefits: ["Homepage feature", "Verified badge", "Reduced fees"],
    color: "purple"
  },
  {
    level: 4,
    title: "Heritage Keeper",
    pointsRequired: 3000,
    benefits: ["Mentorship program", "Workshop hosting", "Premium tools"],
    color: "orange"
  },
  {
    level: 5,
    title: "Cultural Ambassador",
    pointsRequired: 5000,
    benefits: ["Global promotion", "Exhibition opportunities", "Brand partnerships"],
    color: "gold"
  }
];

export function GamificationSystem() {
  const [currentPoints, setCurrentPoints] = useState(1250);
  const [currentLevel, setCurrentLevel] = useState(2);
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: "first-sale",
      name: "First Sale",
      description: "Made your first sale on Kalakaari",
      icon: ShoppingBag,
      color: "green",
      rarity: "common",
      requirements: "Complete 1 sale",
      earned: true,
      earnedDate: new Date(2024, 0, 15)
    },
    {
      id: "top-seller",
      name: "Top Seller",
      description: "Achieved top 10% sales in your category",
      icon: Crown,
      color: "gold",
      rarity: "epic",
      requirements: "Reach top 10% in category sales",
      earned: true,
      earnedDate: new Date(2024, 1, 20)
    },
    {
      id: "rising-star",
      name: "Rising Star",
      description: "Gained 100+ followers in a month",
      icon: TrendingUp,
      color: "blue",
      rarity: "rare",
      requirements: "Gain 100 followers in 30 days",
      earned: true,
      earnedDate: new Date(2024, 2, 10)
    },
    {
      id: "customer-favorite",
      name: "Customer Favorite",
      description: "Received 50+ five-star reviews",
      icon: Heart,
      color: "red",
      rarity: "rare",
      requirements: "Get 50 five-star reviews",
      earned: true,
      earnedDate: new Date(2024, 2, 25)
    },
    {
      id: "community-leader",
      name: "Community Leader",
      description: "Helped 20+ artists in the community",
      icon: Users,
      color: "purple",
      rarity: "epic",
      requirements: "Help 20 community members",
      earned: false,
      progress: 15,
      maxProgress: 20
    },
    {
      id: "photo-perfectionist",
      name: "Photo Perfectionist",
      description: "All products have high-quality photos",
      icon: Camera,
      color: "indigo",
      rarity: "rare",
      requirements: "Upload 20 products with perfect photo scores",
      earned: false,
      progress: 18,
      maxProgress: 20
    },
    {
      id: "storyteller",
      name: "Master Storyteller",
      description: "Created 10 viral reels",
      icon: MessageCircle,
      color: "orange",
      rarity: "epic",
      requirements: "Create 10 reels with 1000+ views",
      earned: false,
      progress: 7,
      maxProgress: 10
    },
    {
      id: "heritage-guardian",
      name: "Heritage Guardian",
      description: "Documented 5 traditional techniques",
      icon: Award,
      color: "emerald",
      rarity: "legendary",
      requirements: "Document 5 traditional craft techniques",
      earned: false,
      progress: 3,
      maxProgress: 5
    }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first-week",
      title: "First Week Complete",
      description: "Successfully completed your first week on Kalakaari",
      points: 50,
      unlocked: true,
      unlockedDate: new Date(2024, 0, 22),
      category: "milestone"
    },
    {
      id: "hundred-sales",
      title: "Century Maker",
      description: "Achieved 100 total sales",
      points: 200,
      unlocked: true,
      unlockedDate: new Date(2024, 2, 15),
      category: "sales"
    },
    {
      id: "mentor-badge",
      title: "Community Mentor",
      description: "Mentored 5 new artists",
      points: 150,
      unlocked: false,
      category: "community"
    },
    {
      id: "quality-craft",
      title: "Quality Craftsman",
      description: "Maintained 4.8+ rating for 3 months",
      points: 300,
      unlocked: true,
      unlockedDate: new Date(2024, 1, 28),
      category: "quality"
    }
  ]);

  const getCurrentLevelInfo = () => {
    return artistLevels.find(level => level.level === currentLevel) || artistLevels[0];
  };

  const getNextLevelInfo = () => {
    return artistLevels.find(level => level.level === currentLevel + 1);
  };

  const getProgressToNextLevel = () => {
    const nextLevel = getNextLevelInfo();
    const currentLevelInfo = getCurrentLevelInfo();
    
    if (!nextLevel) return 100;
    
    const pointsNeeded = nextLevel.pointsRequired - currentLevelInfo.pointsRequired;
    const pointsEarned = currentPoints - currentLevelInfo.pointsRequired;
    
    return Math.min((pointsEarned / pointsNeeded) * 100, 100);
  };

  const earnedBadges = badges.filter(badge => badge.earned);
  const inProgressBadges = badges.filter(badge => !badge.earned && badge.progress !== undefined);
  const lockedBadges = badges.filter(badge => !badge.earned && badge.progress === undefined);

  const getRarityColor = (rarity: Badge["rarity"]) => {
    switch (rarity) {
      case "common": return "bg-gray-100 text-gray-800";
      case "rare": return "bg-blue-100 text-blue-800";
      case "epic": return "bg-purple-100 text-purple-800";
      case "legendary": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl text-gray-900">Artist Achievements</h1>
              <p className="text-sm text-gray-600">Track your progress and earn recognition</p>
            </div>
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <Trophy className="h-3 w-3 mr-1" />
              Level {currentLevel}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Level Progress */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  {getCurrentLevelInfo().title}
                </CardTitle>
                <p className="text-gray-600">Current Artist Level</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600">{currentPoints.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progress to Next Level</span>
                  <span className="text-sm text-gray-600">
                    {getNextLevelInfo() ? 
                      `${currentPoints}/${getNextLevelInfo()!.pointsRequired} points` : 
                      "Max Level Reached!"
                    }
                  </span>
                </div>
                <Progress value={getProgressToNextLevel()} className="h-3" />
              </div>

              {/* Next Level Benefits */}
              {getNextLevelInfo() && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-medium text-orange-900 mb-2">
                    Next: {getNextLevelInfo()!.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {getNextLevelInfo()!.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-orange-800">
                        <Gift className="h-3 w-3" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="badges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <div className="space-y-6">
              {/* Earned Badges */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Earned Badges ({earnedBadges.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earnedBadges.map((badge) => {
                    const IconComponent = badge.icon;
                    return (
                      <Card key={badge.id} className="border-2 border-green-200 bg-green-50">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              badge.color === 'gold' ? 'bg-yellow-100' :
                              badge.color === 'red' ? 'bg-red-100' :
                              badge.color === 'blue' ? 'bg-blue-100' :
                              badge.color === 'green' ? 'bg-green-100' :
                              badge.color === 'purple' ? 'bg-purple-100' :
                              'bg-gray-100'
                            }`}>
                              <IconComponent className={`h-6 w-6 ${
                                badge.color === 'gold' ? 'text-yellow-600' :
                                badge.color === 'red' ? 'text-red-600' :
                                badge.color === 'blue' ? 'text-blue-600' :
                                badge.color === 'green' ? 'text-green-600' :
                                badge.color === 'purple' ? 'text-purple-600' :
                                'text-gray-600'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{badge.name}</h3>
                              <Badge className={getRarityColor(badge.rarity)} variant="outline">
                                {badge.rarity}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                          {badge.earnedDate && (
                            <p className="text-xs text-green-600">
                              Earned on {badge.earnedDate.toLocaleDateString()}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* In Progress Badges */}
              {inProgressBadges.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">In Progress ({inProgressBadges.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inProgressBadges.map((badge) => {
                      const IconComponent = badge.icon;
                      const progressPercentage = badge.progress && badge.maxProgress ? 
                        (badge.progress / badge.maxProgress) * 100 : 0;
                      
                      return (
                        <Card key={badge.id} className="border-2 border-orange-200">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                                <IconComponent className="h-6 w-6 text-orange-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-900">{badge.name}</h3>
                                <Badge className={getRarityColor(badge.rarity)} variant="outline">
                                  {badge.rarity}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{badge.progress}/{badge.maxProgress}</span>
                              </div>
                              <Progress value={progressPercentage} className="h-2" />
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Locked Badges */}
              {lockedBadges.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Locked Badges ({lockedBadges.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lockedBadges.map((badge) => {
                      const IconComponent = badge.icon;
                      return (
                        <Card key={badge.id} className="border-2 border-gray-200 opacity-75">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                <IconComponent className="h-6 w-6 text-gray-400" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-500">{badge.name}</h3>
                                <Badge className={getRarityColor(badge.rarity)} variant="outline">
                                  {badge.rarity}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{badge.description}</p>
                            <p className="text-xs text-gray-400">
                              Requirements: {badge.requirements}
                            </p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={achievement.unlocked ? "border-green-200 bg-green-50" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-medium ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                        {achievement.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={achievement.unlocked ? "default" : "outline"}>
                          +{achievement.points} pts
                        </Badge>
                        {achievement.unlocked && <Medal className="h-4 w-4 text-yellow-600" />}
                      </div>
                    </div>
                    <p className={`text-sm ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                      {achievement.description}
                    </p>
                    {achievement.unlockedDate && (
                      <p className="text-xs text-green-600 mt-2">
                        Unlocked on {achievement.unlockedDate.toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Sellers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-600" />
                    Top Sellers This Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { rank: 1, name: "Priya Sharma", sales: 156, points: 3250 },
                      { rank: 2, name: "Rajesh Kumar", sales: 143, points: 2890 },
                      { rank: 3, name: "You", sales: 89, points: 1250, isCurrentUser: true },
                      { rank: 4, name: "Meera Devi", sales: 76, points: 1890 },
                      { rank: 5, name: "Arjun Singh", sales: 67, points: 1456 }
                    ].map((artist) => (
                      <div key={artist.rank} className={`flex items-center gap-3 p-2 rounded-lg ${
                        artist.isCurrentUser ? 'bg-orange-50 border border-orange-200' : ''
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          artist.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                          artist.rank === 2 ? 'bg-gray-100 text-gray-800' :
                          artist.rank === 3 ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-50 text-gray-600'
                        }`}>
                          {artist.rank}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{artist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{artist.name}</div>
                          <div className="text-xs text-gray-600">{artist.sales} sales</div>
                        </div>
                        <div className="text-sm font-medium text-orange-600">
                          {artist.points} pts
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Rising Stars */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Rising Stars
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Anita Crafts", growth: "+234%", newFollowers: 567 },
                      { name: "Village Artisan Co", growth: "+189%", newFollowers: 432 },
                      { name: "Traditional Weavers", growth: "+156%", newFollowers: 398 },
                      { name: "Heritage Pottery", growth: "+134%", newFollowers: 345 },
                      { name: "Royal Crafts", growth: "+123%", newFollowers: 298 }
                    ].map((artist, index) => (
                      <div key={index} className="flex items-center gap-3 p-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Zap className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{artist.name}</div>
                          <div className="text-xs text-gray-600">{artist.newFollowers} new followers</div>
                        </div>
                        <div className="text-sm font-medium text-green-600">
                          {artist.growth}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
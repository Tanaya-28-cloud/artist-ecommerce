import { useState } from "react";
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Eye,
  Ban,
  CheckCircle,
  X,
  MoreHorizontal,
  Calendar,
  Filter,
  Download,
  Search,
  Flag,
  Star,
  Camera
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface AdminMetrics {
  totalArtists: number;
  pendingVerifications: number;
  flaggedContent: number;
  totalRevenue: number;
  monthlyGrowth: number;
  averageRating: number;
}

interface PendingArtist {
  id: string;
  name: string;
  email: string;
  specialization: string;
  experience: string;
  submittedAt: Date;
  documents: number;
  portfolioImages: number;
  status: "pending" | "under_review" | "approved" | "rejected";
  reviewedBy?: string;
  avatar?: string;
}

interface FlaggedContent {
  id: string;
  type: "product" | "profile" | "review" | "reel";
  title: string;
  artist: string;
  reason: string;
  reportedBy: string;
  reportedAt: Date;
  severity: "low" | "medium" | "high";
  status: "pending" | "resolved" | "dismissed";
  thumbnail?: string;
}

interface PricingAnalysis {
  category: string;
  averagePrice: number;
  medianPrice: number;
  priceRange: { min: number; max: number };
  totalProducts: number;
  trend: "up" | "down" | "stable";
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const [metrics] = useState<AdminMetrics>({
    totalArtists: 1247,
    pendingVerifications: 23,
    flaggedContent: 7,
    totalRevenue: 2450000,
    monthlyGrowth: 12.5,
    averageRating: 4.7
  });

  const [pendingArtists, setPendingArtists] = useState<PendingArtist[]>([
    {
      id: "1",
      name: "Kiran Sharma",
      email: "kiran.pottery@email.com",
      specialization: "Traditional Pottery",
      experience: "15 years",
      submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      documents: 4,
      portfolioImages: 12,
      status: "pending",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGFydGlzdHxlbnwxfHx8fDE3NTgyOTA0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "2",
      name: "Aarav Singh",
      email: "aarav.woodcraft@email.com",
      specialization: "Wood Carving",
      experience: "8 years",
      submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      documents: 3,
      portfolioImages: 8,
      status: "under_review",
      reviewedBy: "Admin Team"
    },
    {
      id: "3",
      name: "Priya Devi",
      email: "priya.textiles@email.com",
      specialization: "Handloom Textiles",
      experience: "12 years",
      submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
      documents: 5,
      portfolioImages: 15,
      status: "pending"
    }
  ]);

  const [flaggedContent, setFlaggedContent] = useState<FlaggedContent[]>([
    {
      id: "1",
      type: "product",
      title: "Fake Antique Vase",
      artist: "Suspicious Seller",
      reason: "Suspected counterfeit/stolen images",
      reportedBy: "Automated System",
      reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
      severity: "high",
      status: "pending",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96"
    },
    {
      id: "2",
      type: "review",
      title: "Fake review spam",
      artist: "Multiple Accounts",
      reason: "Multiple fake positive reviews",
      reportedBy: "Community Report",
      reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
      severity: "medium",
      status: "pending"
    },
    {
      id: "3",
      type: "reel",
      title: "Inappropriate content",
      artist: "John Doe",
      reason: "Non-craft related content",
      reportedBy: "User Report",
      reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      severity: "low",
      status: "pending"
    }
  ]);

  const [pricingAnalysis] = useState<PricingAnalysis[]>([
    {
      category: "Pottery & Ceramics",
      averagePrice: 1250,
      medianPrice: 980,
      priceRange: { min: 200, max: 5000 },
      totalProducts: 340,
      trend: "up"
    },
    {
      category: "Textiles & Fabrics",
      averagePrice: 2100,
      medianPrice: 1800,
      priceRange: { min: 500, max: 8000 },
      totalProducts: 280,
      trend: "stable"
    },
    {
      category: "Jewelry & Accessories",
      averagePrice: 3200,
      medianPrice: 2500,
      priceRange: { min: 800, max: 15000 },
      totalProducts: 190,
      trend: "up"
    },
    {
      category: "Wood & Bamboo Crafts",
      averagePrice: 950,
      medianPrice: 750,
      priceRange: { min: 150, max: 3500 },
      totalProducts: 220,
      trend: "down"
    }
  ]);

  const approveArtist = (id: string) => {
    setPendingArtists(prev => 
      prev.map(artist => 
        artist.id === id 
          ? { ...artist, status: "approved", reviewedBy: "Admin" }
          : artist
      )
    );
  };

  const rejectArtist = (id: string) => {
    setPendingArtists(prev => 
      prev.map(artist => 
        artist.id === id 
          ? { ...artist, status: "rejected", reviewedBy: "Admin" }
          : artist
      )
    );
  };

  const resolveFlag = (id: string, action: "resolved" | "dismissed") => {
    setFlaggedContent(prev => 
      prev.map(content => 
        content.id === id 
          ? { ...content, status: action }
          : content
      )
    );
  };

  const getSeverityColor = (severity: FlaggedContent["severity"]) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge className="bg-yellow-600">Pending</Badge>;
      case "under_review": return <Badge className="bg-blue-600">Under Review</Badge>;
      case "approved": return <Badge className="bg-green-600">Approved</Badge>;
      case "rejected": return <Badge className="bg-red-600">Rejected</Badge>;
      case "resolved": return <Badge className="bg-green-600">Resolved</Badge>;
      case "dismissed": return <Badge className="bg-gray-600">Dismissed</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Platform monitoring and management</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Badge className="bg-red-600">
                <Shield className="h-3 w-3 mr-1" />
                Admin Access
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="verifications">
              Verifications
              {metrics.pendingVerifications > 0 && (
                <Badge className="ml-2 bg-red-600 text-xs">
                  {metrics.pendingVerifications}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="flagged">
              Flagged Content
              {metrics.flaggedContent > 0 && (
                <Badge className="ml-2 bg-orange-600 text-xs">
                  {metrics.flaggedContent}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Artists</p>
                      <p className="text-3xl font-bold text-gray-900">{metrics.totalArtists.toLocaleString()}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600">+{metrics.monthlyGrowth}%</span>
                    <span className="text-gray-600 ml-1">this month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Reviews</p>
                      <p className="text-3xl font-bold text-gray-900">{metrics.pendingVerifications}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-gray-600">Needs attention</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">{formatCurrency(metrics.totalRevenue)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600">+18.2%</span>
                    <span className="text-gray-600 ml-1">this month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Average Rating</p>
                      <p className="text-3xl font-bold text-gray-900">{metrics.averageRating}</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-gray-600">Platform quality</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Verifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingArtists.slice(0, 3).map((artist) => (
                      <div key={artist.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            {artist.avatar && <AvatarImage src={artist.avatar} />}
                            <AvatarFallback>{artist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{artist.name}</p>
                            <p className="text-xs text-gray-600">{artist.specialization}</p>
                          </div>
                        </div>
                        {getStatusBadge(artist.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Flagged Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {flaggedContent.slice(0, 3).map((content) => (
                      <div key={content.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{content.title}</p>
                          <p className="text-xs text-gray-600">{content.reason}</p>
                        </div>
                        <Badge className={getSeverityColor(content.severity)}>
                          {content.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Verifications Tab */}
          <TabsContent value="verifications" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Artist Verification Requests</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search artists..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingArtists.map((artist) => (
                    <div key={artist.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            {artist.avatar && <AvatarImage src={artist.avatar} />}
                            <AvatarFallback>{artist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-gray-900">{artist.name}</h3>
                            <p className="text-sm text-gray-600">{artist.email}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span>Specialization: {artist.specialization}</span>
                              <span>Experience: {artist.experience}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(artist.status)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => {}}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {}}>
                                <Camera className="h-4 w-4 mr-2" />
                                View Portfolio
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-gray-600">Documents</p>
                          <p className="font-medium">{artist.documents} uploaded</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-gray-600">Portfolio</p>
                          <p className="font-medium">{artist.portfolioImages} images</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-gray-600">Submitted</p>
                          <p className="font-medium">{formatTimeAgo(artist.submittedAt)}</p>
                        </div>
                      </div>

                      {artist.status === "pending" && (
                        <div className="mt-4 flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => approveArtist(artist.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => rejectArtist(artist.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flagged Content Tab */}
          <TabsContent value="flagged" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Flagged Content Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {flaggedContent.map((content) => (
                    <div key={content.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge className={getSeverityColor(content.severity)}>
                              {content.severity} priority
                            </Badge>
                            <Badge variant="outline">{content.type}</Badge>
                            {getStatusBadge(content.status)}
                          </div>
                          
                          <h3 className="font-medium text-gray-900 mb-2">{content.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">Artist: {content.artist}</p>
                          <p className="text-sm text-gray-600 mb-2">Reason: {content.reason}</p>
                          <p className="text-xs text-gray-500">
                            Reported by {content.reportedBy} • {formatTimeAgo(content.reportedAt)}
                          </p>
                        </div>

                        {content.thumbnail && (
                          <img
                            src={content.thumbnail}
                            alt="Content thumbnail"
                            className="w-20 h-20 object-cover rounded-lg ml-4"
                          />
                        )}
                      </div>

                      {content.status === "pending" && (
                        <div className="mt-4 flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => resolveFlag(content.id, "resolved")}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Remove Content
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => resolveFlag(content.id, "dismissed")}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Dismiss Report
                          </Button>
                          <Button size="sm" variant="outline">
                            <Ban className="h-4 w-4 mr-2" />
                            Suspend Artist
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Analysis by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pricingAnalysis.map((category) => (
                    <div key={category.category} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">{category.category}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={category.trend === "up" ? "bg-green-100 text-green-800" : 
                                          category.trend === "down" ? "bg-red-100 text-red-800" : 
                                          "bg-gray-100 text-gray-800"}>
                            {category.trend === "up" ? "↗ Trending Up" : 
                             category.trend === "down" ? "↘ Trending Down" : "→ Stable"}
                          </Badge>
                          <span className="text-sm text-gray-600">{category.totalProducts} products</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-600">Average Price</p>
                          <p className="text-xl font-semibold text-blue-900">
                            {formatCurrency(category.averagePrice)}
                          </p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-600">Median Price</p>
                          <p className="text-xl font-semibold text-green-900">
                            {formatCurrency(category.medianPrice)}
                          </p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <p className="text-sm text-purple-600">Min Price</p>
                          <p className="text-xl font-semibold text-purple-900">
                            {formatCurrency(category.priceRange.min)}
                          </p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <p className="text-sm text-orange-600">Max Price</p>
                          <p className="text-xl font-semibold text-orange-900">
                            {formatCurrency(category.priceRange.max)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quality Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Artist Satisfaction</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Customer Satisfaction</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Platform Reliability</span>
                      <span>99.8%</span>
                    </div>
                    <Progress value={99.8} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Quality</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Verified Artists</span>
                      <span>76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>High-Quality Photos</span>
                      <span>84%</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Complete Profiles</span>
                      <span>91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
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
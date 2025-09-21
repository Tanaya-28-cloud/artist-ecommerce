import { useState } from "react";
import { 
  BarChart3, 
  Package, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Plus, 
  Eye, 
  Edit, 
  MessageSquare,
  Star,
  Calendar,
  Upload,
  Settings
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const artistStats = {
  totalProducts: 127,
  totalSales: 890,
  totalRevenue: "₹2,45,670",
  monthlyGrowth: 15.2,
  followers: 2840,
  rating: 4.9,
  profileViews: 12500,
  messagesReceived: 45
};

const recentProducts = [
  {
    id: 1,
    name: "Handwoven Silk Saree",
    image: "https://images.unsplash.com/photo-1611574557351-00889b20a36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZXh0aWxlJTIwd2VhdmluZ3xlbnwxfHx8fDE3NTgyODk1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "₹15,999",
    status: "Active",
    views: 234,
    likes: 89,
    orders: 12
  },
  {
    id: 2,
    name: "Copper Water Pot",
    image: "https://images.unsplash.com/photo-1580467469359-91a73a6e92ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoYW5kaWNyYWZ0cyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU4Mjg5NTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "₹2,499",
    status: "Active",
    views: 456,
    likes: 123,
    orders: 8
  },
  {
    id: 3,
    name: "Traditional Kundan Necklace",
    image: "https://images.unsplash.com/photo-1705081803821-5562179d8247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBqZXdlbHJ5JTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU4MjY3ODk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "₹8,999",
    status: "Draft",
    views: 0,
    likes: 0,
    orders: 0
  }
];

const recentOrders = [
  {
    id: "ORD001",
    product: "Handwoven Silk Saree",
    customer: "Priya Sharma",
    amount: "₹15,999",
    status: "Shipped",
    date: "2024-01-15"
  },
  {
    id: "ORD002",
    product: "Copper Water Pot",
    customer: "Rajesh Kumar",
    amount: "₹2,499",
    status: "Processing",
    date: "2024-01-14"
  },
  {
    id: "ORD003",
    product: "Traditional Kundan Necklace",
    customer: "Anita Gupta",
    amount: "₹8,999",
    status: "Delivered",
    date: "2024-01-13"
  }
];

const insights = [
  {
    title: "Trending Categories",
    description: "Jewelry & Accessories are seeing 25% more interest this month",
    icon: TrendingUp,
    color: "text-green-600"
  },
  {
    title: "Seasonal Demand",
    description: "Wedding season is approaching - traditional items will see higher demand",
    icon: Calendar,
    color: "text-orange-600"
  },
  {
    title: "Pricing Optimization",
    description: "Your copper items are priced 15% below market average",
    icon: DollarSign,
    color: "text-blue-600"
  }
];

export function ArtistDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl text-gray-900">Artist Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, Meera Devi</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages ({artistStats.messagesReceived})
              </Button>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Products</p>
                      <p className="text-2xl text-gray-900">{artistStats.totalProducts}</p>
                    </div>
                    <Package className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Sales</p>
                      <p className="text-2xl text-gray-900">{artistStats.totalSales}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-2xl text-gray-900">{artistStats.totalRevenue}</p>
                      <p className="text-sm text-green-600 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{artistStats.monthlyGrowth}%
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Followers</p>
                      <p className="text-2xl text-gray-900">{artistStats.followers}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{artistStats.rating}</span>
                      </div>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentProducts.slice(0, 3).map((product) => (
                      <div key={product.id} className="flex items-center gap-4">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{product.price}</span>
                            <Badge variant={product.status === "Active" ? "default" : "secondary"}>
                              {product.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <div>{product.views} views</div>
                          <div>{product.orders} orders</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">#{order.id}</h4>
                          <p className="text-sm text-gray-600">{order.product}</p>
                          <p className="text-xs text-gray-500">{order.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{order.amount}</p>
                          <Badge variant={
                            order.status === "Delivered" ? "default" :
                            order.status === "Shipped" ? "secondary" : "outline"
                          }>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  AI Market Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {insights.map((insight, index) => {
                    const IconComponent = insight.icon;
                    return (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start gap-3">
                          <IconComponent className={`h-5 w-5 mt-0.5 ${insight.color}`} />
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                            <p className="text-sm text-gray-600">{insight.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-gray-900">Your Products</h2>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className={`absolute top-2 right-2 ${
                      product.status === "Active" ? "bg-green-600" : "bg-gray-600"
                    }`}>
                      {product.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-lg text-orange-600 mb-3">{product.price}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {product.views}
                      </span>
                      <span>{product.likes} likes</span>
                      <span>{product.orders} orders</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">Order #{order.id}</h4>
                        <Badge variant={
                          order.status === "Delivered" ? "default" :
                          order.status === "Shipped" ? "secondary" : "outline"
                        }>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Product:</span>
                          <p>{order.product}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Customer:</span>
                          <p>{order.customer}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Amount:</span>
                          <p className="font-medium">{order.amount}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Date:</span>
                          <p>{order.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Profile Views</span>
                        <span className="text-sm text-gray-900">{artistStats.profileViews}</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Product Views</span>
                        <span className="text-sm text-gray-900">8,450</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Conversion Rate</span>
                        <span className="text-sm text-gray-900">12.5%</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <span className="text-gray-900">Textiles & Fabrics</span>
                      <span className="text-orange-600">45%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-900">Jewelry</span>
                      <span className="text-blue-600">28%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-900">Pottery</span>
                      <span className="text-green-600">18%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-gray-900">Others</span>
                      <span className="text-purple-600">9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Artist Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg text-gray-900 mb-2">Profile Settings</h3>
                  <p className="text-gray-600 mb-4">
                    Update your artist profile, bio, and store settings
                  </p>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
import { MessageCircle, Users, Video, Zap, Upload, Bot } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const features = [
  {
    icon: MessageCircle,
    title: "Artist Community Channels",
    description: "Join broadcast channels where artisans share their craft journey, techniques, and daily work.",
    color: "bg-blue-100 text-blue-700",
    stats: "500+ active channels"
  },
  {
    icon: Video,
    title: "Live Craft Sessions",
    description: "Watch artists create their masterpieces in real-time and ask questions directly.",
    color: "bg-purple-100 text-purple-700",
    stats: "Daily live sessions"
  },
  {
    icon: Users,
    title: "Direct Artist Chat",
    description: "Message artists directly about custom orders, techniques, or their craft stories.",
    color: "bg-green-100 text-green-700",
    stats: "1-on-1 conversations"
  }
];

const aiFeatures = [
  {
    icon: Bot,
    title: "AI Product Assistant",
    description: "Upload photos of your crafts and get smart categorization, pricing suggestions, and listing optimization.",
    benefits: ["Auto-categorization", "Smart pricing", "SEO optimization"]
  },
  {
    icon: Upload,
    title: "Smart Upload Wizard",
    description: "Our AI guides you through uploading products with automatic quality checks and improvement suggestions.",
    benefits: ["Quality assessment", "Image enhancement", "Description generation"]
  },
  {
    icon: Zap,
    title: "Market Insights",
    description: "Get AI-powered insights about trending crafts, seasonal demands, and pricing strategies.",
    benefits: ["Trend analysis", "Demand forecasting", "Competition insights"]
  }
];

export function CommunityFeatures() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Community Features */}
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-900 mb-4">Connect & Learn Together</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bridge the gap between artists and customers through our interactive community platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-full ${feature.color} mb-4`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-3">{feature.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {feature.stats}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Features */}
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-900 mb-4">AI-Powered Tools for Artists</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leverage artificial intelligence to easily showcase your crafts and reach more customers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {aiFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 text-orange-700 p-2 rounded-lg">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-orange-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl text-gray-900 mb-4">Ready to Join Our Community?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're an artist looking to showcase your work or a customer seeking authentic crafts, 
            our platform brings you together in meaningful ways.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              Start Selling Your Art
            </Button>
            <Button size="lg" variant="outline">
              Explore Community
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
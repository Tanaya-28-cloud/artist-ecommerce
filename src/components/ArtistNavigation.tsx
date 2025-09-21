import { useState } from "react";
import { 
  LayoutDashboard, 
  Upload, 
  Users, 
  MessageSquare, 
  LogOut, 
  User, 
  Settings,
  Shield,
  DollarSign,
  Video,
  Phone,
  Award,
  Wand2,
  Eye,
  Globe
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface ArtistNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
  artistData: {
    name: string;
    artCategories: string[];
    avatar?: string;
  };
}

export function ArtistNavigation({ currentView, onViewChange, onLogout, artistData }: ArtistNavigationProps) {
  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Overview & Analytics"
    },
    {
      id: "upload",
      label: "Upload Product",
      icon: Upload,
      description: "Add New Craft"
    },
    {
      id: "community",
      label: "Artist Community",
      icon: Users,
      description: "Connect & Learn"
    },
    {
      id: "verification",
      label: "Get Verified",
      icon: Shield,
      description: "Artist Verification"
    },
    {
      id: "pricing",
      label: "Price Analyzer",
      icon: DollarSign,
      description: "AI-Powered Pricing"
    },
    {
      id: "reels",
      label: "Artist Reels",
      icon: Video,
      description: "Share Your Process"
    },
    {
      id: "contact",
      label: "Contact Settings",
      icon: Phone,
      description: "Manage Contact Info"
    },
    {
      id: "gamification",
      label: "Achievements",
      icon: Award,
      description: "Badges & Progress"
    },
    {
      id: "photo-enhancer",
      label: "Photo Enhancer",
      icon: Wand2,
      description: "AI Photo Enhancement"
    },
    {
      id: "ar-preview",
      label: "AR Preview",
      icon: Eye,
      description: "3D Product Preview"
    },
    {
      id: "global-buyer",
      label: "Global Sales",
      icon: Globe,
      description: "International Market"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl text-gray-900">Kalakaari Artist Portal</h1>
              <Badge className="bg-orange-600">कलाकार</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages (5)
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Artist Profile Section */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={artistData.avatar} />
              <AvatarFallback className="text-xl">
                {artistData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl text-gray-900 mb-2">Welcome back, {artistData.name}!</h2>
              <p className="text-gray-600 mb-3">Ready to showcase your beautiful crafts today?</p>
              <div className="flex flex-wrap gap-2">
                {artistData.artCategories.map((category, index) => (
                  <Badge key={index} variant="outline" className="border-orange-200 text-orange-700">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <Button variant="outline">
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <div
                key={item.id}
                className={`cursor-pointer transition-all duration-300 transform hover:-translate-y-2 ${
                  isActive ? 'scale-105' : ''
                }`}
                onClick={() => onViewChange(item.id)}
              >
                <div className={`bg-white rounded-xl p-8 text-center shadow-lg border-2 ${
                  isActive 
                    ? 'border-orange-600 bg-orange-50' 
                    : 'border-gray-200 hover:border-orange-300 hover:shadow-xl'
                }`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    isActive
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-100 text-orange-600'
                  }`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  
                  <h3 className={`text-xl mb-2 ${
                    isActive ? 'text-orange-900' : 'text-gray-900'
                  }`}>
                    {item.label}
                  </h3>
                  
                  <p className={`text-sm mb-6 ${
                    isActive ? 'text-orange-700' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>
                  
                  <Button 
                    className={`w-full ${
                      isActive
                        ? 'bg-orange-600 hover:bg-orange-700 text-white'
                        : 'bg-white border border-orange-600 text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    {isActive ? 'Currently Active' : `Go to ${item.label}`}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" size="sm" className="flex-col h-20">
              <Upload className="h-5 w-5 mb-1" />
              Quick Upload
            </Button>
            <Button variant="outline" size="sm" className="flex-col h-20">
              <MessageSquare className="h-5 w-5 mb-1" />
              Live Chat
            </Button>
            <Button variant="outline" size="sm" className="flex-col h-20">
              <Users className="h-5 w-5 mb-1" />
              Join Workshop
            </Button>
            <Button variant="outline" size="sm" className="flex-col h-20">
              <LayoutDashboard className="h-5 w-5 mb-1" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-6">
          <h3 className="text-lg text-gray-900 mb-3">💡 Daily Tip</h3>
          <p className="text-gray-700">
            <strong>Photography Tip:</strong> Natural lighting works best for showcasing your crafts. 
            Try taking photos near a window during golden hour (1-2 hours before sunset) for the most beautiful results!
          </p>
        </div>
      </div>
    </div>
  );
}
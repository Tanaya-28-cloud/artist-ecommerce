import { useState } from "react";
import { ArrowRight, User, Palette, Shield, Star, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";

interface AuthFlowProps {
  onAuthComplete: (userType: "customer" | "artist", userData: any) => void;
}

type AuthStep = "welcome" | "register" | "artist-details" | "verification";

const artCategories = [
  "Pottery & Ceramics",
  "Textiles & Fabrics", 
  "Jewelry & Accessories",
  "Paintings & Art",
  "Wood & Bamboo Crafts",
  "Metal Crafts",
  "Traditional Toys",
  "Home Decor"
];

export function AuthFlow({ onAuthComplete }: AuthFlowProps) {
  const [step, setStep] = useState<AuthStep>("welcome");
  const [userType, setUserType] = useState<"customer" | "artist" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    // Artist specific fields
    location: "",
    artCategories: [] as string[],
    experience: "",
    bio: "",
    craftDescription: ""
  });

  const handleUserTypeSelection = (type: "customer" | "artist") => {
    setUserType(type);
    setStep("register");
  };

  const handleRegistration = () => {
    if (userType === "artist") {
      setStep("artist-details");
    } else {
      setStep("verification");
    }
  };

  const handleArtistDetails = () => {
    setStep("verification");
  };

  const handleVerification = () => {
    onAuthComplete(userType!, formData);
  };

  const toggleArtCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      artCategories: prev.artCategories.includes(category)
        ? prev.artCategories.filter(c => c !== category)
        : [...prev.artCategories, category]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        {/* Welcome Step */}
        {step === "welcome" && (
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-4xl text-gray-900 mb-4">
                कलाकारी Artisan Connect में स्वागत है
              </h1>
              <p className="text-xl text-gray-600">
                Welcome to Kalakaari Artisan Connect
              </p>
              <p className="text-gray-600 mt-2">
                Connecting authentic Indian artists with customers worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Customer Card */}
              <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" 
                    onClick={() => handleUserTypeSelection("customer")}>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">I'm a Customer</CardTitle>
                  <p className="text-gray-600">Discover authentic handcrafted treasures</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-orange-500" />
                      <span className="text-gray-700">Browse authentic handmade products</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-orange-500" />
                      <span className="text-gray-700">Connect directly with artists</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-orange-500" />
                      <span className="text-gray-700">Support traditional Indian crafts</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-orange-500" />
                      <span className="text-gray-700">Join our cultural community</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Join as Customer <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Artist Card */}
              <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" 
                    onClick={() => handleUserTypeSelection("artist")}>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Palette className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">I'm an Artist</CardTitle>
                  <p className="text-gray-600">Share your craft with the world</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-orange-500" />
                      <span className="text-gray-700">AI-powered product listing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-orange-500" />
                      <span className="text-gray-700">Direct customer communication</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-orange-500" />
                      <span className="text-gray-700">Community & mentorship</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-orange-500" />
                      <span className="text-gray-700">Global market access</span>
                    </div>
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Join as Artist <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Already have an account? <span className="text-orange-600 cursor-pointer hover:underline">Sign in here</span>
              </p>
            </div>
          </div>
        )}

        {/* Registration Step */}
        {step === "register" && (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {userType === "customer" ? "Create Customer Account" : "Create Artist Profile"}
              </CardTitle>
              <p className="text-gray-600">
                {userType === "customer" ? "Start discovering authentic crafts" : "Begin your artisan journey"}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Create a strong password"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep("welcome")} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleRegistration} className="flex-1 bg-orange-600 hover:bg-orange-700">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Artist Details Step */}
        {step === "artist-details" && userType === "artist" && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Tell us about your craft</CardTitle>
              <p className="text-gray-600">Help us showcase your artistry to the right audience</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location (City, State)</Label>
                  <Input 
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Jaipur, Rajasthan"
                  />
                </div>
                
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input 
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="e.g., 5 years"
                  />
                </div>
              </div>

              <div>
                <Label>Art Categories (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {artCategories.map((category) => (
                    <Badge
                      key={category}
                      variant={formData.artCategories.includes(category) ? "default" : "outline"}
                      className="cursor-pointer text-center justify-center py-2"
                      onClick={() => toggleArtCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Artist Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself, your artistic journey, and what inspires your work..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="craftDescription">Describe Your Craft</Label>
                <Textarea
                  id="craftDescription"
                  value={formData.craftDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, craftDescription: e.target.value }))}
                  placeholder="Describe the techniques, materials, and traditions you use in your craft..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep("register")} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleArtistDetails} className="flex-1 bg-orange-600 hover:bg-orange-700">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Verification Step */}
        {step === "verification" && (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Verify Your Account</CardTitle>
              <p className="text-gray-600">
                We've sent a verification code to {formData.email}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="verification">Verification Code</Label>
                <Input 
                  id="verification"
                  placeholder="Enter 6-digit code"
                  className="text-center text-lg tracking-widest"
                />
              </div>

              <div className="text-center text-sm text-gray-600">
                Didn't receive the code? <span className="text-orange-600 cursor-pointer hover:underline">Resend</span>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep(userType === "artist" ? "artist-details" : "register")} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleVerification} className="flex-1 bg-orange-600 hover:bg-orange-700">
                  Verify & Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
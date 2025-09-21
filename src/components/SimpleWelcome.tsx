import { ArrowRight, User, Palette } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface SimpleWelcomeProps {
  onUserTypeSelect: (type: "customer" | "artist") => void;
}

export function SimpleWelcome({ onUserTypeSelect }: SimpleWelcomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-4xl text-gray-900 mb-4">
            कलाकारी Artisan Connect
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Connecting authentic Indian artists with customers worldwide
          </p>
          <p className="text-gray-600">
            Choose how you'd like to join our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Customer Card */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" 
            onClick={() => onUserTypeSelect("customer")}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">I'm a Customer</CardTitle>
              <p className="text-gray-600">Discover authentic handcrafted treasures</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-left mb-6">
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Browse authentic handmade products
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Connect directly with artists
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Support traditional Indian crafts
                </li>
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Join as Customer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Artist Card */}
          <Card 
            className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" 
            onClick={() => onUserTypeSelect("artist")}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">I'm an Artist</CardTitle>
              <p className="text-gray-600">Share your craft with the world</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-left mb-6">
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  AI-powered product listing
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Direct customer communication
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Community & mentorship
                </li>
              </ul>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Join as Artist <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Already have an account? <span className="text-orange-600 cursor-pointer hover:underline">Sign in here</span>
          </p>
        </div>
      </div>
    </div>
  );
}
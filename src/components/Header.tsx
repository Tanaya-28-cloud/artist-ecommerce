import { Search, ShoppingCart, User, MessageCircle, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NotificationSystem } from "./NotificationSystem";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-orange-600 font-bold text-xl">कलाकारी</h1>
            <span className="text-sm text-gray-600 ml-2">Artisan Connect</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for authentic crafts, artists, or categories..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Sell Your Art
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Community
            </Button>
            <NotificationSystem />
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
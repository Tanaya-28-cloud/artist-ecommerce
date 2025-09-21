import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <h3 className="text-orange-400 text-xl">कलाकारी</h3>
              <span className="text-sm text-gray-400 ml-2">Artisan Connect</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Connecting authentic Indian artists with customers worldwide. 
              Preserving traditions, empowering communities.
            </p>
            <div className="flex space-x-3">
              <Button size="sm" variant="ghost" className="p-2 text-gray-400 hover:text-white">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="p-2 text-gray-400 hover:text-white">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="p-2 text-gray-400 hover:text-white">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="p-2 text-gray-400 hover:text-white">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Artist Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Quality Promise</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Pottery & Ceramics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Textiles & Fabrics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Jewelry & Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Paintings & Art</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Wood & Bamboo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Home Decor</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-white mb-4">Stay Connected</h4>
            <div className="space-y-3 text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@kalakaari.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-400 mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 text-sm"
                />
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2024 Kalakaari Artisan Connect. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
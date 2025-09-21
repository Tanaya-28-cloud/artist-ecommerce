import { useState, useEffect } from "react";
import { 
  Globe, 
  Calculator, 
  Truck, 
  CreditCard, 
  MapPin,
  Package,
  Clock,
  Shield,
  Info,
  ArrowRight,
  Plane,
  DollarSign,
  Euro,
  PoundSterling
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";

interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  flag: string;
}

interface Country {
  code: string;
  name: string;
  flag: string;
  shippingZone: "domestic" | "south_asia" | "asia" | "europe" | "americas" | "oceania" | "africa";
  customs: {
    dutyRate: number;
    exemptionLimit: number;
    processingTime: string;
  };
}

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  estimatedDays: { min: number; max: number };
  price: number;
  trackingIncluded: boolean;
  insuranceIncluded: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  weight: number;
  dimensions: { length: number; width: number; height: number };
  category: string;
  artist: string;
  quantity: number;
}

const currencies: Currency[] = [
  { code: "INR", name: "Indian Rupee", symbol: "₹", rate: 1, flag: "🇮🇳" },
  { code: "USD", name: "US Dollar", symbol: "$", rate: 0.012, flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.011, flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", rate: 0.0095, flag: "🇬🇧" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 0.016, flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", rate: 0.018, flag: "🇦🇺" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", rate: 0.016, flag: "🇸🇬" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", rate: 1.8, flag: "🇯🇵" }
];

const countries: Country[] = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    shippingZone: "americas",
    customs: { dutyRate: 0, exemptionLimit: 800, processingTime: "2-3 days" }
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    shippingZone: "europe",
    customs: { dutyRate: 0, exemptionLimit: 135, processingTime: "1-2 days" }
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    shippingZone: "europe",
    customs: { dutyRate: 19, exemptionLimit: 22, processingTime: "1-2 days" }
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    shippingZone: "oceania",
    customs: { dutyRate: 10, exemptionLimit: 1000, processingTime: "2-4 days" }
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    shippingZone: "americas",
    customs: { dutyRate: 0, exemptionLimit: 20, processingTime: "1-3 days" }
  },
  {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    shippingZone: "asia",
    customs: { dutyRate: 7, exemptionLimit: 400, processingTime: "1-2 days" }
  }
];

export function GlobalBuyerMode() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [postalCode, setPostalCode] = useState("");
  const [showCalculator, setShowCalculator] = useState(false);

  const [cartItems] = useState<Product[]>([
    {
      id: "1",
      name: "Traditional Rajasthani Pottery Vase",
      price: 2500,
      weight: 1.2,
      dimensions: { length: 20, width: 20, height: 35 },
      category: "Pottery",
      artist: "Priya Sharma",
      quantity: 1
    },
    {
      id: "2",
      name: "Handwoven Silk Scarf",
      price: 1800,
      weight: 0.15,
      dimensions: { length: 200, width: 80, height: 1 },
      category: "Textiles",
      artist: "Meera Devi",
      quantity: 2
    }
  ]);

  const getCurrentCurrency = () => currencies.find(c => c.code === selectedCurrency) || currencies[1];
  const getCurrentCountry = () => countries.find(c => c.code === selectedCountry) || countries[0];

  const convertPrice = (priceInINR: number) => {
    const currency = getCurrentCurrency();
    return Math.round(priceInINR * currency.rate * 100) / 100;
  };

  const formatPrice = (priceInINR: number) => {
    const currency = getCurrentCurrency();
    const convertedPrice = convertPrice(priceInINR);
    return `${currency.symbol}${convertedPrice.toLocaleString()}`;
  };

  const getShippingOptions = (): ShippingOption[] => {
    const country = getCurrentCountry();
    const totalWeight = cartItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
    
    const baseRates = {
      domestic: { standard: 150, express: 300, premium: 500 },
      south_asia: { standard: 800, express: 1500, premium: 2500 },
      asia: { standard: 1200, express: 2200, premium: 3500 },
      europe: { standard: 1800, express: 3200, premium: 5000 },
      americas: { standard: 2000, express: 3500, premium: 5500 },
      oceania: { standard: 2200, express: 3800, premium: 6000 },
      africa: { standard: 2500, express: 4200, premium: 6500 }
    };

    const rates = baseRates[country.shippingZone];
    const weightMultiplier = Math.max(1, Math.ceil(totalWeight));

    return [
      {
        id: "standard",
        name: "Standard International",
        description: "Economy shipping with basic tracking",
        estimatedDays: { min: 12, max: 21 },
        price: rates.standard * weightMultiplier,
        trackingIncluded: true,
        insuranceIncluded: false
      },
      {
        id: "express",
        name: "Express International",
        description: "Faster delivery with premium tracking",
        estimatedDays: { min: 7, max: 12 },
        price: rates.express * weightMultiplier,
        trackingIncluded: true,
        insuranceIncluded: true
      },
      {
        id: "premium",
        name: "DHL Express",
        description: "Premium service with signature delivery",
        estimatedDays: { min: 3, max: 7 },
        price: rates.premium * weightMultiplier,
        trackingIncluded: true,
        insuranceIncluded: true
      }
    ];
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateCustomsDuty = () => {
    const country = getCurrentCountry();
    const subtotal = calculateSubtotal();
    const convertedSubtotal = convertPrice(subtotal);
    
    if (convertedSubtotal <= country.customs.exemptionLimit) {
      return 0;
    }
    
    return Math.round(subtotal * (country.customs.dutyRate / 100));
  };

  const calculateInsurance = (shippingOption: ShippingOption) => {
    if (!shippingOption.insuranceIncluded) return 0;
    return Math.round(calculateSubtotal() * 0.01); // 1% insurance
  };

  const calculateTotal = (shippingOption: ShippingOption) => {
    return calculateSubtotal() + shippingOption.price + calculateCustomsDuty() + calculateInsurance(shippingOption);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl text-gray-900">International Checkout</h1>
              <p className="text-sm text-gray-600">Shop authentic Indian crafts worldwide</p>
            </div>
            <Badge className="bg-blue-600">
              <Globe className="h-3 w-3 mr-1" />
              Global Shipping
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Location & Currency Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Shipping Destination
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <div className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            <div className="flex items-center gap-2">
                              <span>{currency.flag}</span>
                              <span>{currency.symbol} {currency.code}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="postal">Postal/ZIP Code (Optional)</Label>
                  <Input
                    id="postal"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Enter postal code for precise shipping rates"
                  />
                </div>

                {/* Exchange Rate Info */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-blue-900">
                    <strong>Exchange Rate:</strong> 1 INR = {getCurrentCurrency().rate} {getCurrentCurrency().code}
                  </div>
                  <div className="text-xs text-blue-700 mt-1">
                    Rates updated daily • Includes bank conversion fees
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cart Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">by {item.artist}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Qty: {item.quantity}</span>
                            <span>Weight: {item.weight * item.quantity}kg</span>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-orange-600">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            <div className="text-xs text-gray-500">
                              ₹{(item.price * item.quantity).toLocaleString()} INR
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-green-600" />
                  Shipping Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getShippingOptions().map((option) => (
                    <div key={option.id} className="border rounded-lg p-4 hover:border-orange-300 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <input type="radio" name="shipping" id={option.id} defaultChecked={option.id === "express"} />
                          <label htmlFor={option.id} className="font-medium cursor-pointer">
                            {option.name}
                          </label>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">
                            {formatPrice(option.price)}
                          </div>
                          <div className="text-xs text-gray-500">
                            ₹{option.price.toLocaleString()} INR
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {option.estimatedDays.min}-{option.estimatedDays.max} days
                          </span>
                          {option.trackingIncluded && (
                            <Badge variant="outline" className="text-xs">Tracking</Badge>
                          )}
                          {option.insuranceIncluded && (
                            <Badge variant="outline" className="text-xs">Insurance</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-yellow-50 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">Delivery times are estimates</p>
                      <p>Actual delivery may vary due to customs processing and local postal services.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customs Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  Customs & Duties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Duty Rate</p>
                      <p className="font-medium">{getCurrentCountry().customs.dutyRate}%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Exemption Limit</p>
                      <p className="font-medium">
                        {getCurrentCurrency().symbol}{getCurrentCountry().customs.exemptionLimit}
                      </p>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Important Notice</h4>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Import duties are calculated based on your country's regulations</li>
                      <li>• Additional fees may apply for customs processing</li>
                      <li>• Delivery may be delayed during customs clearance</li>
                      <li>• Some items may require import permits</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <div className="text-right">
                      <div>{formatPrice(calculateSubtotal())}</div>
                      <div className="text-xs text-gray-500">₹{calculateSubtotal().toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Shipping (Express)</span>
                    <div className="text-right">
                      <div>{formatPrice(getShippingOptions()[1].price)}</div>
                      <div className="text-xs text-gray-500">₹{getShippingOptions()[1].price.toLocaleString()}</div>
                    </div>
                  </div>

                  {calculateCustomsDuty() > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Customs Duty</span>
                      <div className="text-right">
                        <div>{formatPrice(calculateCustomsDuty())}</div>
                        <div className="text-xs text-gray-500">₹{calculateCustomsDuty().toLocaleString()}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span>Insurance</span>
                    <div className="text-right">
                      <div>{formatPrice(calculateInsurance(getShippingOptions()[1]))}</div>
                      <div className="text-xs text-gray-500">₹{calculateInsurance(getShippingOptions()[1]).toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <div className="text-right">
                    <div className="text-orange-600">{formatPrice(calculateTotal(getShippingOptions()[1]))}</div>
                    <div className="text-sm text-gray-500 font-normal">
                      ₹{calculateTotal(getShippingOptions()[1]).toLocaleString()} INR
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Payment
                </Button>

                <div className="text-xs text-gray-600 text-center space-y-1">
                  <p>Secure international payment processing</p>
                  <p>All prices include applicable fees</p>
                </div>
              </CardContent>
            </Card>

            {/* Cost Calculator */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Shipping Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    Estimated delivery to {getCurrentCountry().name}:
                  </div>
                  <div className="space-y-2">
                    {getShippingOptions().map((option) => (
                      <div key={option.id} className="flex justify-between text-sm">
                        <span>{option.name}</span>
                        <span>{formatPrice(option.price)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Rates based on total weight: {cartItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0)}kg
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>International Support</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• 24/7 customer support in English</p>
                <p>• Dedicated international shipping team</p>
                <p>• Customs documentation assistance</p>
                <p>• Package tracking & insurance</p>
                <p>• 30-day return policy</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
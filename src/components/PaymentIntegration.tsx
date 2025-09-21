import { useState } from "react";
import { 
  CreditCard, 
  Smartphone, 
  Wallet, 
  Shield, 
  CheckCircle, 
  Clock,
  ArrowLeft,
  Lock,
  Globe,
  IndianRupee,
  DollarSign,
  Euro,
  Banknote
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  artist: string;
  image: string;
  quantity: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  fees?: string;
  processingTime: string;
  available: boolean;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "razorpay",
    name: "Razorpay",
    icon: CreditCard,
    description: "Credit/Debit Cards, UPI, Net Banking",
    fees: "2.4% + ₹3",
    processingTime: "Instant",
    available: true
  },
  {
    id: "upi",
    name: "UPI",
    icon: Smartphone,
    description: "Google Pay, PhonePe, Paytm, BHIM",
    fees: "Free",
    processingTime: "Instant",
    available: true
  },
  {
    id: "wallet",
    name: "Digital Wallets",
    icon: Wallet,
    description: "Paytm, Amazon Pay, Airtel Money",
    fees: "1.2%",
    processingTime: "Instant",
    available: true
  },
  {
    id: "netbanking",
    name: "Net Banking",
    icon: Banknote,
    description: "All major Indian banks",
    fees: "₹15 per transaction",
    processingTime: "5-10 minutes",
    available: true
  },
  {
    id: "international",
    name: "International Cards",
    icon: Globe,
    description: "Visa, Mastercard, Amex (Global)",
    fees: "3.5% + currency conversion",
    processingTime: "Instant",
    available: true
  }
];

const currencies = [
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 1 },
  { code: "USD", symbol: "$", name: "US Dollar", rate: 0.012 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.011 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.0095 }
];

export function PaymentIntegration() {
  const [currentStep, setCurrentStep] = useState<"cart" | "payment" | "processing" | "success">("cart");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });

  const [cartItems] = useState<Product[]>([
    {
      id: "1",
      name: "Traditional Rajasthani Pottery Vase",
      price: 2500,
      currency: "INR",
      artist: "Priya Sharma",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwdmFzZXxlbnwxfHx8fDE3NTgyOTA0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      quantity: 1
    },
    {
      id: "2",
      name: "Handwoven Silk Scarf",
      price: 1800,
      currency: "INR",
      artist: "Meera Devi",
      image: "https://images.unsplash.com/photo-1611574557351-00889b20a36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhzaWxrJTIwc2NhcmZ8ZW58MXx8fHwxNzU4MjkwNDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      quantity: 2
    }
  ]);

  const getCurrentCurrency = () => currencies.find(c => c.code === selectedCurrency) || currencies[0];
  
  const convertPrice = (price: number) => {
    const currency = getCurrentCurrency();
    return Math.round(price * currency.rate * 100) / 100;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    return selectedCurrency === "INR" ? 150 : 5; // ₹150 or $5 equivalent
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return Math.round(subtotal * 0.18); // 18% GST for India, simplified for demo
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const formatPrice = (price: number) => {
    const currency = getCurrentCurrency();
    return `${currency.symbol}${convertPrice(price).toLocaleString()}`;
  };

  const processPayment = async () => {
    setIsProcessing(true);
    setCurrentStep("processing");

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    setCurrentStep("success");
    setIsProcessing(false);
  };

  const renderCartStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Shopping Cart</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">by {item.artist}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-semibold text-orange-600">
                      {formatPrice(item.price)}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Currency Selector */}
            <div>
              <Label>Currency</Label>
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span>{currency.symbol}</span>
                        <span>{currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(calculateSubtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatPrice(calculateShipping())}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (GST)</span>
                <span>{formatPrice(calculateTax())}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-orange-600">{formatPrice(calculateTotal())}</span>
              </div>
            </div>

            <Button 
              onClick={() => setCurrentStep("payment")}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              Proceed to Payment
            </Button>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Secure checkout with SSL encryption</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Payment Methods */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setCurrentStep("cart")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle>Payment Method</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value={method.id} id={method.id} disabled={!method.available} />
                      <div className="flex-1">
                        <label htmlFor={method.id} className="cursor-pointer">
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-5 w-5 text-gray-600" />
                            <div>
                              <div className="font-medium">{method.name}</div>
                              <div className="text-sm text-gray-600">{method.description}</div>
                              <div className="flex gap-4 text-xs text-gray-500 mt-1">
                                {method.fees && <span>Fee: {method.fees}</span>}
                                <span>Processing: {method.processingTime}</span>
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                      {method.available ? (
                        <Badge className="bg-green-100 text-green-800">Available</Badge>
                      ) : (
                        <Badge variant="outline">Coming Soon</Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </RadioGroup>

            {/* Card Details Form */}
            {(selectedPaymentMethod === "razorpay" || selectedPaymentMethod === "international") && (
              <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                <h3 className="font-medium mb-4">Card Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-blue-900 mb-2">
                <Lock className="h-4 w-4" />
                <span className="font-medium">Secure Payment</span>
              </div>
              <div className="text-sm text-blue-800">
                <p>• All transactions are encrypted with 256-bit SSL</p>
                <p>• We never store your payment information</p>
                <p>• Payments are processed by certified payment partners</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(calculateSubtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatPrice(calculateShipping())}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(calculateTax())}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-orange-600">{formatPrice(calculateTotal())}</span>
              </div>
            </div>

            <Button 
              onClick={processPayment}
              disabled={!selectedPaymentMethod}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              <Lock className="h-4 w-4 mr-2" />
              Pay {formatPrice(calculateTotal())}
            </Button>

            <div className="text-xs text-gray-600 text-center">
              By proceeding, you agree to our Terms of Service and Privacy Policy
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProcessingStep = () => (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Processing Payment</h2>
        <p className="text-gray-600 mb-4">Please wait while we process your payment securely...</p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>• Verifying payment details</p>
          <p>• Contacting payment provider</p>
          <p>• Confirming transaction</p>
        </div>
      </CardContent>
    </Card>
  );

  const renderSuccessStep = () => (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-green-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">Your order has been confirmed and will be processed shortly.</p>
        
        <div className="bg-green-50 p-4 rounded-lg mb-6 text-left">
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium">#KAL-2024-001234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Paid:</span>
              <span className="font-medium text-green-600">{formatPrice(calculateTotal())}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium">
                {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Button className="w-full bg-orange-600 hover:bg-orange-700">
            Track Your Order
          </Button>
          <Button variant="outline" className="w-full">
            Continue Shopping
          </Button>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p>You will receive an email confirmation shortly.</p>
          <p>Expected delivery: 5-7 business days</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl text-gray-900">
                {currentStep === "cart" && "Shopping Cart"}
                {currentStep === "payment" && "Payment"}
                {currentStep === "processing" && "Processing"}
                {currentStep === "success" && "Order Complete"}
              </h1>
              <p className="text-sm text-gray-600">Secure checkout powered by Razorpay</p>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center gap-2">
              {["cart", "payment", "processing", "success"].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === step 
                      ? "bg-orange-600 text-white" 
                      : index < ["cart", "payment", "processing", "success"].indexOf(currentStep)
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                    {index < ["cart", "payment", "processing", "success"].indexOf(currentStep) ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < 3 && (
                    <div className={`w-8 h-1 mx-2 ${
                      index < ["cart", "payment", "processing", "success"].indexOf(currentStep) 
                        ? "bg-green-600" 
                        : "bg-gray-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === "cart" && renderCartStep()}
        {currentStep === "payment" && renderPaymentStep()}
        {currentStep === "processing" && renderProcessingStep()}
        {currentStep === "success" && renderSuccessStep()}
      </div>
    </div>
  );
}
import { useState } from "react";
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Target, 
  AlertCircle, 
  Lightbulb,
  Calculator,
  Sparkles
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";

interface PriceAnalysis {
  suggestedPrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  marketData: {
    averagePrice: number;
    competitorCount: number;
    demandLevel: "High" | "Medium" | "Low";
  };
  factors: {
    category: string;
    materials: string[];
    size: string;
    complexity: string;
    experience: string;
  };
  recommendations: string[];
}

export function MarketPriceAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<PriceAnalysis | null>(null);
  const [productData, setProductData] = useState({
    category: "",
    materials: [] as string[],
    size: "",
    complexity: "",
    timeToMake: "",
    experience: "",
    customization: false
  });

  const categories = [
    "Pottery & Ceramics",
    "Textiles & Fabrics",
    "Jewelry & Accessories",
    "Paintings & Art",
    "Wood & Bamboo Crafts",
    "Metal Crafts",
    "Traditional Toys",
    "Home Decor"
  ];

  const materials = [
    "Clay", "Terracotta", "Ceramic", "Cotton", "Silk", "Wool", 
    "Gold", "Silver", "Brass", "Wood", "Bamboo", "Stone", 
    "Glass", "Leather", "Paper", "Fabric Paint", "Natural Dyes"
  ];

  const analyzePrice = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const basePrice = calculateBasePrice();
      const marketMultiplier = getMarketMultiplier();
      const suggestedPrice = Math.round(basePrice * marketMultiplier);
      
      setAnalysis({
        suggestedPrice,
        priceRange: {
          min: Math.round(suggestedPrice * 0.8),
          max: Math.round(suggestedPrice * 1.3)
        },
        marketData: {
          averagePrice: Math.round(suggestedPrice * 0.9),
          competitorCount: Math.floor(Math.random() * 50) + 10,
          demandLevel: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)] as "High" | "Medium" | "Low"
        },
        factors: {
          category: productData.category,
          materials: productData.materials,
          size: productData.size,
          complexity: productData.complexity,
          experience: productData.experience
        },
        recommendations: generateRecommendations()
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const calculateBasePrice = () => {
    let basePrice = 500; // Base price in INR
    
    // Category multiplier
    const categoryMultipliers: { [key: string]: number } = {
      "Pottery & Ceramics": 1.0,
      "Textiles & Fabrics": 1.2,
      "Jewelry & Accessories": 2.0,
      "Paintings & Art": 1.5,
      "Wood & Bamboo Crafts": 1.1,
      "Metal Crafts": 1.8,
      "Traditional Toys": 0.8,
      "Home Decor": 1.3
    };
    
    basePrice *= categoryMultipliers[productData.category] || 1.0;
    
    // Size multiplier
    const sizeMultipliers: { [key: string]: number } = {
      "Small": 0.8,
      "Medium": 1.0,
      "Large": 1.5,
      "Extra Large": 2.0
    };
    
    basePrice *= sizeMultipliers[productData.size] || 1.0;
    
    // Complexity multiplier
    const complexityMultipliers: { [key: string]: number } = {
      "Simple": 0.8,
      "Moderate": 1.0,
      "Complex": 1.5,
      "Very Complex": 2.0
    };
    
    basePrice *= complexityMultipliers[productData.complexity] || 1.0;
    
    // Experience multiplier
    const experienceMultipliers: { [key: string]: number } = {
      "Beginner": 0.7,
      "Intermediate": 1.0,
      "Expert": 1.3,
      "Master": 1.8
    };
    
    basePrice *= experienceMultipliers[productData.experience] || 1.0;
    
    return basePrice;
  };

  const getMarketMultiplier = () => {
    // Simulate market conditions
    return 0.9 + Math.random() * 0.4; // 0.9 to 1.3
  };

  const generateRecommendations = (): string[] => {
    const recommendations = [
      "Consider offering customization options to justify higher pricing",
      "Bundle with complementary items to increase average order value",
      "Highlight unique traditional techniques in your product description",
      "Offer multiple size variants to capture different price segments"
    ];
    
    if (productData.experience === "Master") {
      recommendations.push("Leverage your master craftsman status for premium pricing");
    }
    
    if (productData.materials.includes("Gold") || productData.materials.includes("Silver")) {
      recommendations.push("Factor in current metal prices for accurate cost calculation");
    }
    
    return recommendations;
  };

  const toggleMaterial = (material: string) => {
    setProductData(prev => ({
      ...prev,
      materials: prev.materials.includes(material)
        ? prev.materials.filter(m => m !== material)
        : [...prev.materials, material]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl text-gray-900">AI Price Analyzer</h1>
              <p className="text-sm text-gray-600">Get smart pricing suggestions for your crafts</p>
            </div>
            <Badge className="bg-blue-600">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Product Details
                </CardTitle>
                <p className="text-gray-600">Provide details about your craft for accurate pricing</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Product Category</Label>
                  <Select value={productData.category} onValueChange={(value) => setProductData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Materials Used</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {materials.map((material) => (
                      <Badge
                        key={material}
                        variant={productData.materials.includes(material) ? "default" : "outline"}
                        className="cursor-pointer text-center justify-center py-1"
                        onClick={() => toggleMaterial(material)}
                      >
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="size">Product Size</Label>
                    <Select value={productData.size} onValueChange={(value) => setProductData(prev => ({ ...prev, size: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Small">Small</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Large">Large</SelectItem>
                        <SelectItem value="Extra Large">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="complexity">Complexity Level</Label>
                    <Select value={productData.complexity} onValueChange={(value) => setProductData(prev => ({ ...prev, complexity: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select complexity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Simple">Simple</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Complex">Complex</SelectItem>
                        <SelectItem value="Very Complex">Very Complex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timeToMake">Time to Make (Hours)</Label>
                    <Input
                      id="timeToMake"
                      type="number"
                      value={productData.timeToMake}
                      onChange={(e) => setProductData(prev => ({ ...prev, timeToMake: e.target.value }))}
                      placeholder="e.g., 8"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Your Experience Level</Label>
                    <Select value={productData.experience} onValueChange={(value) => setProductData(prev => ({ ...prev, experience: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner (0-2 years)</SelectItem>
                        <SelectItem value="Intermediate">Intermediate (3-5 years)</SelectItem>
                        <SelectItem value="Expert">Expert (6-15 years)</SelectItem>
                        <SelectItem value="Master">Master (15+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={analyzePrice} 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={!productData.category || !productData.size || !productData.complexity || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Analyzing Market...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analyze Price
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analysis ? (
              <>
                {/* Suggested Price */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-green-600" />
                      Suggested Price
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl text-green-600 mb-2">
                        ₹{analysis.suggestedPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        Price Range: ₹{analysis.priceRange.min.toLocaleString()} - ₹{analysis.priceRange.max.toLocaleString()}
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg text-gray-900">{analysis.marketData.competitorCount}</div>
                          <div className="text-xs text-gray-600">Similar Products</div>
                        </div>
                        <div>
                          <div className="text-lg text-gray-900">₹{analysis.marketData.averagePrice.toLocaleString()}</div>
                          <div className="text-xs text-gray-600">Market Average</div>
                        </div>
                        <div>
                          <Badge 
                            className={
                              analysis.marketData.demandLevel === "High" ? "bg-green-600" :
                              analysis.marketData.demandLevel === "Medium" ? "bg-yellow-600" : "bg-red-600"
                            }
                          >
                            {analysis.marketData.demandLevel} Demand
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Market Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Market Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-sm text-blue-600 font-medium">Category Performance</div>
                        <div className="text-lg text-blue-900">{analysis.factors.category}</div>
                        <div className="text-xs text-blue-700">Performing well in market</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-green-600 font-medium">Profit Margin</div>
                        <div className="text-lg text-green-900">45-60%</div>
                        <div className="text-xs text-green-700">Recommended margin</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-2">Materials Value Addition</div>
                      <div className="flex flex-wrap gap-1">
                        {analysis.factors.materials.map((material, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-600" />
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-yellow-800">{recommendation}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Price Strategy */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                      Pricing Strategy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 border rounded-lg">
                        <div className="text-sm text-gray-600">Economy</div>
                        <div className="text-lg text-gray-900">₹{analysis.priceRange.min.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Mass market</div>
                      </div>
                      <div className="p-3 border-2 border-orange-600 rounded-lg bg-orange-50">
                        <div className="text-sm text-orange-600">Recommended</div>
                        <div className="text-lg text-orange-900">₹{analysis.suggestedPrice.toLocaleString()}</div>
                        <div className="text-xs text-orange-700">Best value</div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="text-sm text-gray-600">Premium</div>
                        <div className="text-lg text-gray-900">₹{analysis.priceRange.max.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Luxury segment</div>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      Use This Price for My Product
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg text-gray-900 mb-2">Get Intelligent Pricing</h3>
                  <p className="text-gray-600 mb-4">
                    Fill out the product details to get AI-powered market analysis and pricing recommendations
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>✓ Real-time market data analysis</p>
                    <p>✓ Competitor pricing insights</p>
                    <p>✓ Profit margin optimization</p>
                    <p>✓ Cultural craft value assessment</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Upload, Camera, Sparkles, CheckCircle, AlertCircle, Zap, Tag, DollarSign, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const aiSuggestions = {
  category: "Pottery & Ceramics",
  subcategory: "Decorative Bowls",
  suggestedPrice: "₹2,499",
  priceRange: "₹1,999 - ₹3,499",
  tags: ["handmade", "ceramic", "traditional", "home-decor", "gift"],
  title: "Handcrafted Ceramic Bowl with Traditional Motifs",
  description: "Beautiful handcrafted ceramic bowl featuring traditional Indian motifs. Perfect for serving or as decorative piece."
};

const uploadSteps = [
  { id: 1, title: "Upload Images", description: "Add photos of your craft", completed: false },
  { id: 2, title: "AI Analysis", description: "Let AI analyze and categorize", completed: false },
  { id: 3, title: "Product Details", description: "Add description and pricing", completed: false },
  { id: 4, title: "Review & Publish", description: "Final review before listing", completed: false }
];

export function ArtistProductUpload() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiComplete, setAiComplete] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    quantity: ""
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Simulate image upload and AI analysis
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setUploadedImages(prev => [...prev, ...newImages]);
      
      // Simulate AI analysis
      setAiAnalyzing(true);
      setTimeout(() => {
        setAiAnalyzing(false);
        setAiComplete(true);
        setCurrentStep(2);
      }, 3000);
    }
  };

  const acceptAISuggestions = () => {
    setFormData({
      title: aiSuggestions.title,
      description: aiSuggestions.description,
      category: aiSuggestions.category,
      price: aiSuggestions.suggestedPrice,
      quantity: "1"
    });
    setCurrentStep(3);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">Upload Your Craft</h1>
        <p className="text-gray-600">Our AI will help you create the perfect product listing</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {uploadSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep > step.id || step.completed
                  ? 'bg-orange-600 border-orange-600 text-white'
                  : currentStep === step.id
                  ? 'border-orange-600 text-orange-600'
                  : 'border-gray-300 text-gray-400'
              }`}>
                {currentStep > step.id || step.completed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              {index < uploadSteps.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${
                  currentStep > step.id ? 'bg-orange-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm">
          {uploadSteps.map(step => (
            <div key={step.id} className="text-center max-w-24">
              <div className="font-medium text-gray-900">{step.title}</div>
              <div className="text-gray-500 text-xs">{step.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Upload Area */}
        <div className="lg:col-span-2">
          {/* Step 1: Image Upload */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Upload Product Images
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg text-gray-900 mb-2">Upload your craft photos</h3>
                  <p className="text-gray-600 mb-4">
                    Add up to 10 high-quality images. The first image will be your main product photo.
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button asChild className="bg-orange-600 hover:bg-orange-700">
                      <span>Choose Images</span>
                    </Button>
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    JPG, PNG or WebP (max 5MB each)
                  </p>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Uploaded Images</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative">
                          <ImageWithFallback
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          {index === 0 && (
                            <Badge className="absolute top-1 left-1 text-xs bg-orange-600">
                              Main
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {aiAnalyzing && (
                  <Alert className="mt-6">
                    <Sparkles className="h-4 w-4 animate-spin" />
                    <AlertDescription>
                      AI is analyzing your images... This may take a few moments.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 2: AI Analysis Results */}
          {currentStep === 2 && aiComplete && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-orange-600" />
                  AI Analysis Complete
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Great! Our AI has analyzed your craft and generated smart suggestions.
                  </AlertDescription>
                </Alert>

                <div className="space-y-6">
                  <div>
                    <Label className="text-sm text-gray-600">AI Detected Category</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-green-100 text-green-800">
                        <Tag className="h-3 w-3 mr-1" />
                        {aiSuggestions.category}
                      </Badge>
                      <span className="text-sm text-gray-500">→ {aiSuggestions.subcategory}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">Suggested Title</Label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-900">{aiSuggestions.title}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">AI Generated Description</Label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-900">{aiSuggestions.description}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">Price Recommendation</Label>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-lg text-gray-900">{aiSuggestions.suggestedPrice}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        Range: {aiSuggestions.priceRange}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">Suggested Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {aiSuggestions.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <Button onClick={acceptAISuggestions} className="bg-orange-600 hover:bg-orange-700">
                    <Zap className="h-4 w-4 mr-2" />
                    Accept AI Suggestions
                  </Button>
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    Customize Manually
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Product Details Form */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Product Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Product Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter product title"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your craft, materials used, dimensions, etc."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pottery">Pottery & Ceramics</SelectItem>
                        <SelectItem value="textiles">Textiles & Fabrics</SelectItem>
                        <SelectItem value="jewelry">Jewelry & Accessories</SelectItem>
                        <SelectItem value="paintings">Paintings & Art</SelectItem>
                        <SelectItem value="woodcraft">Wood & Bamboo</SelectItem>
                        <SelectItem value="decor">Home Decor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="quantity">Quantity Available</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                      placeholder="1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="Enter price"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    AI suggested: {aiSuggestions.suggestedPrice} (Range: {aiSuggestions.priceRange})
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => setCurrentStep(4)} className="bg-orange-600 hover:bg-orange-700">
                    Continue to Review
                  </Button>
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Review & Publish */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Review & Publish
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium text-green-900">Ready to Publish!</h4>
                  </div>
                  <p className="text-green-700 text-sm">
                    Your product listing looks great and is ready to go live on the marketplace.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Product Preview</h4>
                    <div className="border rounded-lg p-4 mt-2">
                      <div className="flex gap-4">
                        {uploadedImages[0] && (
                          <ImageWithFallback
                            src={uploadedImages[0]}
                            alt="Product preview"
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <h5 className="font-medium">{formData.title || aiSuggestions.title}</h5>
                          <p className="text-sm text-gray-600">{formData.category}</p>
                          <p className="text-lg text-orange-600">{formData.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Publish Product
                  </Button>
                  <Button variant="outline">
                    Save as Draft
                  </Button>
                  <Button variant="ghost" onClick={() => setCurrentStep(3)}>
                    Back to Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* AI Assistant Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-orange-600" />
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">Upload Tips</h4>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• Use natural lighting</li>
                    <li>• Show multiple angles</li>
                    <li>• Include size reference</li>
                    <li>• Highlight unique details</li>
                  </ul>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">AI Features</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Auto-categorization</li>
                    <li>• Smart pricing</li>
                    <li>• SEO optimization</li>
                    <li>• Quality checks</li>
                  </ul>
                </div>

                {currentStep > 1 && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Analysis Complete</h4>
                    <div className="space-y-2 text-sm text-green-800">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Category detected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Price suggested</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Tags generated</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
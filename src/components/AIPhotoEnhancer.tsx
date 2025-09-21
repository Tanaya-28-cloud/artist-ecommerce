import { useState, useRef } from "react";
import { 
  Upload, 
  Wand2, 
  Download, 
  RotateCcw, 
  Sun, 
  Contrast, 
  Palette,
  Scissors,
  Zap,
  CheckCircle,
  AlertCircle,
  Eye,
  Camera,
  Sparkles
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Switch } from "./ui/switch";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EnhancementSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  removeBackground: boolean;
  autoCorrect: boolean;
  sharpen: boolean;
  noiseReduction: boolean;
}

interface ProcessingStep {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  processing: boolean;
}

interface PhotoAnalysis {
  quality: number;
  lighting: "excellent" | "good" | "fair" | "poor";
  background: "clean" | "busy" | "distracting";
  focus: "sharp" | "soft" | "blurry";
  composition: "excellent" | "good" | "needs_improvement";
  suggestions: string[];
}

export function AIPhotoEnhancer() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [photoAnalysis, setPhotoAnalysis] = useState<PhotoAnalysis | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [settings, setSettings] = useState<EnhancementSettings>({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    removeBackground: true,
    autoCorrect: true,
    sharpen: true,
    noiseReduction: true
  });

  const [processingSteps] = useState<ProcessingStep[]>([
    {
      id: "analyze",
      name: "Analyzing Image",
      description: "AI analyzing photo quality and composition",
      completed: false,
      processing: false
    },
    {
      id: "lighting",
      name: "Optimizing Lighting",
      description: "Adjusting brightness and contrast for better visibility",
      completed: false,
      processing: false
    },
    {
      id: "background",
      name: "Background Processing",
      description: "Removing or cleaning background for professional look",
      completed: false,
      processing: false
    },
    {
      id: "enhancement",
      name: "Enhancing Details",
      description: "Sharpening image and reducing noise",
      completed: false,
      processing: false
    },
    {
      id: "optimization",
      name: "Final Optimization",
      description: "Optimizing for marketplace display",
      completed: false,
      processing: false
    }
  ]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setOriginalImage(result);
        analyzePhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePhoto = (imageData: string) => {
    // Simulate AI photo analysis
    setTimeout(() => {
      const analysis: PhotoAnalysis = {
        quality: Math.floor(Math.random() * 30) + 70, // 70-100
        lighting: ["excellent", "good", "fair", "poor"][Math.floor(Math.random() * 4)] as PhotoAnalysis["lighting"],
        background: ["clean", "busy", "distracting"][Math.floor(Math.random() * 3)] as PhotoAnalysis["background"],
        focus: ["sharp", "soft", "blurry"][Math.floor(Math.random() * 3)] as PhotoAnalysis["focus"],
        composition: ["excellent", "good", "needs_improvement"][Math.floor(Math.random() * 3)] as PhotoAnalysis["composition"],
        suggestions: []
      };

      // Generate suggestions based on analysis
      if (analysis.lighting === "poor" || analysis.lighting === "fair") {
        analysis.suggestions.push("Improve lighting conditions for better product visibility");
      }
      if (analysis.background === "distracting" || analysis.background === "busy") {
        analysis.suggestions.push("Use AI background removal for cleaner product presentation");
      }
      if (analysis.focus === "blurry" || analysis.focus === "soft") {
        analysis.suggestions.push("Apply AI sharpening to enhance product details");
      }
      if (analysis.composition === "needs_improvement") {
        analysis.suggestions.push("Consider recomposing with the product centered");
      }

      setPhotoAnalysis(analysis);
    }, 1000);
  };

  const enhancePhoto = async () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setCurrentStep(0);

    // Simulate AI processing steps
    for (let i = 0; i < processingSteps.length; i++) {
      setCurrentStep(i);
      
      // Update progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setProcessingProgress((i * 100 + progress) / processingSteps.length);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Simulate enhanced image (in real implementation, this would be the AI-processed image)
    setEnhancedImage(originalImage); // For demo, using same image
    setIsProcessing(false);
    setShowComparison(true);
  };

  const downloadEnhancedImage = () => {
    if (enhancedImage) {
      const link = document.createElement('a');
      link.href = enhancedImage;
      link.download = 'enhanced-product-photo.jpg';
      link.click();
    }
  };

  const resetEnhancements = () => {
    setEnhancedImage(null);
    setShowComparison(false);
    setProcessingProgress(0);
    setCurrentStep(0);
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 90) return "text-green-600";
    if (quality >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getQualityBadge = (level: string) => {
    switch (level) {
      case "excellent": return <Badge className="bg-green-600">Excellent</Badge>;
      case "good": return <Badge className="bg-blue-600">Good</Badge>;
      case "fair": return <Badge className="bg-yellow-600">Fair</Badge>;
      case "poor": return <Badge className="bg-red-600">Poor</Badge>;
      case "sharp": return <Badge className="bg-green-600">Sharp</Badge>;
      case "soft": return <Badge className="bg-yellow-600">Soft</Badge>;
      case "blurry": return <Badge className="bg-red-600">Blurry</Badge>;
      case "clean": return <Badge className="bg-green-600">Clean</Badge>;
      case "busy": return <Badge className="bg-yellow-600">Busy</Badge>;
      case "distracting": return <Badge className="bg-red-600">Distracting</Badge>;
      case "needs_improvement": return <Badge className="bg-orange-600">Needs Work</Badge>;
      default: return <Badge variant="outline">{level}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl text-gray-900">AI Photo Enhancer</h1>
              <p className="text-sm text-gray-600">Professional product photos with AI enhancement</p>
            </div>
            <Badge className="bg-purple-600">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!originalImage ? (
          /* Upload Section */
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Upload Product Photo</CardTitle>
              <p className="text-gray-600">Upload your craft photo and let AI enhance it for maximum impact</p>
            </CardHeader>
            <CardContent>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-orange-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg text-gray-900 mb-2">Choose your product photo</h3>
                <p className="text-gray-600 mb-4">
                  Supports JPG, PNG up to 10MB
                </p>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Select Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">AI Enhancement Features:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
                  <div className="flex items-center gap-2">
                    <Sun className="h-3 w-3" />
                    <span>Auto lighting correction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scissors className="h-3 w-3" />
                    <span>Background removal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    <span>Smart sharpening</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Palette className="h-3 w-3" />
                    <span>Color enhancement</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Photo Analysis */}
            {photoAnalysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    AI Photo Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getQualityColor(photoAnalysis.quality)}`}>
                        {photoAnalysis.quality}%
                      </div>
                      <div className="text-sm text-gray-600">Overall Quality</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1">{getQualityBadge(photoAnalysis.lighting)}</div>
                      <div className="text-sm text-gray-600">Lighting</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1">{getQualityBadge(photoAnalysis.background)}</div>
                      <div className="text-sm text-gray-600">Background</div>
                    </div>
                    <div className="text-center">
                      <div className="mb-1">{getQualityBadge(photoAnalysis.focus)}</div>
                      <div className="text-sm text-gray-600">Focus</div>
                    </div>
                  </div>

                  {photoAnalysis.suggestions.length > 0 && (
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <h4 className="font-medium text-yellow-900 mb-2">AI Suggestions:</h4>
                      <ul className="space-y-1">
                        {photoAnalysis.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm text-yellow-800 flex items-center gap-2">
                            <AlertCircle className="h-3 w-3" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Original/Enhanced Images */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Photo Enhancement</CardTitle>
                      <div className="flex gap-2">
                        {enhancedImage && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowComparison(!showComparison)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              {showComparison ? "Hide" : "Show"} Comparison
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={downloadEnhancedImage}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4 mr-1" />
                          New Photo
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {showComparison && enhancedImage ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Original</h3>
                          <div className="aspect-square rounded-lg overflow-hidden border">
                            <ImageWithFallback
                              src={originalImage!}
                              alt="Original"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-2">Enhanced</h3>
                          <div className="aspect-square rounded-lg overflow-hidden border-2 border-green-200">
                            <ImageWithFallback
                              src={enhancedImage}
                              alt="Enhanced"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-square rounded-lg overflow-hidden border mx-auto max-w-md">
                        <ImageWithFallback
                          src={enhancedImage || originalImage!}
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Processing Progress */}
                    {isProcessing && (
                      <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Processing...</span>
                          <span className="text-sm text-gray-600">{Math.round(processingProgress)}%</span>
                        </div>
                        <Progress value={processingProgress} className="h-2" />
                        
                        <div className="space-y-2">
                          {processingSteps.map((step, index) => (
                            <div key={step.id} className={`flex items-center gap-2 text-sm ${
                              index < currentStep ? 'text-green-600' :
                              index === currentStep ? 'text-blue-600' :
                              'text-gray-400'
                            }`}>
                              {index < currentStep ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : index === currentStep ? (
                                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                              )}
                              <span>{step.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Enhancement Controls */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wand2 className="h-5 w-5 text-purple-600" />
                      Enhancement Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Tabs defaultValue="auto" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="auto">Auto AI</TabsTrigger>
                        <TabsTrigger value="manual">Manual</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="auto" className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Auto Color Correction</label>
                            <Switch
                              checked={settings.autoCorrect}
                              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoCorrect: checked }))}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Remove Background</label>
                            <Switch
                              checked={settings.removeBackground}
                              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, removeBackground: checked }))}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Smart Sharpening</label>
                            <Switch
                              checked={settings.sharpen}
                              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, sharpen: checked }))}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Noise Reduction</label>
                            <Switch
                              checked={settings.noiseReduction}
                              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, noiseReduction: checked }))}
                            />
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="manual" className="space-y-4">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Brightness</label>
                            <Slider
                              value={[settings.brightness]}
                              onValueChange={(value) => setSettings(prev => ({ ...prev, brightness: value[0] }))}
                              min={-100}
                              max={100}
                              step={1}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Contrast</label>
                            <Slider
                              value={[settings.contrast]}
                              onValueChange={(value) => setSettings(prev => ({ ...prev, contrast: value[0] }))}
                              min={-100}
                              max={100}
                              step={1}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Saturation</label>
                            <Slider
                              value={[settings.saturation]}
                              onValueChange={(value) => setSettings(prev => ({ ...prev, saturation: value[0] }))}
                              min={-100}
                              max={100}
                              step={1}
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="space-y-2 pt-4">
                      {!enhancedImage ? (
                        <Button
                          onClick={enhancePhoto}
                          disabled={isProcessing}
                          className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                          {isProcessing ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Enhancing...
                            </>
                          ) : (
                            <>
                              <Wand2 className="h-4 w-4 mr-2" />
                              Enhance Photo
                            </>
                          )}
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <Button
                            onClick={resetEnhancements}
                            variant="outline"
                            className="w-full"
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reset
                          </Button>
                          <Button
                            onClick={enhancePhoto}
                            className="w-full bg-purple-600 hover:bg-purple-700"
                          >
                            <Wand2 className="h-4 w-4 mr-2" />
                            Re-enhance
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle>📸 Photo Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Use natural lighting when possible</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Keep products centered in frame</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Include size reference objects</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Capture multiple angles</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
}
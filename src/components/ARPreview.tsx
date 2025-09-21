import { useState, useRef } from "react";
import { 
  Camera, 
  Scan, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Move3D,
  Smartphone,
  Monitor,
  Eye,
  Settings,
  Download,
  Share2,
  Info
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  category: string;
  artist: string;
}

interface ARSettings {
  scale: number;
  rotation: number;
  position: { x: number; y: number };
  lighting: number;
  shadows: boolean;
  groundPlane: boolean;
}

export function ARPreview() {
  const [isARActive, setIsARActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [arSettings, setArSettings] = useState<ARSettings>({
    scale: 100,
    rotation: 0,
    position: { x: 0, y: 0 },
    lighting: 50,
    shadows: true,
    groundPlane: true
  });
  const [viewMode, setViewMode] = useState<"ar" | "3d">("ar");
  const [isLoading, setIsLoading] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const sampleProducts: Product[] = [
    {
      id: "1",
      name: "Traditional Pottery Vase",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwdmFzZXxlbnwxfHx8fDE3NTgyOTA0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: 2500,
      dimensions: { width: 20, height: 35, depth: 20 },
      category: "Pottery",
      artist: "Priya Sharma"
    },
    {
      id: "2",
      name: "Handwoven Silk Scarf",
      image: "https://images.unsplash.com/photo-1611574557351-00889b20a36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhzaWxrJTIwc2NhcmZ8ZW58MXx8fHwxNzU4MjkwNDE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: 1800,
      dimensions: { width: 80, height: 200, depth: 0.5 },
      category: "Textiles",
      artist: "Meera Devi"
    },
    {
      id: "3",
      name: "Wooden Sculpture",
      image: "https://images.unsplash.com/photo-1551795303-a865b64a1cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwc2N1bHB0dXJlfGVufDF8fHx8MTc1ODI5MDQxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      price: 3200,
      dimensions: { width: 15, height: 40, depth: 15 },
      category: "Wood Crafts",
      artist: "Rajesh Kumar"
    }
  ];

  const startARSession = async () => {
    setIsLoading(true);
    try {
      // Request camera permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setIsARActive(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to start AR session:", error);
      setIsLoading(false);
      // Fallback to demo mode
      setViewMode("3d");
      setIsARActive(true);
    }
  };

  const stopARSession = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsARActive(false);
  };

  const resetPosition = () => {
    setArSettings(prev => ({
      ...prev,
      scale: 100,
      rotation: 0,
      position: { x: 0, y: 0 }
    }));
  };

  const updateScale = (value: number[]) => {
    setArSettings(prev => ({ ...prev, scale: value[0] }));
  };

  const updateRotation = (value: number[]) => {
    setArSettings(prev => ({ ...prev, rotation: value[0] }));
  };

  const updateLighting = (value: number[]) => {
    setArSettings(prev => ({ ...prev, lighting: value[0] }));
  };

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div>
                <h1 className="text-2xl text-gray-900">AR Preview</h1>
                <p className="text-sm text-gray-600">See how crafts look in your space</p>
              </div>
              <Badge className="bg-purple-600">
                <Scan className="h-3 w-3 mr-1" />
                AR Technology
              </Badge>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Product Selection */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Select a Product to Preview</CardTitle>
              <p className="text-gray-600">Choose any craft item to see how it looks in your home using AR</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sampleProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="aspect-square">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {product.artist}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-orange-600">
                          ₹{product.price.toLocaleString()}
                        </span>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Browser Compatibility Notice */}
              <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">AR Requirements</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Modern mobile device with camera</li>
                      <li>• Updated browser (Chrome, Safari, Edge)</li>
                      <li>• Good lighting conditions</li>
                      <li>• Stable internet connection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProduct(null)}
              >
                ← Back to Products
              </Button>
              <div>
                <h1 className="text-xl text-gray-900">{selectedProduct.name}</h1>
                <p className="text-sm text-gray-600">AR Preview</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "ar" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("ar")}
              >
                <Camera className="h-4 w-4 mr-1" />
                AR View
              </Button>
              <Button
                variant={viewMode === "3d" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("3d")}
              >
                <Monitor className="h-4 w-4 mr-1" />
                3D View
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* AR/3D Viewer */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  {viewMode === "ar" ? (
                    <>
                      {isARActive ? (
                        <>
                          <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            playsInline
                            muted
                          />
                          {/* AR Overlay with Product */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div
                              className="relative transition-all duration-300"
                              style={{
                                transform: `scale(${arSettings.scale / 100}) rotate(${arSettings.rotation}deg) translate(${arSettings.position.x}px, ${arSettings.position.y}px)`,
                                filter: `brightness(${arSettings.lighting / 50})`
                              }}
                            >
                              <ImageWithFallback
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-32 h-32 object-contain"
                              />
                              {arSettings.shadows && (
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black/20 rounded-full blur-sm"></div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center text-white">
                            <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <h3 className="text-lg font-medium mb-2">Start AR Experience</h3>
                            <p className="text-sm opacity-75 mb-4">
                              Point your camera at a flat surface to place the {selectedProduct.name}
                            </p>
                            <Button
                              onClick={startARSession}
                              disabled={isLoading}
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              {isLoading ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                  Starting AR...
                                </>
                              ) : (
                                <>
                                  <Scan className="h-4 w-4 mr-2" />
                                  Start AR
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    /* 3D View */
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-300">
                      <div
                        className="relative transition-all duration-300"
                        style={{
                          transform: `scale(${arSettings.scale / 100}) rotate(${arSettings.rotation}deg)`,
                          filter: `brightness(${arSettings.lighting / 50})`
                        }}
                      >
                        <ImageWithFallback
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="w-48 h-48 object-contain"
                        />
                        {arSettings.shadows && (
                          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black/20 rounded-full blur-sm"></div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* AR Controls Overlay */}
                  {isARActive && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      <Button size="sm" variant="secondary" onClick={resetPosition}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" onClick={stopARSession}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Product Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">{selectedProduct.name}</p>
                  <p className="text-sm text-gray-600">by {selectedProduct.artist}</p>
                </div>
                <div className="text-xl font-semibold text-orange-600">
                  ₹{selectedProduct.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  <p>Dimensions:</p>
                  <p>{selectedProduct.dimensions.width} × {selectedProduct.dimensions.height} × {selectedProduct.dimensions.depth} cm</p>
                </div>
              </CardContent>
            </Card>

            {/* AR Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm">Scale</Label>
                  <Slider
                    value={[arSettings.scale]}
                    onValueChange={updateScale}
                    min={25}
                    max={200}
                    step={5}
                    className="mt-2"
                  />
                  <div className="text-xs text-gray-500 mt-1">{arSettings.scale}%</div>
                </div>

                <div>
                  <Label className="text-sm">Rotation</Label>
                  <Slider
                    value={[arSettings.rotation]}
                    onValueChange={updateRotation}
                    min={0}
                    max={360}
                    step={5}
                    className="mt-2"
                  />
                  <div className="text-xs text-gray-500 mt-1">{arSettings.rotation}°</div>
                </div>

                <div>
                  <Label className="text-sm">Lighting</Label>
                  <Slider
                    value={[arSettings.lighting]}
                    onValueChange={updateLighting}
                    min={20}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                  <div className="text-xs text-gray-500 mt-1">{arSettings.lighting}%</div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Shadows</Label>
                    <Switch
                      checked={arSettings.shadows}
                      onCheckedChange={(checked) => setArSettings(prev => ({ ...prev, shadows: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Ground Plane</Label>
                    <Switch
                      checked={arSettings.groundPlane}
                      onCheckedChange={(checked) => setArSettings(prev => ({ ...prev, groundPlane: checked }))}
                    />
                  </div>
                </div>

                <Button onClick={resetPosition} variant="outline" className="w-full">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Position
                </Button>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Add to Cart
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Save Screenshot
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share AR View
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">💡 AR Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Move your device slowly for better tracking</p>
                <p>• Ensure good lighting for optimal experience</p>
                <p>• Place items on flat, textured surfaces</p>
                <p>• Use pinch gestures to resize</p>
                <p>• Tap and drag to reposition</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
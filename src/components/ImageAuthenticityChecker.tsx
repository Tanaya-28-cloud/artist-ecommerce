import { useState, useRef } from "react";
import { 
  Shield, 
  Upload, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  Camera,
  MapPin,
  Calendar,
  Clock,
  Monitor,
  Eye,
  Fingerprint,
  Zap
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EXIFData {
  camera: string;
  lens: string;
  settings: {
    iso: string;
    aperture: string;
    shutterSpeed: string;
    focalLength: string;
  };
  timestamp: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  software?: string;
  dimensions: {
    width: number;
    height: number;
  };
}

interface ReverseSearchResult {
  found: boolean;
  matches: {
    url: string;
    title: string;
    similarity: number;
    source: string;
    firstSeen: string;
  }[];
  isStockPhoto: boolean;
  isPreviouslyUploaded: boolean;
}

interface AuthenticityResult {
  score: number;
  status: "authentic" | "suspicious" | "fraudulent";
  checks: {
    exifIntegrity: boolean;
    reverseSearch: boolean;
    metadataConsistency: boolean;
    imageManipulation: boolean;
    originalityCheck: boolean;
  };
  warnings: string[];
  recommendations: string[];
}

export function ImageAuthenticityChecker() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [exifData, setExifData] = useState<EXIFData | null>(null);
  const [reverseSearchResult, setReverseSearchResult] = useState<ReverseSearchResult | null>(null);
  const [authenticityResult, setAuthenticityResult] = useState<AuthenticityResult | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        analyzeImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate EXIF extraction
    await simulateProgress(20);
    extractEXIFData(file);

    // Simulate reverse image search
    await simulateProgress(50);
    performReverseSearch();

    // Simulate authenticity analysis
    await simulateProgress(80);
    performAuthenticityCheck();

    await simulateProgress(100);
    setIsAnalyzing(false);
  };

  const simulateProgress = (target: number) => {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= target) {
            clearInterval(interval);
            resolve();
            return target;
          }
          return prev + 2;
        });
      }, 50);
    });
  };

  const extractEXIFData = (file: File) => {
    // Simulate EXIF data extraction
    const mockEXIF: EXIFData = {
      camera: "Canon EOS R5",
      lens: "RF 24-70mm f/2.8L IS USM",
      settings: {
        iso: "ISO 400",
        aperture: "f/5.6",
        shutterSpeed: "1/125s",
        focalLength: "50mm"
      },
      timestamp: "2024-01-15 14:30:22",
      location: {
        latitude: 26.9124,
        longitude: 75.7873,
        address: "Jaipur, Rajasthan, India"
      },
      software: "Adobe Lightroom CC 2024",
      dimensions: {
        width: 6000,
        height: 4000
      }
    };

    setExifData(mockEXIF);
  };

  const performReverseSearch = () => {
    // Simulate reverse image search
    const mockResult: ReverseSearchResult = {
      found: Math.random() > 0.7, // 30% chance of finding matches
      matches: [],
      isStockPhoto: false,
      isPreviouslyUploaded: false
    };

    if (mockResult.found) {
      mockResult.matches = [
        {
          url: "https://example-marketplace.com/product/123",
          title: "Similar pottery item",
          similarity: 0.85,
          source: "E-commerce site",
          firstSeen: "2023-12-10"
        },
        {
          url: "https://stockphoto.com/pottery-collection",
          title: "Traditional pottery stock photo",
          similarity: 0.73,
          source: "Stock photo site",
          firstSeen: "2023-11-05"
        }
      ];
      
      if (mockResult.matches.some(match => match.source.includes("stock"))) {
        mockResult.isStockPhoto = true;
      }
    }

    setReverseSearchResult(mockResult);
  };

  const performAuthenticityCheck = () => {
    const hasMatches = reverseSearchResult?.found || false;
    const isStockPhoto = reverseSearchResult?.isStockPhoto || false;
    
    const result: AuthenticityResult = {
      score: isStockPhoto ? 25 : hasMatches ? 60 : 95,
      status: isStockPhoto ? "fraudulent" : hasMatches ? "suspicious" : "authentic",
      checks: {
        exifIntegrity: !isStockPhoto,
        reverseSearch: !hasMatches,
        metadataConsistency: true,
        imageManipulation: !isStockPhoto,
        originalityCheck: !hasMatches
      },
      warnings: [],
      recommendations: []
    };

    if (isStockPhoto) {
      result.warnings.push("Image appears to be a stock photo");
      result.recommendations.push("Use original photos of your actual products");
    }

    if (hasMatches && !isStockPhoto) {
      result.warnings.push("Similar images found online");
      result.recommendations.push("Ensure this is your original work");
      result.recommendations.push("Add watermark or signature to your photos");
    }

    if (result.score >= 80) {
      result.recommendations.push("Image passes all authenticity checks");
      result.recommendations.push("Safe to use for product listing");
    }

    setAuthenticityResult(result);
  };

  const getStatusColor = (status: AuthenticityResult["status"]) => {
    switch (status) {
      case "authentic": return "text-green-600";
      case "suspicious": return "text-yellow-600";
      case "fraudulent": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusBadge = (status: AuthenticityResult["status"]) => {
    switch (status) {
      case "authentic": return <Badge className="bg-green-600">Authentic</Badge>;
      case "suspicious": return <Badge className="bg-yellow-600">Suspicious</Badge>;
      case "fraudulent": return <Badge className="bg-red-600">Fraudulent</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl text-gray-900">Image Authenticity Checker</h1>
              <p className="text-sm text-gray-600">AI-powered fraud detection for product images</p>
            </div>
            <Badge className="bg-blue-600">
              <Shield className="h-3 w-3 mr-1" />
              Anti-Fraud Protection
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!uploadedImage ? (
          /* Upload Section */
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Verify Image Authenticity</CardTitle>
              <p className="text-gray-600">Upload an image to check for originality and detect potential fraud</p>
            </CardHeader>
            <CardContent>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg text-gray-900 mb-2">Upload Image for Verification</h3>
                <p className="text-gray-600 mb-4">
                  We'll analyze EXIF data, perform reverse search, and check for authenticity
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Select Image
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
                <h4 className="font-medium text-blue-900 mb-2">Verification Checks:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
                  <div className="flex items-center gap-2">
                    <Fingerprint className="h-3 w-3" />
                    <span>EXIF metadata analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="h-3 w-3" />
                    <span>Reverse image search</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-3 w-3" />
                    <span>Visual similarity detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    <span>AI manipulation detection</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Analysis Progress */}
            {isAnalyzing && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600 animate-pulse" />
                    Analyzing Image Authenticity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Verification Progress</span>
                      <span className="text-sm text-gray-600">{analysisProgress}%</span>
                    </div>
                    <Progress value={analysisProgress} className="h-2" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className={`flex items-center gap-2 ${analysisProgress > 20 ? 'text-green-600' : 'text-gray-400'}`}>
                        <CheckCircle className="h-4 w-4" />
                        <span>EXIF Data Extraction</span>
                      </div>
                      <div className={`flex items-center gap-2 ${analysisProgress > 50 ? 'text-green-600' : 'text-gray-400'}`}>
                        <Search className="h-4 w-4" />
                        <span>Reverse Image Search</span>
                      </div>
                      <div className={`flex items-center gap-2 ${analysisProgress > 80 ? 'text-green-600' : 'text-gray-400'}`}>
                        <Shield className="h-4 w-4" />
                        <span>Authenticity Analysis</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results */}
            {!isAnalyzing && authenticityResult && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Image and Overall Result */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Authenticity Result</CardTitle>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(authenticityResult.status)}
                          <div className={`text-3xl font-bold ${getStatusColor(authenticityResult.status)}`}>
                            {authenticityResult.score}%
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium mb-2">Uploaded Image</h3>
                          <div className="aspect-square rounded-lg overflow-hidden border">
                            <ImageWithFallback
                              src={uploadedImage!}
                              alt="Uploaded"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-3">Verification Checks</h3>
                          <div className="space-y-3">
                            {Object.entries(authenticityResult.checks).map(([key, passed]) => (
                              <div key={key} className="flex items-center justify-between">
                                <span className="text-sm capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                </span>
                                <div className="flex items-center gap-1">
                                  {passed ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <X className="h-4 w-4 text-red-600" />
                                  )}
                                  <span className={`text-sm ${passed ? 'text-green-600' : 'text-red-600'}`}>
                                    {passed ? 'Passed' : 'Failed'}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Warnings and Recommendations */}
                      {(authenticityResult.warnings.length > 0 || authenticityResult.recommendations.length > 0) && (
                        <div className="mt-6 space-y-4">
                          {authenticityResult.warnings.length > 0 && (
                            <div className="bg-yellow-50 p-4 rounded-lg">
                              <h4 className="font-medium text-yellow-900 mb-2 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" />
                                Warnings
                              </h4>
                              <ul className="space-y-1">
                                {authenticityResult.warnings.map((warning, index) => (
                                  <li key={index} className="text-sm text-yellow-800">• {warning}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {authenticityResult.recommendations.length > 0 && (
                            <div className={`p-4 rounded-lg ${
                              authenticityResult.status === 'authentic' ? 'bg-green-50' : 'bg-blue-50'
                            }`}>
                              <h4 className={`font-medium mb-2 flex items-center gap-2 ${
                                authenticityResult.status === 'authentic' ? 'text-green-900' : 'text-blue-900'
                              }`}>
                                <CheckCircle className="h-4 w-4" />
                                Recommendations
                              </h4>
                              <ul className="space-y-1">
                                {authenticityResult.recommendations.map((rec, index) => (
                                  <li key={index} className={`text-sm ${
                                    authenticityResult.status === 'authentic' ? 'text-green-800' : 'text-blue-800'
                                  }`}>
                                    • {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* EXIF Data and Reverse Search */}
                <div className="space-y-6">
                  <Tabs defaultValue="exif">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="exif">EXIF Data</TabsTrigger>
                      <TabsTrigger value="search">Reverse Search</TabsTrigger>
                    </TabsList>

                    <TabsContent value="exif">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Camera className="h-5 w-5 text-gray-600" />
                            EXIF Metadata
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {exifData ? (
                            <>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Camera Information</h4>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Camera:</span>
                                    <span>{exifData.camera}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Lens:</span>
                                    <span>{exifData.lens}</span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Camera Settings</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">ISO:</span>
                                    <span>{exifData.settings.iso}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Aperture:</span>
                                    <span>{exifData.settings.aperture}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Shutter:</span>
                                    <span>{exifData.settings.shutterSpeed}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Focal:</span>
                                    <span>{exifData.settings.focalLength}</span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Other Details</h4>
                                <div className="space-y-1 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-3 w-3 text-gray-400" />
                                    <span>{exifData.timestamp}</span>
                                  </div>
                                  {exifData.location && (
                                    <div className="flex items-center gap-2">
                                      <MapPin className="h-3 w-3 text-gray-400" />
                                      <span>{exifData.location.address}</span>
                                    </div>
                                  )}
                                  {exifData.software && (
                                    <div className="flex items-center gap-2">
                                      <Monitor className="h-3 w-3 text-gray-400" />
                                      <span>{exifData.software}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </>
                          ) : (
                            <p className="text-gray-500 text-sm">No EXIF data found</p>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="search">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Search className="h-5 w-5 text-gray-600" />
                            Reverse Search Results
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {reverseSearchResult?.found ? (
                            <div className="space-y-4">
                              <div className="bg-yellow-50 p-3 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                  Found {reverseSearchResult.matches.length} similar image(s) online
                                </p>
                              </div>
                              
                              <div className="space-y-3">
                                {reverseSearchResult.matches.map((match, index) => (
                                  <div key={index} className="border rounded-lg p-3">
                                    <div className="flex justify-between items-start mb-2">
                                      <h4 className="font-medium text-sm">{match.title}</h4>
                                      <Badge variant="outline">
                                        {Math.round(match.similarity * 100)}% match
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-1">
                                      Source: {match.source}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      First seen: {match.firstSeen}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="bg-green-50 p-4 rounded-lg text-center">
                              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                              <p className="text-sm text-green-800">
                                No similar images found online. This appears to be original content.
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                      variant="outline"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Check Another Image
                    </Button>
                    
                    {authenticityResult.status === 'authentic' && (
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve for Listing
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

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
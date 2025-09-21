import { useState } from "react";
import { 
  Shield, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Camera, 
  FileText, 
  Star,
  Award,
  Verified
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type VerificationStatus = "not_started" | "in_progress" | "under_review" | "verified" | "rejected";

interface VerificationData {
  personalInfo: {
    fullName: string;
    aadharNumber: string;
    address: string;
    phoneNumber: string;
  };
  artistInfo: {
    experience: string;
    specialization: string;
    awards: string;
    references: string;
  };
  documents: {
    aadharCard?: File;
    portfolioImages: File[];
    certificates: File[];
    workSamples: File[];
  };
}

export function ArtistVerification() {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>("not_started");
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationData, setVerificationData] = useState<VerificationData>({
    personalInfo: {
      fullName: "",
      aadharNumber: "",
      address: "",
      phoneNumber: ""
    },
    artistInfo: {
      experience: "",
      specialization: "",
      awards: "",
      references: ""
    },
    documents: {
      portfolioImages: [],
      certificates: [],
      workSamples: []
    }
  });

  const verificationSteps = [
    { id: 1, title: "Personal Information", description: "Basic identity verification" },
    { id: 2, title: "Artist Profile", description: "Your artistic background" },
    { id: 3, title: "Document Upload", description: "Supporting documents" },
    { id: 4, title: "Portfolio Review", description: "Showcase your work" },
    { id: 5, title: "Final Review", description: "Admin verification" }
  ];

  const handleFileUpload = (category: keyof VerificationData["documents"], files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setVerificationData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [category]: category === "aadharCard" ? fileArray[0] : [...prev.documents[category] as File[], ...fileArray]
        }
      }));
    }
  };

  const submitVerification = () => {
    setVerificationStatus("under_review");
    // In a real app, this would submit to the backend
    setTimeout(() => {
      setVerificationStatus("verified");
    }, 3000);
  };

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-600"><Verified className="h-3 w-3 mr-1" />Verified Artist</Badge>;
      case "under_review":
        return <Badge className="bg-yellow-600"><Clock className="h-3 w-3 mr-1" />Under Review</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-600"><Upload className="h-3 w-3 mr-1" />In Progress</Badge>;
      case "rejected":
        return <Badge className="bg-red-600"><AlertCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline"><Shield className="h-3 w-3 mr-1" />Not Verified</Badge>;
    }
  };

  if (verificationStatus === "verified") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4">
        <Card className="max-w-lg mx-auto text-center">
          <CardHeader>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-900">Congratulations!</CardTitle>
            <p className="text-green-700">You are now a verified Kalakaari artist</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">Your Benefits:</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Verified badge on your profile</li>
                <li>• Higher visibility in search results</li>
                <li>• Access to premium features</li>
                <li>• Direct customer contact options</li>
                <li>• Priority customer support</li>
              </ul>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verificationStatus === "under_review") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center px-4">
        <Card className="max-w-lg mx-auto text-center">
          <CardHeader>
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-10 w-10 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl text-yellow-900">Under Review</CardTitle>
            <p className="text-yellow-700">Our team is reviewing your verification documents</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-100 p-4 rounded-lg">
              <h3 className="font-medium text-yellow-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Document verification (1-2 business days)</li>
                <li>• Portfolio quality review</li>
                <li>• Background verification</li>
                <li>• Final approval notification</li>
              </ul>
            </div>
            <p className="text-sm text-yellow-700">
              You'll receive an email notification once the review is complete.
            </p>
            <Button variant="outline" className="w-full">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl text-gray-900">Artist Verification</h1>
              <p className="text-sm text-gray-600">Get verified to gain customer trust</p>
            </div>
            {getStatusBadge(verificationStatus)}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-gray-900">Verification Progress</h2>
            <span className="text-sm text-gray-600">{currentStep}/5 Steps</span>
          </div>
          <Progress value={(currentStep / 5) * 100} className="mb-4" />
          <div className="flex justify-between text-xs text-gray-500">
            {verificationSteps.map((step, index) => (
              <div key={step.id} className={`text-center ${index + 1 <= currentStep ? 'text-orange-600' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 mx-auto ${
                  index + 1 <= currentStep ? 'bg-orange-600 text-white' : 'bg-gray-200'
                }`}>
                  {index + 1 < currentStep ? <CheckCircle className="h-4 w-4" /> : step.id}
                </div>
                <div className="w-20">{step.title}</div>
              </div>
            ))}
          </div>
        </div>

        <Tabs value={currentStep.toString()} className="space-y-6">
          {/* Step 1: Personal Information */}
          <TabsContent value="1">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <p className="text-gray-600">Provide your basic identity details for verification</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name (as per Aadhar)</Label>
                    <Input
                      id="fullName"
                      value={verificationData.personalInfo.fullName}
                      onChange={(e) => setVerificationData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                      }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="aadhar">Aadhar Number</Label>
                    <Input
                      id="aadhar"
                      value={verificationData.personalInfo.aadharNumber}
                      onChange={(e) => setVerificationData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, aadharNumber: e.target.value }
                      }))}
                      placeholder="XXXX XXXX XXXX"
                      maxLength={12}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Complete Address</Label>
                  <Textarea
                    id="address"
                    value={verificationData.personalInfo.address}
                    onChange={(e) => setVerificationData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, address: e.target.value }
                    }))}
                    placeholder="Enter your complete address"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={verificationData.personalInfo.phoneNumber}
                    onChange={(e) => setVerificationData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, phoneNumber: e.target.value }
                    }))}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={() => setCurrentStep(2)} className="bg-orange-600 hover:bg-orange-700">
                    Continue to Artist Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 2: Artist Information */}
          <TabsContent value="2">
            <Card>
              <CardHeader>
                <CardTitle>Artist Profile</CardTitle>
                <p className="text-gray-600">Tell us about your artistic journey and expertise</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      value={verificationData.artistInfo.experience}
                      onChange={(e) => setVerificationData(prev => ({
                        ...prev,
                        artistInfo: { ...prev.artistInfo, experience: e.target.value }
                      }))}
                      placeholder="e.g., 10 years"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialization">Primary Specialization</Label>
                    <Input
                      id="specialization"
                      value={verificationData.artistInfo.specialization}
                      onChange={(e) => setVerificationData(prev => ({
                        ...prev,
                        artistInfo: { ...prev.artistInfo, specialization: e.target.value }
                      }))}
                      placeholder="e.g., Pottery, Textiles, Jewelry"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="awards">Awards & Recognition</Label>
                  <Textarea
                    id="awards"
                    value={verificationData.artistInfo.awards}
                    onChange={(e) => setVerificationData(prev => ({
                      ...prev,
                      artistInfo: { ...prev.artistInfo, awards: e.target.value }
                    }))}
                    placeholder="List any awards, exhibitions, or recognition you've received"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="references">Professional References</Label>
                  <Textarea
                    id="references"
                    value={verificationData.artistInfo.references}
                    onChange={(e) => setVerificationData(prev => ({
                      ...prev,
                      artistInfo: { ...prev.artistInfo, references: e.target.value }
                    }))}
                    placeholder="Provide contact details of mentors, gallery owners, or established artists"
                    rows={3}
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(3)} className="bg-orange-600 hover:bg-orange-700">
                    Continue to Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 3: Document Upload */}
          <TabsContent value="3">
            <Card>
              <CardHeader>
                <CardTitle>Document Upload</CardTitle>
                <p className="text-gray-600">Upload required documents for identity and skill verification</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Aadhar Card */}
                <div>
                  <Label>Aadhar Card (Required)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload clear photo of your Aadhar card</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload("aadharCard", e.target.files)}
                      className="hidden"
                      id="aadhar-upload"
                    />
                    <label htmlFor="aadhar-upload">
                      <Button variant="outline" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </label>
                  </div>
                </div>

                {/* Certificates */}
                <div>
                  <Label>Certificates & Qualifications (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Award className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload certificates, diplomas, or training documents</p>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      multiple
                      onChange={(e) => handleFileUpload("certificates", e.target.files)}
                      className="hidden"
                      id="cert-upload"
                    />
                    <label htmlFor="cert-upload">
                      <Button variant="outline" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(4)} className="bg-orange-600 hover:bg-orange-700">
                    Continue to Portfolio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 4: Portfolio */}
          <TabsContent value="4">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Showcase</CardTitle>
                <p className="text-gray-600">Upload your best work samples for quality assessment</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Work Samples (Minimum 5 images)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload high-quality images of your artwork</p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileUpload("workSamples", e.target.files)}
                      className="hidden"
                      id="portfolio-upload"
                    />
                    <label htmlFor="portfolio-upload">
                      <Button variant="outline" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Images
                      </Button>
                    </label>
                  </div>
                  {verificationData.documents.workSamples.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">
                        {verificationData.documents.workSamples.length} images uploaded
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Portfolio Guidelines:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Upload at least 5 high-quality images</li>
                    <li>• Show variety in your work</li>
                    <li>• Include process shots if available</li>
                    <li>• Ensure good lighting and clarity</li>
                    <li>• Maximum file size: 5MB per image</li>
                  </ul>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(5)} className="bg-orange-600 hover:bg-orange-700">
                    Review & Submit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 5: Final Review */}
          <TabsContent value="5">
            <Card>
              <CardHeader>
                <CardTitle>Review & Submit</CardTitle>
                <p className="text-gray-600">Please review your information before submitting</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Personal Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-600">Name:</span> {verificationData.personalInfo.fullName}</p>
                      <p><span className="text-gray-600">Phone:</span> {verificationData.personalInfo.phoneNumber}</p>
                      <p><span className="text-gray-600">Address:</span> {verificationData.personalInfo.address}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Artist Profile</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-600">Experience:</span> {verificationData.artistInfo.experience}</p>
                      <p><span className="text-gray-600">Specialization:</span> {verificationData.artistInfo.specialization}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Documents Uploaded</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Aadhar Card</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Portfolio ({verificationData.documents.workSamples.length} images)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-medium text-orange-900 mb-2">Important Notice:</h3>
                  <p className="text-sm text-orange-800">
                    By submitting this verification request, you confirm that all information provided is accurate and truthful. 
                    False information may result in permanent account suspension.
                  </p>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(4)}>
                    Back
                  </Button>
                  <Button onClick={submitVerification} className="bg-orange-600 hover:bg-orange-700">
                    Submit for Verification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
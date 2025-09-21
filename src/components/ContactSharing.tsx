import { useState } from "react";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Shield, 
  Eye, 
  EyeOff,
  Settings,
  User,
  Calendar,
  Video,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  workingHours: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  customMessage: string;
}

interface ContactSettings {
  showPhone: boolean;
  showEmail: boolean;
  showWhatsApp: boolean;
  showAddress: boolean;
  showWorkingHours: boolean;
  showSocialMedia: boolean;
  requireVerification: boolean;
  allowVideoCall: boolean;
  autoRespond: boolean;
}

export function ContactSharing() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "+91 98765 43210",
    email: "artist@example.com",
    whatsapp: "+91 98765 43210",
    address: "Jaipur, Rajasthan, India",
    workingHours: "9:00 AM - 6:00 PM (Mon-Sat)",
    socialMedia: {
      instagram: "@artist_crafts",
      facebook: "ArtistCrafts",
      twitter: "@artist_crafts"
    },
    customMessage: "नमस्ते! I specialize in traditional Rajasthani pottery. Feel free to reach out for custom orders or to learn about my craft!"
  });

  const [contactSettings, setContactSettings] = useState<ContactSettings>({
    showPhone: true,
    showEmail: true,
    showWhatsApp: true,
    showAddress: false,
    showWorkingHours: true,
    showSocialMedia: true,
    requireVerification: false,
    allowVideoCall: true,
    autoRespond: true
  });

  const [showContactCard, setShowContactCard] = useState(false);

  const updateContactInfo = (field: keyof ContactInfo, value: string | any) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const updateContactSettings = (field: keyof ContactSettings, value: boolean) => {
    setContactSettings(prev => ({ ...prev, [field]: value }));
  };

  const generateContactCard = () => {
    setShowContactCard(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl text-gray-900">Contact Information</h1>
              <p className="text-sm text-gray-600">Manage how customers can reach you</p>
            </div>
            <Badge className="bg-green-600">
              <Shield className="h-3 w-3 mr-1" />
              Privacy Controlled
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="contact-info">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="contact-info">Contact Details</TabsTrigger>
                <TabsTrigger value="privacy">Privacy Settings</TabsTrigger>
                <TabsTrigger value="automation">Automation</TabsTrigger>
              </TabsList>

              <TabsContent value="contact-info" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="flex">
                          <Input
                            id="phone"
                            value={contactInfo.phone}
                            onChange={(e) => updateContactInfo("phone", e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                          />
                          <div className="ml-2 flex items-center">
                            {contactSettings.showPhone ? (
                              <Eye className="h-4 w-4 text-green-600" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <div className="flex">
                          <Input
                            id="email"
                            type="email"
                            value={contactInfo.email}
                            onChange={(e) => updateContactInfo("email", e.target.value)}
                            placeholder="your@email.com"
                          />
                          <div className="ml-2 flex items-center">
                            {contactSettings.showEmail ? (
                              <Eye className="h-4 w-4 text-green-600" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="whatsapp">WhatsApp Number</Label>
                        <Input
                          id="whatsapp"
                          value={contactInfo.whatsapp}
                          onChange={(e) => updateContactInfo("whatsapp", e.target.value)}
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>

                      <div>
                        <Label htmlFor="workingHours">Working Hours</Label>
                        <Input
                          id="workingHours"
                          value={contactInfo.workingHours}
                          onChange={(e) => updateContactInfo("workingHours", e.target.value)}
                          placeholder="9 AM - 6 PM (Mon-Sat)"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Workshop/Studio Address</Label>
                      <Input
                        id="address"
                        value={contactInfo.address}
                        onChange={(e) => updateContactInfo("address", e.target.value)}
                        placeholder="City, State, Country"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Media & Online Presence</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="instagram">Instagram</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                            <Instagram className="h-4 w-4" />
                          </span>
                          <Input
                            id="instagram"
                            value={contactInfo.socialMedia.instagram}
                            onChange={(e) => updateContactInfo("socialMedia", { ...contactInfo.socialMedia, instagram: e.target.value })}
                            placeholder="@username"
                            className="rounded-l-none"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="facebook">Facebook</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                            <Facebook className="h-4 w-4" />
                          </span>
                          <Input
                            id="facebook"
                            value={contactInfo.socialMedia.facebook}
                            onChange={(e) => updateContactInfo("socialMedia", { ...contactInfo.socialMedia, facebook: e.target.value })}
                            placeholder="Page Name"
                            className="rounded-l-none"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="twitter">Twitter</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                            <Twitter className="h-4 w-4" />
                          </span>
                          <Input
                            id="twitter"
                            value={contactInfo.socialMedia.twitter}
                            onChange={(e) => updateContactInfo("socialMedia", { ...contactInfo.socialMedia, twitter: e.target.value })}
                            placeholder="@username"
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Custom Welcome Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={contactInfo.customMessage}
                      onChange={(e) => updateContactInfo("customMessage", e.target.value)}
                      placeholder="Write a personalized message for customers who want to contact you..."
                      rows={4}
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      This message will be shown to customers when they view your contact information.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Visibility</CardTitle>
                    <p className="text-gray-600">Choose what information to share with customers</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      {[
                        { key: "showPhone", label: "Phone Number", icon: Phone },
                        { key: "showEmail", label: "Email Address", icon: Mail },
                        { key: "showWhatsApp", label: "WhatsApp Number", icon: MessageCircle },
                        { key: "showAddress", label: "Workshop Address", icon: MapPin },
                        { key: "showWorkingHours", label: "Working Hours", icon: Clock },
                        { key: "showSocialMedia", label: "Social Media", icon: User }
                      ].map(({ key, label, icon: IconComponent }) => (
                        <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-5 w-5 text-gray-600" />
                            <span className="font-medium">{label}</span>
                          </div>
                          <Switch
                            checked={contactSettings[key as keyof ContactSettings] as boolean}
                            onCheckedChange={(checked) => updateContactSettings(key as keyof ContactSettings, checked)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Privacy Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Require Customer Verification</div>
                        <div className="text-sm text-gray-600">Only verified customers can see your contact details</div>
                      </div>
                      <Switch
                        checked={contactSettings.requireVerification}
                        onCheckedChange={(checked) => updateContactSettings("requireVerification", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Allow Video Calls</div>
                        <div className="text-sm text-gray-600">Enable video consultation requests</div>
                      </div>
                      <Switch
                        checked={contactSettings.allowVideoCall}
                        onCheckedChange={(checked) => updateContactSettings("allowVideoCall", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="automation" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Auto-Response Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Enable Auto-Response</div>
                        <div className="text-sm text-gray-600">Automatically respond to initial customer messages</div>
                      </div>
                      <Switch
                        checked={contactSettings.autoRespond}
                        onCheckedChange={(checked) => updateContactSettings("autoRespond", checked)}
                      />
                    </div>

                    {contactSettings.autoRespond && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Auto-Response Message:</h4>
                        <p className="text-sm text-blue-800 mb-3">
                          "धन्यवाद / Thank you for your interest in my crafts! I'll respond to your message within 2-4 hours. 
                          For urgent queries, please call me directly."
                        </p>
                        <Button variant="outline" size="sm">
                          Customize Message
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Response Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        "Thank you for your interest! I can create custom pieces.",
                        "Shipping usually takes 5-7 business days.",
                        "I offer workshops on weekends. Please let me know your availability.",
                        "Bulk orders get 10-15% discount. Let's discuss!"
                      ].map((template, index) => (
                        <div key={index} className="p-3 border rounded-lg flex items-center justify-between">
                          <span className="text-sm">{template}</span>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        Add New Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex gap-4">
              <Button onClick={generateContactCard} className="bg-orange-600 hover:bg-orange-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Contact Settings
              </Button>
              <Button variant="outline" onClick={() => setShowContactCard(true)}>
                Preview Contact Card
              </Button>
            </div>
          </div>

          {/* Contact Card Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Card Preview</CardTitle>
                <p className="text-gray-600">How customers will see your contact information</p>
              </CardHeader>
              <CardContent>
                {/* Artist Profile */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGFydGlzdHxlbnwxfHx8fDE3NTgyOTAzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
                    <AvatarFallback>PA</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Priya Sharma</h3>
                    <p className="text-sm text-gray-600">Traditional Pottery Artist</p>
                    <Badge className="bg-green-600 text-xs mt-1">Verified</Badge>
                  </div>
                </div>

                {/* Custom Message */}
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-blue-900">{contactInfo.customMessage}</p>
                </div>

                {/* Contact Options */}
                <div className="space-y-3">
                  {contactSettings.showPhone && (
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <Phone className="h-4 w-4 text-green-600" />
                      <div>
                        <div className="text-sm font-medium">Call</div>
                        <div className="text-xs text-gray-600">{contactInfo.phone}</div>
                      </div>
                    </div>
                  )}

                  {contactSettings.showWhatsApp && (
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <MessageCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <div className="text-sm font-medium">WhatsApp</div>
                        <div className="text-xs text-gray-600">Chat directly</div>
                      </div>
                    </div>
                  )}

                  {contactSettings.showEmail && (
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <div>
                        <div className="text-sm font-medium">Email</div>
                        <div className="text-xs text-gray-600">{contactInfo.email}</div>
                      </div>
                    </div>
                  )}

                  {contactSettings.allowVideoCall && (
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <Video className="h-4 w-4 text-purple-600" />
                      <div>
                        <div className="text-sm font-medium">Video Consultation</div>
                        <div className="text-xs text-gray-600">Schedule a call</div>
                      </div>
                    </div>
                  )}

                  {contactSettings.showWorkingHours && (
                    <div className="flex items-center gap-3 p-2">
                      <Clock className="h-4 w-4 text-gray-600" />
                      <div>
                        <div className="text-sm font-medium">Working Hours</div>
                        <div className="text-xs text-gray-600">{contactInfo.workingHours}</div>
                      </div>
                    </div>
                  )}

                  {contactSettings.showAddress && (
                    <div className="flex items-center gap-3 p-2">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <div>
                        <div className="text-sm font-medium">Location</div>
                        <div className="text-xs text-gray-600">{contactInfo.address}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social Media */}
                {contactSettings.showSocialMedia && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm font-medium mb-2">Follow My Work</div>
                    <div className="flex gap-2">
                      {contactInfo.socialMedia.instagram && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <Instagram className="h-3 w-3 mr-1" />
                          Instagram
                        </Button>
                      )}
                      {contactInfo.socialMedia.facebook && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <Facebook className="h-3 w-3 mr-1" />
                          Facebook
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                  <div className="text-xs text-orange-800 text-center">
                    <Shield className="h-3 w-3 inline mr-1" />
                    Your contact details are protected by Kalakaari's privacy policy
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Contact Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Respond to messages within 2-4 hours for better customer satisfaction</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Share your workshop location to build trust with local customers</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Enable video calls for custom order discussions</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Use auto-responses to acknowledge customer inquiries immediately</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
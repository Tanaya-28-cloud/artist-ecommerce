import { useState, useEffect } from "react";
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  Sparkles, 
  Upload, 
  DollarSign, 
  Users,
  ShoppingBag,
  Camera,
  HelpCircle,
  ChevronRight,
  Volume2,
  VolumeX
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface QuickAction {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  action: string;
}

const quickActions: QuickAction[] = [
  {
    id: "upload-help",
    title: "Upload Product",
    icon: Upload,
    description: "Get help uploading your first product",
    action: "upload_product"
  },
  {
    id: "pricing-help",
    title: "Price My Craft",
    icon: DollarSign,
    description: "Get AI-powered pricing suggestions",
    action: "pricing_help"
  },
  {
    id: "photography-tips",
    title: "Photo Tips",
    icon: Camera,
    description: "Learn how to photograph your crafts",
    action: "photography_tips"
  },
  {
    id: "market-help",
    title: "Find Customers",
    icon: Users,
    description: "Learn marketing strategies",
    action: "marketing_help"
  },
  {
    id: "community-guide",
    title: "Join Community",
    icon: MessageCircle,
    description: "Connect with other artists",
    action: "community_guide"
  },
  {
    id: "selling-tips",
    title: "Selling Tips",
    icon: ShoppingBag,
    description: "Maximize your sales potential",
    action: "selling_tips"
  }
];

const predefinedResponses: { [key: string]: { content: string; suggestions?: string[] } } = {
  upload_product: {
    content: "मैं आपकी उत्पाद अपलोड करने में मदद करूंगा! / I'll help you upload your product!\n\n📸 **Step 1: Take Great Photos**\n• Use natural lighting (near a window)\n• Clean background (white cloth works best)\n• Multiple angles (front, back, close-ups)\n• Show size reference (coin or ruler)\n\n📝 **Step 2: Product Details**\n• Choose correct category\n• Write detailed description\n• Mention materials used\n• Add cultural significance\n\n💰 **Step 3: Pricing**\n• Use our AI Price Analyzer\n• Consider material costs\n• Factor in your time and skill\n\nShall I guide you through uploading your first product?",
    suggestions: ["Start Product Upload", "Photography Tips", "Pricing Guide", "Category Help"]
  },
  pricing_help: {
    content: "आइए आपके शिल्प की सही कीमत निर्धारित करें! / Let's determine the right price for your craft!\n\n🎯 **AI Price Analysis considers:**\n• Product category and materials\n• Size and complexity\n• Your experience level\n• Current market demand\n• Regional pricing trends\n\n💡 **Pricing Formula:**\n**Material Cost + Labor Cost + Profit Margin = Final Price**\n\n📊 **Our AI suggests:**\n• Competitive pricing range\n• Profit margin optimization\n• Seasonal adjustments\n• Premium positioning strategies\n\nWould you like me to analyze pricing for a specific product?",
    suggestions: ["Analyze My Product", "Pricing Formula", "Market Comparison", "Profit Margins"]
  },
  photography_tips: {
    content: "सुंदर तस्वीरें लेना सीखें! / Learn to take beautiful photos!\n\n📸 **Golden Rules:**\n\n🌞 **Lighting**\n• Natural light is best (avoid flash)\n• Golden hour: 1-2 hours before sunset\n• Near a large window for indoor shots\n\n🎨 **Composition**\n• Clean, neutral background\n• Rule of thirds positioning\n• Show different angles\n• Include size reference\n\n🔍 **Detail Shots**\n• Close-ups of intricate work\n• Texture and material quality\n• Craftsmanship details\n• Process shots (if available)\n\n📱 **Equipment Tips**\n• Phone camera is sufficient\n• Use portrait mode for depth\n• Clean your lens first!\n• Take multiple shots\n\nNeed help with specific photography challenges?",
    suggestions: ["Lighting Setup", "Background Ideas", "Mobile Photography", "Detail Shots"]
  },
  marketing_help: {
    content: "ग्राहकों तक पहुंचने की रणनीति! / Strategies to reach customers!\n\n🎯 **Find Your Audience:**\n• Art collectors and enthusiasts\n• Cultural heritage lovers\n• Interior designers\n• Gift buyers\n• Wedding planners\n\n📱 **Marketing Channels:**\n• Kalakaari Community (start here!)\n• Artist Reels (show your process)\n• Social media sharing\n• Local craft fairs\n• Word of mouth\n\n💬 **Customer Engagement:**\n• Share your story and heritage\n• Explain traditional techniques\n• Offer customization options\n• Respond quickly to inquiries\n• Build personal connections\n\n🌟 **Stand Out:**\n• Get verified artist badge\n• Share video tutorials\n• Collaborate with other artists\n• Highlight uniqueness\n\nWhich marketing area would you like to focus on?",
    suggestions: ["Social Media Tips", "Story Telling", "Customer Service", "Verification Process"]
  },
  community_guide: {
    content: "कलाकार समुदाय में शामिल हों! / Join the artist community!\n\n👥 **Community Benefits:**\n• Connect with fellow artists\n• Learn from master craftsmen\n• Share experiences and tips\n• Find mentorship opportunities\n• Collaborate on projects\n\n🎓 **Learning Opportunities:**\n• Live workshops and tutorials\n• Traditional technique sessions\n• Business skills training\n• Digital marketing workshops\n• Photography masterclasses\n\n🤝 **Networking:**\n• Mentor-mentee matching\n• Regional artist groups\n• Skill exchange programs\n• Joint exhibitions\n• Bulk material purchasing\n\n💡 **Share & Learn:**\n• Post your work progress\n• Ask for feedback\n• Share technique videos\n• Help other artists\n• Celebrate achievements\n\nReady to join our vibrant community?",
    suggestions: ["Find Mentors", "Join Workshops", "Share My Work", "Connect Locally"]
  },
  selling_tips: {
    content: "बिक्री बढ़ाने के गुर! / Secrets to boost your sales!\n\n💰 **Maximize Sales:**\n\n🏷️ **Product Optimization**\n• High-quality photos (5+ images)\n• Detailed descriptions with story\n• Proper categorization\n• Competitive pricing\n• Clear shipping information\n\n🎯 **Customer Experience**\n• Quick response to queries\n• Flexible customization options\n• Secure packaging\n• Thank you notes\n• Follow-up for feedback\n\n📈 **Growth Strategies**\n• Bundle related products\n• Seasonal collections\n• Limited edition pieces\n• Craft process videos\n• Customer testimonials\n\n🌟 **Build Trust**\n• Get verified artist status\n• Showcase certifications\n• Share your workshop/studio\n• Customer reviews\n• Transparent policies\n\nWhich area would you like to improve first?",
    suggestions: ["Product Photography", "Customer Service", "Pricing Strategy", "Trust Building"]
  }
};

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "hi">("en");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        type: "assistant",
        content: currentLanguage === "hi" 
          ? "नमस्ते! मैं आपका AI सहायक हूं। कलाकारी प्लेटफॉर्म पर आपकी मदद के लिए यहां हूं। आप मुझसे हिंदी या अंग्रेजी में बात कर सकते हैं।"
          : "Hello! I'm your AI assistant for Kalakaari. I'm here to help you navigate the platform, upload products, price your crafts, and grow your business. How can I assist you today?",
        timestamp: new Date(),
        suggestions: ["Help me upload a product", "Price my craft", "Photography tips", "Join community"]
      };
      setMessages([welcomeMessage]);
    }
  }, [currentLanguage]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateAIResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      // Voice synthesis if enabled
      if (isVoiceEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response.content);
        utterance.lang = currentLanguage === "hi" ? "hi-IN" : "en-US";
        speechSynthesis.speak(utterance);
      }
    }, 1500);
  };

  const generateAIResponse = (input: string): { content: string; suggestions?: string[] } => {
    const lowerInput = input.toLowerCase();
    
    // Check for predefined responses
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerInput.includes(key.replace('_', ' ')) || 
          lowerInput.includes(key.split('_')[0]) ||
          input === response.suggestions?.find(s => s.toLowerCase().includes(key.split('_')[0]))) {
        return response;
      }
    }

    // Check for common keywords
    if (lowerInput.includes('upload') || lowerInput.includes('add product')) {
      return predefinedResponses.upload_product;
    }
    if (lowerInput.includes('price') || lowerInput.includes('cost')) {
      return predefinedResponses.pricing_help;
    }
    if (lowerInput.includes('photo') || lowerInput.includes('image')) {
      return predefinedResponses.photography_tips;
    }
    if (lowerInput.includes('sell') || lowerInput.includes('customer')) {
      return predefinedResponses.selling_tips;
    }
    if (lowerInput.includes('community') || lowerInput.includes('connect')) {
      return predefinedResponses.community_guide;
    }

    // Default response
    return {
      content: currentLanguage === "hi"
        ? "मैं समझ गया। आइए मैं इसमें आपकी मदद करूं। कृपया अधिक विवरण बताएं या नीचे दिए गए सुझावों में से कोई एक चुनें।"
        : "I understand. Let me help you with that. Could you provide more details, or choose from the suggestions below?",
      suggestions: ["Upload Product", "Pricing Help", "Photography Tips", "Marketing Guidance", "Community Support"]
    };
  };

  const handleQuickAction = (action: string) => {
    const response = predefinedResponses[action];
    if (response) {
      const assistantMessage: Message = {
        id: Date.now().toString(),
        type: "assistant",
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
      };
      setMessages(prev => [...prev, assistantMessage]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Floating Assistant Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-orange-600 hover:bg-orange-700 shadow-lg z-50"
          size="sm"
        >
          <Bot className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* AI Assistant Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] z-50 shadow-2xl flex flex-col">
          <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">Kalakaari AI</CardTitle>
                  <p className="text-sm text-orange-100">आपका कला सहायक / Your Art Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentLanguage(currentLanguage === "en" ? "hi" : "en")}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  {currentLanguage === "en" ? "हि" : "En"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="p-4 border-b bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  {currentLanguage === "hi" ? "तुरंत मदद पाएं:" : "Quick Help:"}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.slice(0, 4).map((action) => {
                    const IconComponent = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.action)}
                        className="p-2 text-left border rounded-lg hover:bg-white hover:shadow-sm transition-all text-xs"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <IconComponent className="h-3 w-3 text-orange-600" />
                          <span className="font-medium text-gray-900">{action.title}</span>
                        </div>
                        <p className="text-gray-600 text-xs">{action.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${message.type === "user" 
                    ? "bg-orange-600 text-white rounded-lg rounded-br-sm" 
                    : "bg-gray-100 text-gray-900 rounded-lg rounded-bl-sm"} p-3`}>
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    {message.suggestions && (
                      <div className="mt-3 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left text-xs p-2 bg-white/10 rounded border hover:bg-white/20 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span>{suggestion}</span>
                              <ChevronRight className="h-3 w-3" />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg rounded-bl-sm p-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputText)}
                  placeholder={currentLanguage === "hi" ? "अपना सवाल पूछें..." : "Ask your question..."}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
                <Button
                  onClick={() => handleSendMessage(inputText)}
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700 px-3"
                  disabled={!inputText.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
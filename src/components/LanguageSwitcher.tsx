import { useState, createContext, useContext, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

type Language = "en" | "hi" | "bn" | "ta" | "te" | "ml" | "kn" | "gu" | "mr" | "or";

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" }
];

// Translation database
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.categories": "Categories",
    "nav.artists": "Artists",
    "nav.community": "Community",
    "nav.dashboard": "Dashboard",
    "nav.upload": "Upload Product",
    "nav.signin": "Sign In",
    "nav.signup": "Sign Up",
    
    // Common
    "common.loading": "Loading...",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.view_all": "View All",
    "common.see_more": "See More",
    "common.back": "Back",
    "common.continue": "Continue",
    "common.submit": "Submit",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.share": "Share",
    "common.like": "Like",
    "common.comment": "Comment",
    
    // Hero Section
    "hero.title": "Authentic Indian Crafts",
    "hero.subtitle": "Directly from Artisans",
    "hero.description": "Discover handcrafted treasures made by skilled Indian artists. Every purchase supports traditional craftsmanship and preserves cultural heritage.",
    "hero.cta.explore": "Explore Crafts",
    "hero.cta.become_artist": "Become an Artist",
    
    // Categories
    "categories.title": "Craft Categories",
    "categories.pottery": "Pottery & Ceramics",
    "categories.textiles": "Textiles & Fabrics",
    "categories.jewelry": "Jewelry & Accessories",
    "categories.paintings": "Paintings & Art",
    "categories.woodcraft": "Wood & Bamboo Crafts",
    "categories.metalcraft": "Metal Crafts",
    "categories.toys": "Traditional Toys",
    "categories.homedecor": "Home Decor",
    
    // Product
    "product.price": "Price",
    "product.add_to_cart": "Add to Cart",
    "product.buy_now": "Buy Now",
    "product.in_stock": "In Stock",
    "product.out_of_stock": "Out of Stock",
    "product.shipping": "Shipping",
    "product.reviews": "Reviews",
    "product.description": "Description",
    "product.specifications": "Specifications",
    
    // Artist
    "artist.verified": "Verified Artist",
    "artist.experience": "Experience",
    "artist.location": "Location",
    "artist.specialization": "Specialization",
    "artist.contact": "Contact Artist",
    "artist.view_profile": "View Profile",
    "artist.view_products": "View Products",
    
    // Auth
    "auth.welcome": "Welcome to Kalakaari",
    "auth.customer": "I'm a Customer",
    "auth.artist": "I'm an Artist",
    "auth.signin": "Sign In",
    "auth.signup": "Sign Up",
    "auth.email": "Email Address",
    "auth.password": "Password",
    "auth.name": "Full Name",
    "auth.phone": "Phone Number",
    
    // AI Assistant
    "ai.title": "AI Assistant",
    "ai.subtitle": "Your Art Guide",
    "ai.welcome": "Hello! I'm your AI assistant for Kalakaari. How can I help you today?",
    "ai.placeholder": "Ask your question...",
    
    // Verification
    "verification.title": "Artist Verification",
    "verification.subtitle": "Get verified to gain customer trust",
    "verification.personal_info": "Personal Information",
    "verification.artist_profile": "Artist Profile",
    "verification.documents": "Documents",
    "verification.portfolio": "Portfolio",
    "verification.review": "Review & Submit"
  },
  
  hi: {
    // Navigation
    "nav.home": "घर",
    "nav.categories": "श्रेणियां",
    "nav.artists": "कलाकार",
    "nav.community": "समुदाय",
    "nav.dashboard": "डैशबोर्ड",
    "nav.upload": "उत्पाद अपलोड करें",
    "nav.signin": "साइन इन",
    "nav.signup": "साइन अप",
    
    // Common
    "common.loading": "लोड हो रहा है...",
    "common.search": "खोजें",
    "common.filter": "फ़िल्टर",
    "common.sort": "क्रमबद्ध करें",
    "common.view_all": "सभी देखें",
    "common.see_more": "और देखें",
    "common.back": "वापस",
    "common.continue": "जारी रखें",
    "common.submit": "जमा करें",
    "common.cancel": "रद्द करें",
    "common.save": "सेव करें",
    "common.edit": "संपादित करें",
    "common.delete": "हटाएं",
    "common.share": "साझा करें",
    "common.like": "पसंद",
    "common.comment": "टिप्पणी",
    
    // Hero Section
    "hero.title": "प्रामाणिक भारतीय शिल्प",
    "hero.subtitle": "सीधे कलाकारों से",
    "hero.description": "कुशल भारतीय कलाकारों द्वारा बनाए गए हस्तशिल्प खजाने की खोज करें। हर खरीदारी पारंपरिक शिल्प कौशल का समर्थन करती है और सांस्कृतिक विरासत को संरक्षित करती है।",
    "hero.cta.explore": "शिल्प देखें",
    "hero.cta.become_artist": "कलाकार बनें",
    
    // Categories
    "categories.title": "शिल्प श्रेणियां",
    "categories.pottery": "मिट्टी के बर्तन और सिरेमिक",
    "categories.textiles": "वस्त्र और कपड़े",
    "categories.jewelry": "आभूषण और सहायक उपकरण",
    "categories.paintings": "चित्रकारी और कला",
    "categories.woodcraft": "लकड़ी और बांस का काम",
    "categories.metalcraft": "धातु शिल्प",
    "categories.toys": "पारंपरिक खिलौने",
    "categories.homedecor": "घर की सजावट",
    
    // Product
    "product.price": "मूल्य",
    "product.add_to_cart": "कार्ट में जोड़ें",
    "product.buy_now": "अभी खरीदें",
    "product.in_stock": "स्टॉक में",
    "product.out_of_stock": "स्टॉक में नहीं",
    "product.shipping": "शिपिंग",
    "product.reviews": "समीक्षाएं",
    "product.description": "विवरण",
    "product.specifications": "विशेषताएं",
    
    // Artist
    "artist.verified": "सत्यापित कलाकार",
    "artist.experience": "अनुभव",
    "artist.location": "स्थान",
    "artist.specialization": "विशेषज्ञता",
    "artist.contact": "कलाकार से संपर्क करें",
    "artist.view_profile": "प्रोफ़ाइल देखें",
    "artist.view_products": "उत्पाद देखें",
    
    // Auth
    "auth.welcome": "कलाकारी में स्वागत है",
    "auth.customer": "मैं एक ग्राहक हूं",
    "auth.artist": "मैं एक कलाकार हूं",
    "auth.signin": "साइन इन",
    "auth.signup": "साइन अप",
    "auth.email": "ईमेल पता",
    "auth.password": "पासवर्ड",
    "auth.name": "पूरा नाम",
    "auth.phone": "फोन नंबर",
    
    // AI Assistant
    "ai.title": "AI सहायक",
    "ai.subtitle": "आपका कला गाइड",
    "ai.welcome": "नमस्ते! मैं कलाकारी के लिए आपका AI सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    "ai.placeholder": "अपना प्रश्न पूछें...",
    
    // Verification
    "verification.title": "कलाकार सत्यापन",
    "verification.subtitle": "ग्राहकों का भरोसा पाने के लिए सत्यापित हों",
    "verification.personal_info": "व्यक्तिगत जानकारी",
    "verification.artist_profile": "कलाकार प्रोफ़ाइल",
    "verification.documents": "दस्तावेज",
    "verification.portfolio": "पोर्टफोलियो",
    "verification.review": "समीक्षा और जमा करें"
  },
  
  bn: {
    // Basic translations for Bengali
    "nav.home": "হোম",
    "nav.categories": "ক্যাটেগরি",
    "nav.artists": "শিল্পী",
    "nav.community": "কমিউনিটি",
    "hero.title": "প্রামাণিক ভারতীয় হস্তশিল্প",
    "hero.subtitle": "সরাসরি শিল্পীদের থেকে",
    "common.loading": "লোড হচ্ছে...",
    "common.search": "অনুসন্ধান",
    "ai.welcome": "হ্যালো! আমি কালাকারির জন্য আপনার AI সহায়ক। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?"
  },
  
  ta: {
    // Basic translations for Tamil
    "nav.home": "முகப்பு",
    "nav.categories": "வகைகள்",
    "nav.artists": "கலைஞர்கள்",
    "nav.community": "சமூகம்",
    "hero.title": "உண்மையான இந்திய கைவினைப்பொருட்கள்",
    "hero.subtitle": "நேரடியாக கலைஞர்களிடமிருந்து",
    "common.loading": "ஏற்றுகிறது...",
    "common.search": "தேடு",
    "ai.welcome": "வணக்கம்! நான் கலாகாரிக்கான உங்கள் AI உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?"
  },
  
  te: {
    // Basic translations for Telugu  
    "nav.home": "హోమ్",
    "nav.categories": "వర్గాలు",
    "nav.artists": "కళాకారులు",
    "nav.community": "కమ్యూనిటీ",
    "hero.title": "ప్రామాణిక భారతీయ హస్తకళలు",
    "hero.subtitle": "నేరుగా కళాకారుల నుండి",
    "common.loading": "లోడ్ అవుతోంది...",
    "common.search": "వెతకండి",
    "ai.welcome": "హలో! నేను కలాకారి కోసం మీ AI సహాయకుడు. ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?"
  },
  
  ml: {
    // Basic translations for Malayalam
    "nav.home": "ഹോം",
    "nav.categories": "വിഭാഗങ്ങൾ", 
    "nav.artists": "കലാകാരന്മാർ",
    "nav.community": "കമ്മ്യൂണിറ്റി",
    "hero.title": "ആധികാരിക ഇന്ത്യൻ കരകൗശലവസ്തുക്കൾ",
    "hero.subtitle": "നേരിട്ട് കലാകാരന്മാരിൽ നിന്ന്",
    "common.loading": "ലോഡ് ചെയ്യുന്നു...",
    "common.search": "തിരയുക",
    "ai.welcome": "ഹലോ! ഞാൻ കലാകാരിയുടെ നിങ്ങളുടെ AI സഹായകനാണ്. ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?"
  },
  
  kn: {
    // Basic translations for Kannada
    "nav.home": "ಮುಖಪುಟ",
    "nav.categories": "ವರ್ಗಗಳು",
    "nav.artists": "ಕಲಾವಿದರು", 
    "nav.community": "ಸಮುದಾಯ",
    "hero.title": "ಅಧಿಕೃತ ಭಾರತೀಯ ಕರಕುಶಲ",
    "hero.subtitle": "ನೇರವಾಗಿ ಕಲಾವಿದರಿಂದ",
    "common.loading": "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    "common.search": "ಹುಡುಕಿ",
    "ai.welcome": "ಹಲೋ! ನಾನು ಕಲಾಕಾರಿಗಾಗಿ ನಿಮ್ಮ AI ಸಹಾಯಕ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?"
  },
  
  gu: {
    // Basic translations for Gujarati
    "nav.home": "ઘર",
    "nav.categories": "વર્ગો",
    "nav.artists": "કલાકારો",
    "nav.community": "સમુદાય", 
    "hero.title": "અધિકૃત ભારતીય હસ્તકલા",
    "hero.subtitle": "સીધા કલાકારો પાસેથી",
    "common.loading": "લોડ થઈ રહ્યું છે...",
    "common.search": "શોધો",
    "ai.welcome": "હેલો! હું કલાકારી માટે તમારો AI સહાયક છું. આજે હું તમારી કેવી રીતે મદદ કરી શકું?"
  },
  
  mr: {
    // Basic translations for Marathi
    "nav.home": "मुख्यपृष्ठ",
    "nav.categories": "श्रेणी",
    "nav.artists": "कलाकार",
    "nav.community": "समुदाय",
    "hero.title": "अस्सल भारतीय हस्तकला",
    "hero.subtitle": "थेट कलाकारांकडून",
    "common.loading": "लोड होत आहे...",
    "common.search": "शोधा",
    "ai.welcome": "नमस्कार! मी कलाकारीसाठी तुमचा AI सहाय्यक आहे. आज मी तुमची कशी मदत करू शकतो?"
  },
  
  or: {
    // Basic translations for Odia
    "nav.home": "ଘର",
    "nav.categories": "ବର୍ଗଗୁଡିକ",
    "nav.artists": "କଳାକାରମାନେ",
    "nav.community": "ସମ୍ପ୍ରଦାୟ",
    "hero.title": "ପ୍ରାମାଣିକ ଭାରତୀୟ ହସ୍ତଶିଳ୍ପ",
    "hero.subtitle": "ସିଧାସଳଖ କଳାକାରମାନଙ୍କଠାରୁ",
    "common.loading": "ଲୋଡ଼ ହେଉଛି...",
    "common.search": "ଖୋଜନ୍ତୁ",
    "ai.welcome": "ନମସ୍କାର! ମୁଁ କଳାକାରୀ ପାଇଁ ଆପଣଙ୍କର AI ସହାୟକ। ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?"
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem("kalakaari-language") as Language;
    if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Auto-detect based on browser language
      const browserLang = navigator.language.split("-")[0] as Language;
      if (translations[browserLang]) {
        setCurrentLanguage(browserLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem("kalakaari-language", lang);
  };

  const t = (key: string, fallback?: string): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || fallback || key;
  };

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useLanguage();
  
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLang?.nativeName}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code as Language)}
            className={`flex items-center justify-between ${
              currentLanguage === language.code ? "bg-orange-50 text-orange-600" : ""
            }`}
          >
            <div>
              <div className="font-medium">{language.nativeName}</div>
              <div className="text-xs text-gray-500">{language.name}</div>
            </div>
            {currentLanguage === language.code && (
              <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
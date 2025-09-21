import { useState, Suspense, lazy, useEffect } from "react";
import { Button } from "./components/ui/button";
import { SimpleWelcome } from "./components/SimpleWelcome";
import { AIAssistant } from "./components/AIAssistant";
import { LanguageProvider } from "./components/LanguageSwitcher";

// Lazy load components to reduce initial bundle size
const Header = lazy(() => import("./components/Header").then(module => ({ default: module.Header })));
const Hero = lazy(() => import("./components/Hero").then(module => ({ default: module.Hero })));
const Categories = lazy(() => import("./components/Categories").then(module => ({ default: module.Categories })));
const FeaturedProducts = lazy(() => import("./components/FeaturedProducts").then(module => ({ default: module.FeaturedProducts })));
const ArtistSpotlight = lazy(() => import("./components/ArtistSpotlight").then(module => ({ default: module.ArtistSpotlight })));
const CommunityFeatures = lazy(() => import("./components/CommunityFeatures").then(module => ({ default: module.CommunityFeatures })));
const Footer = lazy(() => import("./components/Footer").then(module => ({ default: module.Footer })));
const ArtistDashboard = lazy(() => import("./components/ArtistDashboard").then(module => ({ default: module.ArtistDashboard })));
const ArtistProductUpload = lazy(() => import("./components/ArtistProductUpload").then(module => ({ default: module.ArtistProductUpload })));
const ArtistCommunity = lazy(() => import("./components/ArtistCommunity").then(module => ({ default: module.ArtistCommunity })));
const ArtistNavigation = lazy(() => import("./components/ArtistNavigation").then(module => ({ default: module.ArtistNavigation })));
const AuthFlow = lazy(() => import("./components/AuthFlow").then(module => ({ default: module.AuthFlow })));
const ArtistVerification = lazy(() => import("./components/ArtistVerification").then(module => ({ default: module.ArtistVerification })));
const MarketPriceAnalyzer = lazy(() => import("./components/MarketPriceAnalyzer").then(module => ({ default: module.MarketPriceAnalyzer })));
const ArtistReels = lazy(() => import("./components/ArtistReels").then(module => ({ default: module.ArtistReels })));
const ContactSharing = lazy(() => import("./components/ContactSharing").then(module => ({ default: module.ContactSharing })));
const GamificationSystem = lazy(() => import("./components/GamificationSystem").then(module => ({ default: module.GamificationSystem })));
const AIPhotoEnhancer = lazy(() => import("./components/AIPhotoEnhancer").then(module => ({ default: module.AIPhotoEnhancer })));
const ImageAuthenticityChecker = lazy(() => import("./components/ImageAuthenticityChecker").then(module => ({ default: module.ImageAuthenticityChecker })));
const PaymentIntegration = lazy(() => import("./components/PaymentIntegration").then(module => ({ default: module.PaymentIntegration })));
const AdminDashboard = lazy(() => import("./components/AdminDashboard").then(module => ({ default: module.AdminDashboard })));
const ARPreview = lazy(() => import("./components/ARPreview").then(module => ({ default: module.ARPreview })));
const GlobalBuyerMode = lazy(() => import("./components/GlobalBuyerMode").then(module => ({ default: module.GlobalBuyerMode })));

type UserType = "customer" | "artist" | null;
type ViewType = "auth" | "marketplace" | "artist-nav" | "dashboard" | "upload" | "community" | "verification" | "pricing" | "reels" | "contact" | "gamification" | "photo-enhancer" | "authenticity" | "payment" | "admin" | "ar-preview" | "global-buyer";

interface UserData {
  name: string;
  email: string;
  artCategories?: string[];
  bio?: string;
}

// Loading component
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl text-gray-900 mb-2">Loading Kalakaari...</h2>
        <p className="text-gray-600">कलाकारी Artisan Connect</p>
      </div>
    </div>
  );
}

export default function App() {
  const [userType, setUserType] = useState<UserType>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>("auth");
  const [useSimpleAuth, setUseSimpleAuth] = useState(true);

  // For demo purposes, add a simple navigation
  const [showDemo, setShowDemo] = useState(false);

  const handleAuthComplete = (type: UserType, data?: UserData) => {
    setUserType(type);
    setUserData(data || { name: type === "customer" ? "Customer" : "Artist", email: "demo@example.com" });
    
    if (type === "customer") {
      setCurrentView("marketplace");
    } else {
      setCurrentView("artist-nav");
    }
  };

  const handleSimpleUserSelect = (type: "customer" | "artist") => {
    handleAuthComplete(type, {
      name: type === "customer" ? "Demo Customer" : "Demo Artist",
      email: "demo@example.com",
      artCategories: type === "artist" ? ["Pottery & Ceramics", "Textiles"] : undefined
    });
  };

  const handleLogout = () => {
    setUserType(null);
    setUserData(null);
    setCurrentView("auth");
    setShowDemo(false);
  };

  const handleArtistViewChange = (view: string) => {
    setCurrentView(view as ViewType);
  };

  // Define all demo views in order for navigation
  const demoViews: { view: ViewType; label: string }[] = [
    { view: "marketplace", label: "Customer View" },
    { view: "dashboard", label: "Artist Dashboard" },
    { view: "upload", label: "Upload Product" },
    { view: "community", label: "Community" },
    { view: "verification", label: "Verification" },
    { view: "pricing", label: "Price Analyzer" },
    { view: "reels", label: "Artist Reels" },
    { view: "gamification", label: "Badges" },
    { view: "photo-enhancer", label: "Photo AI" },
    { view: "authenticity", label: "Authenticity Check" },
    { view: "ar-preview", label: "AR Preview" },
    { view: "payment", label: "Payment" },
    { view: "global-buyer", label: "Global Buyer" },
    { view: "admin", label: "Admin" }
  ];

  const currentIndex = demoViews.findIndex(item => item.view === currentView);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < demoViews.length - 1;

  const goToPrevious = () => {
    if (canGoPrevious) {
      setCurrentView(demoViews[currentIndex - 1].view);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      setCurrentView(demoViews[currentIndex + 1].view);
    }
  };

  // Keyboard navigation for demo mode
  useEffect(() => {
    if (!showDemo) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle if not typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        goToNext();
      } else if (event.key === "Escape") {
        event.preventDefault();
        setShowDemo(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showDemo, currentIndex, canGoPrevious, canGoNext]);

  // Demo mode for quick testing
  if (showDemo) {

    return (
      <div className="min-h-screen bg-white">
        {/* Demo Navigation */}
        <div className="bg-gray-100 border-b">
          <div className="max-w-7xl mx-auto px-4 py-2">
            {/* Navigation Controls */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevious}
                  disabled={!canGoPrevious}
                  className="flex items-center gap-1"
                >
                  ← Previous
                </Button>
                <span className="text-sm text-gray-600">
                  {currentIndex + 1} of {demoViews.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNext}
                  disabled={!canGoNext}
                  className="flex items-center gap-1"
                >
                  Next →
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Current: {demoViews[currentIndex]?.label || 'Unknown'}
                </span>
                <div className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                  Use ← → keys or Esc to exit
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDemo(false)}
                >
                  Back to Auth
                </Button>
              </div>
            </div>

            {/* View Buttons */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {demoViews.map((item, index) => (
                <Button
                  key={item.view}
                  variant={currentView === item.view ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView(item.view)}
                  className="text-xs"
                >
                  {index + 1}. {item.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          {currentView === "marketplace" && (
            <div>
              <Header />
              <Hero />
              <Categories />
              <FeaturedProducts />
              <ArtistSpotlight />
              <CommunityFeatures />
              <Footer />
            </div>
          )}
          {currentView === "dashboard" && <ArtistDashboard />}
          {currentView === "upload" && <ArtistProductUpload />}
          {currentView === "community" && <ArtistCommunity />}
          {currentView === "verification" && <ArtistVerification />}
          {currentView === "pricing" && <MarketPriceAnalyzer />}
          {currentView === "reels" && <ArtistReels />}
          {currentView === "contact" && <ContactSharing />}
          {currentView === "gamification" && <GamificationSystem />}
          {currentView === "photo-enhancer" && <AIPhotoEnhancer />}
          {currentView === "authenticity" && <ImageAuthenticityChecker />}
          {currentView === "payment" && <PaymentIntegration />}
          {currentView === "admin" && <AdminDashboard />}
          {currentView === "ar-preview" && <ARPreview />}
          {currentView === "global-buyer" && <GlobalBuyerMode />}
        </Suspense>
      </div>
    );
  }

  const renderView = () => {
    try {
      switch (currentView) {
        case "auth":
          return useSimpleAuth ? (
            <SimpleWelcome onUserTypeSelect={handleSimpleUserSelect} />
          ) : (
            <Suspense fallback={<LoadingSpinner />}>
              <AuthFlow onAuthComplete={handleAuthComplete} />
            </Suspense>
          );
        
        case "marketplace":
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <div className="min-h-screen bg-white">
                <Header />
                <Hero />
                <Categories />
                <FeaturedProducts />
                <ArtistSpotlight />
                <CommunityFeatures />
                <Footer />
              </div>
            </Suspense>
          );
        
        case "artist-nav":
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <ArtistNavigation
                currentView=""
                onViewChange={handleArtistViewChange}
                onLogout={handleLogout}
                artistData={{
                  name: userData?.name || "",
                  artCategories: userData?.artCategories || [],
                  avatar: undefined
                }}
              />
            </Suspense>
          );
        
        case "dashboard":
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <ArtistDashboard />
            </Suspense>
          );
        
        case "upload":
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <ArtistProductUpload />
            </Suspense>
          );
        
        case "community":
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <ArtistCommunity />
            </Suspense>
          );
        
        case "verification":
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <ArtistVerification />
            </Suspense>
          );
        
        case "pricing":
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <MarketPriceAnalyzer />
            </Suspense>
          );
        
        case "reels":
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <ArtistReels />
            </Suspense>
          );
        
        case "contact":
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <ContactSharing />
            </Suspense>
          );
        
        case "gamification":
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <GamificationSystem />
            </Suspense>
          );
        
        case "photo-enhancer":
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <AIPhotoEnhancer />
            </Suspense>
          );
        
        case "authenticity":
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <ImageAuthenticityChecker />
            </Suspense>
          );
        
        case "payment":
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <PaymentIntegration />
            </Suspense>
          );
        
        case "admin":
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <AdminDashboard />
            </Suspense>
          );
        
        case "ar-preview":
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <ARPreview />
            </Suspense>
          );
        
        case "global-buyer":
          return (
            <Suspense fallback={<LoadingSpinner />}>
              <GlobalBuyerMode />
            </Suspense>
          );
        
        default:
          return useSimpleAuth ? (
            <SimpleWelcome onUserTypeSelect={handleSimpleUserSelect} />
          ) : (
            <Suspense fallback={<LoadingSpinner />}>
              <AuthFlow onAuthComplete={handleAuthComplete} />
            </Suspense>
          );
      }
    } catch (error) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl text-gray-900 mb-4">Something went wrong</h2>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        {/* Quick Demo Access */}
        {!userType && currentView === "auth" && (
          <div className="fixed top-4 right-4 z-40 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDemo(true)}
              className="bg-white/90 backdrop-blur-sm"
            >
              Quick Demo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUseSimpleAuth(!useSimpleAuth)}
              className="bg-white/90 backdrop-blur-sm"
            >
              {useSimpleAuth ? "Full Auth" : "Simple Auth"}
            </Button>
          </div>
        )}
        
        {renderView()}
        
        {/* AI Assistant - Available on all pages */}
        <AIAssistant />
      </div>
    </LanguageProvider>
  );
}
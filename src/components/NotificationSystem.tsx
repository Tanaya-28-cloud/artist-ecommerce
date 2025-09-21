import { useState, useEffect } from "react";
import { 
  Bell, 
  X, 
  CheckCircle, 
  Star, 
  MessageCircle, 
  ShoppingBag, 
  Award,
  TrendingUp,
  Heart,
  DollarSign,
  Users,
  Settings,
  Eye,
  EyeOff
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Notification {
  id: string;
  type: "verification" | "sale" | "review" | "message" | "achievement" | "system" | "engagement";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  icon: React.ComponentType<{ className?: string }>;
  priority: "low" | "medium" | "high";
  data?: any;
}

interface NotificationSettings {
  email: {
    sales: boolean;
    reviews: boolean;
    messages: boolean;
    achievements: boolean;
    system: boolean;
  };
  push: {
    sales: boolean;
    reviews: boolean;
    messages: boolean;
    achievements: boolean;
    system: boolean;
  };
  frequency: "instant" | "daily" | "weekly";
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "verification",
      title: "Verification Approved!",
      message: "Congratulations! Your artist verification has been approved. You now have a verified badge.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      icon: CheckCircle,
      priority: "high"
    },
    {
      id: "2",
      type: "sale",
      title: "New Order Received",
      message: "You received a new order for 'Traditional Pottery Vase' worth ₹2,500",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      icon: ShoppingBag,
      priority: "high",
      data: { amount: 2500, product: "Traditional Pottery Vase" }
    },
    {
      id: "3",
      type: "review",
      title: "New 5-Star Review",
      message: "Priya left a 5-star review: 'Beautiful craftsmanship! Exactly as described.'",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      read: false,
      icon: Star,
      priority: "medium",
      data: { rating: 5, reviewer: "Priya" }
    },
    {
      id: "4",
      type: "message",
      title: "Customer Inquiry",
      message: "Rahul Kumar sent you a message about custom pottery orders",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      read: true,
      icon: MessageCircle,
      priority: "medium"
    },
    {
      id: "5",
      type: "achievement",
      title: "Badge Earned: Top Seller",
      message: "You've earned the 'Top Seller' badge for being in the top 10% of sales this month!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      icon: Award,
      priority: "low"
    },
    {
      id: "6",
      type: "engagement",
      title: "Product Liked",
      message: "Your 'Handwoven Silk Scarf' received 10 new likes today",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
      icon: Heart,
      priority: "low",
      data: { likes: 10, product: "Handwoven Silk Scarf" }
    }
  ]);

  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      sales: true,
      reviews: true,
      messages: true,
      achievements: false,
      system: true
    },
    push: {
      sales: true,
      reviews: true,
      messages: true,
      achievements: true,
      system: false
    },
    frequency: "instant",
    quietHours: {
      enabled: true,
      start: "22:00",
      end: "07:00"
    }
  });

  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getFilteredNotifications = () => {
    if (selectedTab === "all") return notifications;
    if (selectedTab === "unread") return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === selectedTab);
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return timestamp.toLocaleDateString();
  };

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high": return "border-l-red-500";
      case "medium": return "border-l-yellow-500";
      case "low": return "border-l-blue-500";
      default: return "border-l-gray-300";
    }
  };

  const updateEmailSetting = (key: keyof NotificationSettings["email"], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      email: { ...prev.email, [key]: value }
    }));
  };

  const updatePushSetting = (key: keyof NotificationSettings["push"], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      push: { ...prev.push, [key]: value }
    }));
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance every 10 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: "engagement",
          title: "New Like",
          message: "Someone liked your pottery collection!",
          timestamp: new Date(),
          read: false,
          icon: Heart,
          priority: "low"
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center p-0">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Panel */}
      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button size="sm" variant="ghost" onClick={markAllAsRead}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark all read
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setShowNotifications(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <TabsList className="grid w-full grid-cols-4 text-xs">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="sale">Sales</TabsTrigger>
                <TabsTrigger value="review">Reviews</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={selectedTab} className="m-0">
              <div className="max-h-96 overflow-y-auto">
                {getFilteredNotifications().length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {getFilteredNotifications().map((notification) => {
                      const IconComponent = notification.icon;
                      return (
                        <div
                          key={notification.id}
                          className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${getPriorityColor(notification.priority)} ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                notification.type === "verification" ? "bg-green-100" :
                                notification.type === "sale" ? "bg-orange-100" :
                                notification.type === "review" ? "bg-yellow-100" :
                                notification.type === "message" ? "bg-blue-100" :
                                notification.type === "achievement" ? "bg-purple-100" :
                                "bg-gray-100"
                              }`}>
                                <IconComponent className={`h-4 w-4 ${
                                  notification.type === "verification" ? "text-green-600" :
                                  notification.type === "sale" ? "text-orange-600" :
                                  notification.type === "review" ? "text-yellow-600" :
                                  notification.type === "message" ? "text-blue-600" :
                                  notification.type === "achievement" ? "text-purple-600" :
                                  "text-gray-600"
                                }`} />
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-sm text-gray-900 truncate">
                                  {notification.title}
                                </p>
                                <div className="flex items-center gap-2">
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteNotification(notification.id);
                                    }}
                                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatTimeAgo(notification.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Settings */}
          <div className="p-4 border-t bg-gray-50">
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setShowNotifications(false);
                // Open settings modal
              }}
            >
              <Settings className="h-4 w-4 mr-2" />
              Notification Settings
            </Button>
          </div>
        </div>
      )}

      {/* Full Settings Panel (would normally be in a modal) */}
      <div className="hidden">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <p className="text-gray-600">Manage how and when you receive notifications</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preferences">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="preferences" className="space-y-6">
                {/* Email Notifications */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    {Object.entries(settings.email).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </label>
                          <p className="text-xs text-gray-600">
                            Get email notifications for {key}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => updateEmailSetting(key as keyof NotificationSettings["email"], checked)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Push Notifications */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Push Notifications</h3>
                  <div className="space-y-3">
                    {Object.entries(settings.push).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </label>
                          <p className="text-xs text-gray-600">
                            Get push notifications for {key}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => updatePushSetting(key as keyof NotificationSettings["push"], checked)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Notification Frequency</h3>
                  <select 
                    value={settings.frequency}
                    onChange={(e) => setSettings(prev => ({ ...prev, frequency: e.target.value as NotificationSettings["frequency"] }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="instant">Instant</option>
                    <option value="daily">Daily digest</option>
                    <option value="weekly">Weekly summary</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Quiet Hours</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Enable Quiet Hours</label>
                      <Switch
                        checked={settings.quietHours.enabled}
                        onCheckedChange={(checked) => setSettings(prev => ({
                          ...prev,
                          quietHours: { ...prev.quietHours, enabled: checked }
                        }))}
                      />
                    </div>
                    
                    {settings.quietHours.enabled && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-600">Start Time</label>
                          <input
                            type="time"
                            value={settings.quietHours.start}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              quietHours: { ...prev.quietHours, start: e.target.value }
                            }))}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">End Time</label>
                          <input
                            type="time"
                            value={settings.quietHours.end}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              quietHours: { ...prev.quietHours, end: e.target.value }
                            }))}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
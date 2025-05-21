"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { redirect } from "next/navigation";
import { Bell, Shield, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  getUserSettings, 
  updateAllSettings, 
  type UserNotificationSettings, 
  type UserPrivacySettings 
} from "@/lib/api/user-settings";
import BackButton from "@/components/dashboard/BackButton";

export default function SettingsPage() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  
  // Settings state
  const [notificationSettings, setNotificationSettings] = useState<UserNotificationSettings>({
    emailUpdates: true,
    upcomingClass: true,
    featuredEvents: true,
    classReminders: true,
    marketing: true,
  });
  
  const [privacySettings, setPrivacySettings] = useState<UserPrivacySettings>({
    showProfile: true,
    shareActivity: false,
    allowDataCollection: true,
  });
  
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Load user settings from database when user is available
    if (user && user.id) {
      loadUserSettings(user.id);
    }
  }, [user]);

  // Function to load user settings
  const loadUserSettings = async (userId: string) => {
    setLoading(true);
    try {
      const settings = await getUserSettings(userId);
      if (settings) {
        setNotificationSettings({
          emailUpdates: settings.emailUpdates,
          upcomingClass: settings.upcomingClassReminders,
          featuredEvents: settings.featuredEventNotifications,
          classReminders: settings.classReminders,
          marketing: settings.marketingCommunications
        });
        
        setPrivacySettings({
          showProfile: settings.showProfile,
          shareActivity: settings.shareActivity,
          allowDataCollection: settings.allowDataCollection
        });
      }
    } catch (error) {
      console.error('Error loading user settings:', error);
      toast.error('Failed to load your settings');
    } finally {
      setLoading(false);
    }
  };

  // If not mounted yet, don't render anything to avoid hydration mismatch
  if (!mounted) return null;

  // If not loading and no user, redirect to sign in
  if (!isLoading && !user) {
    redirect("/");
  }

  // Show loading state while checking auth
  if (isLoading || loading) {
    return (
      <div className="container max-w-5xl mx-auto py-16 px-4 text-center">
        <div className="w-12 h-12 border-4 border-[#EC407A] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your settings...</p>
      </div>
    );
  }
  
  const handleToggleNotification = (key: keyof UserNotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleTogglePrivacy = (key: keyof UserPrivacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleSaveSettings = async () => {
    if (!user || !user.id) return;
    
    setSaving(true);
    
    try {
      console.log('Attempting to save settings for user:', user.id);
      console.log('Notification settings to save:', notificationSettings);
      console.log('Privacy settings to save:', privacySettings);
      
      const result = await updateAllSettings(
        user.id,
        notificationSettings,
        privacySettings
      );
      
      if (result.success) {
        console.log('Settings saved successfully');
        toast.success("Your settings have been saved successfully");
      } else {
        console.error('Failed to save settings:', result.error);
        toast.error(result.error || "Failed to save settings");
      }
    } catch (error) {
      console.error('Exception in handleSaveSettings:', error);
      toast.error("An unexpected error occurred while saving settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-10 px-4">
      <div className="mb-8">
        <BackButton />
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your account preferences, privacy, and notifications
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Sidebar with quick links */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                <Link 
                  href="#notification-settings" 
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                >
                  <Bell className="h-4 w-4 text-gray-600" />
                  <span>Notification Settings</span>
                </Link>
                <Link 
                  href="#privacy-settings" 
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                >
                  <Shield className="h-4 w-4 text-gray-600" />
                  <span>Privacy Settings</span>
                </Link>
                <Link 
                  href="/profile" 
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                >
                  <ExternalLink className="h-4 w-4 text-gray-600" />
                  <span>Edit Profile</span>
                </Link>
              </nav>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-gray-500 mb-4">
                If you need help with your account settings or have any questions, please contact our support team.
              </p>
              <Link href="/contact">
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-2 space-y-8">
          {/* Notification Settings */}
          <section id="notification-settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-[#EC407A]" />
                  Notification Settings
                </CardTitle>
                <p className="text-sm text-muted-foreground">Manage how and when you receive notifications</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all">
                    <div>
                      <Label htmlFor="emailUpdates" className="text-base font-medium">Email Updates</Label>
                      <p className="text-sm text-gray-500 mt-1">Receive regular email updates about studio activities</p>
                    </div>
                    <Switch 
                      id="emailUpdates"
                      checked={notificationSettings.emailUpdates}
                      onCheckedChange={() => handleToggleNotification('emailUpdates')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all">
                    <div>
                      <Label htmlFor="upcomingClass" className="text-base font-medium">Upcoming Class Reminders</Label>
                      <p className="text-sm text-gray-500 mt-1">Receive reminders before your scheduled classes</p>
                    </div>
                    <Switch 
                      id="upcomingClass"
                      checked={notificationSettings.upcomingClass}
                      onCheckedChange={() => handleToggleNotification('upcomingClass')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all">
                    <div>
                      <Label htmlFor="featuredEvents" className="text-base font-medium">Featured Event Notifications</Label>
                      <p className="text-sm text-gray-500 mt-1">Get notified when new featured events are announced</p>
                    </div>
                    <Switch 
                      id="featuredEvents"
                      checked={notificationSettings.featuredEvents}
                      onCheckedChange={() => handleToggleNotification('featuredEvents')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all">
                    <div>
                      <Label htmlFor="classReminders" className="text-base font-medium">Class Reminders</Label>
                      <p className="text-sm text-gray-500 mt-1">Get reminders 24 hours before your class</p>
                    </div>
                    <Switch 
                      id="classReminders"
                      checked={notificationSettings.classReminders}
                      onCheckedChange={() => handleToggleNotification('classReminders')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all">
                    <div>
                      <Label htmlFor="marketing" className="text-base font-medium">Marketing Communications</Label>
                      <p className="text-sm text-gray-500 mt-1">Receive promotional materials and special offers</p>
                    </div>
                    <Switch 
                      id="marketing"
                      checked={notificationSettings.marketing}
                      onCheckedChange={() => handleToggleNotification('marketing')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Privacy Settings */}
          <section id="privacy-settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-[#EC407A]" />
                  Privacy Settings
                </CardTitle>
                <p className="text-sm text-muted-foreground">Manage your privacy preferences and data sharing options</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all">
                    <div>
                      <Label htmlFor="showProfile" className="text-base font-medium">Public Profile</Label>
                      <p className="text-sm text-gray-500 mt-1">Allow other students to see your profile</p>
                    </div>
                    <Switch 
                      id="showProfile"
                      checked={privacySettings.showProfile}
                      onCheckedChange={() => handleTogglePrivacy('showProfile')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all">
                    <div>
                      <Label htmlFor="shareActivity" className="text-base font-medium">Activity Sharing</Label>
                      <p className="text-sm text-gray-500 mt-1">Share your class attendance and achievements</p>
                    </div>
                    <Switch 
                      id="shareActivity"
                      checked={privacySettings.shareActivity}
                      onCheckedChange={() => handleTogglePrivacy('shareActivity')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all">
                    <div>
                      <Label htmlFor="allowDataCollection" className="text-base font-medium">Data Collection</Label>
                      <p className="text-sm text-gray-500 mt-1">Allow us to collect anonymized usage data to improve the platform</p>
                    </div>
                    <Switch 
                      id="allowDataCollection"
                      checked={privacySettings.allowDataCollection}
                      onCheckedChange={() => handleTogglePrivacy('allowDataCollection')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Save All Settings Button */}
          <div className="flex justify-end">
            <Button 
              className="bg-[#EC407A] hover:bg-[#EC407A]/90"
              onClick={handleSaveSettings}
              disabled={saving}
            >
              {saving ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Saving...
                </>
              ) : "Save Settings"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
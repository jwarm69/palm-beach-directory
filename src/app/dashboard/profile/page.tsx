"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, updateUser } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      offerAlerts: true,
      eventNotifications: true,
      newsletterSubscription: true,
      marketingEmails: false,
      personalizedRecommendations: true
    },
    shopping: {
      favoriteCategories: [] as string[],
      budgetRange: "",
      preferredAreas: [] as string[],
      stylingPreferences: "",
      sizeInformation: {
        clothing: "",
        shoes: "",
        accessories: ""
      }
    }
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        preferences: {
          emailNotifications: user.preferences?.emailNotifications ?? true,
          smsNotifications: user.preferences?.smsNotifications ?? false,
          offerAlerts: user.preferences?.offerAlerts ?? true,
          eventNotifications: user.preferences?.eventNotifications ?? true,
          newsletterSubscription: user.preferences?.newsletterSubscription ?? true,
          marketingEmails: user.preferences?.marketingEmails ?? false,
          personalizedRecommendations: user.preferences?.personalizedRecommendations ?? true
        },
        shopping: {
          favoriteCategories: user.shopping?.favoriteCategories || [],
          budgetRange: user.shopping?.budgetRange || "",
          preferredAreas: user.shopping?.preferredAreas || [],
          stylingPreferences: user.shopping?.stylingPreferences || "",
          sizeInformation: {
            clothing: user.shopping?.sizeInformation?.clothing || "",
            shoes: user.shopping?.sizeInformation?.shoes || "",
            accessories: user.shopping?.sizeInformation?.accessories || ""
          }
        }
      });
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sand/10 to-white flex items-center justify-center">
        <div className="flex items-center gap-2 text-navy">
          <div className="w-6 h-6 border-2 border-navy border-t-transparent rounded-full animate-spin"></div>
          Loading your profile...
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleSaveProfile = async () => {
    if (updateUser) {
      await updateUser(profileData);
      setIsEditing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (field: string, value: boolean) => {
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const handleShoppingChange = (field: string, value: string | string[] | { clothing?: string; shoes?: string; accessories?: string }) => {
    setProfileData(prev => ({
      ...prev,
      shopping: {
        ...prev.shopping,
        [field]: value
      }
    }));
  };

  const categories = ["Women's Fashion", "Men's Fashion", "Jewelry", "Beauty & Cosmetics", "Art & Antiques", "Luxury Goods", "Shoes & Accessories"];
  const areas = ["Worth Avenue", "Royal Poinciana", "CityPlace"];

  const getMembershipColor = (tier: string) => {
    switch (tier) {
      case 'vip': return 'from-purple-500 to-purple-600';
      case 'premium': return 'from-gold to-yellow-500';
      default: return 'from-sage to-green-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand/10 via-white/50 to-white">
      {/* Header */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/6 w-48 h-48 bg-navy/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/6 w-40 h-40 bg-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="backdrop-blur-sm bg-white/30 rounded-3xl p-12 shadow-glass border border-white/20 mb-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-gradient-to-br from-gold/20 to-sage/20 rounded-full flex items-center justify-center">
                <span className="text-navy font-bold text-3xl">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </span>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-5xl md:text-6xl font-display font-bold text-luxury mb-4">
                  Profile & Settings
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Manage your account preferences and shopping profile
                </p>
              </div>
              <div>
                <Card className={`w-64 bg-gradient-to-br ${getMembershipColor(user.membershipTier)} text-white`}>
                  <CardContent className="p-4 text-center">
                    <div className="text-lg font-semibold">
                      {user.membershipTier === 'vip' ? 'VIP Member' : 
                       user.membershipTier === 'premium' ? 'Premium Member' : 'Member'}
                    </div>
                    <div className="text-white/80 text-sm">
                      Since {new Date(user.joinDate).getFullYear()}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="profile">Personal Info</TabsTrigger>
              <TabsTrigger value="preferences">Notifications</TabsTrigger>
              <TabsTrigger value="shopping">Shopping Profile</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="profile">
              <Card className="card-premium">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-luxury text-2xl">Personal Information</CardTitle>
                      <CardDescription>Update your personal details and contact information</CardDescription>
                    </div>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant={isEditing ? "outline" : "default"}
                      className={isEditing ? "" : "btn-navy group"}
                    >
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">About Me</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      disabled={!isEditing}
                      placeholder="Tell us a bit about your shopping style and preferences..."
                      className="resize-none"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile} className="btn-navy group">
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Preferences Tab */}
            <TabsContent value="preferences">
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="text-luxury text-2xl">Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to receive updates and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Email Notifications</Label>
                        <p className="text-sm text-gray-600">Receive updates via email</p>
                      </div>
                      <Switch
                        checked={profileData.preferences.emailNotifications}
                        onCheckedChange={(checked) => handlePreferenceChange("emailNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">SMS Notifications</Label>
                        <p className="text-sm text-gray-600">Receive text message alerts</p>
                      </div>
                      <Switch
                        checked={profileData.preferences.smsNotifications}
                        onCheckedChange={(checked) => handlePreferenceChange("smsNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Offer Alerts</Label>
                        <p className="text-sm text-gray-600">Get notified about new exclusive offers</p>
                      </div>
                      <Switch
                        checked={profileData.preferences.offerAlerts}
                        onCheckedChange={(checked) => handlePreferenceChange("offerAlerts", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Event Notifications</Label>
                        <p className="text-sm text-gray-600">Stay updated on fashion shows and events</p>
                      </div>
                      <Switch
                        checked={profileData.preferences.eventNotifications}
                        onCheckedChange={(checked) => handlePreferenceChange("eventNotifications", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Newsletter Subscription</Label>
                        <p className="text-sm text-gray-600">Monthly style updates and trends</p>
                      </div>
                      <Switch
                        checked={profileData.preferences.newsletterSubscription}
                        onCheckedChange={(checked) => handlePreferenceChange("newsletterSubscription", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Marketing Emails</Label>
                        <p className="text-sm text-gray-600">Promotional content from partner stores</p>
                      </div>
                      <Switch
                        checked={profileData.preferences.marketingEmails}
                        onCheckedChange={(checked) => handlePreferenceChange("marketingEmails", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Personalized Recommendations</Label>
                        <p className="text-sm text-gray-600">AI-powered shopping suggestions</p>
                      </div>
                      <Switch
                        checked={profileData.preferences.personalizedRecommendations}
                        onCheckedChange={(checked) => handlePreferenceChange("personalizedRecommendations", checked)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t">
                    <Button onClick={handleSaveProfile} className="btn-navy group">
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Shopping Profile Tab */}
            <TabsContent value="shopping">
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="text-luxury text-2xl">Shopping Profile</CardTitle>
                  <CardDescription>Help us personalize your shopping experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Favorite Categories</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {categories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={category}
                            checked={profileData.shopping.favoriteCategories.includes(category)}
                            onChange={(e) => {
                              const newCategories = e.target.checked
                                ? [...profileData.shopping.favoriteCategories, category]
                                : profileData.shopping.favoriteCategories.filter(c => c !== category);
                              handleShoppingChange("favoriteCategories", newCategories);
                            }}
                            className="rounded"
                          />
                          <Label htmlFor={category} className="text-sm">{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budgetRange">Budget Range</Label>
                    <Select
                      value={profileData.shopping.budgetRange}
                      onValueChange={(value) => handleShoppingChange("budgetRange", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your typical budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-500">Under $500</SelectItem>
                        <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                        <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                        <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                        <SelectItem value="over-5000">Over $5,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Shopping Areas</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {areas.map(area => (
                        <div key={area} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={area}
                            checked={profileData.shopping.preferredAreas.includes(area)}
                            onChange={(e) => {
                              const newAreas = e.target.checked
                                ? [...profileData.shopping.preferredAreas, area]
                                : profileData.shopping.preferredAreas.filter(a => a !== area);
                              handleShoppingChange("preferredAreas", newAreas);
                            }}
                            className="rounded"
                          />
                          <Label htmlFor={area} className="text-sm">{area}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stylingPreferences">Style Preferences</Label>
                    <Textarea
                      id="stylingPreferences"
                      value={profileData.shopping.stylingPreferences}
                      onChange={(e) => handleShoppingChange("stylingPreferences", e.target.value)}
                      placeholder="Describe your personal style (e.g., classic, modern, bohemian, minimalist...)"
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-medium">Size Information</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="clothing-size" className="text-sm">Clothing Size</Label>
                        <Input
                          id="clothing-size"
                          value={profileData.shopping.sizeInformation.clothing}
                          onChange={(e) => handleShoppingChange("sizeInformation", {
                            ...profileData.shopping.sizeInformation,
                            clothing: e.target.value
                          })}
                          placeholder="e.g., S, M, L, 8, 10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shoe-size" className="text-sm">Shoe Size</Label>
                        <Input
                          id="shoe-size"
                          value={profileData.shopping.sizeInformation.shoes}
                          onChange={(e) => handleShoppingChange("sizeInformation", {
                            ...profileData.shopping.sizeInformation,
                            shoes: e.target.value
                          })}
                          placeholder="e.g., 7, 8.5, 9"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accessories-size" className="text-sm">Ring/Accessories</Label>
                        <Input
                          id="accessories-size"
                          value={profileData.shopping.sizeInformation.accessories}
                          onChange={(e) => handleShoppingChange("sizeInformation", {
                            ...profileData.shopping.sizeInformation,
                            accessories: e.target.value
                          })}
                          placeholder="e.g., 6, 7, 8"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t">
                    <Button onClick={handleSaveProfile} className="btn-navy group">
                      Save Shopping Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
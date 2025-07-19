"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        const success = await login(formData.email, formData.password);
        if (success) {
          onClose();
          setFormData({ email: '', password: '', firstName: '', lastName: '', phone: '' });
        } else {
          setError('Invalid email or password. Please try again.');
        }
      } else {
        const success = await signup({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone
        });
        if (success) {
          onClose();
          setFormData({ email: '', password: '', firstName: '', lastName: '', phone: '' });
        } else {
          setError('An account with this email already exists');
        }
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDemoLogin = () => {
    setFormData(prev => ({
      ...prev,
      email: 'catherine@example.com',
      password: 'password123'
    }));
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="card-luxury w-full max-w-md relative animate-fade-in">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <CardTitle className="text-luxury text-2xl">
              {mode === 'login' ? 'Welcome Back' : 'Join Palm Beach Luxe'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {mode === 'login' 
                ? 'Sign in to access exclusive features and your personal dashboard'
                : 'Create your account to unlock VIP experiences and personalized services'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Demo Account Banner */}
            {mode === 'login' && (
              <div className="bg-gradient-to-r from-gold/10 to-sage/10 border border-gold/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-navy text-sm mb-1">Try Demo Account</h4>
                    <p className="text-xs text-gray-600 mb-3">
                      Experience the platform with our pre-configured VIP member account
                    </p>
                    <Button 
                      type="button"
                      onClick={handleDemoLogin}
                      variant="outline"
                      size="sm"
                      className="bg-white border-gold/40 text-gold hover:bg-gold/5 text-xs h-8"
                    >
                      Fill Demo Credentials
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-navy font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Catherine"
                      className="mt-1 border-sand/40 focus:border-gold focus:ring-gold/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-navy font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Smith"
                      className="mt-1 border-sand/40 focus:border-gold focus:ring-gold/20"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="email" className="text-navy font-medium">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                  className="mt-1 border-sand/40 focus:border-gold focus:ring-gold/20"
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-navy font-medium">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••"
                  className="mt-1 border-sand/40 focus:border-gold focus:ring-gold/20"
                />
              </div>
              
              {mode === 'signup' && (
                <div>
                  <Label htmlFor="phone" className="text-navy font-medium">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(561) 555-0123"
                    className="mt-1 border-sand/40 focus:border-gold focus:ring-gold/20"
                  />
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="btn-luxury w-full h-12 text-base font-medium" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                  </div>
                ) : (
                  mode === 'login' ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>
            
            <div className="pt-4 border-t border-sand/20">
              <p className="text-center text-gray-600 text-sm">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === 'login' ? 'signup' : 'login');
                    setError('');
                    setFormData({ email: '', password: '', firstName: '', lastName: '', phone: '' });
                  }}
                  className="text-gold hover:text-gold/80 font-medium underline decoration-gold/30 hover:decoration-gold/60 transition-colors"
                >
                  {mode === 'login' ? 'Create an account' : 'Sign in instead'}
                </button>
              </p>
            </div>
            
            {mode === 'signup' && (
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  By creating an account, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
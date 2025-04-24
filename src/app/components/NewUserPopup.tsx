"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';
import { Database } from '@/types/supabase';

export default function NewUserPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    zipcode: '',
    phoneNumber: ''
  });
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  useEffect(() => {
    // Delay showing the popup by 3 seconds after page load
    const timer = setTimeout(() => {
      // Check if popup has been dismissed already (could use localStorage)
      const hasSeenPopup = localStorage.getItem('hasSeenPopup');
      if (!hasSeenPopup) {
        setIsOpen(true);
        // Slight delay before animation starts
        setTimeout(() => setIsVisible(true), 50);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Hidden reset function for development/testing
  const handleCornerClick = useCallback(() => {
    const now = Date.now();
    if (now - lastClickTime < 500) {
      // Clicks need to be within 500ms of each other
      setClickCount(prev => {
        if (prev + 1 >= 10) {
          // Reset after 10 rapid clicks
          localStorage.removeItem('hasSeenPopup');
          console.log('Popup reset! Refresh to see it again.');
          return 0;
        }
        return prev + 1;
      });
    } else {
      // Too slow, reset counter
      setClickCount(1);
    }
    setLastClickTime(now);
  }, [lastClickTime]);

  useEffect(() => {
    // Add a hidden div in the bottom right corner for reset clicks
    const resetDiv = document.createElement('div');
    resetDiv.style.position = 'fixed';
    resetDiv.style.bottom = '0';
    resetDiv.style.right = '0';
    resetDiv.style.width = '30px';
    resetDiv.style.height = '30px';
    resetDiv.style.zIndex = '9999';
    resetDiv.style.cursor = 'default';
    resetDiv.addEventListener('click', handleCornerClick);
    
    document.body.appendChild(resetDiv);
    
    return () => {
      resetDiv.removeEventListener('click', handleCornerClick);
      document.body.removeChild(resetDiv);
    };
  }, [handleCornerClick]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create a Supabase client
      const supabase = createClientComponentClient<Database>();
      
      // Insert data into Supabase
      const { error } = await supabase
        .from('newsletter_signups')
        .insert([
          { 
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            zipcode: formData.zipcode,
            phone_number: formData.phoneNumber
          }
        ]);
      
      if (error) {
        // If there's a unique constraint violation, it might be a duplicate email
        if (error.code === '23505') {
          toast.error("Already subscribed", {
            description: "This email is already subscribed to our newsletter."
          });
        } else {
          console.error('Error submitting form:', error);
          toast.error("Something went wrong", {
            description: "Please try again later."
          });
        }
      } else {
        // Success - close popup and show success message
        toast.success("Success!", {
          description: "Thank you for subscribing! Check your email soon for your free guide."
        });
        
        // Close the popup
        setIsVisible(false);
        setTimeout(() => {
          setIsOpen(false);
          localStorage.setItem('hasSeenPopup', 'true');
        }, 300);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error("Something went wrong", {
        description: "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    // Close after animation completes
    setTimeout(() => {
      setIsOpen(false);
      localStorage.setItem('hasSeenPopup', 'true');
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100 bg-black/70' : 'opacity-0 bg-black/0'
      }`}
    >
      <div 
        className={`relative w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
        }`}
      >
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 z-10"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 relative h-48 md:h-auto">
            <Image
              src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/popup_1.jpg"
              alt="Dance Community"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
            <div className="absolute bottom-0 left-0 p-4 md:hidden">
              <h2 className="text-xl font-bold text-white">Join the community</h2>
              <p className="text-sm text-white/90">Never miss a dance event again!</p>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 p-6">
            <div className="hidden md:block">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Join the community</h2>
              <p className="text-sm text-gray-600 mb-4">Never miss a dance event again!</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="zipcode"
                  placeholder="Zipcode"
                  value={formData.zipcode}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#FF3366] hover:from-[#FF8A6A] hover:to-[#FF4376] text-white border-0"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
              
              <p className="text-xs text-gray-500 mt-2 text-center">
                Check your email for your personalized free guide on the top dance events and studios in your city!
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 
"use client";

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { isInstructorSaved, toggleSaveInstructor } from '@/lib/supabase/savedInstructorsUtils';
import { toast } from 'sonner';

interface InstructorHeartButtonProps {
  instructorId: string;
  className?: string;
  showToast?: boolean;
}

export default function InstructorHeartButton({ 
  instructorId, 
  className = "",
  showToast = true
}: InstructorHeartButtonProps) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if instructor is saved when component mounts or user changes
  useEffect(() => {
    if (user?.id) {
      checkSavedStatus();
    } else {
      setIsSaved(false);
    }
  }, [user?.id, instructorId]);

  const checkSavedStatus = async () => {
    if (!user?.id) return;
    
    try {
      const saved = await isInstructorSaved(user.id, instructorId);
      setIsSaved(saved);
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user?.id) {
      if (showToast) {
        toast.error('Please sign in to save instructors');
      }
      return;
    }



    setIsLoading(true);
    
    try {
      const success = await toggleSaveInstructor(user.id, instructorId);
      
      if (success) {
        setIsSaved(!isSaved);
        if (showToast) {
          toast.success(isSaved ? 'Instructor removed from saved' : 'Instructor saved!');
        }
      } else {
        if (showToast) {
          toast.error('Failed to update saved status');
        }
      }
    } catch (error) {
      console.error('Error toggling save status:', error);
      if (showToast) {
        toast.error('Failed to update saved status');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleSave}
      disabled={isLoading}
      className={`relative group transition-all duration-200 ${className}`}
      aria-label={isSaved ? 'Remove from saved instructors' : 'Save instructor'}
    >
      <Heart
        className={`h-5 w-5 transition-all duration-200 ${
          isSaved 
            ? 'fill-pink-500 text-pink-500' 
            : 'text-gray-400 group-hover:text-pink-400'
        } ${isLoading ? 'animate-pulse' : ''}`}
      />
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {isSaved ? 'Remove from saved' : 'Save instructor'}
      </div>
    </button>
  );
} 
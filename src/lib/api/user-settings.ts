import { supabase } from '@/lib/supabase/client';

// Define types for user settings
export interface UserNotificationSettings {
  emailUpdates: boolean;
  upcomingClass: boolean;
  featuredEvents: boolean;
  classReminders: boolean;
  marketing: boolean;
}

export interface UserPrivacySettings {
  showProfile: boolean;
  shareActivity: boolean;
  allowDataCollection: boolean;
}

export interface UserSettings {
  id: string;
  userId: string;
  emailUpdates: boolean;
  upcomingClassReminders: boolean;
  featuredEventNotifications: boolean;
  classReminders: boolean;
  marketingCommunications: boolean;
  showProfile: boolean;
  shareActivity: boolean;
  allowDataCollection: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get user settings from the database
 */
export async function getUserSettings(userId: string): Promise<UserSettings | null> {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user settings:', error);
      return null;
    }
    
    if (!data) return null;
    
    return {
      id: data.id,
      userId: data.user_id,
      emailUpdates: data.email_updates,
      upcomingClassReminders: data.upcoming_class_reminders,
      featuredEventNotifications: data.featured_event_notifications,
      classReminders: data.class_reminders,
      marketingCommunications: data.marketing_communications,
      showProfile: data.show_profile,
      shareActivity: data.share_activity,
      allowDataCollection: data.allow_data_collection,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.error('Unexpected error getting user settings:', error);
    return null;
  }
}

/**
 * Check if user settings exist and create if they don't
 */
export async function ensureUserSettingsExist(userId: string): Promise<boolean> {
  try {
    // Check if settings already exist
    const { data, error: checkError } = await supabase
      .from('user_settings')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (checkError) {
      console.error('Error checking user settings:', checkError);
      return false;
    }
    
    // If settings don't exist, create them
    if (!data) {
      console.log('Creating new user settings for user:', userId);
      const { error: insertError } = await supabase
        .from('user_settings')
        .insert({
          user_id: userId,
          email_updates: true,
          upcoming_class_reminders: true,
          featured_event_notifications: true,
          class_reminders: true,
          marketing_communications: true,
          show_profile: true,
          share_activity: false,
          allow_data_collection: true
        });
      
      if (insertError) {
        console.error('Error creating user settings:', insertError);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Unexpected error ensuring user settings exist:', error);
    return false;
  }
}

/**
 * Update notification settings for a user
 */
export async function updateNotificationSettings(
  userId: string, 
  settings: UserNotificationSettings
): Promise<{ success: boolean; error?: string }> {
  try {
    // Ensure settings exist before updating
    const settingsExist = await ensureUserSettingsExist(userId);
    if (!settingsExist) {
      return { 
        success: false, 
        error: 'Failed to ensure user settings exist' 
      };
    }
    
    const { error } = await supabase
      .from('user_settings')
      .update({
        email_updates: settings.emailUpdates,
        upcoming_class_reminders: settings.upcomingClass,
        featured_event_notifications: settings.featuredEvents,
        class_reminders: settings.classReminders,
        marketing_communications: settings.marketing
      })
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error updating notification settings:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Unexpected error updating notification settings:', error);
    return { 
      success: false, 
      error: 'An unexpected error occurred' 
    };
  }
}

/**
 * Update privacy settings for a user
 */
export async function updatePrivacySettings(
  userId: string, 
  settings: UserPrivacySettings
): Promise<{ success: boolean; error?: string }> {
  try {
    // Ensure settings exist before updating
    const settingsExist = await ensureUserSettingsExist(userId);
    if (!settingsExist) {
      return { 
        success: false, 
        error: 'Failed to ensure user settings exist' 
      };
    }
    
    const { error } = await supabase
      .from('user_settings')
      .update({
        show_profile: settings.showProfile,
        share_activity: settings.shareActivity,
        allow_data_collection: settings.allowDataCollection
      })
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error updating privacy settings:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Unexpected error updating privacy settings:', error);
    return { 
      success: false, 
      error: 'An unexpected error occurred' 
    };
  }
}

/**
 * Update all user settings at once
 */
export async function updateAllSettings(
  userId: string,
  notificationSettings: UserNotificationSettings,
  privacySettings: UserPrivacySettings
): Promise<{ success: boolean; error?: string }> {
  try {
    // Ensure settings exist before updating
    const settingsExist = await ensureUserSettingsExist(userId);
    if (!settingsExist) {
      return { 
        success: false, 
        error: 'Failed to ensure user settings exist' 
      };
    }
    
    const { error } = await supabase
      .from('user_settings')
      .update({
        email_updates: notificationSettings.emailUpdates,
        upcoming_class_reminders: notificationSettings.upcomingClass,
        featured_event_notifications: notificationSettings.featuredEvents,
        class_reminders: notificationSettings.classReminders,
        marketing_communications: notificationSettings.marketing,
        show_profile: privacySettings.showProfile,
        share_activity: privacySettings.shareActivity,
        allow_data_collection: privacySettings.allowDataCollection
      })
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error updating all settings:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Unexpected error updating all settings:', error);
    return { 
      success: false, 
      error: 'An unexpected error occurred' 
    };
  }
} 
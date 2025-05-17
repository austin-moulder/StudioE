-- Create a user_settings table connected to auth users
CREATE TABLE IF NOT EXISTS public.user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Notification settings
  email_updates BOOLEAN DEFAULT TRUE,
  upcoming_class_reminders BOOLEAN DEFAULT TRUE,
  featured_event_notifications BOOLEAN DEFAULT TRUE,
  class_reminders BOOLEAN DEFAULT TRUE,
  marketing_communications BOOLEAN DEFAULT TRUE,
  
  -- Privacy settings
  show_profile BOOLEAN DEFAULT TRUE,
  share_activity BOOLEAN DEFAULT FALSE,
  allow_data_collection BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own settings
CREATE POLICY "Users can view their own settings" 
  ON public.user_settings FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy for users to update their own settings
CREATE POLICY "Users can update their own settings" 
  ON public.user_settings FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own settings
CREATE POLICY "Users can insert their own settings" 
  ON public.user_settings FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create a function to automatically create default settings when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user_settings() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function when a user is created
CREATE TRIGGER on_auth_user_created_settings
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_settings();

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_settings_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update the updated_at timestamp
CREATE TRIGGER update_user_settings_timestamp
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW EXECUTE FUNCTION update_user_settings_timestamp();

-- Create index for faster lookups
CREATE INDEX user_settings_user_id_idx ON public.user_settings(user_id); 
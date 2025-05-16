-- Update the trigger function to include full_name field
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (auth_id, full_name)
  VALUES (
    NEW.id, 
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      CASE 
        WHEN NEW.raw_user_meta_data->>'first_name' IS NOT NULL AND NEW.raw_user_meta_data->>'last_name' IS NOT NULL
        THEN CONCAT(NEW.raw_user_meta_data->>'first_name', ' ', NEW.raw_user_meta_data->>'last_name')
        ELSE NEW.email
      END
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 
export interface UserProfile {
  id: string;
  user_id: string;
  profile_image_url?: string;
  dance_style_interests?: string[];
  availability_for_privates?: string;
  preferred_learning_style?: string;
  dance_goals?: string;
  favorite_song?: string;
  favorite_artist?: string;
  dance_motivation?: string;
  bio?: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
}

export const LEARNING_STYLES = [
  "Visual (learn by seeing)",
  "Auditory (learn by hearing)",
  "Kinesthetic (learn by doing)",
  "Verbal (learn through words)",
  "Social (learn in groups)",
  "Solitary (learn individually)",
  "Logical (learn through reasoning)"
];

export const DANCE_STYLES = [
  "Salsa",
  "Bachata",
  "Kizomba",
  "Hip Hop",
  "Ballroom",
  "Jazz",
  "Contemporary",
  "Ballet",
  "Heels",
  "Tango",
  "Tap",
  "Swing",
  "Urban",
  "Breakdance",
  "Fusion",
  "Zouk",
  "Samba",
  "Reggaeton",
  "Choreo",
  "Other"
]; 
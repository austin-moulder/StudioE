export interface Class {
  id: string;
  class_name: string;
  instructor: string;
  price: number;
  series_length: number;
  is_series_start: boolean;
  class_date: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_drop_in: boolean;
  is_weekly: boolean;
  instructor_approval_required: boolean;
  notes: string | null;
  company_id: string;
  company: Company;
  is_active: boolean;
  location: string | null;
}

export interface Company {
  id: string;
  name: string;
  contact_name: string;
  phone: string;
  email: string;
  address: string;
} 
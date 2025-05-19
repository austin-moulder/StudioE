-- Create lessons table in Supabase
CREATE TABLE public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.user_profiles(id),
    student_name TEXT NOT NULL,
    instructor_name TEXT NOT NULL,
    first_time_match BOOLEAN DEFAULT FALSE,
    lesson_start TIMESTAMP WITH TIME ZONE NOT NULL,
    invoiced_date TIMESTAMP WITH TIME ZONE,
    instructor_pay_rate DECIMAL(10, 2) NOT NULL,
    num_hours DECIMAL(5, 2) NOT NULL,
    instructor_pay DECIMAL(10, 2) NOT NULL,
    invoice_notes TEXT,
    homework_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to view lessons they're associated with
CREATE POLICY "Users can view their own lessons" 
ON public.lessons 
FOR SELECT 
USING (auth.uid() = student_id);

-- Create policy for instructors to view lessons they teach
CREATE POLICY "Instructors can view lessons they teach" 
ON public.lessons 
FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND instructor_name = lessons.instructor_name
    )
);

-- Create policy for admins to view all lessons
CREATE POLICY "Admins can view all lessons" 
ON public.lessons 
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE id = auth.uid() AND is_admin = true
    )
);

-- Add indexes for better performance
CREATE INDEX lessons_student_id_idx ON public.lessons(student_id);
CREATE INDEX lessons_instructor_name_idx ON public.lessons(instructor_name);
CREATE INDEX lessons_lesson_start_idx ON public.lessons(lesson_start);

-- Add triggers for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_lessons_updated_at
BEFORE UPDATE ON public.lessons
FOR EACH ROW
EXECUTE FUNCTION update_modified_column(); 
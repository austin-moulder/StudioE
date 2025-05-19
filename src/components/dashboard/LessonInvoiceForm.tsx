"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon, Loader2, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
// Temporarily comment out the calendar import which is causing issues
// import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/lib/supabase/supabase";

// Add explicit interface for user metadata
interface UserMetadata {
  full_name?: string;
  [key: string]: any;
}

interface User {
  id: string;
  user_metadata?: UserMetadata;
  email?: string;
}

// Hardcoded test students
const TEST_STUDENTS = [
  { id: "test-student-1", full_name: "Test Student 1" },
  { id: "test-student-2", full_name: "Test Student 2" },
  { id: "test-student-3", full_name: "Test Student 3" },
];

export default function LessonInvoiceForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [students, setStudents] = useState<{ id: string; full_name: string }[]>(TEST_STUDENTS);
  const [studentsLoading, setStudentsLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    student_id: "",
    student_name: "",
    instructor_name: (user as User)?.user_metadata?.full_name || "",
    first_time_match: false,
    lesson_start: new Date(),
    invoiced_date: new Date(),
    instructor_pay_rate: 0,
    num_hours: 1,
    instructor_pay: 0,
    invoice_notes: "",
    homework_notes: ""
  });

  // Attempt to fetch real students after testing with hardcoded ones
  useEffect(() => {
    async function fetchStudents() {
      // Don't set loading since we already have test data
      try {
        console.log("Attempting to fetch real students...");
        const { data, error } = await supabase
          .from('user_profiles')
          .select('id, full_name');
        
        console.log('Student data from Supabase:', { data, error });
        
        if (error) {
          console.error('Supabase error:', error);
          // Keep using test students
          return;
        }
        
        // If we got data successfully, replace test students
        if (data && data.length > 0) {
          const validStudents = data.filter(s => s.full_name);
          console.log('Valid students from database:', validStudents);
          if (validStudents.length > 0) {
            setStudents(validStudents);
          }
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        // We'll continue using test students
      }
    }
    
    fetchStudents();
  }, []);

  // Update instructor pay whenever rate or hours change
  useEffect(() => {
    const pay = formData.instructor_pay_rate * formData.num_hours;
    setFormData(prev => ({ ...prev, instructor_pay: pay }));
  }, [formData.instructor_pay_rate, formData.num_hours]);

  // Handle student selection - populate student name automatically
  const handleStudentChange = (studentId: string) => {
    console.log("Student selected:", studentId);
    const selectedStudent = students.find(s => s.id === studentId);
    console.log("Selected student:", selectedStudent);
    
    if (selectedStudent) {
      setFormData({
        ...formData,
        student_id: studentId,
        student_name: selectedStudent.full_name || ""
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a lesson invoice",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setIsCompleted(false);
    
    try {
      const response = await fetch('/api/lessons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          instructor_id: (user as User)?.id,
          lesson_start: formData.lesson_start.toISOString(),
          invoiced_date: formData.invoiced_date.toISOString(),
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create lesson invoice');
      }
      
      toast({
        title: "Success",
        description: "Lesson invoice submitted successfully",
      });
      
      setIsCompleted(true);
      
      // Reset form
      setFormData({
        student_id: "",
        student_name: "",
        instructor_name: (user as User).user_metadata?.full_name || "",
        first_time_match: false,
        lesson_start: new Date(),
        invoiced_date: new Date(),
        instructor_pay_rate: 0,
        num_hours: 1,
        instructor_pay: 0,
        invoice_notes: "",
        homework_notes: ""
      });
      
    } catch (error: any) {
      console.error('Error submitting lesson invoice:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit lesson invoice",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Lesson Invoice</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student">Student</Label>
            <Select
              value={formData.student_id}
              onValueChange={handleStudentChange}
            >
              <SelectTrigger id="student">
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {students.length === 0 && (
              <p className="text-xs text-red-500 mt-1">
                No students available. Using test data.
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="instructor_name">Instructor Name</Label>
            <Input
              id="instructor_name"
              value={formData.instructor_name}
              onChange={(e) => setFormData({ ...formData, instructor_name: e.target.value })}
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="first_time_match"
              checked={formData.first_time_match}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, first_time_match: checked as boolean })
              }
            />
            <Label htmlFor="first_time_match">First time with this student</Label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Lesson Date</Label>
              <Input
                type="date"
                value={formData.lesson_start.toISOString().split('T')[0]}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setFormData({ ...formData, lesson_start: date });
                }}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Invoice Date</Label>
              <Input
                type="date"
                value={formData.invoiced_date.toISOString().split('T')[0]}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setFormData({ ...formData, invoiced_date: date });
                }}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instructor_pay_rate">Hourly Rate ($)</Label>
              <Input
                id="instructor_pay_rate"
                type="number"
                min="0"
                step="0.01"
                value={formData.instructor_pay_rate}
                onChange={(e) => setFormData({ ...formData, instructor_pay_rate: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="num_hours">Hours</Label>
              <Input
                id="num_hours"
                type="number"
                min="0.25"
                step="0.25"
                value={formData.num_hours}
                onChange={(e) => setFormData({ ...formData, num_hours: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instructor_pay">Total Pay ($)</Label>
              <Input
                id="instructor_pay"
                type="number"
                min="0"
                step="0.01"
                value={formData.instructor_pay}
                onChange={(e) => setFormData({ ...formData, instructor_pay: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="invoice_notes">Invoice Notes</Label>
            <Textarea
              id="invoice_notes"
              placeholder="What did you work on during this lesson?"
              value={formData.invoice_notes}
              onChange={(e) => setFormData({ ...formData, invoice_notes: e.target.value })}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="homework_notes">Homework Notes</Label>
            <Textarea
              id="homework_notes"
              placeholder="What should the student practice before the next lesson?"
              value={formData.homework_notes}
              onChange={(e) => setFormData({ ...formData, homework_notes: e.target.value })}
              rows={3}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : isCompleted ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Completed
              </>
            ) : (
              "Submit Lesson Invoice"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 
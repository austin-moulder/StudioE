"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Loader2, ArrowLeft, PencilIcon, CheckIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface LessonType {
  id: string;
  student_id: string;
  instructor_id: string;
  student_name: string;
  instructor_name: string;
  first_time_match: boolean;
  lesson_start: string;
  invoiced_date: string;
  instructor_pay_rate: number;
  num_hours: number;
  instructor_pay: number;
  invoice_notes: string | null;
  homework_notes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function LessonDetailPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<LessonType | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const id = params.id as string;
  
  useEffect(() => {
    if (!user || !id) return;
    let didCancel = false;
    async function fetchLessonAndUserType() {
      try {
        const lessonResponse = await fetch(`/api/lessons?id=${id}`);
        if (!lessonResponse.ok) throw new Error('Failed to fetch lesson');
        const lessonData = await lessonResponse.json();
        if (!lessonData.lessons || lessonData.lessons.length === 0) throw new Error('Lesson not found');
        if (!didCancel) setLesson(lessonData.lessons[0]);
        
        const profileResponse = await fetch('/api/user/profile');
        const profileData = await profileResponse.json();
        
        setIsInstructor(profileData.account_type === 'instructor');
        setIsAdmin(profileData.account_type === 'admin');
        
      } catch (error) {
        if (!didCancel) {
          console.error('Error fetching lesson:', error);
          toast({
            title: "Error",
            description: "Failed to load lesson details. Please try again.",
            variant: "destructive",
          });
        }
      } finally {
        if (!didCancel) setLoading(false);
      }
    }
    fetchLessonAndUserType();
    return () => { didCancel = true; };
  }, [user, id]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!lesson) return;
    
    setUpdating(true);
    try {
      const response = await fetch(`/api/lessons/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update lesson status');
      }
      
      const updatedLesson = await response.json();
      setLesson(prevLesson => {
        if (!prevLesson) return null;
        return { ...prevLesson, status: newStatus };
      });
      
      toast({
        title: "Success",
        description: `Lesson status updated to ${newStatus}`,
      });
      
    } catch (error) {
      console.error('Error updating lesson status:', error);
      toast({
        title: "Error",
        description: "Failed to update lesson status",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="container mx-auto py-12">
        <Link href="/dashboard/lessons">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Lessons
          </Button>
        </Link>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h3 className="font-medium text-lg mb-2">Lesson not found</h3>
              <p className="text-gray-500 mb-4">
                The lesson you're looking for doesn't exist or you don't have permission to view it.
              </p>
              <Link href="/dashboard/lessons">
                <Button>
                  View All Lessons
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/dashboard/lessons">
            <Button variant="outline" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Lessons
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mt-2">Lesson Details</h1>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle>
                {lesson.student_name} with {lesson.instructor_name}
              </CardTitle>
              <div className="text-gray-500 mt-2">
                {format(new Date(lesson.lesson_start), 'PPPP')} • {lesson.num_hours} hour{lesson.num_hours !== 1 ? 's' : ''}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(lesson.status)}>
                {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
              </Badge>
              
              {(isInstructor || isAdmin) && lesson.status === 'pending' && (
                <Button 
                  size="sm"
                  variant="outline"
                  className="ml-2"
                  onClick={() => handleStatusUpdate('completed')}
                  disabled={updating}
                >
                  {updating ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <CheckIcon className="h-4 w-4 mr-2" />
                  )}
                  Mark as Completed
                </Button>
              )}
              
              {isAdmin && (
                <Button 
                  size="sm" 
                  variant="outline"
                  className="ml-2"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-3">Lesson Information</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Student</div>
                    <div>{lesson.student_name}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Instructor</div>
                    <div>{lesson.instructor_name}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Lesson Date</div>
                    <div>{format(new Date(lesson.lesson_start), 'PPP')}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Invoiced Date</div>
                    <div>{format(new Date(lesson.invoiced_date), 'PPP')}</div>
                  </div>
                  {lesson.first_time_match && (
                    <div>
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        First Time Match
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-3">Payment Details</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Hourly Rate</div>
                    <div>${lesson.instructor_pay_rate.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Hours</div>
                    <div>{lesson.num_hours}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Total Payment</div>
                    <div className="text-lg font-semibold">${lesson.instructor_pay.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {lesson.invoice_notes && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Lesson Notes</h3>
                <p className="whitespace-pre-line">{lesson.invoice_notes}</p>
              </div>
            )}
            
            {lesson.homework_notes && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Homework Notes</h3>
                <p className="whitespace-pre-line">{lesson.homework_notes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
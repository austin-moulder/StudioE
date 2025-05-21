"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import LessonInvoiceForm from "@/components/dashboard/LessonInvoiceForm";
import Link from "next/link";

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

export default function LessonsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [lessons, setLessons] = useState<LessonType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Only fetch if user is loaded and authenticated
    if (!user) return;
    if (!user.id) return;
    
    let didCancel = false;
    setLoading(true);
    async function fetchLessons() {
      try {
        const response = await fetch('/api/lessons');
        if (!response.ok) {
          throw new Error('Failed to fetch lessons');
        }
        const data = await response.json();
        if (!didCancel) setLessons(data.lessons || []);
      } catch (error) {
        if (!didCancel) {
          console.error('Error fetching lessons:', error);
          toast({
            title: "Error",
            description: "Failed to load lessons. Please try again.",
            variant: "destructive",
          });
        }
      } finally {
        if (!didCancel) setLoading(false);
      }
    }
    fetchLessons();
    return () => { didCancel = true; };
  }, [user]); // Only depend on user

  // Filter lessons based on active tab
  const filteredLessons = lessons.filter(lesson => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return lesson.status === "pending";
    if (activeTab === "completed") return lesson.status === "completed";
    return true;
  });

  // Group lessons by month/year
  const groupedLessons = filteredLessons.reduce((acc, lesson) => {
    const date = new Date(lesson.lesson_start);
    const monthYear = format(date, 'MMMM yyyy');
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    
    acc[monthYear].push(lesson);
    return acc;
  }, {} as Record<string, LessonType[]>);

  // Sort groups by date (newest first)
  const sortedGroupKeys = Object.keys(groupedLessons).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });

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

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lessons</h1>
        <Button onClick={() => setShowInvoiceForm(!showInvoiceForm)}>
          {showInvoiceForm ? (
            "Hide Form"
          ) : (
            <>
              <PlusIcon className="mr-2 h-4 w-4" />
              New Lesson Invoice
            </>
          )}
        </Button>
      </div>
      
      {showInvoiceForm && (
        <div className="my-6">
          <LessonInvoiceForm />
        </div>
      )}
      
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Lessons</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : filteredLessons.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <h3 className="font-medium text-lg mb-2">No lessons found</h3>
                  <p className="text-gray-500 mb-4">
                    {activeTab === "all" 
                      ? "You don't have any lessons yet."
                      : `You don't have any ${activeTab} lessons.`}
                  </p>
                  <Button 
                    onClick={() => setShowInvoiceForm(true)}
                    className="mt-2"
                  >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Create your first lesson
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {sortedGroupKeys.map(monthYear => (
                <div key={monthYear}>
                  <h2 className="text-xl font-bold mb-4">{monthYear}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedLessons[monthYear]
                      .sort((a, b) => new Date(b.lesson_start).getTime() - new Date(a.lesson_start).getTime())
                      .map(lesson => (
                        <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{lesson.student_name}</CardTitle>
                                <CardDescription>
                                  with {lesson.instructor_name}
                                </CardDescription>
                              </div>
                              <Badge className={getStatusColor(lesson.status)}>
                                {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">Date:</span>
                                <span className="text-sm">
                                  {format(new Date(lesson.lesson_start), 'PPP')}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">Duration:</span>
                                <span className="text-sm">{lesson.num_hours} hour{lesson.num_hours !== 1 ? 's' : ''}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">Rate:</span>
                                <span className="text-sm">${lesson.instructor_pay_rate}/hour</span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>Total:</span>
                                <span>${lesson.instructor_pay}</span>
                              </div>
                              
                              {lesson.invoice_notes && (
                                <div className="mt-4">
                                  <div className="text-sm font-medium mb-1">Notes:</div>
                                  <p className="text-sm text-gray-600 line-clamp-3">
                                    {lesson.invoice_notes}
                                  </p>
                                </div>
                              )}
                              
                              <div className="pt-4">
                                <Link href={`/dashboard/lessons/${lesson.id}`}>
                                  <Button variant="outline" size="sm" className="w-full">
                                    View Details
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 
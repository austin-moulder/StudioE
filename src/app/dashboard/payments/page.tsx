"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { redirect } from "next/navigation";
import { CreditCard, Receipt, ArrowLeft, Clock, Calendar, Download, PlusCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Image from "next/image";

// Mock payment history data
const PAYMENT_HISTORY = [
  {
    id: "INV-001",
    date: new Date().toISOString().split('T')[0], // Today's date as default
    description: "Virtual Consultation with Studio E Specialist",
    amount: 0.00,
    status: "completed"
  }
];

// Mock saved payment methods
const PAYMENT_METHODS = [
  {
    id: "pm_1",
    type: "visa",
    last4: "4242",
    expiryMonth: "12",
    expiryYear: "2025",
    isDefault: true
  },
  {
    id: "pm_2",
    type: "mastercard",
    last4: "5555",
    expiryMonth: "10",
    expiryYear: "2024",
    isDefault: false
  }
];

// Format date for display
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default function PaymentsPage() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState({
    download: false as boolean | string,
    checkout: false
  });
  const [paymentHistory, setPaymentHistory] = useState(PAYMENT_HISTORY);
  
  useEffect(() => {
    setMounted(true);
    
    // Update the payment date if user exists
    if (user) {
      try {
        // Try to get the created time from user data
        // Assuming the created time is available in some form from user
        const userCreatedTime = user.email_confirmed_at || new Date();
        const signupDate = new Date(userCreatedTime);
        const formattedDate = signupDate.toISOString().split('T')[0];
        
        // Update the payment history with the signup date
        setPaymentHistory([{
          ...PAYMENT_HISTORY[0],
          date: formattedDate
        }]);
      } catch (error) {
        console.error('Error setting user signup date:', error);
        // Keep using default date if there's an error
      }
    }
  }, [user]);

  // If not mounted yet, don't render anything to avoid hydration mismatch
  if (!mounted) return null;

  // If not loading and no user, redirect to sign in
  if (!isLoading && !user) {
    redirect("/");
  }

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="container max-w-5xl mx-auto py-16 px-4 text-center">
        <div className="w-12 h-12 border-4 border-[#EC407A] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your payment information...</p>
      </div>
    );
  }
  
  const handleDownloadInvoice = (invoiceId) => {
    setLoading(prev => ({ ...prev, download: invoiceId }));
    
    // Simulate download delay
    setTimeout(() => {
      setLoading(prev => ({ ...prev, download: false }));
      toast.success(`Invoice ${invoiceId} downloaded successfully`);
    }, 1000);
  };
  
  const handleCheckout = () => {
    setLoading(prev => ({ ...prev, checkout: true }));
    
    // Simulate checkout process
    setTimeout(() => {
      setLoading(prev => ({ ...prev, checkout: false }));
      toast.info("This is a demo. Checkout functionality is not active.");
    }, 1500);
  };
  
  const handleAddPaymentMethod = () => {
    toast.info("This is a demo. Adding payment methods is not active.");
  };
  
  const handleRemovePaymentMethod = (id) => {
    toast.info("This is a demo. Removing payment methods is not active.");
  };
  
  const handleSetDefaultPaymentMethod = (id) => {
    toast.info("This is a demo. Setting default payment method is not active.");
  };

  return (
    <div className="container max-w-5xl mx-auto py-10 px-4">
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Payments & Billing</h1>
        <p className="text-gray-500 mt-1">
          Manage your payment methods and view transaction history
        </p>
      </div>

      <Tabs defaultValue="history" className="space-y-8">
        <TabsList className="mb-4">
          <TabsTrigger value="history" className="flex items-center">
            <Receipt className="mr-2 h-4 w-4" />
            Payment History
          </TabsTrigger>
          <TabsTrigger value="methods" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            Payment Methods
          </TabsTrigger>
          <TabsTrigger value="checkout" className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            Buy Classes
          </TabsTrigger>
        </TabsList>
        
        {/* Payment History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-[#EC407A]" />
                Recent Payment History
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                View and download your recent transactions
              </p>
            </CardHeader>
            <CardContent>
              {paymentHistory.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Invoice</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Date</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Description</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Amount</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                        <th className="py-2 px-4 text-right text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentHistory.map((payment) => (
                        <tr key={payment.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm">{payment.id}</td>
                          <td className="py-3 px-4 text-sm">{formatDate(payment.date)}</td>
                          <td className="py-3 px-4 text-sm">{payment.description}</td>
                          <td className="py-3 px-4 text-sm font-medium">${payment.amount.toFixed(2)}</td>
                          <td className="py-3 px-4 text-sm">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {payment.status === 'completed' ? 'Paid' : payment.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="inline-flex items-center"
                              onClick={() => handleDownloadInvoice(payment.id)}
                              disabled={loading.download === payment.id}
                            >
                              {loading.download === payment.id ? (
                                <div className="animate-spin mr-1 h-3 w-3 border-2 border-gray-500 border-t-transparent rounded-full"></div>
                              ) : (
                                <Download className="mr-1 h-3 w-3" />
                              )}
                              Receipt
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center rounded-full bg-gray-100 p-3 mb-4">
                    <Receipt className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No payment history</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Your payment history will appear here after your first purchase.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-[#EC407A]" />
                Upcoming Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-blue-100 bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Information</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        You don't have any upcoming scheduled payments. All classes and packages are paid for upfront.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payment Methods Tab */}
        <TabsContent value="methods" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-[#EC407A]" />
                Your Payment Methods
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage your saved payment methods for faster checkout
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {PAYMENT_METHODS.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      {method.type === 'visa' && (
                        <div className="w-12 h-8 relative mr-3">
                          <div className="absolute inset-0 bg-blue-600 rounded-md flex items-center justify-center">
                            <div className="text-white font-bold text-sm">VISA</div>
                          </div>
                        </div>
                      )}
                      {method.type === 'mastercard' && (
                        <div className="w-12 h-8 relative mr-3">
                          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-md flex items-center justify-center">
                            <div className="text-white font-bold text-[9px]">MASTERCARD</div>
                          </div>
                        </div>
                      )}
                      <div>
                        <p className="font-medium">
                          {method.type.charAt(0).toUpperCase() + method.type.slice(1)} ending in {method.last4}
                          {method.isDefault && <span className="ml-2 text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Default</span>}
                        </p>
                        <p className="text-sm text-gray-500">Expires {method.expiryMonth}/{method.expiryYear}</p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      {!method.isDefault && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSetDefaultPaymentMethod(method.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => handleRemovePaymentMethod(method.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-dashed"
                  onClick={handleAddPaymentMethod}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
                
                <div className="mt-4 text-xs text-gray-500 flex items-center justify-center space-x-4">
                  <span className="flex items-center">
                    <div className="w-8 h-5 relative mr-1">
                      <div className="absolute inset-0 bg-blue-600 rounded-md flex items-center justify-center">
                        <div className="text-white font-bold text-[8px]">VISA</div>
                      </div>
                    </div>
                    Visa
                  </span>
                  <span className="flex items-center">
                    <div className="w-8 h-5 relative mr-1">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-md flex items-center justify-center">
                        <div className="text-white font-bold text-[6px]">MASTERCARD</div>
                      </div>
                    </div>
                    Mastercard
                  </span>
                  <span className="flex items-center">
                    <div className="w-8 h-5 relative mr-1">
                      <div className="absolute inset-0 bg-gray-800 rounded-md flex items-center justify-center">
                        <div className="text-white font-bold text-[8px]">AMEX</div>
                      </div>
                    </div>
                    Amex
                  </span>
                </div>
                
                <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-sm font-medium mb-2">Secure Payments</h3>
                  <p className="text-xs text-gray-500">
                    All payments are processed securely through our payment provider. We never store your full card details on our servers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Checkout Tab */}
        <TabsContent value="checkout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlusCircle className="mr-2 h-5 w-5 text-[#EC407A]" />
                Private Lesson Packages
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose a private instruction package to enhance your dance skills
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {/* Live Studio E-valuation */}
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col justify-between h-[360px]">
                  <div>
                    <h3 className="text-lg font-bold mb-2">Live Studio E-valuation</h3>
                    <div className="text-2xl font-bold text-[#EC407A] mb-1">$49</div>
                    <div className="text-sm text-gray-500 mb-3">30-minute consultation session</div>
                    <ul className="mb-4 space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Work with a Studio E specialist
                      </li>
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Diagnose your dance goals
                      </li>
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Build a personalized plan
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full mt-auto">Get Started</Button>
                </div>
                
                {/* Single Instructor Experience */}
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col justify-between h-[360px]">
                  <div>
                    <h3 className="text-lg font-bold mb-2">Single Instructor Experience</h3>
                    <div className="text-2xl font-bold text-[#EC407A] mb-1">$99</div>
                    <div className="text-sm text-gray-500 mb-3">1-hour introductory session</div>
                    <ul className="mb-4 space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        One private lesson with an instructor
                      </li>
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Focused teaching on your specific needs
                      </li>
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Personalized feedback and next steps
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full mt-auto">Select Package</Button>
                </div>
                
                {/* Multi-instructor Experience */}
                <div className="border-2 border-[#EC407A] rounded-lg p-4 hover:shadow-md transition-shadow relative flex flex-col justify-between h-[360px]">
                  <div>
                    <div className="absolute -top-3 right-4 bg-[#EC407A] text-white text-xs px-2 py-1 rounded-full font-medium">
                      Best Value
                    </div>
                    <h3 className="text-lg font-bold mb-2">Multi-instructor Experience</h3>
                    <div className="text-2xl font-bold text-[#EC407A] mb-1">$449</div>
                    <div className="text-sm text-gray-500 mb-3">5 one-hour sessions with different instructors</div>
                    <ul className="mb-4 space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        5 private lessons with up to 5 instructors
                      </li>
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Experience diverse teaching styles
                      </li>
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Comprehensive progress tracking
                      </li>
                    </ul>
                  </div>
                  <Button 
                    className="w-full bg-[#EC407A] hover:bg-[#EC407A]/90 mt-auto"
                    onClick={handleCheckout}
                    disabled={loading.checkout}
                  >
                    {loading.checkout ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Processing...
                      </>
                    ) : "Select Package"}
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 rounded-md border border-yellow-100 bg-yellow-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Demo Mode</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        This is a demonstration. Payment buttons are not active. In a live environment, clicking these buttons would take you to a secure checkout page.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 
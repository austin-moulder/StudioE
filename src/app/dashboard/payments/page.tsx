"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { redirect, useSearchParams } from "next/navigation";
import { CreditCard, Receipt, ArrowLeft, Clock, Calendar, Download, PlusCircle, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Image from "next/image";
import BackButton from "@/components/dashboard/BackButton";
import { getStripe, PRODUCTS, ProductKey } from "@/lib/stripe/config";
import { supabase } from "@/lib/supabase/client";

// Types
interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  product_key: string;
  created_at: string;
  stripe_payment_intent_id: string;
}

// Format date for display
const formatDate = (dateString: string) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Format amount from cents to dollars
const formatAmount = (cents: number) => {
  return (cents / 100).toFixed(2);
};

export default function PaymentsPage() {
  const { user, isLoading } = useAuth();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState({
    download: false as boolean | string,
    checkout: false as boolean | string
  });
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentsLoading, setPaymentsLoading] = useState(true);
  
  useEffect(() => {
    setMounted(true);
    
    // Check for success/cancel from Stripe
    if (searchParams) {
      const success = searchParams.get('success');
      const canceled = searchParams.get('canceled');
      
      if (success) {
        toast.success('Payment successful! Thank you for your purchase.');
      } else if (canceled) {
        toast.error('Payment was canceled.');
      }
    }
  }, [searchParams]);

  // Fetch real payments from database
  useEffect(() => {
    async function fetchPayments() {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('payments')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching payments:', error);
          toast.error('Failed to load payment history');
        } else {
          setPayments(data || []);
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
        toast.error('Failed to load payment history');
      } finally {
        setPaymentsLoading(false);
      }
    }

    fetchPayments();
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
  
  const handleDownloadInvoice = (paymentId: string) => {
    setLoading(prev => ({ ...prev, download: paymentId }));
    
    // Simulate download delay - in a real app, you'd generate and download a PDF
    setTimeout(() => {
      setLoading(prev => ({ ...prev, download: false }));
      toast.success(`Invoice downloaded successfully`);
    }, 1000);
  };
  
  const handleCheckout = async (productKey: ProductKey) => {
    if (!user?.id || !user?.email) {
      toast.error('Please log in to make a purchase');
      return;
    }

    setLoading(prev => ({ ...prev, checkout: productKey }));
    
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productKey,
          userId: user.id,
          userEmail: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to start checkout process');
    } finally {
      setLoading(prev => ({ ...prev, checkout: false }));
    }
  };
  
  const handleAddPaymentMethod = () => {
    toast.info("Payment methods are managed through Stripe during checkout.");
  };

  return (
    <div className="container max-w-5xl mx-auto py-10 px-4">
      <div className="mb-8">
        <BackButton />
        <h1 className="text-3xl font-bold tracking-tight">Payments & Billing</h1>
        <p className="text-gray-500 mt-1">
          Manage your payment methods and view transaction history
        </p>
      </div>

      <Tabs defaultValue="history" className="space-y-8">
        <div className="overflow-x-auto -mx-4 px-4">
          <TabsList className="mb-4 flex-nowrap w-max min-w-full">
            <TabsTrigger value="history" className="flex items-center whitespace-nowrap">
              <Receipt className="mr-2 h-4 w-4" />
              <span>Payment History</span>
            </TabsTrigger>
            <TabsTrigger value="checkout" className="flex items-center whitespace-nowrap">
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Buy Classes</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
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
              {paymentsLoading ? (
                <div className="text-center py-10">
                  <div className="w-8 h-8 border-4 border-[#EC407A] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading payment history...</p>
                </div>
              ) : payments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Date</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Description</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Amount</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                        <th className="py-2 px-4 text-right text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm">{formatDate(payment.created_at)}</td>
                          <td className="py-3 px-4 text-sm">
                            {PRODUCTS[payment.product_key as ProductKey]?.name || payment.product_key}
                          </td>
                          <td className="py-3 px-4 text-sm font-medium">${formatAmount(payment.amount)}</td>
                          <td className="py-3 px-4 text-sm">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              payment.status === 'succeeded' 
                                ? 'bg-green-100 text-green-800'
                                : payment.status === 'failed'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {payment.status === 'succeeded' ? (
                                <>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Paid
                                </>
                              ) : payment.status}
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
                    <h3 className="text-lg font-bold mb-2">{PRODUCTS.STUDIO_EVALUATION.name}</h3>
                    <div className="text-2xl font-bold text-[#EC407A] mb-1">${formatAmount(PRODUCTS.STUDIO_EVALUATION.price)}</div>
                    <div className="text-sm text-gray-500 mb-3">{PRODUCTS.STUDIO_EVALUATION.description}</div>
                    <ul className="mb-4 space-y-2 text-sm">
                      {PRODUCTS.STUDIO_EVALUATION.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    className="w-full mt-auto"
                    onClick={() => handleCheckout('STUDIO_EVALUATION')}
                    disabled={loading.checkout === 'STUDIO_EVALUATION'}
                  >
                    {loading.checkout === 'STUDIO_EVALUATION' ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Processing...
                      </>
                    ) : "Get Started"}
                  </Button>
                </div>
                
                {/* Single Instructor Experience */}
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col justify-between h-[360px]">
                  <div>
                    <h3 className="text-lg font-bold mb-2">{PRODUCTS.SINGLE_INSTRUCTOR.name}</h3>
                    <div className="text-2xl font-bold text-[#EC407A] mb-1">${formatAmount(PRODUCTS.SINGLE_INSTRUCTOR.price)}</div>
                    <div className="text-sm text-gray-500 mb-3">{PRODUCTS.SINGLE_INSTRUCTOR.description}</div>
                    <ul className="mb-4 space-y-2 text-sm">
                      {PRODUCTS.SINGLE_INSTRUCTOR.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    className="w-full mt-auto"
                    onClick={() => handleCheckout('SINGLE_INSTRUCTOR')}
                    disabled={loading.checkout === 'SINGLE_INSTRUCTOR'}
                  >
                    {loading.checkout === 'SINGLE_INSTRUCTOR' ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Processing...
                      </>
                    ) : "Select Package"}
                  </Button>
                </div>
                
                {/* Multi-instructor Experience */}
                <div className="border-2 border-[#EC407A] rounded-lg p-4 hover:shadow-md transition-shadow relative flex flex-col justify-between h-[360px]">
                  <div>
                    <div className="absolute -top-3 right-4 bg-[#EC407A] text-white text-xs px-2 py-1 rounded-full font-medium">
                      Best Value
                    </div>
                    <h3 className="text-lg font-bold mb-2">{PRODUCTS.MULTI_INSTRUCTOR.name}</h3>
                    <div className="text-2xl font-bold text-[#EC407A] mb-1">${formatAmount(PRODUCTS.MULTI_INSTRUCTOR.price)}</div>
                    <div className="text-sm text-gray-500 mb-3">{PRODUCTS.MULTI_INSTRUCTOR.description}</div>
                    <ul className="mb-4 space-y-2 text-sm">
                      {PRODUCTS.MULTI_INSTRUCTOR.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    className="w-full bg-[#EC407A] hover:bg-[#EC407A]/90 mt-auto"
                    onClick={() => handleCheckout('MULTI_INSTRUCTOR')}
                    disabled={loading.checkout === 'MULTI_INSTRUCTOR'}
                  >
                    {loading.checkout === 'MULTI_INSTRUCTOR' ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Processing...
                      </>
                    ) : "Select Package"}
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 rounded-md border border-green-100 bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Secure Payments</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        All payments are processed securely through Stripe. Your card information is never stored on our servers.
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
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createStorageBuckets, getBlogAuthorsTableSQL } from '@/lib/supabase/setup';

export default function AdminSetupPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [sqlVisible, setSqlVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCreateBuckets = async () => {
    setLoading(true);
    try {
      const result = await createStorageBuckets();
      setResult(result);
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        error
      });
    } finally {
      setLoading(false);
    }
  };

  const copySQL = () => {
    navigator.clipboard.writeText(getBlogAuthorsTableSQL());
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Setup</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Storage Buckets Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-500">
              Create Supabase storage buckets for blog images and profile images.
              This operation only needs to be done once.
            </p>
            <Button 
              onClick={handleCreateBuckets} 
              disabled={loading}
              className="mb-4"
            >
              {loading ? 'Creating buckets...' : 'Create Buckets'}
            </Button>

            {result && (
              <div className={`p-4 border rounded-md ${
                result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}>
                <p className={result.success ? 'text-green-700' : 'text-red-700'}>
                  {result.message}
                </p>
                {result.data && (
                  <pre className="mt-2 text-xs overflow-auto p-2 bg-gray-100 rounded">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blog Authors Table Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-500">
              SQL commands to create the blog_authors table and update blog_posts table.
              Execute these in the Supabase SQL Editor.
            </p>
            <div className="flex gap-4 mb-4">
              <Button 
                onClick={() => setSqlVisible(!sqlVisible)}
                variant="outline"
              >
                {sqlVisible ? 'Hide SQL' : 'View SQL'}
              </Button>
              <Button 
                onClick={copySQL}
                variant={copySuccess ? "default" : "outline"}
              >
                {copySuccess ? 'Copied!' : 'Copy SQL'}
              </Button>
            </div>

            {sqlVisible && (
              <pre className="text-xs bg-gray-100 p-4 rounded-md overflow-auto max-h-[400px]">
                {getBlogAuthorsTableSQL()}
              </pre>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { RentalSpace, getAllRentalSpaces } from '@/lib/supabase/rentalSpacesUtils';
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';
import { Check, X, Star, DollarSign, Users } from 'lucide-react';

export default function ManageSpacesPage() {
  const { user } = useAuth();
  const [authLoading, setAuthLoading] = useState(true);
  const [spaces, setSpaces] = useState<RentalSpace[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if auth state is loaded
    if (user !== undefined) {
      setAuthLoading(false);
    }
  }, [user]);

  useEffect(() => {
    async function fetchSpaces() {
      try {
        const allSpaces = await getAllRentalSpaces();
        setSpaces(allSpaces);
      } catch (error) {
        console.error('Error fetching spaces:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!authLoading && user) {
      fetchSpaces();
    }
  }, [user, authLoading]);

  // Check if user is not authenticated or still loading
  if (!user && !authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
        <p className="text-gray-600 mb-6">You need to be logged in to access this page.</p>
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Rental Spaces</h1>
        <Link href="/admin/manage-spaces/new">
          <Button className="bg-[#F94C8D] hover:bg-[#F94C8D]/90">Add New Space</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded-md w-full mb-4" />
          <div className="h-10 bg-gray-200 rounded-md w-full mb-2" />
          <div className="h-10 bg-gray-200 rounded-md w-full mb-2" />
          <div className="h-10 bg-gray-200 rounded-md w-full mb-2" />
        </div>
      ) : spaces.length > 0 ? (
        <Table>
          <TableCaption>A list of all rental spaces.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Price/hr</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {spaces.map((space) => (
              <TableRow key={space.id}>
                <TableCell className="font-medium">{space.name}</TableCell>
                <TableCell>{space.address}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                    {space.pricePerHour}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-blue-600" />
                    {space.capacity}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {space.rating}
                  </div>
                </TableCell>
                <TableCell>
                  {space.isFeatured ? (
                    <Badge className="bg-[#F94C8D]">
                      <Check className="h-3 w-3 mr-1" /> Featured
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      <X className="h-3 w-3 mr-1" /> Not Featured
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/admin/manage-spaces/${space.id}`}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="text-gray-500 mb-4">No rental spaces found.</p>
          <Link href="/admin/manage-spaces/new">
            <Button className="bg-[#F94C8D] hover:bg-[#F94C8D]/90">Add Your First Space</Button>
          </Link>
        </div>
      )}
    </div>
  );
} 
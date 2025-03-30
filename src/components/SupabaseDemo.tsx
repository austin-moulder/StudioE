"use client";

import { useState, useEffect } from "react";
import { fetchData, insertData, updateData, deleteData } from "@/lib/supabase/supabaseUtils";
import { useSupabaseAuth } from "@/lib/hooks/useSupabaseAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Type for our sample data (instructors)
interface Instructor {
  id: number;
  name: string;
  style: string;
  location: string;
  price_lower: number;
  price_upper: number;
  rating: number;
  created_at?: string;
}

export default function SupabaseDemo() {
  const { user } = useSupabaseAuth();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newInstructor, setNewInstructor] = useState<Omit<Instructor, 'id' | 'created_at'>>({
    name: '',
    style: '',
    location: '',
    price_lower: 50,
    price_upper: 70,
    rating: 4.5
  });

  // Load instructors on component mount
  useEffect(() => {
    const loadInstructors = async () => {
      try {
        setLoading(true);
        const data = await fetchData('instructors');
        // Safe type assertion with unknown as intermediate step
        setInstructors(data as unknown as Instructor[]);
        setError(null);
      } catch (err) {
        setError('Failed to load instructors. Is your Supabase table set up?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadInstructors();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewInstructor(prev => ({
      ...prev,
      [name]: name.includes('price') || name === 'rating' ? parseFloat(value) : value
    }));
  };

  // Add a new instructor
  const handleAddInstructor = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be signed in to add instructors');
      return;
    }

    try {
      setLoading(true);
      const result = await insertData('instructors', newInstructor);
      setInstructors(prev => [...prev, result[0] as unknown as Instructor]);
      // Reset form
      setNewInstructor({
        name: '',
        style: '',
        location: '',
        price_lower: 50,
        price_upper: 70,
        rating: 4.5
      });
      setError(null);
    } catch (err) {
      setError('Failed to add instructor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete an instructor
  const handleDeleteInstructor = async (id: number) => {
    if (!user) {
      setError('You must be signed in to delete instructors');
      return;
    }

    try {
      setLoading(true);
      await deleteData('instructors', [{ column: 'id', value: id }]);
      setInstructors(prev => prev.filter(instructor => instructor.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete instructor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Supabase Demo: Instructors Management</h2>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              {error}
            </div>
          )}

          {/* Add new instructor form (only for logged in users) */}
          {user && (
            <form onSubmit={handleAddInstructor} className="mb-8 space-y-4">
              <h3 className="text-lg font-medium">Add New Instructor</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    name="name"
                    value={newInstructor.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Style</label>
                  <Input
                    name="style"
                    value={newInstructor.style}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <Input
                    name="location"
                    value={newInstructor.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                  <Input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    step="0.1"
                    value={newInstructor.rating}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price (Lower)</label>
                  <Input
                    type="number"
                    name="price_lower"
                    min="0"
                    value={newInstructor.price_lower}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price (Upper)</label>
                  <Input
                    type="number"
                    name="price_upper"
                    min="0"
                    value={newInstructor.price_upper}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Instructor'}
              </Button>
            </form>
          )}

          {/* Instructors list */}
          <div>
            <h3 className="text-lg font-medium mb-4">Current Instructors</h3>
            {loading && instructors.length === 0 ? (
              <p>Loading instructors...</p>
            ) : instructors.length > 0 ? (
              <div className="space-y-4">
                {instructors.map((instructor) => (
                  <div 
                    key={instructor.id} 
                    className="flex justify-between items-center p-4 border rounded-md"
                  >
                    <div>
                      <h4 className="font-medium">{instructor.name}</h4>
                      <p className="text-sm text-gray-500">
                        {instructor.style} • {instructor.location}
                      </p>
                      <p className="text-sm">
                        ${instructor.price_lower}-${instructor.price_upper} • ⭐ {instructor.rating}
                      </p>
                    </div>
                    {user && (
                      <Button 
                        variant="outline"
                        className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
                        size="sm"
                        onClick={() => handleDeleteInstructor(instructor.id)}
                        disabled={loading}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No instructors found. Add some to see them here!</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
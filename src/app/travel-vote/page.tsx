"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'

export default function TravelVotePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    mexico_city_rank: '',
    colombia_rank: '',
    korea_rank: '',
    puerto_rico_rank: '',
    italy_rank: '',
    cuba_rank: '',
    spain_rank: '',
    guatemala_rank: '',
  })

  // Track all used ranks to prevent duplicates
  const [usedRanks, setUsedRanks] = useState<Record<string, boolean>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    // If this rank was already used for a different destination, show warning
    if (usedRanks[value] && formData[field as keyof typeof formData] !== value) {
      toast.warning(`You've already used rank ${value} for another destination.`)
      return
    }

    // Remove the previous rank from usedRanks
    const prevRank = formData[field as keyof typeof formData]
    if (prevRank) {
      const newUsedRanks = { ...usedRanks }
      delete newUsedRanks[prevRank]
      setUsedRanks(newUsedRanks)
    }

    // Add the new rank to usedRanks
    setUsedRanks(prev => ({ ...prev, [value]: true }))
    
    // Update formData
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Form validation checks
      if (!formData.name) {
        throw new Error('Please enter your name');
      }

      // Check if all destinations have been ranked
      const destinationFields = [
        'mexico_city_rank', 'colombia_rank', 'korea_rank', 'puerto_rico_rank',
        'italy_rank', 'cuba_rank', 'spain_rank', 'guatemala_rank'
      ];

      const missingRanks = destinationFields.filter(field => !formData[field as keyof typeof formData]);
      if (missingRanks.length > 0) {
        throw new Error('Please rank all destinations');
      }

      // Prepare data with proper types
      const submissionData = {
        name: formData.name,
        mexico_city_rank: parseInt(formData.mexico_city_rank),
        colombia_rank: parseInt(formData.colombia_rank),
        korea_rank: parseInt(formData.korea_rank),
        puerto_rico_rank: parseInt(formData.puerto_rico_rank),
        italy_rank: parseInt(formData.italy_rank),
        cuba_rank: parseInt(formData.cuba_rank),
        spain_rank: parseInt(formData.spain_rank),
        guatemala_rank: parseInt(formData.guatemala_rank)
      };

      console.log('Submitting data:', submissionData);

      // Submit to Supabase TRAVEL_DESTINATION_VOTES table
      console.log('Attempting to submit vote to Supabase...');
      const { data, error } = await supabase
        .from('TRAVEL_DESTINATION_VOTES')
        .insert(submissionData);

      console.log('Supabase response:', { data, error });

      // Handle specific error cases
      if (error) {
        console.error('Supabase error details:', error);
        
        // Handle specific error codes
        if (error.code === '23505') {
          throw new Error('You have already submitted a vote with this name.');
        } else if (error.code === '23502') {
          throw new Error('Missing required fields. Please ensure all destinations are ranked.');
        } else if (error.code === '42P01') {
          throw new Error('The votes table is not properly set up. Please contact the administrator.');
        } else {
          // For any other error, show a generic message with the error details
          throw new Error(`Error submitting vote: ${error.message || 'Unknown error'}`);
        }
      }
      
      // Success case
      toast.success('Thank you for voting! Your preferences have been recorded.');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        mexico_city_rank: '',
        colombia_rank: '',
        korea_rank: '',
        puerto_rico_rank: '',
        italy_rank: '',
        cuba_rank: '',
        spain_rank: '',
        guatemala_rank: '',
      });
      setUsedRanks({});
      
      // Redirect to travel page after 2 seconds
      setTimeout(() => {
        router.push('/studio-e-travel');
      }, 2000);
      
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast.error(error?.message || 'Failed to submit vote. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Available ranks for destinations
  const ranks = ['1', '2', '3', '4', '5', '6', '7', '8']

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[200px] w-full" />
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Vote for Our Next Destination</h1>
          <p className="mt-4 max-w-2xl text-lg">
            Help us choose the next Studio E international dance trip
          </p>
        </div>
      </section>

      <div className="container py-12 max-w-3xl mx-auto">
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-bold">Destination Ranking Form</h2>
            <p className="text-gray-500">
              Rank the itineraries from best (1) to worst (8). The itineraries with the lowest points will be selected into the top 3.
            </p>
            <p className="text-gray-500 mt-2">
              <Link 
                href="https://docs.google.com/document/d/1ULAS8mxe7DpGVmb98gHkZmbw2uO9OwHAuWTYwYnNxT0/edit?usp=sharing" 
                target="_blank"
                className="text-[#FF3366] hover:text-[#FF3366]/80 underline underline-offset-4"
              >
                View detailed itineraries
              </Link>
              {" "}for each destination before making your selections.
            </p>
          </div>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Name Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4">Your Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="font-medium">
                        Name <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                </div>

                {/* Destination Rankings Section */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Destination Rankings</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Rank each destination from 1 (best) to 8 (worst). Use each number only once.
                  </p>
                  
                  <div className="space-y-6">
                    {/* Mexico City */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 rounded-md bg-gray-50">
                      <div>
                        <h4 className="font-medium">Mexico City, Mexico</h4>
                        <p className="text-sm text-gray-500">September 26, 2025 - October 6, 2025 | 11 days</p>
                      </div>
                      <div className="w-full md:w-32">
                        <Select 
                          value={formData.mexico_city_rank} 
                          onValueChange={(value) => handleSelectChange('mexico_city_rank', value)}
                        >
                          <SelectTrigger id="mexico_city_rank" className="w-full">
                            <SelectValue placeholder="Rank" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {ranks.map(rank => (
                              <SelectItem 
                                key={`mexico-${rank}`} 
                                value={rank}
                                disabled={usedRanks[rank] && formData.mexico_city_rank !== rank}
                              >
                                {rank}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Colombia */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 rounded-md bg-gray-50">
                      <div>
                        <h4 className="font-medium">Cali/Medellin, Colombia</h4>
                        <p className="text-sm text-gray-500">October 22, 2025 - November 2, 2025 | 5-11 days</p>
                      </div>
                      <div className="w-full md:w-32">
                        <Select 
                          value={formData.colombia_rank} 
                          onValueChange={(value) => handleSelectChange('colombia_rank', value)}
                        >
                          <SelectTrigger id="colombia_rank" className="w-full">
                            <SelectValue placeholder="Rank" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {ranks.map(rank => (
                              <SelectItem 
                                key={`colombia-${rank}`} 
                                value={rank}
                                disabled={usedRanks[rank] && formData.colombia_rank !== rank}
                              >
                                {rank}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Korea */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 rounded-md bg-gray-50">
                      <div>
                        <h4 className="font-medium">Busan/Seoul, Korea</h4>
                        <p className="text-sm text-gray-500">October 23, 2025 - November 2, 2025 | 5-10 days</p>
                      </div>
                      <div className="w-full md:w-32">
                        <Select 
                          value={formData.korea_rank} 
                          onValueChange={(value) => handleSelectChange('korea_rank', value)}
                        >
                          <SelectTrigger id="korea_rank" className="w-full">
                            <SelectValue placeholder="Rank" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {ranks.map(rank => (
                              <SelectItem 
                                key={`korea-${rank}`} 
                                value={rank}
                                disabled={usedRanks[rank] && formData.korea_rank !== rank}
                              >
                                {rank}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Puerto Rico */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 rounded-md bg-gray-50">
                      <div>
                        <h4 className="font-medium">San Juan, Puerto Rico</h4>
                        <p className="text-sm text-gray-500">January 9, 2026 - January 19, 2026 | 10 days</p>
                      </div>
                      <div className="w-full md:w-32">
                        <Select 
                          value={formData.puerto_rico_rank} 
                          onValueChange={(value) => handleSelectChange('puerto_rico_rank', value)}
                        >
                          <SelectTrigger id="puerto_rico_rank" className="w-full">
                            <SelectValue placeholder="Rank" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {ranks.map(rank => (
                              <SelectItem 
                                key={`puerto-rico-${rank}`} 
                                value={rank}
                                disabled={usedRanks[rank] && formData.puerto_rico_rank !== rank}
                              >
                                {rank}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Italy */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 rounded-md bg-gray-50">
                      <div>
                        <h4 className="font-medium">Milan, Italy</h4>
                        <p className="text-sm text-gray-500">January 23, 2026 - February 2, 2026 | 10 days</p>
                      </div>
                      <div className="w-full md:w-32">
                        <Select 
                          value={formData.italy_rank} 
                          onValueChange={(value) => handleSelectChange('italy_rank', value)}
                        >
                          <SelectTrigger id="italy_rank" className="w-full">
                            <SelectValue placeholder="Rank" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {ranks.map(rank => (
                              <SelectItem 
                                key={`italy-${rank}`} 
                                value={rank}
                                disabled={usedRanks[rank] && formData.italy_rank !== rank}
                              >
                                {rank}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Cuba */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 rounded-md bg-gray-50">
                      <div>
                        <h4 className="font-medium">Havana, Cuba</h4>
                        <p className="text-sm text-gray-500">February 19, 2026 - March 1, 2026 | 10 days</p>
                      </div>
                      <div className="w-full md:w-32">
                        <Select 
                          value={formData.cuba_rank} 
                          onValueChange={(value) => handleSelectChange('cuba_rank', value)}
                        >
                          <SelectTrigger id="cuba_rank" className="w-full">
                            <SelectValue placeholder="Rank" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {ranks.map(rank => (
                              <SelectItem 
                                key={`cuba-${rank}`} 
                                value={rank}
                                disabled={usedRanks[rank] && formData.cuba_rank !== rank}
                              >
                                {rank}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Spain */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 rounded-md bg-gray-50">
                      <div>
                        <h4 className="font-medium">Madrid/Barcelona, Spain</h4>
                        <p className="text-sm text-gray-500">May 21, 2026 - May 31, 2026 | 6-10 days</p>
                      </div>
                      <div className="w-full md:w-32">
                        <Select 
                          value={formData.spain_rank} 
                          onValueChange={(value) => handleSelectChange('spain_rank', value)}
                        >
                          <SelectTrigger id="spain_rank" className="w-full">
                            <SelectValue placeholder="Rank" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {ranks.map(rank => (
                              <SelectItem 
                                key={`spain-${rank}`} 
                                value={rank}
                                disabled={usedRanks[rank] && formData.spain_rank !== rank}
                              >
                                {rank}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Guatemala */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 rounded-md bg-gray-50">
                      <div>
                        <h4 className="font-medium">Guatemala City, Guatemala</h4>
                        <p className="text-sm text-gray-500">Aug 7, 2026 - Aug 17, 2026 | 10 days</p>
                      </div>
                      <div className="w-full md:w-32">
                        <Select 
                          value={formData.guatemala_rank} 
                          onValueChange={(value) => handleSelectChange('guatemala_rank', value)}
                        >
                          <SelectTrigger id="guatemala_rank" className="w-full">
                            <SelectValue placeholder="Rank" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {ranks.map(rank => (
                              <SelectItem 
                                key={`guatemala-${rank}`} 
                                value={rank}
                                disabled={usedRanks[rank] && formData.guatemala_rank !== rank}
                              >
                                {rank}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">
                  Your vote will help us narrow down to 2-3 options that we will then vote on in person. 
                  Please rank all destinations from 1 (most preferred) to 8 (least preferred).
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#F94C8D] hover:bg-[#F94C8D]/90" 
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Vote'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
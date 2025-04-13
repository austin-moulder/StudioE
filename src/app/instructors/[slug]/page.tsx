import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ChevronLeft } from 'lucide-react';
import { generateInstructorSlug } from '@/lib/instructors/instructorUtils';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase/supabase';

// In the future, this would be a server function that fetches data from Supabase
async function getInstructorBySlug(slug: string) {
  try {
    // Get all instructors
    const { data: instructors, error } = await supabase
      .from('instructors')
      .select('*');
    
    if (error) {
      console.error('Error fetching instructors:', error);
      return null;
    }
    
    // Find the instructor with the matching slug
    const instructor = instructors.find(
      inst => generateInstructorSlug(inst.name) === slug
    );
    
    if (!instructor) return null;
    
    // Get the instructor profile
    const { data: profile, error: profileError } = await supabase
      .from('instructor_profiles')
      .select('*')
      .eq('instructor_id', instructor.id)
      .single();
    
    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching instructor profile:', profileError);
      // Continue without profile data
    }
    
    // Get certifications
    const { data: certifications, error: certError } = await supabase
      .from('instructor_certifications')
      .select('*')
      .eq('instructor_id', instructor.id);
    
    if (certError) {
      console.error('Error fetching certifications:', certError);
      // Continue without certifications
    }
    
    // Transform the data to match our expected format
    return {
      id: instructor.id,
      name: instructor.name,
      slug: generateInstructorSlug(instructor.name),
      imageUrl: instructor.image_url,
      imageUrl2: instructor.image_url2 || instructor.image_url, // Fallback to primary image if secondary not available
      yearsExperience: profile?.experience || instructor.years_experience || 0,
      pricePerHour: instructor.price_lower || 0,
      location: instructor.location || '',
      locationDetails: instructor.location_details || '',
      rating: instructor.rating || 0,
      reviewCount: instructor.reviews || 0,
      totalStudents: profile?.total_students || 0,
      danceStyles: instructor.style?.split(/[,&]/).map((style: string) => style.trim()) || [],
      
      // Profile data (may be null if no profile exists yet)
      teachingPhilosophy: profile?.teaching_philosophy || '',
      teachingStyle: {
        conversational: profile?.teaching_style_conversational || 50,
        energy: profile?.teaching_style_energy || 50,
        breadth: profile?.teaching_style_breadth || 50,
        flexibility: profile?.teaching_style_flexibility || 50,
        creativity: profile?.teaching_style_creativity || 50,
      },
      approachForNewStudents: profile?.approach_for_new_students || '',
      favoriteSong: profile?.favorite_song_or_artist || '',
      favoriteSongExplanation: profile?.favorite_tip || '',
      demoUrl: profile?.demo_url || '',
      
      // Schedule
      schedule: {
        monday: profile?.monday_schedule || '',
        tuesday: profile?.tuesday_schedule || '',
        wednesday: profile?.wednesday_schedule || '',
        thursday: profile?.thursday_schedule || '',
        friday: profile?.friday_schedule || '',
        saturday: profile?.saturday_schedule || '',
        sunday: profile?.sunday_schedule || '',
      },
      
      // Certifications
      certifications: (certifications || []).map((cert: any) => cert.certification_name)
    };
  } catch (error) {
    console.error('Exception in getInstructorBySlug:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const instructor = await getInstructorBySlug(params.slug);
  
  if (!instructor) {
    return {
      title: 'Instructor Not Found | Studio E',
      description: 'The instructor you are looking for could not be found.',
    };
  }
  
  return {
    title: `${instructor.name} - Dance Instructor | Studio E`,
    description: `Learn to dance with ${instructor.name}, professional instructor specializing in ${instructor.danceStyles.join(', ')}. Book your lessons today.`,
    openGraph: {
      title: `${instructor.name} - Dance Instructor | Studio E`,
      description: `Learn to dance with ${instructor.name}, professional instructor specializing in ${instructor.danceStyles.join(', ')}. Book your lessons today.`,
      images: [
        {
          url: instructor.imageUrl,
          width: 800,
          height: 600,
          alt: instructor.name,
        },
      ],
    },
  };
}

const InstructorStyleSlider = ({ label, value, leftLabel, rightLabel }: { label: string; value: number; leftLabel: string; rightLabel: string }) => {
  const isBreathOrFlexible = label === 'Breadth' || label === 'Flexibility';
  const barColor = isBreathOrFlexible ? 'bg-purple-500' : 'bg-pink-500';
  
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2 text-gray-500">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div className="relative w-full h-2 bg-gray-200 rounded-full">
        {/* Colored bar that shows the value */}
        {value < 50 ? (
          // Bar for values less than 50 (extending left from middle)
          <div
            className={`absolute top-0 h-full ${barColor} rounded-full`}
            style={{
              right: '50%',
              width: `${50 - value}%`,
            }}
          ></div>
        ) : value > 50 ? (
          // Bar for values greater than 50 (extending right from middle)
          <div
            className={`absolute top-0 h-full ${barColor} rounded-full`}
            style={{
              left: '50%',
              width: `${value - 50}%`,
            }}
          ></div>
        ) : null}
        
        {/* Knob indicator */}
        <div 
          className={`absolute top-1/2 -mt-2.5 w-5 h-5 rounded-full bg-white border-2 ${isBreathOrFlexible ? 'border-purple-500' : 'border-pink-500'} shadow`}
          style={{ 
            left: `${value}%`, 
            transform: 'translateX(-50%)',
            zIndex: 10
          }}
        ></div>
      </div>
    </div>
  );
};

export default async function InstructorProfilePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const instructor = await getInstructorBySlug(slug);
  
  // If no instructor is found, redirect to 404
  if (!instructor) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link 
        href="/instructors" 
        className="inline-flex items-center text-gray-600 hover:text-pink-600 mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Instructors
      </Link>
      
      <div className="flex flex-col gap-8">
        {/* Instructor Name */}
        <h1 className="text-3xl font-bold">{instructor.name}</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Image */}
          <div className="flex-1">
            <div className="relative rounded-lg overflow-hidden aspect-square">
              <Image 
                src={instructor.imageUrl} 
                alt={instructor.name} 
                fill
                className="object-cover"
                priority
              />
              
              {/* Styles Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                <div className="flex flex-wrap gap-1 mb-2">
                  {instructor.danceStyles.map((style) => (
                    <span 
                      key={style} 
                      className="px-3 py-1 bg-gray-100 bg-opacity-90 rounded-full text-sm text-gray-800"
                    >
                      {style}
                    </span>
                  ))}
                </div>
                
                {/* Reviews and Students Overlay - Improved mobile layout */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(instructor.rating) ? 'fill-current' : 'fill-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm sm:text-base text-white">
                      {instructor.rating} ({instructor.reviewCount})
                    </span>
                  </div>
                  {instructor.totalStudents > 0 && (
                    <div className="text-sm sm:text-base text-white">
                      <span className="font-medium">{instructor.totalStudents}+</span> students
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Info Boxes - Now stacked vertically and aligned with image height */}
          <div className="flex-1 aspect-square md:flex hidden">
            <div className="flex flex-col justify-between h-full w-full">
              <div className="text-center bg-gray-100 rounded-lg p-4 flex-1 flex flex-col justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="font-semibold text-xl">{instructor.yearsExperience} Years</p>
                <p className="text-sm text-gray-500">Experience</p>
              </div>
              
              <div className="text-center bg-gray-100 rounded-lg p-4 flex-1 flex flex-col justify-center my-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-semibold text-xl">${instructor.pricePerHour}</p>
                <p className="text-sm text-gray-500">Per Hour</p>
              </div>
              
              <div className="text-center bg-gray-100 rounded-lg p-4 flex-1 flex flex-col justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="font-semibold text-xl">{instructor.location}</p>
                <p className="text-sm text-gray-500">{instructor.locationDetails}</p>
              </div>
            </div>
          </div>
          
          {/* Mobile view for info boxes - shown only on smaller screens */}
          <div className="flex-1 md:hidden flex flex-col gap-4">
            <div className="text-center bg-gray-100 rounded-lg p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-semibold text-xl">{instructor.yearsExperience} Years</p>
              <p className="text-sm text-gray-500">Experience</p>
            </div>
            <div className="text-center bg-gray-100 rounded-lg p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-semibold text-xl">${instructor.pricePerHour}</p>
              <p className="text-sm text-gray-500">Per Hour</p>
            </div>
            <div className="text-center bg-gray-100 rounded-lg p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="font-semibold text-xl">{instructor.location}</p>
              <p className="text-sm text-gray-500">{instructor.locationDetails}</p>
            </div>
          </div>
        </div>

        {/* Main Content Area - Below the image/info section */}
        <div>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Teaching Philosophy</h2>
            <p className="text-gray-700">{instructor.teachingPhilosophy}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Teaching Style</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <InstructorStyleSlider 
                label="Conversational" 
                value={instructor.teachingStyle.conversational} 
                leftLabel="Conversational" 
                rightLabel="Direct" 
              />
              <InstructorStyleSlider 
                label="Energy" 
                value={instructor.teachingStyle.energy} 
                leftLabel="Calm" 
                rightLabel="High-energy" 
              />
              <InstructorStyleSlider 
                label="Breadth" 
                value={instructor.teachingStyle.breadth} 
                leftLabel="Breadth" 
                rightLabel="Depth" 
              />
              <InstructorStyleSlider 
                label="Flexible" 
                value={instructor.teachingStyle.flexibility} 
                leftLabel="Flexible" 
                rightLabel="Regimented" 
              />
              <InstructorStyleSlider 
                label="Creativity" 
                value={instructor.teachingStyle.creativity} 
                leftLabel="Creativity" 
                rightLabel="Precision" 
              />
            </div>
          </section>

          <section className="mb-8 border-l-4 border-pink-500 pl-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-pink-500 mb-1">When I assess a new student for the first time, I tend to...</h3>
              <p className="text-gray-600">{instructor.approachForNewStudents}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium text-pink-500 mb-1">What is your favorite dancing tip?</h3>
              <p className="text-gray-600">{instructor.favoriteSongExplanation}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-pink-500 mb-1">What is a song or artist every dancer should know?</h3>
              <p className="text-gray-600">{instructor.favoriteSong}</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Weekly Schedule</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {Object.entries(instructor.schedule).map(([day, time], index) => (
                <div 
                  key={day} 
                  className={`flex justify-between items-center p-4 ${
                    index !== Object.entries(instructor.schedule).length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <span className="font-medium capitalize text-gray-700">{day}</span>
                  <span className="text-pink-500">{time || 'Closed'}</span>
                </div>
              ))}
            </div>
          </section>

          {instructor.certifications.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Certifications</h2>
              <ul className="list-disc pl-5 space-y-1">
                {instructor.certifications.map((cert) => (
                  <li key={cert} className="text-gray-700">{cert}</li>
                ))}
              </ul>
            </section>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            {instructor.demoUrl && (
              <a 
                href={instructor.demoUrl} 
                className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </a>
            )}
            <a 
              href={`mailto:studioelatindance@gmail.com?subject=Lessons with ${instructor.name}`} 
              className="border border-[#9333EA] text-[#9333EA] hover:bg-[#9333EA] hover:text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Instructor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 
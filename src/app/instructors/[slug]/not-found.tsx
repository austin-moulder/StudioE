import Link from 'next/link';

export default function InstructorNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Instructor Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        We couldn't find the instructor you're looking for. They may have moved, or the link might be incorrect.
      </p>
      <Link 
        href="/instructors" 
        className="inline-flex items-center justify-center rounded-md bg-pink-600 px-6 py-3 text-white font-medium hover:bg-pink-700"
      >
        Browse All Instructors
      </Link>
    </div>
  );
} 
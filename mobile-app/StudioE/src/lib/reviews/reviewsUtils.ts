import { supabase } from '../supabase/client';

export interface UserReview {
  id: number;
  rating: number;
  review_text: string;
  created_at: string;
  event_id: number;
  event_title: string;
  event_image_url?: string;
}

export async function getUserReviews(userId: string): Promise<UserReview[]> {
  try {
    console.log('Fetching user reviews for:', userId);

    // Fetch user reviews (same query as web app)
    const { data: userReviews, error: userReviewsError } = await supabase
      .from('event_reviews')
      .select('id, rating, review_text, created_at, event_id')
      .eq('auth_id', userId)
      .order('created_at', { ascending: false });
        
    if (userReviewsError) {
      console.log('Reviews error (expected if no data):', userReviewsError);
      return [];
    }

    if (!userReviews || userReviews.length === 0) {
      return [];
    }

    // Get event details for each review
    const reviewsWithEventData = await Promise.all(
      userReviews.map(async (review) => {
        const { data: eventData, error: eventError } = await supabase
          .from('EVENT')
          .select('title, image_url')
          .eq('id', review.event_id)
          .single();

        return {
          id: review.id,
          rating: review.rating,
          review_text: review.review_text,
          created_at: review.created_at,
          event_id: review.event_id,
          event_title: eventData?.title || 'Unknown Event',
          event_image_url: eventData?.image_url || 'https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Logos/Studio%20E%20Logo%20-%20Gradient.png'
        };
      })
    );

    console.log('Processed user reviews:', reviewsWithEventData);
    return reviewsWithEventData;
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    return [];
  }
}

export function formatReviewDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function renderStars(rating: number): string {
  return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
} 
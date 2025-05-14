# Studio E Analytics System

The analytics system tracks user activity across the platform to provide insights into user behavior and engagement.

## Key Files

- `src/lib/analytics/userActivity.ts` - Core functions for logging all user activity events
- `src/components/analytics/PageViewTracker.tsx` - Component that tracks page views with throttling
- `src/components/analytics/AnalyticsDebugger.tsx` - Debug UI for viewing tracked events (toggle with Ctrl+Shift+A)

## Event Types

The system tracks the following event types:

| Event Type | Description | Key Metadata |
|------------|-------------|--------------|
| `session_start` | User session begins | timestamp |
| `session_end` | User session ends | time_spent, timestamp |
| `page_view` | User views a page | page_path, timestamp |
| `feature_interaction` | User interacts with a feature | feature_name, count, details |
| `instructor_search` | User searches for instructors | search_term, filters |
| `profile_view` | User views an instructor profile | instructor_id |
| `booking_initiated` | User starts booking process | instructor_id, service_id |
| `booking_completed` | User completes a booking | booking_id, instructor_id, service_id |

## Implementation Details

### Page View Tracking

The `PageViewTracker` component:
- Automatically tracks page views for authenticated users
- Uses a 5-second throttling mechanism (configurable with `TRACKING_THROTTLE_MS`)
- Only tracks unique page paths to prevent duplicate entries
- Installed in layout.tsx to track all pages

### Feature Interaction Tracking

The `logFeatureInteraction` function:
- Tracks when users interact with specific features
- Can include a counter to track frequency of interaction 
- Stores feature name and any additional contextual data
- Should be manually called when users interact with important features

### Database Schema

All events are stored in the `user_activity` table in Supabase with the following structure:

- `id` - Unique identifier (auto-generated)
- `user_id` - User's ID
- `event_type` - Type of event (from EventType enum)
- `metadata` - JSON object with event-specific data
- `page_path` - Current page path (extracted from metadata for easier querying)
- `session_id` - Unique session identifier
- `created_at` - Timestamp when the event was logged

## Usage Examples

```typescript
// Track page view (handled automatically by PageViewTracker)
logPageView(userId, '/instructor/123');

// Track feature interaction
logFeatureInteraction(userId, 'filter_instructors', { 
  filters: { specialty: 'piano', location: 'remote' }
});

// Track instructor search
logInstructorSearch(userId, 'piano lessons', { 
  location: 'remote', 
  level: 'beginner' 
});

// Track profile view
logProfileView(userId, instructorId);
``` 
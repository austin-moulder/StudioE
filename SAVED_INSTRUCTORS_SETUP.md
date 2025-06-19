# Saved Instructors Feature Setup Guide

This guide explains how to set up the new "Saved Instructors" feature that allows users to heart/save instructor profiles and view them in their dashboard.

## Feature Overview

The feature includes:
- ❤️ Heart button on instructor cards to save/unsave instructors
- 📱 New "Saved Instructors" tab in the dashboard
- 🔐 User-specific saved instructors (only users can see their own saved list)
- 🎨 Responsive design matching the existing StudioE style

## Database Setup

### 1. Create the `saved_instructors` table

Run the SQL script in your Supabase SQL editor:

```sql
-- Run the content of: src/lib/supabase/setupSavedInstructorsTable.sql
```

Or copy and paste from the file: `src/lib/supabase/setupSavedInstructorsTable.sql`

### 2. Verify Table Creation

After running the SQL, verify the table was created correctly:

```sql
-- Check table structure
\d saved_instructors;

-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'saved_instructors';

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'saved_instructors';
```

## How It Works

### 1. Heart Button Component (`InstructorHeartButton`)

- Located in `src/components/InstructorHeartButton.tsx`
- Shows empty heart for unsaved instructors, filled pink heart for saved ones
- Requires user authentication
- Provides toast feedback when saving/unsaving
- Can be disabled for tooltips via `showToast={false}`

### 2. Saved Instructors Utilities

- Located in `src/lib/supabase/savedInstructorsUtils.ts`
- Functions include:
  - `isInstructorSaved(userId, instructorId)` - Check if saved
  - `saveInstructor(userId, instructorId)` - Save an instructor
  - `unsaveInstructor(userId, instructorId)` - Remove from saved
  - `getSavedInstructors(userId)` - Get all saved instructors for user
  - `toggleSaveInstructor(userId, instructorId)` - Toggle save status

### 3. Dashboard Integration

The dashboard Events & Workshops page (`src/app/dashboard/events/page.tsx`) now includes:
- New "Saved Instructors" tab (with heart icon)
- Grid layout matching the style shown in the provided image
- Instructor cards with heart buttons to unsave
- Empty state encouraging users to browse instructors

### 4. Instructor Page Integration

The main instructors page (`src/app/instructors/page.tsx`) now includes:
- Heart buttons on each instructor card
- Preserves existing layout and functionality
- Heart button positioned next to rating badge

## Usage

### For Users:
1. Browse instructors at `/instructors`
2. Click the heart button on any instructor card to save them
3. View saved instructors in Dashboard → Events & Workshops → Saved Instructors tab
4. Remove instructors by clicking the heart button again (from either location)

### For Developers:
```tsx
// Add heart button to any component
import InstructorHeartButton from '@/components/InstructorHeartButton';

<InstructorHeartButton 
  instructorId={instructor.id} 
  className="p-1 hover:bg-gray-100 rounded-full"
  showToast={true} // optional, defaults to true
/>
```

## Testing

### 1. Authentication Required
- Feature only works for authenticated users
- Shows "Please sign in" message if not authenticated

### 2. Test Scenarios
- Save an instructor from `/instructors` page
- Verify it appears in dashboard saved instructors tab
- Unsave from dashboard, verify it's removed from `/instructors` page
- Try saving the same instructor twice (should toggle, not duplicate)

### 3. Mobile Responsiveness
- Test tabs on mobile (3-column layout: Events, Classes, Instructors)
- Test instructor card layout on different screen sizes
- Verify heart button touch targets on mobile

## Database Considerations

### Data Privacy
- Row Level Security (RLS) ensures users only see their own saved instructors
- User data is automatically cleaned up when users delete their accounts (CASCADE)

### Performance
- Indexes on `user_id`, `instructor_id`, and `created_at` for fast queries
- Unique constraint prevents duplicate saves
- Efficient JOIN with instructors table for displaying saved instructor details

### Storage
- Minimal storage footprint (just user_id and instructor_id relationships)
- No duplication of instructor data (joins with existing instructors table)

## Troubleshooting

### Common Issues

1. **Heart buttons not showing saved state**
   - Check that the user is authenticated
   - Verify the `saved_instructors` table exists and has proper RLS policies
   - Check browser console for authentication or API errors

2. **"No saved instructors" when there should be saved ones**
   - Verify the JOIN query in `getSavedInstructors()` is working
   - Check that instructor IDs match between tables
   - Ensure the instructors table has the expected schema

3. **Database permission errors**
   - Verify RLS policies are correctly set up
   - Check that the user is properly authenticated
   - Ensure the `auth.uid()` function returns the correct user ID

4. **Heart button not toggling**
   - Check that the `toggleSaveInstructor` function handles both save and unsave cases
   - Verify the unique constraint isn't causing insert failures
   - Check for proper error handling in the component

## Future Enhancements

Potential improvements for this feature:
- Email notifications when saved instructors post new availability
- Instructor recommendation system based on saved preferences
- Bulk actions (save/unsave multiple instructors)
- Categories/tags for organizing saved instructors
- Export saved instructors list
- Share saved instructors with other users 
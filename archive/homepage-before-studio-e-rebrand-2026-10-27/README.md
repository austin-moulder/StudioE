# Homepage backup — before Studio E homepage rebuild

**Date:** 2026-10-27  
**Source of truth at backup time:** `src/app/page.tsx` (marketplace-oriented homepage)

## Contents

| Path in archive | Original path |
| --- | --- |
| `page.tsx` | `src/app/page.tsx` |
| `related/Navbar.tsx` | `src/components/Navbar.tsx` |
| `related/Footer.tsx` | `src/components/Footer.tsx` |
| `related/VideoBackground.tsx` | `src/components/VideoBackground.tsx` |
| `related/NewUserPopup.tsx` | `src/app/components/NewUserPopup.tsx` |
| `related/TestimonialCard.tsx` | `src/app/components/TestimonialCard.tsx` |
| `related/testimonialUtils.ts` | `src/lib/testimonials/testimonialUtils.ts` |

## Homepage dependencies at backup time

- Instructor marketplace search → `/instructors`
- Dance style images via `getDanceStyleImages`
- Featured instructors via `getFeaturedInstructors`
- Blog posts via `getBlogPosts`
- Featured testimonials via `getFeaturedTestimonials`
- `VideoBackground`, `NewUserPopup`, Embla carousels

The live `src/app/page.tsx` was **not deleted**; this folder is a full copy for rollback.

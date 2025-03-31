import { Instructor } from "@/types/instructor";
import { instructorsData } from "@/lib/instructors/instructorsData";

/**
 * Gets all unique dance styles from the instructors list
 */
export function getUniqueDanceStyles(instructors: Instructor[] = instructorsData): string[] {
  const stylesSet = new Set<string>();
  
  instructors.forEach(instructor => {
    // Split styles by comma or ampersand and trim whitespace
    const styles = instructor.style.split(/[,&]/).map(style => style.trim());
    styles.forEach(style => stylesSet.add(style));
  });
  
  return Array.from(stylesSet).sort();
}

/**
 * Returns the count of instructors rounded down to the nearest 10
 */
export function getInstructorCount(instructors: Instructor[] = instructorsData): number {
  // Round down to the nearest 10
  return Math.floor(instructors.length / 10) * 10;
}

/**
 * Returns the count of unique dance styles rounded down to the nearest 10
 */
export function getDanceStyleCount(instructors: Instructor[] = instructorsData): number {
  // Round down to the nearest 10
  return Math.floor(getUniqueDanceStyles(instructors).length / 10) * 10;
} 
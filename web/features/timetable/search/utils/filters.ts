/**
 * Types and utilities for filtering course sections
 */

export interface CourseFilters {
  level?: number[];
  subject?: string[];
  courseNumber?: string;
  crn?: string;
}

/**
 * Extracts the course level (1000-4000) from a course name
 * e.g. "COMP 2404" returns 2000
 */
export function getCourseLevel(courseName: string): number | null {
  if (!courseName) return null;
  
  const match = courseName.match(/[A-Z]+\s*(\d)(\d{3})/i);
  if (!match) return null;
  
  const level = parseInt(match[1]) * 1000;
  return level >= 1000 && level <= 4000 ? level : null;
}

/**
 * Extracts the subject code from a course name
 * e.g. "COMP 2404" returns "COMP"
 */
export function getSubject(courseName: string): string | null {
  if (!courseName) return null;
  
  const match = courseName.match(/^([A-Z]+)/i);
  return match ? match[1].toUpperCase() : null;
}

/**
 * Checks if a course number matches the search term
 */
function matchesCourseNumber(courseName: string, searchNumber: string): boolean {
  if (!courseName || !searchNumber) return false;
  
  const courseMatch = courseName.match(/[A-Z]+\s*(\d{4})/i);
  if (!courseMatch) return false;
  
  return courseMatch[1].startsWith(searchNumber);
}

/**
 * Checks if a CRN matches exactly
 */
function matchesCRN(crn: number | null, searchCRN: string): boolean {
  if (!crn || !searchCRN) return false;
  return crn.toString() === searchCRN;
}

/**
 * Filters an array of course sections based on the provided filters
 */
export function filterCourses<T extends { name: string; crn: number | null }>(
  courses: T[],
  filters: CourseFilters
): T[] {
  return courses.filter(course => {
    // Filter by level
    if (filters.level?.length) {
      const courseLevel = getCourseLevel(course.name);
      if (!courseLevel || !filters.level.includes(courseLevel)) {
        return false;
      }
    }

    // Filter by subject
    if (filters.subject?.length) {
      const courseSubject = getSubject(course.name);
      if (!courseSubject || !filters.subject.includes(courseSubject)) {
        return false;
      }
    }

    // Filter by course number
    if (filters.courseNumber && !matchesCourseNumber(course.name, filters.courseNumber)) {
      return false;
    }

    // Filter by CRN
    return !(filters.crn && !matchesCRN(course.crn, filters.crn));
  });
}
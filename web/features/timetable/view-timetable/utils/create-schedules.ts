export function generateValidSchedules(courses) {
  const validSchedules = [];

  function isConflict(schedule, timeSlots) {
    // Check if any time slot in the current section conflicts with the schedule
    return timeSlots.some((time) => schedule.has(time));
  }

  function addTimeSlots(schedule, timeSlots) {
    // Add time slots to the schedule
    timeSlots.forEach((time) => schedule.add(time));
  }

  function removeTimeSlots(schedule, timeSlots) {
    // Remove time slots from the schedule
    timeSlots.forEach((time) => schedule.delete(time));
  }

  function backtrack(index, currentSchedule, selectedSections) {
    // Base case: all courses are processed
    if (index === courses.length) {
      validSchedules.push([...selectedSections]);
      return;
    }

    // Iterate over all sections of the current course
    const course = courses[index];
    for (const section of course.sections) {
      const timeSlots = section.timeSlots.times;

      if (!isConflict(currentSchedule, timeSlots)) {
        // Add the section to the schedule
        addTimeSlots(currentSchedule, timeSlots);
        selectedSections.push({
          courseSectionId: course.courseSectionId,
          name: course.name,
          sectionName: section.name,
          professor: section.professor,
          timeSlots,
        });

        // Recur for the next course
        backtrack(index + 1, currentSchedule, selectedSections);

        // Backtrack: remove the section
        selectedSections.pop();
        removeTimeSlots(currentSchedule, timeSlots);
      }
    }
  }

  // Start the recursion with an empty schedule and no selected sections
  backtrack(0, new Set(), []);
  return validSchedules;
}


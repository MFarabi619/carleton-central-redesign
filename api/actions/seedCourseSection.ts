import { ActionOptions } from "gadget-server";

export const run: ActionRun = async ({ params, logger, api, connections }) => {
  try {
    // Delete all existing sections
    const existingSections = await api.courseSection.findMany();
    if (existingSections.length > 0) {
      await Promise.all(existingSections.map(section => api.courseSection.delete(section.id)));
      logger.info(`Deleted ${existingSections.length} existing sections`);
    }

    // Fetch all courses
    const courses = await api.courses.findMany();
    logger.info(`Found ${courses.length} courses to create sections for`);

    // Professor list for random assignment
    const professors = [
      "Dr. Smith",
      "Dr. Johnson",
      "Dr. Williams",
      "Dr. Brown",
      "Dr. Davis",
      "Dr. Miller",
      "Dr. Wilson",
      "Dr. Moore",
      "Dr. Taylor",
      "Dr. Anderson"
    ];

    // Time slot templates
    const lectureSlots = [
      ["Mon 8:30-10:00", "Wed 8:30-10:00"],
      ["Mon 10:00-11:30", "Wed 10:00-11:30"],
      ["Mon 13:00-14:30", "Wed 13:00-14:30"],
      ["Mon 14:30-16:00", "Wed 14:30-16:00"],
      ["Tue 8:30-10:00", "Thu 8:30-10:00"],
      ["Tue 10:00-11:30", "Thu 10:00-11:30"],
      ["Tue 13:00-14:30", "Thu 13:00-14:30"],
      ["Tue 14:30-16:00", "Thu 14:30-16:00"]
    ];

    const tutorialSlots = [
      ["Thu 8:30-10:00"],
      ["Thu 10:00-11:30"],
      ["Thu 13:00-14:30"],
      ["Thu 14:30-16:00"],
      ["Fri 8:30-10:00"],
      ["Fri 10:00-11:30"],
      ["Fri 13:00-14:30"],
      ["Fri 14:30-16:00"]
    ];

    let crn = 10000;
    const sectionLetters = ['A', 'B'];
    const sectionsToCreate = [];

    // Generate sections for each course
    for (const course of courses) {
      const numLectures = Math.floor(Math.random() * 2) + 1;
      const hasTutorials = Math.random() < 0.5; // num tutorials
      const numTutorials = Math.floor(Math.random() * 1) + 1; // if it has tutorials how many does it have?

      // Create lecture sections
      for (let i = 0; i < numLectures; i++) {
        crn++;
        const professor = professors[Math.floor(Math.random() * professors.length)];
        const timeSlot = lectureSlots[Math.floor(Math.random() * lectureSlots.length)];

        sectionsToCreate.push({
          name: `${course.name} ${sectionLetters[i]}`,
          isLabOrTutorial: false,
          professor,
          crn,
          timeSlots: { times: timeSlot }
        });

        if (hasTutorials) {
          for (let tutorialNum = 0; tutorialNum < numTutorials; tutorialNum++) {
            crn++;
            const tutorialTimeSlot = tutorialSlots[Math.floor(Math.random() * tutorialSlots.length)];
            sectionsToCreate.push({
              name: `${course.name} ${sectionLetters[i]}${tutorialNum + 1}`,
              isLabOrTutorial: true,
              professor: "",
              crn,
              timeSlots: { times: tutorialTimeSlot }
            });
          }
        }
      }
    }

    await api.courseSection.bulkCreate(sectionsToCreate);

    logger.info(`Created ${sectionsToCreate.length} course sections`);

    return {
      success: true,
      sectionsCreated: sectionsToCreate.length,
      lectureSections: sectionsToCreate.filter(s => !s.isLabOrTutorial).length,
      tutorialSections: sectionsToCreate.filter(s => s.isLabOrTutorial).length
    };

  } catch (error) {
    logger.error("Failed to seed course sections", { error });
    throw error;
  }
};

export const options: ActionOptions = {
  returnType: true
};

interface SeedResult {
  coursesProcessed: number;
  sectionsProcessed: number;
  connectionsCreated: number;
  connectionsFailed: number;
  errors: string[];
}

export const run: ActionRun = async ({ params, logger, api, connections }) => {
  const result: SeedResult = {
    coursesProcessed: 0,
    sectionsProcessed: 0,
    connectionsCreated: 0,
    connectionsFailed: 0,
    errors: [],
  };

  try {
    logger.info("Starting course to section connection seeding");

    // Fetch all courses
    const courses = await api.courses.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    // Fetch all sections
    const sections = await api.courseSection.findMany({
      select: {
        id: true,
        name: true,
        isLabOrTutorial: true,
      },
    });

    if (!courses.length || !sections.length) {
      throw new Error("No courses or sections found to connect");
    }

    result.coursesProcessed = courses.length;
    result.sectionsProcessed = sections.length;


    // Delete existing connections
    const existingConnections = await api.courseToCourseSection.findMany();
    for (const connection of existingConnections) {
      await api.courseToCourseSection.delete(connection.id);
    }

    logger.info(`Deleted ${existingConnections.length} existing connections`);



    logger.info(`Processing ${courses.length} courses and ${sections.length} sections`);
    for (const course of courses) {
      const courseCode = course.name?.trim();
      if (!courseCode) continue;

      const matchingSections = sections.filter(section => {
        const sectionName = section.name?.trim() ?? "";
        return sectionName.startsWith(courseCode);

      });

      for (const section of matchingSections) {
        try {

          const newConnection = await api.courseToCourseSection.create({
            course: { _link: course.id },
            section: { _link: section.id }

          });

          result.connectionsCreated++;

          logger.info(
            `Created connection between course ${course.name} and section ${section.name}${section.isLabOrTutorial ? " (Tutorial/Lab)" : ""
            }`
          );
        } catch (error) {
          result.connectionsFailed++;
          const errorMessage = `Failed to create connection for course ${course.name} and section ${section.name}: ${error instanceof Error ? error.message : 'Unknown error'}`;
          result.errors.push(errorMessage);
          logger.error(errorMessage);
        }
      }
    }

    logger.info("Completed course to section connection seeding", result);
    return result;
  } catch (error) {
    logger.error("Failed to seed course to section connections:", error);
    throw error;
  }
};

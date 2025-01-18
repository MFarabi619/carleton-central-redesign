interface SeedResult {
  sectionsProcessed: number;
  requirementsCreated: number;
  requirementsFailed: number;
  errors: string[];
}

type GroupedSections = {
  lectures: Array<{ id: string; name: string; }>;
  labs: Array<{ id: string; name: string; }>;
};

export const run: ActionRun = async ({ params, logger, api, connections }) => {
  const result: SeedResult = {
    sectionsProcessed: 0,
    requirementsCreated: 0,
    requirementsFailed: 0,
    errors: [],
  };

  try {
    logger.info("Starting required courses seeding");

    // Fetch all course sections
    const sections = await api.courseSection.findMany({
      select: {
        id: true,
        name: true,
        isLabOrTutorial: true,
      },
    });

    if (!sections.length) {
      throw new Error("No course sections found");
    }

    result.sectionsProcessed = sections.length;
    logger.info(`Processing ${sections.length} sections`);

    // Delete existing required courses records
    const existingRequirements = await api.requiredCourses.findMany();
    for (const requirement of existingRequirements) {
      await api.requiredCourses.delete(requirement.id);
    }
    logger.info(`Deleted ${existingRequirements.length} existing requirements`);

    // Group sections by course code
    const courseSections = new Map<string, GroupedSections>();

    for (const section of sections) {
      const courseCode = section.name?.match(/^[A-Z]+/)?.[0];
      if (!courseCode || !section.name) continue;

      if (!courseSections.has(courseCode)) {
        courseSections.set(courseCode, {
          lectures: [],
          labs: [],
        });
      }

      const group = courseSections.get(courseCode)!;
      if (section.isLabOrTutorial) {
        group.labs.push({ id: section.id, name: section.name });
      } else {
        group.lectures.push({ id: section.id, name: section.name });
      }
    }

    logger.info(`Found ${courseSections.size} unique courses`);

    // Create required courses records
    for (const [courseCode, { lectures, labs }] of courseSections) {
      logger.info(`Processing ${courseCode}: ${lectures.length} lectures, ${labs.length} labs/tutorials`);

      for (const lab of labs) {
        // Find matching lecture for this lab
        const lecture = lectures.find(lec =>
          lec.name.startsWith(courseCode) &&
          lab.name.includes(lec.name.split(" ")[0])
        );

        if (!lecture) {
          const errorMessage = `Could not find matching lecture for lab ${lab.name}`;
          result.errors.push(errorMessage);
          result.requirementsFailed++;
          logger.error(errorMessage);
          continue;
        }

        try {
          await api.requiredCourses.create({
            section: { _link: lab.id },
            required: { _link: lecture.id }
          });

          result.requirementsCreated++;
          logger.info(`Created requirement: ${lab.name} requires ${lecture.name}`);
        } catch (error) {
          result.requirementsFailed++;
          const errorMessage = `Failed to create requirement for lab ${lab.name}: ${error instanceof Error ? error.message : 'Unknown error'}`;
          result.errors.push(errorMessage);
          logger.error(errorMessage);
        }
      }
    }

    logger.info("Completed required courses seeding", result);
    return result;
  } catch (error) {
    logger.error("Failed to seed required courses:", error);
    throw error;
  }
};

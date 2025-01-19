export const run: ActionRun = async ({ params, logger, api }) => {
  try {
    // Delete all existing courses
    logger.info("Deleting existing courses...");
    const existingCourses = await api.courses.findMany();
    for (const course of existingCourses) {
      await api.courses.delete(course.id);
    }
    logger.info(`Deleted ${existingCourses.length} existing courses`);

    const courses = [
      // Computer Science courses
      {
        name: "COMP1405",
        courseName: "Introduction to Python Programming",
        description: "Learn fundamental programming concepts, problem-solving techniques, and basic algorithms using Python.",
        preRequisite: []
      },
      {
        name: "COMP2406",
        courseName: "Full-Stack Web Development with JavaScript",
        description: "Modern full-stack web development using JavaScript, Node.js, and popular frameworks.",
        preRequisite: ["COMP1405"]
      },
      {
        name: "COMP3005",
        courseName: "Designing Robust Database Systems",
        description: "Design and implementation of database systems, SQL, normalization, and transaction management.",
        preRequisite: ["COMP2406"]
      },
      {
        name: "COMP3007",
        courseName: "Exploring Programming Paradigms",
        description: "Explore different programming paradigms including functional, logic, and object-oriented programming.",
        preRequisite: ["COMP2406"]
      },
      {
        name: "COMP3008",
        courseName: "User Interface Design and Usability",
        description: "Principles of designing usable, accessible, and effective user interfaces.",
        preRequisite: ["COMP2406"]
      },
      {
        name: "COMP4107",
        courseName: "Advanced Neural Networks",
        description: "Deep learning architectures, training methodologies, and practical applications.",
        preRequisite: ["COMP3007", "MATH2107"]
      },

      // Mathematics courses
      {
        name: "MATH1007",
        courseName: "Fundamentals of Calculus I",
        description: "Limits, derivatives, applications of derivatives, and introduction to integration.",
        preRequisite: []
      },
      {
        name: "MATH2007",
        courseName: "Advanced Calculus II",
        description: "Techniques of integration, sequences, series, and multivariate calculus.",
        preRequisite: ["MATH1007"]
      },
      {
        name: "MATH2107",
        courseName: "Introduction to Linear Algebra",
        description: "Vector spaces, matrices, linear transformations, and eigenvalues.",
        preRequisite: ["MATH1007"]
      },
      {
        name: "MATH3107",
        courseName: "Linear Algebra: Advanced Topics",
        description: "Advanced concepts in linear algebra, including inner product spaces and canonical forms.",
        preRequisite: ["MATH2107"]
      },
      {
        name: "MATH3801",
        courseName: "Fundamentals of Complex Analysis",
        description: "Complex numbers, analytic functions, contour integration, and residue theory.",
        preRequisite: ["MATH2007"]
      },

      // Engineering courses
      {
        name: "ENGR1001",
        courseName: "Introduction to Engineering Graphics",
        description: "Technical drawing, CAD fundamentals, and visualization techniques.",
        preRequisite: []
      },
      {
        name: "ENGR2001",
        courseName: "Introduction to Engineering Mechanics",
        description: "Statics and dynamics of rigid bodies, force systems, and equilibrium.",
        preRequisite: ["MATH1007"]
      },
      {
        name: "ENGR3001",
        courseName: "Digital Circuit Design and Analysis",
        description: "Boolean algebra, combinational and sequential circuits, and hardware description languages.",
        preRequisite: ["ENGR2001"]
      },
      {
        name: "ENGR4001",
        courseName: "Control System Design and Analysis",
        description: "Analysis and design of feedback control systems, stability, and system response.",
        preRequisite: ["ENGR3001", "MATH2107"]
      }
    ];


    // Create new courses
    logger.info("Creating new courses...");
    await api.courses.bulkCreate(courses);
    logger.info(`Successfully created ${courses.length} new courses`);

    return { success: true, coursesCreated: courses.length };
  } catch (error) {
    logger.error("Error in seedCourses:", error);
    throw error;
  }
};

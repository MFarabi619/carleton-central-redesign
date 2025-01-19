export const run: ActionRun = async ({ params, logger, api }) => {
  try {
    // Delete all existing courses
    logger.info("Deleting existing courses...");
    const existingCourses = await api.courses.findMany();
    for (const course of existingCourses) {
      await api.courses.delete(course.id);
    }
    logger.info(`Deleted ${existingCourses.length} existing courses`);

    // Define new courses
    const courses = [
      // Computer Science courses
      { name: "COMP1405", description: "Introduction to Computer Science I: Learn fundamental programming concepts, problem-solving techniques, and basic algorithms using Python.", preRequisite: [] },
      { name: "COMP2406", description: "Web Development: Modern full-stack web development using JavaScript, Node.js, and popular frameworks.", preRequisite: ["COMP1405"] },
      { name: "COMP3005", description: "Database Management Systems: Design and implementation of database systems, SQL, normalization, and transaction management.", preRequisite: ["COMP2406"] },
      { name: "COMP3007", description: "Programming Paradigms: Explore different programming paradigms including functional, logic, and object-oriented programming.", preRequisite: ["COMP2406"] },
      { name: "COMP3008", description: "Human-Computer Interaction: Principles of designing usable, accessible, and effective user interfaces.", preRequisite: ["COMP2406"] },
      { name: "COMP4107", description: "Neural Networks: Deep learning architectures, training methodologies, and practical applications.", preRequisite: ["COMP3007", "MATH2107"] },
      
      // Mathematics courses
      { name: "MATH1007", description: "Elementary Calculus I: Limits, derivatives, applications of derivatives, and introduction to integration.", preRequisite: [] },
      { name: "MATH2007", description: "Elementary Calculus II: Techniques of integration, sequences, series, and multivariate calculus.", preRequisite: ["MATH1007"] },
      { name: "MATH2107", description: "Linear Algebra I: Vector spaces, matrices, linear transformations, and eigenvalues.", preRequisite: ["MATH1007"] },
      { name: "MATH3107", description: "Linear Algebra II: Advanced concepts in linear algebra, including inner product spaces and canonical forms.", preRequisite: ["MATH2107"] },
      { name: "MATH3801", description: "Complex Analysis: Complex numbers, analytic functions, contour integration, and residue theory.", preRequisite: ["MATH2007"] },
      
      // Engineering courses
      { name: "ENGR1001", description: "Engineering Graphics: Technical drawing, CAD fundamentals, and visualization techniques.", preRequisite: [] },
      { name: "ENGR2001", description: "Engineering Mechanics: Statics and dynamics of rigid bodies, force systems, and equilibrium.", preRequisite: ["MATH1007"] },
      { name: "ENGR3001", description: "Digital Systems Design: Boolean algebra, combinational and sequential circuits, and hardware description languages.", preRequisite: ["ENGR2001"] },
      { name: "ENGR4001", description: "Control Systems: Analysis and design of feedback control systems, stability, and system response.", preRequisite: ["ENGR3001", "MATH2107"] }
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

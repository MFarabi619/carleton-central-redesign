import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Button } from "@/components/ui/button";
import { GlassmorphicCard } from "@/components/ui/glassmorphic-card";
import { ArrowLeft } from "lucide-react";
import { generateValidSchedules } from '../features/timetable/view-timetable/utils/create-schedules'
import { Calendar } from "../features/timetable/view-timetable/ui/Calendar"
import { CourseCard } from "../features/timetable/view-timetable/ui/CourseCard"
import { NavBar } from "@/components/ui/nav-bar";

type LoaderData = {
  worksheet: {
    id: string;
    name: string;
    term: string;
    schedules: {
      edges: Array<{
        node: {
          id: string;
          courseSection: {
            id: string;
            name: string;
            description: string;
            courseToCourseSections: {
              edges: {

       node: {
                  section: {
                    name: true,
                  };
                };
              };
            };
          } | null;
        };
      }>;
    };
  } | null;
  error?: string;
};

export async function loader({ params, context }: LoaderFunctionArgs) {
  try {
    if (!params.worksheetId) {
      throw new Error("Worksheet ID is required");
    }

    const worksheet = await context.api.worksheet.findOne(params.worksheetId, {
      select: {
        id: true,
        name: true,
        term: true,
        schedules: {
          edges: {
            node: {
              id: true,
              courseSection: {
                id: true,
                name: true,
                description: true,

                courseToCourseSections: {
                  edges: {
                    node: {
                      section: {
                        name: true,
                        timeSlots: true,
                        professor: true,
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
    // Transform the data into the desired structure
    const transformedSchedules = worksheet.schedules.edges.map(({ node }) => {
      const { id, courseName, name, description, courseToCourseSections } = node.courseSection;

      const sections = courseToCourseSections.edges.map(({ node }) => ({
        timeSlots: node.section.timeSlots,
        name: node.section.name,
        professor: node.section.professor,
      }));

      return {
        courseSectionId: id,
        name,
        description,
        sections,
        courseName,
      };
    });

    const formattedCourses = {
      id: worksheet.id,
      name: worksheet.name,
      term: worksheet.term,
      schedules: transformedSchedules,
    };

    const validSchedules = generateValidSchedules(formattedCourses.schedules)

    return json({ formattedCourses, validSchedules });
  } catch (error) {
    return json<LoaderData>({
      worksheet: null,
      error: error instanceof Error ? error.message : "An error occurred"
    });
  }
}

export default function WorksheetPage() {
  const worksheet = useLoaderData<typeof loader>();

  console.log(worksheet.formattedCourses)
  if (!worksheet) {
    return null;
  }

  return (
<>
<NavBar />
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/timetable">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Timetables
          </Button>
        </Link>
      </div>

      <GlassmorphicCard className="p-6">
        {/*NO NEED TO ADD THE DISPLAY AND SELECT FOR THE CURRENT TIME TABLE, JUST HAVE A BUTTON TO GO BACK OR JUST FAKE HAVING IT*/}
       <div className="mb-2 flex flex-wrap gap-3">

        <p>Term: {worksheet.formattedCourses.term}</p>
        <p>Name: {worksheet.formattedCourses.name}</p>

       </div>
        <h2 className="text-xl font-semibold mb-4">Courses</h2>

        <div className="flex flex-col">
        {worksheet.formattedCourses.schedules.map((course) => (
          <div className="gap-y-4">
            <CourseCard key={course.id} course={course} />
          </div>
        ))}
        </div>
      </GlassmorphicCard>
     <div className="mt-4">
      <Calendar courses={worksheet.validSchedules[0]} />
    </div>
    </div>
    </>
  );
}

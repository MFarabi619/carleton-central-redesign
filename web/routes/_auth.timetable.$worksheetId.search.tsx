import { useState, useCallback, useEffect } from "react";
import { useFindMany, useAction } from "@gadgetinc/react";
import { useParams, useLoaderData } from "@remix-run/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../components/ui/input";
import { Button } from "@/components/ui/button";
import { GlassmorphicCard } from "@/components/ui/glassmorphic-card";
import { api } from "../api";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { CourseCard } from "../features/timetable/search/ui/CourseCard";
import { NavBar } from "@/components/ui/nav-bar";

// Enum for course levels
enum CourseLevel {
  LEVEL_1000 = 1000,
  LEVEL_2000 = 2000,
  LEVEL_3000 = 3000,
  LEVEL_4000 = 4000,
  LEVEL_5000 = 5000,
}

// Enum for course subjects
enum CourseSubject {
  COMP = "COMP",
  MATH = "MATH",
  PHYS = "PHYS",
  CHEM = "CHEM",
  BIOL = "BIOL",
  STAT = "STAT",
  SYSC = "SYSC",
  ELEC = "ELEC",
}

export async function loader({ params, context }: LoaderFunctionArgs) {
  try {
    if (!params.worksheetId) {
      throw new Error("Worksheet ID is required");
    }
    const worksheetId = params.worksheetId;

    const data = await context.api.courses.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        courseToCourseSections: {
          edges: {
            node: {
              section: {
                name: true,
              }
            }
          }
        }
      }
    });

    const scheduleData = await context.api.schedule.findMany({
      select: {
        id: true,
        worksheet: {
          id: true
        },
        courseSection: {
          id: true
        }
      }
    });

    const filteredScheduleData = scheduleData.filter(schedule => schedule.worksheet?.id === worksheetId);

    // Map the data and set isAdded based on the presence of a matching courseSection in filteredScheduleData
    const allCourses = data.map(course => {
      const isAdded = course.courseToCourseSections.edges.some(edge => {
        const courseSectionId = course.id;
        // Check if the courseSectionId exists in filteredScheduleData
        return filteredScheduleData.some(schedule => schedule.courseSection.id === courseSectionId);
      });

      return {
        id: course.id || "",
        name: course.name || "",
        description: course.description || "",
        sections: course.courseToCourseSections.edges.map(edge => edge.node.section?.name || "") || [],
        isAdded: isAdded // Set isAdded to true if a matching courseSection was found
      };
    });

    if (!allCourses) {
      throw new Error("Worksheet not found");
    }

    return json({ allCourses, filteredScheduleData });
  } catch (error) {
    return json({
      allCourses: null,
      error: error instanceof Error ? error.message : "An error occurred"
    });
  }
}

export default function Search() {
  const { worksheetId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    courseLevel: "",
    courseSubject: "",
    isLabOrTutorial: null
  });
  const [filteredRes, setFilteredRes] = useState([]);
  const { allCourses, filteredScheduleData } = useLoaderData<typeof loader>();
  const [{ data, fetching, error }, createSchedule] = useAction(api.schedule.create);
  const [{ data2, fetching2, error2 }, deleteSchedule] = useAction(api.schedule.delete);

  const applyFilters = useCallback(() => {
    const filtered = allCourses?.filter((course) => {
      // Search by course name or description
      const matchesSearchTerm = searchTerm ?
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      // Filter by course level and subject using regex
      const regex = /^([A-Za-z]+)(\d{4})/; // regex to capture subject and level
      const courseMatch = course.name.match(regex);
      const courseSubject = courseMatch ? courseMatch[1] : "";
      const courseLevel = courseMatch ? courseMatch[2] : "";


      let matchesCourseLevel = filters.courseLevel ? courseLevel[0] === filters.courseLevel[0] : true;

      if (filters.courseLevel === "all") {
        matchesCourseLevel = true;
      }

      let matchesCourseSubject = filters.courseSubject ? courseSubject === filters.courseSubject : true;
      if (filters.courseSubject === "all") {
        matchesCourseSubject = true;
      }


      // Filter by section type
      const matchesSectionType =
        filters.isLabOrTutorial === null ||
        course.sections.some((section) =>
          filters.isLabOrTutorial ? section.includes("Lab") : !section.includes("Lab")
        );

      return matchesSearchTerm && matchesSectionType && matchesCourseLevel && matchesCourseSubject;
    });

    if (filtered === undefined) {
      setFilteredRes(allCourses || []);
    }
    else {
      setFilteredRes(filtered);
    }
  }, [allCourses, searchTerm, filters]);

  useEffect(() => {
    applyFilters();
  }, [allCourses]);

  const handleFilterChange = useCallback((key: string, value: string | boolean | null) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const addCourse = async (course) => {

    const courseID = course.id;
    try {
      if (!course.isAdded) {
        const res = await createSchedule({
          courseSection: {
            _link: courseID
          },
          worksheet: {
            _link: worksheetId
          }
        });
      } else {
        const schedules = await api.schedule.findMany({
          select: {
            id: true,
            worksheet: {
              id: true
            },
            courseSection: {
              id: true
            }
          }
        });
        const scheduleToDelete = schedules.find(schedule =>
          schedule.courseSection.id === courseID && schedule.worksheet.id === worksheetId);

        const res = await api.schedule.delete(scheduleToDelete.id);

      };


      const newIsAdded = !course.isAdded;
      setFilteredRes((prevRes) =>
        prevRes.map((item) =>
          item.id === courseID ? { ...item, isAdded: newIsAdded } : item
        )
      );
    } catch {
      console.error("ERROR");
    }
  };

  return (
    <>
    <NavBar />
      <div className="grid grid-cols-[300px_1fr] gap-6 p-6">
        {/* Filters Column */}
        <div className="space-y-4">
          <GlassmorphicCard className="p-4">
            <h2 className="text-lg font-semibold mb-4">Search Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Search Courses</label>
                <Input
                  type="text"
                  placeholder="Search by course name or code"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Course Level</label>
                <Select
                  value={filters.courseLevel || ""}
                  onValueChange={(value) => handleFilterChange("courseLevel", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select course level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All levels</SelectItem>
                    {Object.values(CourseLevel)
                      .filter(value => typeof value === 'number') // Only include numeric values
                      .map(level => (
                        <SelectItem key={level} value={level.toString()}>
                          {level}
                        </SelectItem>
                      ))}

                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Course Subject</label>
                <Select
                  value={filters.courseSubject || ""}
                  onValueChange={(value) => handleFilterChange("courseSubject", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select course subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All subjects</SelectItem>
                    {Object.values(CourseSubject).map(subject => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Section Type</label>
                <Select
                  value={filters.isLabOrTutorial === null ? "all" : filters.isLabOrTutorial.toString()}
                  onValueChange={(value) => handleFilterChange("isLabOrTutorial", value === "" ? null : value === "true")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All sections" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All sections</SelectItem>
                    <SelectItem value="false">Lectures</SelectItem>
                    <SelectItem value="true">Labs/Tutorials</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => {
                  setSearchTerm("");
                  setFilters({
                    courseLevel: "",
                    courseSubject: "",
                    isLabOrTutorial: null
                  });
                }}
                variant="outline"
                className="w-full"
              >
                Clear Filters
              </Button>

              <Button onClick={applyFilters} variant="outline" className="w-full">
                Apply Filters
              </Button>
            </div>
          </GlassmorphicCard>
        </div>

        {/* Results Column */}
        <div className="space-y-4">
          {!filteredRes ? (
            <div className="text-center py-8">Loading courses...</div>
          ) : (
            <div>
              {filteredRes?.map((course) => (
                <CourseCard course={course} key={course.id} addCourse={addCourse} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

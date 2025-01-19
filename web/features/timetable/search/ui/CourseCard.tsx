import { FC } from "react";
import { Button } from "@/components/ui/button";
import { GlassmorphicCard } from "@/components/ui/glassmorphic-card";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: {
    id: string;
    name: string;
    sections: string[];
    description: string;
  };
}

export const CourseCard: FC<CourseCardProps> = ({ course, addCourse }) => {
  return (
    <GlassmorphicCard key={course.id} className="p-4 mb-4 flex gap-3">
      <div>
      <h3 className="text-lg font-semibold">{course.name}</h3>
      <p className="text-sm text-gray-600 mt-1">{course.description}</p>
      <div className="mt-4 gap-x-3 flex">
        {course.sections.map((section) => (<p>{section}</p>))}
      </div>
      </div>
      <div >
        <Button className="bg-green-400 text-black font-bold" onClick={() => addCourse(course)}>{course.isAdded ? "✔" : "+"}</Button>
      </div>
    </GlassmorphicCard>
  );
};

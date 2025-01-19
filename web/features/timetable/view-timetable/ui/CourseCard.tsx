export function CourseCard({ course }) {
    console.log(course)
   return (
       <div className="flex gap-x-3 flex-col text-foreground bg-card">
       <div className="flex">
           <p>{course.name}</p>
       </div>
       <p>{course.description}</p>
       </div>
   )
}

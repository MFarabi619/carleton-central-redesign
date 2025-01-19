import {Card, CardContent} from "@/components/ui/card"

export function CourseCard({ course }) {
    console.log(course)
   return (
       <Card className="flex gap-x-3 flex-col text-foreground bg-card bg-shadow-sm p-3 my-2">
       <CardContent className="flex pb-2 pl-2">
           <p className="font-bold">{course.name}</p>
       </CardContent>
       <p className="text-stone-500">{course.description}</p>
       </Card>
   )
}

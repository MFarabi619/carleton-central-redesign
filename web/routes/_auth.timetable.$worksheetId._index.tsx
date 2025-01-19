import { Link, useLoaderData } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Button } from "@/components/ui/button";
import { GlassmorphicCard } from "@/components/ui/glassmorphic-card";
import { ArrowLeft } from "lucide-react";

type LoaderData = {
  worksheet: {
    id: string;
    name: string;
    term: string;
    schedules: {
      edges: Array<{
        node: {
          id: string;
          course: {
            id: string;
            name: string;
            description: string;
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
              course: {
                id: true,
                name: true,
                description: true
              }
            }
          }
        }
      }
    });

    if (!worksheet) {
      throw new Error("Worksheet not found");
    }

    return json({ worksheet });
  } catch (error) {
    return json<LoaderData>({ 
      worksheet: null, 
      error: error instanceof Error ? error.message : "An error occurred" 
    });
  }
}        
      
export default function WorksheetPage() {
  const { worksheet } = useLoaderData<typeof loader>();

  if (!worksheet) {
    return null;
  }
 
  return (
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
        <h1 className="text-2xl font-bold mb-2">{worksheet?.name}</h1>
        <p className="text-gray-600 mb-6">Term: {worksheet.term}</p>

        <h2 className="text-xl font-semibold mb-4">Courses</h2>
        {worksheet.schedules.edges.length === 0 ? (
          <p className="text-gray-600">No courses added yet</p>
        ) : worksheet.schedules.edges.map(({ node: schedule }) => (
          <div key={schedule.id} className="p-4 bg-white/50 rounded-lg mb-4">
            <h3 className="font-medium">{schedule.course?.name ?? "Unnamed Course"}</h3>
            <p className="text-sm text-gray-600">{schedule.course?.description}</p>
          </div>
        ))}
      </GlassmorphicCard>
    </div>
  );
}
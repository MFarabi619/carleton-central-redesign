import { useState, useCallback } from "react";
import { useFindMany, useFindFirst, useUser, useAction } from "@gadgetinc/react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useNavigate } from "@remix-run/react";
import { Button } from '@/components/ui/button';
import { api } from "../api";
import redLine from '@/assets/red-line.svg?url';

const TERM_OPTIONS = ["Fall 2024", "Winter 2025", "Summer 2025"];

export default function Timetable() {
  const [selectedTerm, setSelectedTerm] = useState<"Fall 2024" | "Summer 2025" | "Winter 2025">("Fall 2024");
  const [selectedWorksheet, setSelectedWorksheet] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const user = useUser();
  const navigate = useNavigate();

  const [{ data: worksheetResult, fetching: findingWorksheet }, getWorksheet] = useAction(api.worksheet.getByNameAndUser);
  const [{ fetching: isCreating }, create] = useAction(api.worksheet.create);

  const [{ data: schedules, fetching }] = useFindMany(api.worksheet, {
    filter: {
      AND: [
        { user: { equals: user?.id } },
        selectedTerm ? { term: { equals: selectedTerm } } : null
      ].filter(Boolean),
    },
    select: {
      id: true,
      name: true,
      term: true,
    },
  });


  const handleTermChange = (value: "Fall 2024" | "Winter 2025" | "Summer 2025") => {
    setSelectedTerm(value);
    setSelectedWorksheet(null);
  };

  const handleWorksheetChange = useCallback((value: string) => {
    setSelectedWorksheet(value);
  }, []);

  const handleCreateTimeTable = useCallback(async () => {
    try {
      setError(null);
      if (selectedWorksheet) {
        if (selectedWorksheet === "New Worksheet") {
          // Count existing worksheets for this term to generate name
          const existingWorksheets = schedules?.filter(w => w.term === selectedTerm) || [];
          const worksheetNumber = existingWorksheets.length + 1;
          const worksheetName = `${selectedTerm} - Worksheet ${worksheetNumber}`;

          const result = await create({
            name: worksheetName,
            term: selectedTerm,
            user: user.id
          });
          if (result.data?.id) {
            navigate(`/timetable/${result.data.id}`);
          }
        } else {
          const matchingSchedule = schedules?.find((schedule) => schedule.name === selectedWorksheet);

          // Navigate to existing worksheet
          navigate(`/timetable/${matchingSchedule?.id}`);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }, [navigate, selectedTerm, selectedWorksheet, schedules, user?.id, create]);

  const getWorksheetOptions = useCallback(() => {
    if (!schedules) return [];
    const existingWorksheets = schedules.map((worksheet) => worksheet.name);
    if (!existingWorksheets.includes("New Worksheet")) {
      existingWorksheets.push("New Worksheet");
    }
    return [...new Set([...existingWorksheets, "New Worksheet"])];
  }, [schedules]);

  return (
    <div className="container mx-auto max-w-4xl p-6 flex flex-col gap-y-3">
      <div className="flex gap-3 overflow-hidden">
        <p className="text-nowrap">Term & Timetable</p>
        {error && (
          <p className="text-red-500">{error}</p>
        )}
        <img src={redLine} className="w-auto" />
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Term</label>
          <Select onValueChange={handleTermChange} value={selectedTerm ?? undefined}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a term" />
            </SelectTrigger>
            <SelectContent>
              {TERM_OPTIONS.map((term) => (
                <SelectItem key={term} value={term}>
                  {term}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Worksheet</label>
          <Select
            onValueChange={handleWorksheetChange}
            value={selectedWorksheet ?? undefined}
            disabled={!selectedTerm || fetching || isCreating}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={fetching ? "Loading..." : "Select a worksheet"}>
                {selectedWorksheet || "Select a worksheet"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {getWorksheetOptions().map((worksheet) => (
                <SelectItem key={worksheet} value={worksheet}>
                  {worksheet}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-x-4">
        <Button>Search Courses</Button>
        <Button disabled={!selectedTerm || !selectedWorksheet || fetching} onClick={handleCreateTimeTable}>View Timetable</Button>
      </div>
      <div className="flex gap-x-4">
        <Button>How to Video</Button>
        <Button>User Guide</Button>
        <Button>Graduate Calendar</Button>
        <Button>Undergraduate Calendar</Button>
      </div>
    </div>
  );
}

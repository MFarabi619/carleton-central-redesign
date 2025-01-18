import { useState, useCallback } from "react";
import { useFindMany, useUser } from "@gadgetinc/react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Button } from '@/components/ui/button';
import { api } from "../api";
import  redLine  from '@/assets/red-line.svg?url'

const TERM_OPTIONS = ["Fall 2024", "Winter 2025", "Summer 2025"];

export default function Timetable() {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedWorksheet, setSelectedWorksheet] = useState<string | null>(null);

  const user = useUser();

  const [{ data: schedules, fetching }] = useFindMany(api.schedule, {
    filter: {
      AND: [
        { studentId: { equals: user?.id } },
        selectedTerm ? { term: { equals: selectedTerm } } : null,
      ].filter(Boolean),
    },
    select: {
      id: true,
      worksheet: true,
      term: true,
    },
  });

  const handleTermChange = (value: string) => {
    setSelectedTerm(value);
    setSelectedWorksheet(null);
  };

  const handleWorksheetChange = useCallback((value: string) => {
    setSelectedWorksheet(value);
  }, []);

  const getWorksheetOptions = useCallback(() => {
    if (!schedules) return [];
    const existingWorksheets = schedules.map((schedule) => schedule.worksheet);
    return [...new Set([...existingWorksheets, "New Worksheet"])];
  }, [schedules]);

  return (
    <div className="container mx-auto max-w-4xl p-6 flex flex-col gap-y-3">
      <div className="flex gap-3 overflow-hidden">
        <p className="text-nowrap">Term & Timetable</p>
        <img src={redLine} className="w-auto"/>
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
            disabled={!selectedTerm || fetching}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={fetching ? "Loading..." : "Select a worksheet"} />
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
        <Button>View Timetable</Button>
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

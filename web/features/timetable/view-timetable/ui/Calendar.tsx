import React from "react";
import { fillTimeSlots } from "../utils/fill-timeslots";
import { cva } from 'class-variance-authority';
export const Calendar = ({ courses }) => {
  console.log(courses)
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30",
  ];
  const cellStyle = cva('p-2 border text-center', {
    variants: {
      background: {
        start: 'bg-blue-100',
        default: 'bg-red-100',
      },
    },
  });

  const calendar = {};
  timeSlots.forEach((time) => {
    calendar[time] = {};
    days.forEach((day) => {
      calendar[time][day] = null;
    });
  });

  courses.forEach((course) => {
    const courseObj = {
      id: course.id,
      name: course.name,
      professor: course.professor
    };
    course.timeSlots.forEach((slot) => {
      const [day, time] = slot.split(" ");
      fillTimeSlots(day, time, calendar, { ...courseObj });
    });
  });

  return (
    <div className="grid grid-cols-[100px_repeat(5,1fr)] gap-px bg-gray-200">
      {/* Header Row */}
      <div className="font-bold text-center p-2 bg-gray-100">Time</div>
      {days.map((day) => (
        <div
          key={day}
          className="font-bold text-center p-2 bg-gray-100"
        >
          {day}
        </div>
      ))}

      {/* Calendar Rows */}
      {timeSlots.map((time) => (
        <React.Fragment key={time}>
          <div className="p-2 bg-gray-50 border text-center">
            {time}
          </div>
          {days.map((day) => (
  <div
    key={day}
    className={cellStyle({ background: calendar[time][day] ? 'start' : 'default' })}
  >
    {calendar[time][day]?.start ? (
      <>
        <div>
          <p>{calendar[time][day]?.name}</p>
          <p>{calendar[time][day]?.professor}</p>
        </div>
      </>
    ) : (
      ""
    )}
  </div>
))}
        </React.Fragment>
      ))}
    </div>
  );
};

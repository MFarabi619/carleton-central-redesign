const timeSlots = [
  "08:00", "08:30", "09:00", "09:30",
  "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30",
];

// Helper function to convert time string to minutes
function timeToMinutes(time) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

// Helper function to find the closest start time (larger than the given time)
function findClosestStartTime(time) {
  const timeInMinutes = timeToMinutes(time);
  let closest = null;

  for (const slot of timeSlots) {
    const slotInMinutes = timeToMinutes(slot);
    if (slotInMinutes >= timeInMinutes) {
      closest = slot;
      break;
    }
  }

  return closest;
}

// Helper function to find the closest end time (smaller than the given time)
function findClosestEndTime(time) {
  const timeInMinutes = timeToMinutes(time);
  let closest = null;

  for (let i = timeSlots.length - 1; i >= 0; i--) {
    const slotInMinutes = timeToMinutes(timeSlots[i]);
    if (slotInMinutes <= timeInMinutes) {
      closest = timeSlots[i];
      break;
    }
  }

  return closest;
}

export function fillTimeSlots(day, range, calendar, obj) {
  const [start, end] = range.split("-");

  // Find the closest start and end times based on the provided time range
  const startSlot = findClosestStartTime(start);
  const endSlot = findClosestEndTime(end);

  // Find the indices of the start and end slots in the timeSlots array
  const startSlotIndex = timeSlots.indexOf(startSlot);
  const endSlotIndex = timeSlots.indexOf(endSlot);

  // Ensure the slots are filled correctly
  for (let i = startSlotIndex; i <= endSlotIndex; i++) {
    const slot = timeSlots[i];

    if (slot) {
      // Make sure the `start` flag is applied only to the first slot
      const isStart = i === startSlotIndex;

      // Update the calendar object
        if (calendar[slot][day]) {
           if (isStart) {
               calendar[slot][day] = { start: isStart, ...obj }
           }
        } else {
            calendar[slot][day] = { start: isStart, ...obj }
        }

    }
  }
}

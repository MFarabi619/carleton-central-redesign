import { type Schedule } from "@gadget-client/carleton-central-redesign";

export interface WorksheetOption {
  label: string;
  value: string;
}

/**
 * Generates a unique worksheet identifier
 * @returns A unique string identifier for a new worksheet
 */
export function generateWorksheetId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `ws_${timestamp}_${random}`;
}

/**
 * Formats a worksheet identifier for display
 * @param worksheet - The worksheet identifier to format
 * @returns A user-friendly display name for the worksheet
 */
export function formatWorksheetName(worksheet: string | null): string {
  if (!worksheet) return "Untitled Worksheet";

  // Remove technical prefix and get the timestamp portion
  const parts = worksheet.split("_");
  if (parts.length < 2) return "Worksheet";

  const number = new Date(parseInt(parts[1])).toLocaleDateString();
  return `Worksheet (${number})`;
}

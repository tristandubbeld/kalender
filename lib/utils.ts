import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTimeToPosition(time: string) {
  if (time === "00:00") {
    return 0;
  }

  // Remove trailing minutes and leading zero
  const hour = time.replace(":00", "").replace(/^0/, "");
  const hourNumber = parseInt(hour, 10);

  return hourNumber;
}

// TODO: maybe type like this to ensure month nubmer typesafety.
// export type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export function getAllDaysInMonth(month: number, year: number) {
  return Array.from(
    { length: new Date(year, month, 0).getDate() },
    (_, i) => new Date(year, month - 1, i + 1)
  );
}

export function getAllDaysInYear(year: number) {
  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;

    return {
      month: month,
      days: getAllDaysInMonth(month, year),
    };
  });
}

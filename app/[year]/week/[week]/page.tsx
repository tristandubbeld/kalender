import Link from "next/link";
import addDays from "date-fns/addDays";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import formatDate from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";

import { WeekView } from "@/components/WeekView";

function getFirstMonday(year: number, week: number) {
  return startOfWeek(new Date(year, 0, 1 + week * 7), {
    weekStartsOn: 1,
  });
}

export default function WeekPage({
  params,
}: {
  params: { year: number; week: number };
}) {
  const monday = getFirstMonday(params.year, params.week);
  const sunday = addDays(monday, 6);
  const weekDates = eachDayOfInterval({ start: monday, end: sunday });
  const monthLink = `/${formatDate(monday, "yyyy")}/${formatDate(
    monday,
    "MM"
  )}`;

  return (
    <div className="flex flex-col p-4">
      <p className="max-w-xl self-center text-center">
        Note: Updating events not implemented for the week view. You can create
        an event by clicking on a days timeslot. Click the date for the day view
        and the month for the month view.
      </p>
      <div className="h-4" />
      <h1 className="text-center font-semibold">
        <Link href={monthLink}>
          {formatDate(monday, "MMMM")} {params.year}
        </Link>
      </h1>
      <div className="h-4" />
      <WeekView dates={weekDates} />
    </div>
  );
}

// TODO: only allow weeks that exist

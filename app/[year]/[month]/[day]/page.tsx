import Link from "next/link";
import add from "date-fns/add";
import formatDate from "date-fns/format";
import getWeek from "date-fns/getWeek";
import sub from "date-fns/sub";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { DayView } from "@/components/DayView";

export default function DayPage({
  params,
}: {
  params: { year: number; month: number; day: number };
}) {
  const monthIndex = params.month - 1; // Date months are zero based
  const date = new Date(params.year, monthIndex, params.day);
  const dateNumber = formatDate(date, "d");
  const month = formatDate(date, "MMMM");
  const weekDay = formatDate(date, "EEEE");
  const weekNumber = getWeek(date, { weekStartsOn: 1 });

  const monthLink = `/${formatDate(date, "yyyy/MM")}`;
  const weekLink = `/${formatDate(date, "yyyy")}/week/${weekNumber}`;
  const prevDayLink = `/${formatDate(sub(date, { days: 1 }), "yyyy/MM/dd")}`;
  const nextDayLink = `/${formatDate(add(date, { days: 1 }), "yyyy/MM/dd")}`;

  return (
    <div className="flex flex-col p-4">
      <div className="text-center">
        <h1 className="rounded-md text-4xl font-semibold">{dateNumber}</h1>
        <span className="text-sm">{weekDay}</span>
        <div className="w-2" />
      </div>

      <div className="h-4" />

      <div className="flex items-center justify-between">
        <Link className={buttonVariants({})} href={prevDayLink}>
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <div className="flex items-center">
          <Link
            href={weekLink}
            className={buttonVariants({ variant: "secondary" })}
          >
            Week {weekNumber}
          </Link>

          <div className="w-2" />

          <Link
            href={monthLink}
            className={buttonVariants({ variant: "secondary" })}
          >
            {month}
          </Link>
        </div>

        <Link className={buttonVariants({})} href={nextDayLink}>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="h-4" />

      <DayView date={date} />
    </div>
  );
}

// TODO: only allow days that exist in selected month

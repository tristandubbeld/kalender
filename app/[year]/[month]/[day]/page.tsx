import Link from "next/link";
import add from "date-fns/add";
import formatDate from "date-fns/format";
import getWeek from "date-fns/getWeek";
import sub from "date-fns/sub";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { HOURS } from "@/lib/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import { TimeSlot } from "@/components/TimeSlot";

type DayRowProps = Pick<React.ComponentProps<typeof TimeSlot>, "position"> & {
  date: Date;
  time?: string;
};

const DayRow = ({ date, time = "00:00", position }: DayRowProps) => {
  return (
    <>
      <div className="pr-2 text-center text-sm leading-none">{time}</div>
      <TimeSlot position={position} time={time} date={date} />
    </>
  );
};

const TEST_EVENTS = [
  {
    id: "1",
    name: "Some event",
    start: "02:00",
    end: "04:00",
  },
  {
    id: "2",
    name: "Another event",
    start: "08:00",
    end: "12:00",
  },
  {
    id: "3",
    name: "Last event",
    start: "19:00",
    end: "00:00",
  },
];

export default function DayPage({
  params,
}: {
  params: { year: number; month: number; day: number };
}) {
  const monthIndex = params.month - 1; // Date months are zero based
  const date = new Date(params.year, monthIndex, params.day);
  const dateName = formatDate(date, "EEEE MMMM do");
  const dateNumber = formatDate(date, "d");
  const month = formatDate(date, "MMMM");
  const weekDay = formatDate(date, "EEEE");
  const weekNumber = getWeek(date, { weekStartsOn: 1 });

  const prevDayLink = `/${formatDate(sub(date, { days: 1 }), "yyyy/MM/dd")}`;
  const nextDayLink = `/${formatDate(add(date, { days: 1 }), "yyyy/MM/dd")}`;
  const monthLink = `/${formatDate(date, "yyyy/MM")}`;

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
          <Button variant="secondary">Week {weekNumber}</Button>

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

      <div className="flex w-full flex-col">
        <div className="relative grid auto-rows-cal-lg grid-cols-cal-day">
          {HOURS.map((time, index) => {
            const position =
              index === 0
                ? "top"
                : index === HOURS.length - 1
                ? "bottom"
                : undefined;

            return (
              <DayRow key={time} date={date} time={time} position={position} />
            );
          })}

          {/* TODO: events */}
          {TEST_EVENTS.map((event) => (
            <Event key={event.id} start={event.start} end={event.end}>
              {event.name}
            </Event>
          ))}
        </div>
      </div>
    </div>
  );
}

type EventProps = {
  start: string;
  end: string;
  children: React.ReactNode;
};

const Event = ({ start, end, children }: EventProps) => {
  const startPosition = convertTimeToPosition(start);
  const endPosition = convertTimeToPosition(end);

  return (
    <div
      className={`row-start-${startPosition} row-end-${endPosition} absolute col-start-2 h-full w-full px-0.5 `}
    >
      <div className="h-full w-full rounded-md bg-yellow-400">{children}</div>
    </div>
  );
};

function convertTimeToPosition(time: string) {
  if (time === "00:00") {
    return 1;
  }

  // Remove trailing minutes and leading zero
  const hour = time.replace(":00", "").replace(/^0/, "");
  const hourNumber = parseInt(hour, 10);

  // Add one to account for the grid rows starting at 1
  return hourNumber + 1;
}

// TODO: only allow days that exist in selected month

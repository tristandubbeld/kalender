"use client";

import { useEffect, useState } from "react";

import { Event } from "@/types/event";
import { HOURS } from "@/lib/constants";
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

type DayViewProps = {
  date: Date;
};

export const DayView = ({ date }: DayViewProps) => {
  const [events, setEvents] = useState<{ [key: string]: Event }>({});

  useEffect(() => {
    // Grab current day events from localStorage
    const storedEvents = JSON.parse(
      localStorage.getItem(date.toString()) || "{}"
    );

    // Set to state
    setEvents(storedEvents);
  }, [date]);

  return (
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

        {Object.values(events).map((event) => {
          return (
            <Event key={event.id} start={event.start} end={event.end}>
              {event.name}
            </Event>
          );
        })}
      </div>
    </div>
  );
};

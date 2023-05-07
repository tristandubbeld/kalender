"use client";

import getDay from "date-fns/getDay";

import { Event } from "@/types/event";
import { convertTimeToPosition } from "@/lib/utils";

import { EventsProvider, useEvents } from "./EventsProvider";

// These week events are kind of rushed, I have to admit.
export const EventsWrapper = ({ dates }: { dates: Date[] }) => {
  return (
    <>
      {dates.map((date) => {
        return (
          <EventsProvider key={`${date}`} date={date}>
            <Events />
          </EventsProvider>
        );
      })}
    </>
  );
};

const Events = () => {
  const { events } = useEvents();

  return (
    <>
      {Object.values(events).map((event) => {
        return <WeekEvent key={event.id} {...event} />;
      })}
    </>
  );
};

const WeekEvent = ({ name, start, end, date }: Event) => {
  // col start is start day
  // col end is end day
  const dayNumber = getDay(new Date(date));
  let colStart = dayNumber + 1;

  if (dayNumber === 0) {
    colStart = 8;
  }

  // Add two to account for the grid rows starting at 2
  const startPosition = convertTimeToPosition(start) + 2;
  const endPosition = convertTimeToPosition(end) + 2;

  let rowEnd = endPosition;

  if (rowEnd === 2) {
    rowEnd = 1;
  }

  return (
    <div
      className={`col-start-${colStart} row-start-${startPosition} row-end-${rowEnd} absolute col-span-1 h-full w-full px-0.5`}
    >
      <div className="h-full w-full overflow-hidden rounded-md bg-yellow-400 text-xs">
        {name}
      </div>
    </div>
  );
};

import Link from "next/link";
import formatDate from "date-fns/format";

import { HOURS } from "@/lib/constants";
import { EventsProvider } from "@/components/EventsProvider";
import { TimeSlot } from "@/components/TimeSlot";
import { EventsWrapper } from "@/components/WeekEvents";

type WeekRowProps = Pick<React.ComponentProps<typeof TimeSlot>, "position"> & {
  dates: Date[];
  time?: string;
};

const WeekRow = ({ dates, time = "00:00", position }: WeekRowProps) => {
  // create array with seven items
  const days = Array.from({ length: 7 });

  return (
    <>
      <div className="pr-2 text-center text-sm leading-none">{time}</div>
      {dates.map((date, index) => {
        const side =
          index === 0
            ? "left"
            : index === days.length - 1
            ? "right"
            : undefined;

        // TODO: In the future it's better to map over the cols rather than rows because then we won't need the EventsProvider
        // for every timeslot. We can also create a separate useCreateEvent hook that doesn't need the EventsProvider?
        return (
          <EventsProvider key={`${date}-${time}`} date={date}>
            <TimeSlot date={date} time={time} position={position} side={side} />
          </EventsProvider>
        );
      })}
    </>
  );
};

type WeekViewProps = {
  dates: Date[];
};

export const WeekView = ({ dates }: WeekViewProps) => {
  const dateNumbers = dates.map((date) => formatDate(date, "d"));
  const dayNames = dates.map((date) => formatDate(date, "EEE"));
  const dayLinks = dates.map((date) => `/${formatDate(date, "yyyy/MM/dd")}`);

  return (
    <div className="flex w-full flex-col">
      <div className="relative grid auto-rows-cal-sm grid-cols-cal-week">
        <div />
        {dateNumbers.map((number, index) => (
          <Link
            href={dayLinks[index]}
            key={number}
            className="flex flex-col pb-2 text-center"
          >
            <div>{number}</div>
            <div className="text-center text-xs font-semibold uppercase">
              {dayNames[index]}
            </div>
          </Link>
        ))}

        {HOURS.map((hour, index) => {
          const position =
            index === 0
              ? "top"
              : index === HOURS.length - 1
              ? "bottom"
              : undefined;

          return (
            <WeekRow key={hour} dates={dates} time={hour} position={position} />
          );
        })}

        <EventsWrapper dates={dates} />
      </div>
    </div>
  );
};

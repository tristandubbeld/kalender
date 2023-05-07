"use client";

import { useState } from "react";

import { HOURS } from "@/lib/constants";
import { convertTimeToPosition } from "@/lib/utils";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { EditEventDialog } from "@/components/EditEventDialog";
import { useEvents } from "@/components/EventsProvider";
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

type EventProps = {
  id: string;
  start: string;
  end: string;
  children: React.ReactNode;
};

const Event = ({ id, start, end, children }: EventProps) => {
  // Add one to account for the grid rows starting at 1
  const startPosition = convertTimeToPosition(start) + 1;
  const endPosition = convertTimeToPosition(end) + 1;

  const [isDialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div
      className={`row-start-${startPosition} row-end-${endPosition} absolute col-start-2 h-full w-full px-0.5 `}
    >
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button className="flex h-full w-full rounded-md bg-yellow-400 p-2 text-left text-xs dark:bg-orange-800 sm:text-sm">
            {children}
          </button>
        </DialogTrigger>
        <EditEventDialog id={id} close={closeDialog} />
      </Dialog>
    </div>
  );
};

type DayViewProps = {
  date: Date;
};

export const DayView = ({ date }: DayViewProps) => {
  const { events } = useEvents();

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

        {Object.values(events).map(({ id, start, end, name }) => {
          return (
            <Event key={id} id={id} start={start} end={end}>
              {name}
            </Event>
          );
        })}
      </div>
    </div>
  );
};

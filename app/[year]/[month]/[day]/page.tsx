import { VariantProps, cva } from "class-variance-authority";
import formatDate from "date-fns/format";
import { Plus } from "lucide-react";

import { HOURS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateEventDialog } from "@/components/CreateEventDialog";

const timeSlotVariants = cva("border-l-2 border-r-2 border-b-2", {
  variants: {
    position: {
      top: "border-t-2 rounded-t-md",
      bottom: "rounded-b-md",
    },
  },
});

type TimeSlotProps = VariantProps<typeof timeSlotVariants>;

export const TimeSlot = ({ position }: TimeSlotProps) => {
  return (
    <div className={timeSlotVariants({ position })}>
      <button
        className="h-full w-full"
        // onClick={() => {
        //   console.log("click");
        // }}
      >
        {/* TODO: visuallyhidden text? */}
      </button>
    </div>
  );
};

type DayRowProps = Pick<React.ComponentProps<typeof TimeSlot>, "position"> & {
  time?: string;
};

const DayRow = ({ time = "00:00", position }: DayRowProps) => {
  return (
    <>
      <div className="pr-2 text-center text-sm leading-none">{time}</div>
      <TimeSlot position={position} />
    </>
  );
};

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

  return (
    <div className="flex flex-col p-4">
      <div className="ml-12 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="rounded-md text-4xl font-semibold">{dateNumber}</h1>
          <div className="w-2" />
          <span className="text-sm">{weekDay}</span>
        </div>
        <div className="flex justify-end">
          <Button variant="secondary">{month}</Button>

          <div className="w-2" />

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New event
              </Button>
            </DialogTrigger>
            <CreateEventDialog dateName={dateName} />
          </Dialog>
        </div>
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

            return <DayRow key={time} time={time} position={position} />;
          })}

          {/* TODO: events */}
          <div className="absolute col-start-2 row-start-3 row-end-5 h-full w-full px-0.5 ">
            <div className="h-full w-full rounded-md bg-yellow-400">
              some event
            </div>
          </div>

          <div className="absolute col-start-2 row-start-9 row-end-13 h-full w-full px-0.5 ">
            <div className="h-full w-full rounded-md bg-yellow-400">
              another event
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO: only allow days that exist in selected month

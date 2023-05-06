"use client";

import { useState } from "react";
import { VariantProps, cva } from "class-variance-authority";

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

type TimeSlotProps = VariantProps<typeof timeSlotVariants> & {
  date: Date;
  time: string;
};

export const TimeSlot = ({ date, time, position }: TimeSlotProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className={timeSlotVariants({ position })}>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button className="h-full w-full">
            {/* TODO: visuallyhidden text? */}
          </button>
        </DialogTrigger>
        <CreateEventDialog date={date} startTime={time} close={closeDialog} />
      </Dialog>
    </div>
  );
};

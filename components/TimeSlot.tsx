"use client";

import { useState } from "react";
import { VariantProps, cva } from "class-variance-authority";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateEventDialog } from "@/components/CreateEventDialog";

const timeSlotVariants = cva("border-l-2 border-b-2", {
  variants: {
    position: {
      top: "border-t-2",
      bottom: "",
    },
    side: {
      left: "",
      right: "border-r-2",
      full: "border-r-2 border-l-2",
    },
  },
  compoundVariants: [
    {
      position: "top",
      side: "left",
      class: "rounded-tl-md",
    },
    {
      position: "top",
      side: "right",
      class: "rounded-tr-md",
    },
    {
      position: "bottom",
      side: "left",
      class: "rounded-bl-md",
    },
    {
      position: "bottom",
      side: "right",
      class: "rounded-br-md",
    },
    {
      position: "top",
      side: "full",
      class: "rounded-t-md",
    },
    {
      position: "bottom",
      side: "full",
      class: "rounded-b-md",
    },
  ],
});

type TimeSlotProps = VariantProps<typeof timeSlotVariants> & {
  date: Date;
  time: string;
};

export const TimeSlot = ({ date, time, position, side }: TimeSlotProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className={timeSlotVariants({ position, side })}>
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

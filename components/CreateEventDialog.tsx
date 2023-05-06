"use client";

import { useState } from "react";
import formatDate from "date-fns/format";
import { v4 as uuidv4 } from "uuid";

import { Event } from "@/types/event";
import { HOURS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEvents } from "@/components/EventsProvider";

type CreateEventDialogProps = {
  date: Date;
  startTime?: string;
  close: () => void;
};

function calculateEndTime(startTime: string) {
  const endTime = HOURS.findIndex((hour) => hour === startTime) + 1;
  return HOURS[endTime] || "00:00";
}

export const CreateEventDialog = ({
  date,
  startTime = "00:00",
  close,
}: CreateEventDialogProps) => {
  const { createEvent } = useEvents();

  const dateName = formatDate(date, "EEEE MMMM do");
  // Calculate end time based on start time, one hour from
  // the start time.
  const endTime = calculateEndTime(startTime);

  const [name, setName] = useState("");
  const [start, setStart] = useState(startTime);
  const [end, setEnd] = useState(endTime);

  return (
    <DialogContent>
      <DialogHeader className="text-left">
        <DialogTitle>Create event</DialogTitle>
        <DialogDescription>
          Create an event for {dateName}. The UI lib has a date with scrolling
          selects inside dialogs, sorry for that.
        </DialogDescription>
      </DialogHeader>
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();

          // Generate a unique id for the event
          const id = uuidv4();

          const event: Event = {
            id,
            date,
            name,
            start,
            end,
          };

          createEvent(id, event);
          close();
        }}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="event-name">Event name</Label>
            <Input
              id="event-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="event-start">Event start</Label>
            <Select value={start} onValueChange={setStart}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {/**
                 * There seems to be a bug where we can't place a select component inside
                 * a dialog because it doesn't scroll. Need to investigate further and
                 * report to the UI lib.
                 *
                 * Fixed here:
                 * https://codesandbox.io/s/radix-select-inside-radix-dialog-5lwgym?file=/SelectDemo.js
                 */}
                {HOURS.map((hour) => (
                  <SelectItem key={hour} value={hour}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="event-start">Event end</Label>
            <Select value={end} onValueChange={setEnd}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[...HOURS.slice(1), "00:00"].map((hour) => (
                  <SelectItem key={hour} value={hour}>
                    {hour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Create event</Button>
        </div>
      </form>
    </DialogContent>
  );
};

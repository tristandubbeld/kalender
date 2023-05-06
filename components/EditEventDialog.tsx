import { useState } from "react";
import formatDate from "date-fns/format";

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

type EditEventDialogProps = {
  id: string;
  close: () => void;
};

export const EditEventDialog = ({ id, close }: EditEventDialogProps) => {
  const { events, updateEvent } = useEvents();
  const currentEvent = events[id];

  console.log("currentEvent", currentEvent);

  const dateName = formatDate(new Date(currentEvent.date), "EEEE MMMM do");
  const [name, setName] = useState(currentEvent.name);
  const [start, setStart] = useState(currentEvent.start);
  const [end, setEnd] = useState(currentEvent.end);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create event</DialogTitle>
        <DialogDescription>
          Update event on {dateName}. The UI lib has a date with scrolling
          selects inside dialogs, sorry for that.
        </DialogDescription>
      </DialogHeader>
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();

          const event: Event = {
            ...currentEvent,
            name,
            start,
            end,
          };

          updateEvent(id, event);
          close();
        }}
      >
        <div>
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
        <div>
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
        <div>
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
        <Button type="submit">Update event</Button>
      </form>
    </DialogContent>
  );
};

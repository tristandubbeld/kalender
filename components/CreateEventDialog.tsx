"use client";

import { useState } from "react";

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

type CreateEventDialogProps = {
  // TODO: change datename to just date, and format it in the component
  dateName: string;
};

export const CreateEventDialog = ({ dateName }: CreateEventDialogProps) => {
  const [name, setName] = useState("");
  const [start, setStart] = useState("00:00");
  const [end, setEnd] = useState("01:00");

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create event</DialogTitle>
        <DialogDescription>Create an event for {dateName}.</DialogDescription>
      </DialogHeader>
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();

          console.log({ name, start, end });
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
        <Button type="submit">Create event</Button>
      </form>
    </DialogContent>
  );
};

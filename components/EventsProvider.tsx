"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { Event } from "@/types/event";

const EventsContext = createContext<
  | {
      events: { [key: string]: Event };
      createEvent: (id: string, event: Event) => void;
      updateEvent: (id: string, event: Event) => void;
      deleteEvent: (id: string) => void;
    }
  | undefined
>(undefined);

type EventsProviderProps = {
  date: Date;
  children: React.ReactNode;
};

// TODO: If we add weeks we might want to change date from being passed as a prop
// to the provider to being passed to the hook.
export const EventsProvider = ({ date, children }: EventsProviderProps) => {
  const [events, setEvents] = useState<{ [key: string]: Event }>({});

  // Load events on mount
  useEffect(() => {
    // Grab current day events from localStorage
    const storedEvents = JSON.parse(
      localStorage.getItem(date.toString()) || "{}"
    );

    // Set to state
    setEvents(storedEvents);
  }, [date]);

  const createEvent = (id: string, event: Event) => {
    // Check if the current day already has events
    const eventDateString = date.toString();
    const eventsInStorage = localStorage.getItem(eventDateString);

    // Object for events on this day
    let events = {};

    if (eventsInStorage) {
      const existingEvents = JSON.parse(eventsInStorage);

      events = {
        ...existingEvents,
        [id]: event,
      };
    } else {
      events = {
        [id]: event,
      };
    }

    // Save to localStorage
    localStorage.setItem(eventDateString, JSON.stringify(events));

    // And set the state to reload the view
    setEvents(events);
  };

  const updateEvent = (id: string, event: Event) => {
    createEvent(id, event);
  };

  const deleteEvent = (id: string) => {
    const eventDateString = date.toString();

    delete events[id];

    // Save to localStorage
    localStorage.setItem(eventDateString, JSON.stringify(events));

    // And set the state to reload the view with a new object, when it's
    // the same object reference react doesn't refresh state.
    setEvents({ ...events });
  };

  return (
    <EventsContext.Provider
      value={{ events, createEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);

  if (context === undefined) {
    throw new Error("useEvents must be used within a EventsProvider");
  }

  return context;
};

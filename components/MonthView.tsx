import eachDayOfInterval from "date-fns/eachDayOfInterval";
import endOfWeek from "date-fns/endOfWeek";
import formatDate from "date-fns/format";
import isSameDay from "date-fns/isSameDay";
import startOfWeek from "date-fns/startOfWeek";

import { DAYS } from "@/lib/constants";
import { getAllDaysInMonth } from "@/lib/utils";

type MonthViewProps = {
  month: number;
  year: number;
};

export const MonthView = ({ month, year }: MonthViewProps) => {
  const allDaysInApril = getAllDaysInMonth(month, year);
  const startOfWeekFirstDate = startOfWeek(allDaysInApril[0], {
    weekStartsOn: 1, // monday
  });

  const endOfWeekLastDate = endOfWeek(
    allDaysInApril[allDaysInApril.length - 1],
    {
      weekStartsOn: 1, // monday
    }
  );

  // check if the start of the week is the same as the first day
  const startIsSameDay = isSameDay(startOfWeekFirstDate, allDaysInApril[0]);
  const endIsSameDay = isSameDay(
    endOfWeekLastDate,
    allDaysInApril[allDaysInApril.length - 1]
  );

  const daysBetweenStartOfWeekAndFirstDay = startIsSameDay
    ? undefined
    : eachDayOfInterval({
        start: startOfWeekFirstDate,
        end: allDaysInApril[0],
      }).slice(0, -1); // remove last item

  const daysBetweenEndOfWeekAndLastDay = endIsSameDay
    ? undefined
    : eachDayOfInterval({
        start: allDaysInApril[allDaysInApril.length - 1],
        end: endOfWeekLastDate,
      }).slice(1); // remove first item

  return (
    <div>
      <div className="grid grid-cols-7">
        {DAYS.map((day) => (
          <div
            key={day}
            className="pb-4 text-center text-xs font-semibold uppercase"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 overflow-hidden rounded-md border-2 [&>:not(:nth-child(7n))]:border-r-2 [&>:not(:nth-last-child(-n+7))]:border-b-2">
        {daysBetweenStartOfWeekAndFirstDay
          ? daysBetweenStartOfWeekAndFirstDay.map((day) => (
              <div
                key={day.toString()}
                className="flex h-12 items-center justify-center bg-slate-100 p-2 sm:h-20 md:h-28"
              >
                {formatDate(day, "d")}
              </div>
            ))
          : null}

        {allDaysInApril.map((day) => (
          <div
            key={day.toString()}
            className="flex h-12 items-center justify-center p-2 sm:h-20 md:h-28"
          >
            {formatDate(day, "d")}
          </div>
        ))}

        {daysBetweenEndOfWeekAndLastDay
          ? daysBetweenEndOfWeekAndLastDay.map((day) => (
              <div
                key={day.toString()}
                className="flex h-12 items-center justify-center bg-slate-100 p-2 sm:h-20 md:h-28"
              >
                {formatDate(day, "d")}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

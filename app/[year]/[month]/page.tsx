import formatDate from "date-fns/format";

import { MonthView } from "@/components/MonthView";

export default function MonthPage({
  params,
}: {
  params: { year: number; month: number };
}) {
  const monthName = formatDate(new Date(params.year, params.month - 1), "MMMM");

  return (
    <div>
      <p>
        Note: Events are not yet implemented for the month view. The days viewed
        are dynamic though.
      </p>
      <h1>
        {monthName} {params.year}
      </h1>
      <div className="h-8" />
      <MonthView month={params.month} year={params.year} />
    </div>
  );
}

// TODO: only allow months that exist

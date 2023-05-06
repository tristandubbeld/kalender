import formatDate from "date-fns/format";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateEventDialog } from "@/components/CreateEventDialog";

export default function DayPage({
  params,
}: {
  params: { year: number; month: number; day: number };
}) {
  const monthIndex = params.month - 1; // Date months are zero based
  const date = new Date(params.year, monthIndex, params.day);
  const dayName = formatDate(date, "EEEE");
  const dateName = formatDate(date, "do MMMM yyyy");

  return (
    <div>
      <h1>
        Day {params.day} {params.month} {params.year}
      </h1>
      <div>{dayName}</div>
      <div>{dateName}</div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create event</Button>
        </DialogTrigger>
        <CreateEventDialog dateName={dateName} />
      </Dialog>
    </div>
  );
}

// TODO: only allow days that exist in selected month

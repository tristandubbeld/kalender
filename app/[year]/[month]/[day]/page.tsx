import formatDate from "date-fns/format";

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
    </div>
  );
}

// TODO: only allow days that exist in selected month

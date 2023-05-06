export default function DayPage({
  params,
}: {
  params: { year: string; month: string; day: string }
}) {
  return (
    <div>
      <h1>
        Day {params.day} {params.month} {params.year}
      </h1>
    </div>
  )
}

// TODO: only allow days that exist in selected month

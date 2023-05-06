export default function MonthPage({
  params,
}: {
  params: { year: string; month: string }
}) {
  return (
    <div>
      <h1>
        Month {params.month} {params.year}
      </h1>
    </div>
  )
}

// TODO: only allow months that exist

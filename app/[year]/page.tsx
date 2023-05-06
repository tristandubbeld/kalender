export default function YearPage({ params }: { params: { year: string } }) {
  return (
    <div>
      <h1>Year {params.year}</h1>
    </div>
  )
}

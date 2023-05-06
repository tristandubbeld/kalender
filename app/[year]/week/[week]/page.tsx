export default function WeekPage({
  params,
}: {
  params: { year: string; week: string };
}) {
  return (
    <div>
      <h1>
        Week {params.week} of {params.year}
      </h1>
    </div>
  );
}

// TODO: only allow weeks that exist

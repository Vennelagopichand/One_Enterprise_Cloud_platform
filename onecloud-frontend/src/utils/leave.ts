export function calculateLeaveDays(
  startDate: string,
  endDate: string
): number {

  if (
    !startDate ||
    !endDate
  ) {
    return 0;
  }


  const start =
    new Date(
      `${startDate}T00:00:00`
    );


  const end =
    new Date(
      `${endDate}T00:00:00`
    );


  if (
    Number.isNaN(
      start.getTime()
    ) ||
    Number.isNaN(
      end.getTime()
    )
  ) {
    return 0;
  }


  if (
    end < start
  ) {
    return 0;
  }


  const millisecondsPerDay =
    1000 *
    60 *
    60 *
    24;


  const difference =
    end.getTime() -
    start.getTime();


  return (
    Math.floor(
      difference /
      millisecondsPerDay
    ) + 1
  );
}


export function formatLeaveDate(
  value: string
): string {

  if (!value) {
    return "Not Available";
  }


  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  ).format(
    new Date(
      `${value}T00:00:00`
    )
  );
}

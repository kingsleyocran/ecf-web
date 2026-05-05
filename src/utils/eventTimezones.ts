export interface TimezoneOption {
  label: string;   // Display label e.g. "WAT – West Africa (UTC+1)"
  abbr: string;    // Short abbreviation e.g. "WAT"
  iana: string;    // IANA timezone name for Intl.DateTimeFormat
}

export const TIMEZONE_OPTIONS: TimezoneOption[] = [
  { label: "GMT (UTC+0)",                  abbr: "GMT",  iana: "GMT" },
  { label: "WAT – West Africa (UTC+1)",    abbr: "WAT",  iana: "Africa/Lagos" },
  { label: "CAT – Central Africa (UTC+2)", abbr: "CAT",  iana: "Africa/Harare" },
  { label: "SAST – South Africa (UTC+2)",  abbr: "SAST", iana: "Africa/Johannesburg" },
  { label: "EAT – East Africa (UTC+3)",    abbr: "EAT",  iana: "Africa/Nairobi" },
  { label: "CET – Central Europe (UTC+1)", abbr: "CET",  iana: "Europe/Paris" },
  { label: "EST – Eastern US (UTC-5)",     abbr: "EST",  iana: "America/New_York" },
];

export const TIMEZONE_MAP: Record<string, TimezoneOption> = Object.fromEntries(
  TIMEZONE_OPTIONS.map((t) => [t.iana, t])
);

/**
 * Returns the IANA name from TIMEZONE_OPTIONS that best matches the browser's
 * system timezone. Prefers an exact match; falls back to the closest offset.
 */
export function getBrowserDefaultTimezone(): string {
  const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (TIMEZONE_MAP[browserTz]) return browserTz;

  const now = new Date();
  const browserOffsetMin = -now.getTimezoneOffset(); // positive = ahead of UTC

  const getOffsetMin = (iana: string): number => {
    const fmt = (tz: string) =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false,
      }).format(now);
    const toMin = (s: string) => {
      const [h, m] = s.split(":").map(Number);
      return (h === 24 ? 0 : h) * 60 + m;
    };
    return toMin(fmt(iana)) - toMin(fmt("UTC"));
  };

  let best = TIMEZONE_OPTIONS[0];
  let bestDiff = Infinity;
  for (const opt of TIMEZONE_OPTIONS) {
    const diff = Math.abs(getOffsetMin(opt.iana) - browserOffsetMin);
    if (diff < bestDiff) { bestDiff = diff; best = opt; }
  }
  return best.iana;
}

/**
 * Computes UTC ISO string from a local date interpreted in the given IANA timezone.
 * Browser-timezone-independent: extracts the calendar/clock values from the Date
 * object and treats them as the user's intended local time in the selected timezone.
 */
export function toUtcIso(localDate: Date, ianaTimezone: string): string {
  // Extract the year/month/day/hours/minutes as the user entered them.
  // new Date(y, m, d, h, min) stores them as local-browser values, so getFullYear()
  // etc. return the exact numbers that were passed in — timezone-independently.
  const year    = localDate.getFullYear();
  const month   = localDate.getMonth();
  const day     = localDate.getDate();
  const hours   = localDate.getHours();
  const minutes = localDate.getMinutes();

  // Assume the inputs are UTC to get a reference timestamp, then compute the real offset.
  const assumedUtcMs = Date.UTC(year, month, day, hours, minutes, 0);
  const guessDate = new Date(assumedUtcMs);

  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: ianaTimezone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  });

  const parseFormatted = (s: string) => {
    const [datePart, timePart] = s.split(", ");
    const [m, d, y] = datePart.split("/").map(Number);
    const [h, min] = timePart.split(":").map(Number);
    return Date.UTC(y, m - 1, d, h === 24 ? 0 : h, min, 0);
  };

  // What does our reference UTC timestamp look like in the target timezone?
  const displayedInTzMs = parseFormatted(fmt.format(guessDate));
  // Shift by the difference so the target timezone shows the original input values.
  const deltaMs = assumedUtcMs - displayedInTzMs;
  return new Date(assumedUtcMs + deltaMs).toISOString();
}

/**
 * Extracts the local year/month/day/hours/minutes from a UTC ISO string
 * as they would appear in the given IANA timezone.
 */
export function fromUtcIso(
  isoString: string,
  ianaTimezone: string
): { year: number; month: number; day: number; hours: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ianaTimezone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(new Date(isoString));

  const get = (type: string) =>
    parseInt(parts.find((p) => p.type === type)?.value ?? "0", 10);

  const h = get("hour");
  return {
    year:    get("year"),
    month:   get("month") - 1, // 0-indexed for Date constructor
    day:     get("day"),
    hours:   h === 24 ? 0 : h,
    minutes: get("minute"),
  };
}

/**
 * Formats a UTC ISO string into a display date in the given IANA timezone.
 * Returns e.g. "April 12, 2026"
 */
export function formatEventDate(isoString: string, ianaTimezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: ianaTimezone,
  }).format(new Date(isoString));
}

/**
 * Formats a UTC ISO string into a display time with timezone abbreviation.
 * Returns e.g. "1:00 PM WAT"
 */
export function formatEventTime(isoString: string, ianaTimezone: string): string {
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: ianaTimezone,
  }).format(new Date(isoString));

  const abbr = TIMEZONE_MAP[ianaTimezone]?.abbr ?? "UTC";
  return `${time} ${abbr}`;
}

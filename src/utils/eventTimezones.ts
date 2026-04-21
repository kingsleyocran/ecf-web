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
 * Computes UTC ISO string from a local date interpreted in the given IANA timezone.
 * Uses Intl.DateTimeFormat to derive the offset — no extra packages required.
 */
export function toUtcIso(localDate: Date, ianaTimezone: string): string {
  // Format localDate as if it were in the target timezone, then compare to UTC
  const fmt = (tz: string) =>
    new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(localDate);

  const utcStr = fmt("UTC");
  const tzStr = fmt(ianaTimezone);

  // Parse both strings into ms since epoch
  const parseFormatted = (s: string) => {
    // "MM/DD/YYYY, HH:MM:SS" → Date
    const [datePart, timePart] = s.split(", ");
    const [month, day, year] = datePart.split("/").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);
    return Date.UTC(year, month - 1, day, hour === 24 ? 0 : hour, minute, second);
  };

  const offsetMs = parseFormatted(tzStr) - parseFormatted(utcStr);
  return new Date(localDate.getTime() - offsetMs).toISOString();
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

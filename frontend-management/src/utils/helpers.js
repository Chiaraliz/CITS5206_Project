import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns/esm";

// This function calculates the difference in days between two dates.
// It works for both Date objects and strings formatted as ISO date strings.
// The dates are parsed using the parseISO function to ensure correct formatting.
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

// This function formats a date to show the distance between the given date and the current date.
// It appends a suffix (e.g., 'ago') to indicate whether the date is in the past or future.
export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true, // Add 'ago' or 'in' based on the date difference
  })
    .replace("about ", "") // Removing unnecessary words
    .replace("in", "In"); // Consistent formatting for future dates

// This function returns today's date as an ISO string with the time set to the start or end of the day.
// If options.end is provided, the time is set to the last second of the day; otherwise, it defaults to the start of the day.
export const getToday = function (options = {}) {
  const today = new Date(); // Get the current date

  // Check if we need to set the time to the end of the day or the start
  if (options?.end) today.setUTCHours(23, 59, 59, 999); // Set to end of day
  else today.setUTCHours(0, 0, 0, 0); // Set to start of day
  return today.toISOString(); // Return ISO string representation of the date
};

// This function formats a number as a currency value in USD.
// It uses Intl.NumberFormat to handle the currency formatting based on locale and currency type.
export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

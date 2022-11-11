import { getDaysInMonth, getDay, format, isSameDay, isBefore, isAfter } from "date-fns";
import { Month, MonthDate } from "./types";
import { DISPLAY_DATA_EVERY_MONTH } from "./config";

/**
 *
 * @param month 1 ... 12
 * @param year 2022 e.g.
 * @returns days in month
 */
const getTotalDaysInMonth = (month: number, year: number) => {
  return getDaysInMonth(new Date(year, month - 1));
};

/**
 *
 * @param date the date time
 * @returns 0 | 1 | 2 | 3 | 4 | 5 | 6, the day of week, 0 represents Sunday
 */
export const getDayOfWeek = (date: Date) => {
  return getDay(date);
};

/**
 *
 * @param month 1 ... 12
 * @param year 2022 e.g.
 * @returns 0 | 1 | 2 | 3 | 4 | 5 | 6, the day of week, 0 represents Sunday
 */
const getDayOfWeekOfMonthFirstDay = (month: number, year: number) => {
  return getDay(new Date(year, month - 1, 1));
};

/**
 *
 * @param currentMonth 1 ... 12
 * @param currentYear 2022 e.g.
 * @returns previous month
 */
const getPreviousMonth = (currentMonth: number, currentYear: number) => {
  if (currentMonth === 1) {
    return {
      month: 12,
      year: currentYear - 1,
    };
  }

  return {
    month: currentMonth - 1,
    year: currentYear,
  };
};

/**
 *
 * @param currentMonth 1 ... 12
 * @param currentYear 2022 e.g.
 * @returns next month
 */
const getNextMonth = (currentMonth: number, currentYear: number) => {
  if (currentMonth === 12) {
    return {
      month: 1,
      year: currentYear + 1,
    };
  }

  return {
    month: currentMonth + 1,
    year: currentYear,
  };
};

/**
 *
 * @param month 1 ... 12
 * @param year 2022 e.g.
 * @returns month days
 */
const getMonthDays = (month: number, year: number) => {
  const result: MonthDate[] = [];

  const totalDaysInThisMonth = getTotalDaysInMonth(month, year);
  const dayOfWeekOfThisMonthFirstDay = getDayOfWeekOfMonthFirstDay(month, year);

  const nextMonth = getNextMonth(month, year);
  const previousMonth = getPreviousMonth(month, year);
  const totalDaysInPreviousMonth = getTotalDaysInMonth(previousMonth.month, previousMonth.year);

  // previous month overflow days
  for (let i = dayOfWeekOfThisMonthFirstDay - 1; i >= 0; i--) {
    result.push({
      date: new Date(previousMonth.year, previousMonth.month - 1, totalDaysInPreviousMonth - i),
      isCurrentMonth: false,
    });
  }

  // days of current month
  for (let i = 1; i <= totalDaysInThisMonth; i++) {
    result.push({
      date: new Date(year, month - 1, i),
      isCurrentMonth: true,
    });
  }

  // next month overflow days
  if (result.length < DISPLAY_DATA_EVERY_MONTH) {
    const count = DISPLAY_DATA_EVERY_MONTH - result.length;
    for (let i = 1; i <= count; i++) {
      result.push({
        date: new Date(nextMonth.year, nextMonth.month - 1, i),
        isCurrentMonth: false,
      });
    }
  }

  return result;
};

/**
 *
 * @param defaultDate the default date time
 * @param monthCount the month count
 * @returns calendar
 */
export const getCalendar = (defaultDate: Date, monthCount = 1) => {
  let lastYear = 0;
  let lastMonth = 0;
  const calendar: Month[] = [];

  for (let i = 0; i < monthCount; i++) {
    if (i === 0) {
      lastYear = defaultDate.getFullYear();
      lastMonth = defaultDate.getMonth() + 1;

      calendar.push({
        month: new Date(defaultDate.getFullYear(), defaultDate.getMonth()),
        dates: getMonthDays(defaultDate.getMonth() + 1, defaultDate.getFullYear()),
      });
    } else {
      const next = getNextMonth(lastMonth, lastYear);
      calendar.push({
        month: new Date(next.year, next.month - 1),
        dates: getMonthDays(next.month, next.year),
      });

      lastYear = next.year;
      lastMonth = next.month;
    }
  }

  return calendar;
};

/**
 *
 * @param date the date time
 * @returns 2020 e.g.
 */
export const getYear = (date: Date) => {
  return date.getFullYear();
};

/**
 *
 * @param date the date time
 * @returns 0 ... 11
 */
export const getMonth = (date: Date) => {
  return date.getMonth();
};

/**
 *
 * @param date the date time
 * @returns Jan, Feb, ..., Dec
 */
export const getMonthText = (date: Date) => {
  return format(date, "MMM");
};

/**
 *
 * @param date the date time
 * @returns 1, 2, ..., 31
 */
export const getDayText = (date: Date) => {
  return format(date, "d");
};

/**
 *
 * @param start the start time
 * @param end the end time
 * @param compare the compare time
 * @returns compare is between start and end or not
 */
export const isDayBetween = (start: Date | number, end: Date | number, compare: Date) => {
  if (isSameDay(start, compare) || isSameDay(end, compare)) {
    return true;
  }

  if (isBefore(start, compare) && isAfter(end, compare)) {
    return true;
  }

  return false;
};

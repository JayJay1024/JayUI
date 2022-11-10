import { isToday, isSameDay, subMonths, addMonths, format, isBefore, isAfter } from "date-fns";
import { useEffect, useState } from "react";
import { getCalendar, getDayText, getMonthText, getYear, isDayBetween } from "./utils";
import { Month, DayOfTheWeek } from "./types";
import { DEFAULT_FORMAT, DAY_OF_THE_WEEK } from "./config";

export interface CalendarProps {
  asFormat?: string;
  startDate?: Date | number | null;
  endDate?: Date | number | null;
  monthsToShow?: number;
  onChange?: (start: number, end: number | null) => void;
  onFormatedChange?: (start: string, end: string | null) => void;
}

export const Calendar = ({
  startDate,
  endDate,
  asFormat = DEFAULT_FORMAT,
  monthsToShow = 1,
  onChange = () => undefined,
  onFormatedChange = () => undefined,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [months, setMonths] = useState<Month[]>([]);

  const gotoNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const gotoPreviousMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const handleSelect = (date: Date) => {
    let start = new Date(date);
    let end: Date | null = null;

    if (!startDate && !endDate) {
      // nothing need to do
    } else if (startDate && !endDate) {
      start = new Date(startDate);
      end = new Date(date);
      if (isAfter(startDate, date)) {
        start = new Date(date);
        end = new Date(startDate);
      }
    } else if (!startDate && endDate) {
      start = new Date(date);
      end = new Date(endDate);
      if (isBefore(endDate, date)) {
        start = new Date(endDate);
        end = new Date(date);
      }
    } else if (startDate && endDate) {
      // reset
      start = new Date(date);
      end = null;
    }

    onChange(start.getTime(), end ? end.getTime() : null);
    onFormatedChange(format(start, asFormat), end ? format(end, asFormat) : null);
  };

  useEffect(() => {
    setMonths(getCalendar(currentDate, monthsToShow));
  }, [currentDate, monthsToShow]);

  return (
    <div>
      <div className="border rounded-lg">
        {months.map((month, index) => {
          return (
            <div key={index}>
              {/* header */}
              <div className="flex items-center justify-between">
                {index === 0 && (
                  <div>
                    <button
                      className="bg-transparent hover:border-transparent hover:opacity-80 focus:outline-none focus-visible:outline-none"
                      onClick={gotoPreviousMonth}
                    >
                      {"<-"}
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-center gap-2">
                  <span className="font-semibold">{getMonthText(month.month)}</span>
                  <span className="font-semibold">{getYear(month.month)}</span>
                </div>
                {index === months.length - 1 && (
                  <div>
                    <button
                      className="bg-transparent hover:border-transparent hover:opacity-80 focus:outline-none focus-visible:outline-none"
                      onClick={gotoNextMonth}
                    >
                      {"->"}
                    </button>
                  </div>
                )}
              </div>

              <div className="border-t p-2">
                {/* day of the week */}
                <div className="grid grid-cols-7 place-items-center place-content-between">
                  {DAY_OF_THE_WEEK.map((dayOfTheWeek, index) => (
                    <span key={index} className="font-medium">
                      {dayOfTheWeek}
                    </span>
                  ))}
                </div>

                {/* days */}
                <div className="flex flex-col gap-[2px]">
                  {month.dates.map((theWeek, index) => (
                    <div key={index} className="grid grid-cols-7 place-items-center place-content-between">
                      {theWeek.map((theDay, index) => {
                        const isSelectedStartDay = startDate ? isSameDay(startDate, theDay.date) : false;
                        const isSelectedEndDay = endDate ? isSameDay(endDate, theDay.date) : false;

                        const isLastDayOfWeek = index === DayOfTheWeek.Sat;
                        const isFirstDayOfWeek = index === DayOfTheWeek.Sun;

                        const isBetweentDay =
                          startDate && endDate ? isDayBetween(startDate, endDate, theDay.date) : false;

                        const todayClass = isToday(theDay.date) ? "border-white/50" : "";
                        const betweenDayClass = isBetweentDay ? "bg-blue-300" : "";

                        const lastDayOfWeekClass =
                          isLastDayOfWeek && isBetweentDay ? "rounded-tr-full rounded-br-full" : "";
                        const firstDayOfWeekClass =
                          isFirstDayOfWeek && isBetweentDay ? "rounded-tl-full rounded-bl-full" : "";

                        const selectedStartDayClass = isSelectedStartDay ? "rounded-tl-full rounded-bl-full" : "";
                        const selectedEndDayClass = isSelectedEndDay ? "rounded-tr-full rounded-br-full" : "";
                        const selectedDayClass = isSelectedStartDay || isSelectedEndDay ? "bg-blue-400" : "";

                        return (
                          <div
                            key={index}
                            className={`${betweenDayClass} ${lastDayOfWeekClass} ${firstDayOfWeekClass} ${selectedStartDayClass} ${selectedEndDayClass}`}
                          >
                            <div className="">
                              <button
                                onClick={() => handleSelect(theDay.date)}
                                disabled={!theDay.isCurrentMonth}
                                className={`flex items-center justify-center w-12 h-12 border rounded-full bg-transparent font-normal focus:outline-none focus-visible:outline-none ${
                                  theDay.isCurrentMonth ? "" : "text-zinc-500 hover:cursor-not-allowed"
                                } ${selectedDayClass} ${todayClass}`}
                              >
                                {getDayText(theDay.date)}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

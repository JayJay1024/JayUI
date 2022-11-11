export enum MonthEnum {
  Jan = 1,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sept,
  Oct,
  Nov,
  Dec,
}

export enum DayOfTheWeek {
  Sun = 0,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

export interface MonthDate {
  isCurrentMonth: boolean;
  date: Date;
}

export interface Month {
  month: Date;
  dates: MonthDate[];
}

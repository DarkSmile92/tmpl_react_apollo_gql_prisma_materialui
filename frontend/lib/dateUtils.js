import Moment from 'moment';
import { extendMoment } from 'moment-range';

Moment.locale('de');
const moment = extendMoment(Moment);

export const GetUnixTimestamp = () => +new Date();
export const UnixTimestampToDate = timestamp => new Date(timestamp);
export const capitalizeFirstLetter = string =>
  string[0].toUpperCase() + string.slice(1);
export const getMonthName = dt => {
  const mlist = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ];
  return mlist[dt.getMonth()];
};

export const getWeeksOfMonth = (year, month) => {
  const startDate = moment({ year, month });
  // Get the first and last day of the month
  const firstDay = moment(startDate).startOf('month');
  const endDay = moment(startDate).endOf('month');

  // Create a range for the month we can iterate through
  const monthRange = moment.range(firstDay, endDay);

  // Get all the weeks during the current month
  const weeks = [];
  const days = monthRange.by('days');
  for (const d of days) {
    if (weeks.indexOf(d.week()) < 0) {
      // dont add week 2019/1 to december 2018
      if (weeks.findIndex(w => w > d.week()) < 0) {
        weeks.push(d.week());
      }
    }
  }

  return weeks;
};

export const getWeeksOfDateRange = (
  startYear,
  startMonth,
  endYear,
  endMonth
) => {
  const startDate = moment({ year: startYear, month: startMonth });
  const endDate = moment({ year: endYear, month: endMonth });
  // Get the first and last day of the month
  const firstDay = moment(startDate).startOf('month');
  const endDay = moment(endDate).endOf('month');

  // Create a range for the month we can iterate through
  const monthRange = moment.range(firstDay, endDay);

  // Get all the weeks during the current month
  const weeks = [];
  const days = monthRange.by('days');
  for (const d of days) {
    if (weeks.indexOf(d.week()) < 0) {
      // dont add week 2019/1 to december 2018
      if (weeks.findIndex(w => w > d.week()) < 0) {
        weeks.push(d.week());
      }
    }
  }

  return weeks;
};

export const getWeekOfMonth = date => {
  let weekInYearIndex = date.week();
  if (date.year() !== date.weekYear()) {
    weekInYearIndex =
      date
        .clone()
        .subtract(1, 'week')
        .week() + 1;
  }
  const weekIndex =
    weekInYearIndex -
    moment(date)
      .startOf('month')
      .week() +
    1;
  return weekIndex;
};

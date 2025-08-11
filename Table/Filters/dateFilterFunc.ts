import dayjs from "dayjs";
import { FilterFn } from "@tanstack/react-table";

import isBetweenPlugin from "dayjs/plugin/isBetween";
dayjs.extend(isBetweenPlugin);
type RowData = Record<string, any>;

export const isDateWithinRange: FilterFn<RowData> = (row, id, filterValues) => {
  if (!filterValues) {
    return true;
  }

  const [valueFrom, valueTo] = Array.isArray(filterValues)
    ? filterValues
    : [filterValues];

  if (!valueFrom && !valueTo) {
    return true;
  }
  const dateValue = row.getValue(id) as dayjs.ConfigType; //get date in the row
  // Handle potential missing date values or invalid types
  if (!dateValue || !dayjs.isDayjs(dayjs(dateValue))) {
    return false;
  }

  const startDate = dayjs(valueFrom);
  const endDate = dayjs(valueTo);
  const parsedDate = dayjs(dateValue);

  if (valueFrom && valueTo) {
    return parsedDate.isBetween(startDate, endDate, "day", "[]");
  }

  return dayjs().isSame(startDate) || dayjs().isSame(endDate);
};

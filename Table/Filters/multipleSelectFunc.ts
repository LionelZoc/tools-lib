import { FilterFn } from "@tanstack/react-table";
import includes from "lodash/includes";
import isEmpty from "lodash/isEmpty";

type RowData = Record<string, any>;

/**
 * Custom filter function for multiple selection
 * @param row The row data object (user)
 * @param id The accessor key for the department field in the address object
 * @param filterValue The selected department (or null)
 */
export const multipleSelectFunc: FilterFn<RowData> = (row, id, filterValue) => {
  const rowValue = row.getValue(id);
  if (isEmpty(filterValue)) return true;
  return includes(filterValue, rowValue);
};

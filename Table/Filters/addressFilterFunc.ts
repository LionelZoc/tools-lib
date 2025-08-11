import { FilterFn } from "@tanstack/react-table";
import { get, isEmpty } from "lodash";

type RowData = Record<string, any>;

/**
 * Custom filter function for user departments. this one expect ad
 * this filter will look for the adress object in the row data and then for the postalCode
 *
 * i created this function because when you hide a column in react-table you can not filter it so i had to find a way to filter on the adress table
 * but without using the column id
 * @param row The row data object (user)
 * @param id The accessor key for the department field in the address object
 * @param filterValue The selected department (or null)
 */
export const filterAdressByDepartment: FilterFn<RowData> = (
  row,
  _,
  filterValue,
) => {
  const userDepartment = get(row.original, "addressZipCode", null);

  return checkUserDepartment({ filterValue, userDepartment });
};

/**
 * Custom filter function for user departments
 * @param row The row data object (user)
 * @param id The accessor key for the department field in the address object
 * @param filterValue The selected department (or null)
 */
export const filterByDepartment: FilterFn<RowData> = (row, id, filterValue) => {
  const userDepartment = row.getValue(id);

  return checkUserDepartment({ filterValue, userDepartment });
};

type checkUserDepartmentType = {
  filterValue: string[];
  userDepartment: unknown;
};
const checkUserDepartment = ({
  filterValue,
  userDepartment,
}: checkUserDepartmentType) => {
  if (isEmpty(filterValue)) {
    return true; // No filter applied, show all users
  }

  if (!userDepartment || typeof userDepartment !== "string") {
    return false; // Invalid user department or missing data
  }

  return filterValue.some((value) => userDepartment.startsWith(value));
};

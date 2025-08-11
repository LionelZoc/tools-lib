import { type Header, RowModel, flexRender } from "@tanstack/react-table";
import SelectFilter from "./SelectFilter";
import DateFilter from "./DateFilter";
import MultipleSelectFilter from "./MultipleSelectFilter";

export interface FilterProps {
  header: Header<any, unknown>;
  preFilteredRows?: RowModel<any>;
}
const RootFilter = ({ header, preFilteredRows }: FilterProps) => {
  const { filterVariant, filterOptions } = header.column.columnDef.meta ?? {};

  const filterTitle = flexRender(
    header.column.columnDef.header,
    header.getContext(),
  );
  switch (filterVariant) {
    case "multipleSelect":
      return (
        <MultipleSelectFilter
          id={header.id}
          filterTitle={filterTitle}
          preFilteredRows={preFilteredRows}
          filterOptions={filterOptions}
          filterValue={header.column.getFilterValue()}
          setFilterValue={header.column.setFilterValue}
        />
      );
    case "select":
      return (
        <SelectFilter
          id={header.id}
          filterTitle={filterTitle}
          preFilteredRows={preFilteredRows}
          filterOptions={filterOptions}
          filterValue={header.column.getFilterValue()}
          setFilterValue={header.column.setFilterValue}
        />
      );
    case "date":
      return (
        <DateFilter
          id={header.id}
          filterTitle={filterTitle}
          preFilteredRows={preFilteredRows}
          filterOptions={filterOptions}
          filterValue={header.column.getFilterValue()}
          setFilterValue={header.column.setFilterValue}
        />
      );
    default:
      break;
  }
  return null;
};
export default RootFilter;

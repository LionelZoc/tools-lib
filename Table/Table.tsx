import ExportButton, {
  exportFunc,
  FilterConfig,
} from "@/components/Admin/Table/Export/ExportButton";
import FiltersManager from "@/components/Admin/Table/Filters/FiltersManager";
import SearchFilter from "@/components/Admin/Table/Filters/SearchFilter";
import Header from "@/components/Admin/Table/Header/Header";
import Pagination, {
  PaginationInterface,
} from "@/components/Pagination/Pagination";
import {
  Box,
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getCoreRowModel as originalGetCoreRowModel,
  PaginationState,
  Row,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import {
  filterAdressByDepartment,
  filterByDepartment,
} from "./Filters/addressFilterFunc";
import { isDateWithinRange } from "./Filters/dateFilterFunc";
import { multipleSelectFunc } from "./Filters/multipleSelectFunc";
import ProgressIndicator from "./ProgressIndicator";

interface ColumnFilter {
  id: string;
  value: unknown;
}
type ColumnFiltersState = ColumnFilter[];
type TableProps<T> = {
  data: T[];
  columns?: ColumnDef<T, any>[];
  totalCount: number;
  filterEnabled?: boolean;
  exportEnabled?: boolean;
  exportLoading?: boolean;
  onExport?: exportFunc;
  globalSearchEnabled?: boolean;
  globalSearchPlaceholder?: string;
  onGlobalSearch?: (text: string) => void;
  tableCaption?: boolean;
  onRowClick?: (_: Row<T>) => void;
  clickableRow?: boolean;
  paginationProps?: PaginationInterface;
  loading?: boolean;
  onFilterChange?: (filters: FilterConfig[]) => void;
  defaultColumnVisibility?: VisibilityState;
};
//warning i will slightly change the design of the standard table to facilitate coding
const MyTable = <T,>({
  data,
  columns = [],
  totalCount = 0,
  filterEnabled = false,
  exportEnabled = false,
  globalSearchEnabled = false,
  globalSearchPlaceholder = "Rechercher",
  onExport = () => void 0,
  tableCaption = false,
  clickableRow = true,
  onRowClick = () => void 0,
  paginationProps,
  exportLoading,
  loading,
  onFilterChange,
  onGlobalSearch,
  defaultColumnVisibility = {},
}: TableProps<T>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    defaultColumnVisibility,
  ); //to implement column hidding later
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const handleOnFilterChange = () => {
    const allFilters: FilterConfig[] = [];

    columnFilters.forEach((item) => {
      allFilters.push({
        [item.id]: item.value,
      });
    });

    onFilterChange?.(allFilters);
  };

  const table = useReactTable({
    debugTable: true,
    columns,
    data,
    getCoreRowModel: originalGetCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: true,
    onPaginationChange: setPagination,
    rowCount: totalCount,
    state: {
      pagination,
      columnFilters,
      globalFilter,
      columnVisibility,
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    filterFns: {
      // add a custom global filter function
      isDateWithinRange,
      filterByDepartment,
      filterAdressByDepartment,
      multipleSelectFunc,
    },
  });
  const { getRowModel, getCoreRowModel } = table;

  const clickCallback = useCallback(
    (row: Row<T>) => {
      if (clickableRow) {
        return () => onRowClick(row);
      }
      return () => void 0;
    },
    [clickableRow],
  );

  // did not found a way to call onFilterChange without the useEffect
  useEffect(() => {
    handleOnFilterChange();

    return () => void 0;
  }, [columnFilters]);

  useEffect(() => {
    onGlobalSearch?.(globalFilter);
  }, [globalFilter, onGlobalSearch]);

  return (
    <Flex direction="column" flex={1}>
      <Flex direction="row" justifyContent="space-between">
        <Box>
          {globalSearchEnabled && (
            <SearchFilter
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder={globalSearchPlaceholder}
            />
          )}
        </Box>
        <ExportButton
          exportEnabled={exportEnabled}
          exportLoading={!!exportLoading}
          table={table}
          onExport={onExport}
        />
      </Flex>
      <Flex direction="row" flexDirection="row" mt={6}>
        <FiltersManager active={filterEnabled} table={table} />
      </Flex>

      <Flex direction="column" w="100%" py="3" overflowX="scroll">
        {loading ? <ProgressIndicator /> : null}

        <Table variant="striped">
          <Thead>
            <Header table={table} />
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => {
              //prepareRow(row);
              return (
                <Tr
                  key={row.id}
                  cursor={clickableRow ? "pointer" : "auto"}
                  onClick={clickCallback(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
          {tableCaption && (
            <TableCaption>
              visualisation de {getRowModel().rows.length} sur{" "}
              {getCoreRowModel().rows.length} entrées
            </TableCaption>
          )}
        </Table>

        {loading ? <ProgressIndicator /> : null}
      </Flex>

      {paginationProps && (
        <Flex py="4" justify="flex-end" align="center">
          <Pagination {...paginationProps} />
        </Flex>
      )}
    </Flex>
  );
};

export default MyTable;

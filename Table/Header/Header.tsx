import { Flex, Tr, Th } from "@chakra-ui/react";
import { type Table, flexRender } from "@tanstack/react-table";

export interface TableHeaderProps {
  table: Table<any>;
}

const TableHeader = ({ table }: TableHeaderProps) => {
  const { getHeaderGroups } = table;
  return (
    <>
      {getHeaderGroups().map((headerGroup) => (
        <Tr
          key={headerGroup.id}
          borderBottomColor="grey.500"
          borderBottomWidth={2}
          borderBottomStyle="solid"
        >
          {headerGroup.headers.map((header) => {
            return (
              <Th key={header.id} colSpan={header.colSpan}>
                <Flex
                  direction="row"
                  cursor={header.column.getCanSort() ? "pointer" : "none"}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}
                </Flex>
              </Th>
            );
          })}
        </Tr>
      ))}
    </>
  );
};

export default TableHeader;

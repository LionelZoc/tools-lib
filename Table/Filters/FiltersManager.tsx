import { Flex, Button } from "@chakra-ui/react";
import { Funnel } from "react-bootstrap-icons";
import { useState } from "react";
import { type Table } from "@tanstack/react-table";
import RootFilter from "./RootFilter";

export interface FilterProps {
  active: boolean;
  table: Table<any>;
}
const Filter = ({ active, table }: FilterProps) => {
  const [open, setOpen] = useState(false);

  if (!active || !table) return null;

  return (
    <Flex direction="column" alignItems="flex-start" gap={{ base: 5 }}>
      <Button
        leftIcon={<Funnel size={24} color="black.500" />}
        variant="outline"
        onClick={() => setOpen(!open)}
      >
        Filtre
      </Button>

      <Flex
        flexWrap="wrap"
        direction="row"
        visibility={open ? "visible" : "hidden"}
        gap={2}
      >
        {table.getHeaderGroups().map((headerGroup) => {
          return headerGroup.headers.map((header) => {
            if (
              header.column.getCanFilter()
              //selectedFilters.includes(column.id)
            ) {
              return (
                <RootFilter
                  header={header}
                  preFilteredRows={table.getPreFilteredRowModel()}
                />
              );
            }
            return null;
          });
        })}
      </Flex>
    </Flex>
  );
};

export default Filter;

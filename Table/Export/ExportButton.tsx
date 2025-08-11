import { Button, Text } from "@chakra-ui/react";
import { Download } from "react-bootstrap-icons";
import { type Table } from "@tanstack/react-table";
import { extractAppliedFiltersFromTable } from "@/utils/extractAppliedFiltersFromTable";

export type FilterConfig = {
  [key: string]: any;
};

export type exportFunc = (
  filters: FilterConfig[],
  globalFilterValue?: string,
) => void;

type ExportButtonType = {
  table: Table<any>;
  onExport: exportFunc;
  exportEnabled: boolean;
  exportLoading: boolean;
};

//generate export link that take into account filters
const ExportButton = ({
  table,
  onExport,
  exportEnabled,
  exportLoading,
}: ExportButtonType) => {
  if (!exportEnabled) return null;
  const allFilters = extractAppliedFiltersFromTable(table);

  const onClick = () => {
    onExport && onExport(allFilters, table.getState().globalFilter);
  };

  return (
    <Button
      variant="successSolid"
      isLoading={exportLoading}
      onClick={onClick}
      leftIcon={<Download size={20} color="white" />}
    >
      <Text variant="subtitle2" color="white">
        Exporter
      </Text>
    </Button>
  );
};

export default ExportButton;

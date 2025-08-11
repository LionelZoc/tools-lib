import { Flex, Select, Text, Box } from "@chakra-ui/react";

import { type Table } from "@tanstack/react-table";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

export interface FooterProps {
  table: Table<any>;
}

const Footer = ({ table }: FooterProps) => {
  const {
    previousPage,
    nextPage,
    getCanNextPage,
    getCanPreviousPage,
    getState,
    setPageSize,
    getPageCount,
  } = table;
  return (
    <Flex direction="row" justifyContent="flex-end" gap={2} w="full">
      <Flex direction="row" justifyContent="center" alignItems="center" gap={2}>
        <Text variant="chipText">Page</Text>
        <Text variant="textSide" textAlign="center" w="max-content">
          {` ${getState().pagination.pageIndex + 1} sur ${getPageCount()} `}
        </Text>
      </Flex>
      <Flex direction="row" gap={2} alignItems="center">
        <Box
          onClick={() => getCanPreviousPage() && previousPage()}
          cursor={getCanPreviousPage() ? "pointer" : "not-allowed"}
        >
          <ArrowLeft
            color={getCanPreviousPage() ? "black.500" : "grey.500"}
            size={24}
            title="Previous page"
          />
        </Box>
        <Box
          onClick={() => getCanNextPage() && nextPage()}
          cursor={getCanNextPage() ? "pointer" : "not-allowed"}
        >
          <ArrowRight
            color={getCanNextPage() ? "black.500" : "grey.500"}
            size={24}
            title="Next page"
          />
        </Box>
      </Flex>

      <Select
        value={getState().pagination.pageSize}
        onChange={(e) => setPageSize(parseInt(e.target.value, 10))}
        size="md"
        color="black.500"
        w={24}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </Select>
    </Flex>
  );
};

export default Footer;

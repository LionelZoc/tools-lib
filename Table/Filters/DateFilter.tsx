import { useRef, useState } from "react";

import { OptionType } from "@/components/inputs/Dropdown";
import {
  Box,
  Flex,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import FilterActionDisplay from "./FilterActionDisplay";

import { type Updater, RowModel } from "@tanstack/react-table";
import dayjs from "dayjs";

import DateRangePicker, {
  DateValueProp,
} from "@/components/DateRangePicker/DateRangePicker";
import { useCustomUiDisclosure } from "@/hooks/useCustomUiDisclosure";

type ValuePiece = Date | null;

export type DateValue = ValuePiece | [ValuePiece, ValuePiece];

type DateFilterType = {
  id: string;
  filterTitle: React.ReactNode | JSX.Element;
  filterValue: unknown;
  filterOptions?: OptionType[];
  setFilterValue: (updater: Updater<any>) => void;
  preFilteredRows?: RowModel<any>;
};

/**
 * takes a range and return the string format
 * @param value
 * @returns
 */
const formatDateRange = (value: DateValue): string => {
  if (!value) {
    return "";
  }

  const [valueFrom, valueTo] = Array.isArray(value) ? value : [value];

  if (!valueFrom && !valueTo) {
    return "";
  }

  if (valueFrom && valueTo) {
    return `${dayjs(valueFrom).format("DD/MM/YYYY")} - ${dayjs(valueTo).format(
      "DD/MM/YYYY",
    )}`;
  }

  return valueFrom
    ? dayjs(valueFrom).format("DD/MM/YYYY")
    : valueTo
      ? dayjs(valueTo).format("DD/MM/YYYY")
      : "";
};

const DateFilter = ({
  id,
  filterTitle,
  setFilterValue = () => void 0,
}: DateFilterType) => {
  const ref = useRef<HTMLElement>(null);

  const { isOpen, onOpen, onClose } = useCustomUiDisclosure(ref);

  const [dateRange, setDateRange] = useState<DateValueProp>([null, null]);
  const hasValue = Array.isArray(dateRange)
    ? !!dateRange[0] || !!dateRange[1]
    : !!dateRange;

  const onFilterChange = (value: DateValue) => {
    setDateRange(value);
    setFilterValue(value);
  };
  const handleClose = () => {
    onClose();
  };

  const handleClick = () => {
    if (isOpen) {
      handleClose();
      return;
    }

    onOpen();
  };

  const handleClear = () => {
    setDateRange([null, null]);
    setFilterValue(null);
  };

  return (
    <Flex
      id={`filter_${id}`}
      direction="row"
      boxShadow="shadowCard08"
      display="contents"
      zIndex={isOpen ? "popover" : "inherit"}
      borderRadius="radius2"
    >
      <Popover
        isOpen={isOpen}
        onClose={() => handleClose()}
        placement="auto-start"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Box>
            <FilterActionDisplay
              onClick={handleClick}
              title={filterTitle}
              valueText={formatDateRange(dateRange)}
              onClear={handleClear}
              filterHasValue={hasValue}
            />
          </Box>
        </PopoverTrigger>
        <PopoverContent ref={ref} zIndex="docked" boxShadow="md">
          <PopoverArrow />
          <DateRangePicker onChange={onFilterChange} isOpen value={dateRange} />
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default DateFilter;

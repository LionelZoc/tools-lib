import Dropdown, {
  isSelectValue,
  OptionType,
  selectionType,
} from "@/components/inputs/Dropdown";
import { Flex } from "@chakra-ui/react";
import { type Updater, RowModel } from "@tanstack/react-table";
import { isEmpty } from "lodash";
import { useEffect, useMemo, useState } from "react";
import FilterActionDisplay from "./FilterActionDisplay";

interface SelectFilterInterface {
  id: string;
  filterTitle: React.ReactNode | JSX.Element;
  filterValue: unknown;
  filterOptions?: OptionType[];
  setFilterValue: (updater: Updater<any>) => void;
  preFilteredRows?: RowModel<any>;
}

const SelectFilter = ({
  id,
  filterTitle,
  filterValue,
  filterOptions = [],
  //preFilteredRows = [],
  setFilterValue = () => void 0,
}: SelectFilterInterface) => {
  const [selectedOption, setSelectedOption] = useState<selectionType>();
  const [filteValueTitle, setFilterValueTitle] = useState<string>("");

  const options: OptionType[] = useMemo(() => {
    const options = [];
    options.push({ hash: "", title: "Tout" });
    if (!isEmpty(filterOptions)) return filterOptions;
    return options;
  }, [filterOptions]);

  //il y a un soucis à gérer sur le clear. normalement il doit impacter le state du selectFilter
  useEffect(() => {
    if (selectedOption) {
      if (isSelectValue(selectedOption)) {
        setFilterValue(selectedOption.value);
      }
    }
  }, [selectedOption]);

  useEffect(() => {
    const elems = options.filter((val) => val.hash === filterValue);
    if (elems.length) {
      setFilterValueTitle(elems[0].title);
    } else {
      setFilterValueTitle("");
    }
  }, [filterValue, options]);

  return (
    <Flex>
      <Dropdown
        id={id}
        options={options}
        defaultSelectedOptions={[]}
        onSelectedOptionChange={setSelectedOption}
        ActionComponent={FilterActionDisplay}
        multiple={false}
        moreActionComponentProp={{
          title: filterTitle,
          valueText: filteValueTitle,
        }}
        placement="auto-start"
      />
    </Flex>
  );
};

export default SelectFilter;

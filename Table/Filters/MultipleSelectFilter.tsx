import Dropdown, {
  isSelectValue,
  OptionType,
  selectionType,
} from "@/components/inputs/Dropdown";
import { Flex } from "@chakra-ui/react";
import { type Updater, RowModel } from "@tanstack/react-table";
import { includes, isEmpty } from "lodash";
import { useEffect, useMemo, useState } from "react";
import FilterActionDisplay from "./FilterActionDisplay";

interface MultipleSelectFilterInterface {
  id: string;
  filterTitle: React.ReactNode | JSX.Element;
  filterValue: unknown;
  filterOptions?: OptionType[];
  setFilterValue: (updater: Updater<any>) => void;
  preFilteredRows?: RowModel<any>;
}

const MultipleSelectFilter = ({
  id,
  filterTitle,
  filterValue,
  filterOptions = [],
  //preFilteredRows = [],
  setFilterValue = () => void 0,
}: MultipleSelectFilterInterface) => {
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
      } else {
        setFilterValue(selectedOption.list);
      }
    }
  }, [selectedOption]);

  useEffect(() => {
    // @ts-ignore
    const elems = options.filter((val) => includes(filterValue, val.hash));
    if (elems.length) {
      setFilterValueTitle(elems.map((el) => el.title)?.join(" ou "));
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
        multiple={true}
        moreActionComponentProp={{
          title: filterTitle,
          valueText: filteValueTitle,
        }}
        placement="auto-start"
      />
    </Flex>
  );
};

export default MultipleSelectFilter;

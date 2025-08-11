import { useState, useEffect } from "react";
import {
  Input,
  InputProps,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { Search } from "react-bootstrap-icons";

type SearchFilterType = {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputProps, "onChange">;

const SearchFilter = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: SearchFilterType) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [value, debounce]);

  return (
    <InputGroup backgroundColor="white">
      <InputLeftElement pointerEvents="none">
        <Search color="gray.300" size={12} />
      </InputLeftElement>

      <Input
        variant="outline"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    </InputGroup>
  );
};

export default SearchFilter;

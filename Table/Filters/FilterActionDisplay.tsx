import Icon from "@/components/inputs/IconWrapper";
import { Flex, Text, Tooltip } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { X } from "react-bootstrap-icons";

interface DropdownTriggerInterface {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClear?: (_: any) => void;
  selectedOptions?: string[];
  title?: React.ReactNode | JSX.Element;
  valueText?: string;
  filterHasValue?: boolean;
}

const FilterActionDisplay = ({
  onClick,
  onClear,
  selectedOptions, // to deprecated
  filterHasValue,
  title = "titre",
  valueText = "",
}: DropdownTriggerInterface) => {
  const onReset = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClear && onClear(e);
  };

  return (
    <Flex
      w="max-content"
      backgroundColor="greylight.300"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      gap={2.5}
      py={1}
      px={4}
      borderRadius={1.5}
      borderWidth="0.0625rem"
      borderStyle="solid"
      borderColor="greylight.500"
      onClick={onClick}
      boxShadow="shadowCard06"
      cursor="pointer"
    >
      <Text color="grey.500" variant="chipText">
        {title}
      </Text>
      <Text color="primary.500" variant="chipText" maxW={{ md: "3xl" }}>
        {valueText}
      </Text>
      {(!isEmpty(selectedOptions) || filterHasValue) && (
        <Tooltip
          hasArrow
          placement="top"
          label="reinitialiser"
          aria-label="reinitialiser"
        >
          <Icon
            IconComponent={<X size={24} color="black.500" />}
            onClick={onReset}
            containerStyle={{
              ml: 1,
              zIndex: "docked",
            }}
          />
        </Tooltip>
      )}
    </Flex>
  );
};

export default FilterActionDisplay;

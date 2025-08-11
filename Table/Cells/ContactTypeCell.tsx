import { Flex } from "@chakra-ui/react";
import { type UserType } from "@/types";
import Chip from "@/components/Display/Chip";

//typing could be harmonised later
export interface ContactTypeCellProps {
  type: UserType | string;
}

const ContactTypeCell = ({ type }: ContactTypeCellProps) => {
  return (
    <Flex direction="row" justifyContent="center" w="full">
      <Chip label={type} />
    </Flex>
  );
};

export default ContactTypeCell;

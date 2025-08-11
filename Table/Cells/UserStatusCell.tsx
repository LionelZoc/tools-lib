import { Flex, Box } from "@chakra-ui/react";
import { type UserStatusType } from "@/types";
import DangerChip from "@/components/Display/DangerChip";
import ActiveChip from "@/components/Display/ActiveChip";

//typing could be harmonised later
export interface UserStatusCelllProps {
  status: UserStatusType | string;
}

const UserStatusCell = ({ status }: UserStatusCelllProps) => {
  if (!status || !["active", "inactive"].includes(status)) {
    return (
      <Flex direction="row" justifyContent="center" w="full">
        <Box w={2.5} h={0.5} bg="divider.500" flexShrink={0} />
      </Flex>
    );
  }

  return (
    <Flex direction="row" justifyContent="center" w="full">
      {status === "active" ? <ActiveChip /> : <DangerChip />}
    </Flex>
  );
};

export default UserStatusCell;

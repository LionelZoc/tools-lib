import { Flex, Text } from "@chakra-ui/react";
import { type QualificationType } from "@/types";

export interface QualificationCellProps {
  type: QualificationType | string | null;
}

const QualificationCell = ({ type }: QualificationCellProps) => {
  return (
    <Flex direction="row" justifyContent="center" w="full">
      <Text
        variant="textSide"
        textAlign="center"
        color={type === "Nouveau" ? "primary.500" : "secondary.500"}
      >
        {type}
      </Text>
    </Flex>
  );
};

export default QualificationCell;

import { Progress } from "@chakra-ui/react";

const ProgressIndicator = () => {
  return (
    <Progress
      h="0.25rem"
      minW="full"
      colorScheme="secondary"
      bgColor="secondary.50"
      size="xs"
      isIndeterminate
    />
  );
};

export default ProgressIndicator;

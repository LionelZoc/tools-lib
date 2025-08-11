import { Box } from "@chakra-ui/react";
import { StoryObj, Meta } from "@storybook/react";

import Component from "./FiltersManager";

const meta: Meta<typeof Component> = {
  title: "components/Admin/Table/FiltersManager",
  component: Component,
  decorators: [
    (Story) => (
      <Box w="full" h="auto" bg="white">
        <Story />
      </Box>
    ),
  ],
} as Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof Component>;

export const Filter: Story = {
  args: {
    active: true,
  },
};

import { Box } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import Component, { User } from "./DashboardTable";

const generateUsers = (numUsers: number): User[] => {
  return Array.from({ length: numUsers }, () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number(),
    date: faker.date.past().toISOString().split("T")[0], // Format date as YYYY-MM-DD
    email: faker.internet.email(),
    type: faker.helpers.arrayElement(["estimation", "contact", "investor"]),
    status: faker.helpers.arrayElement(["active", "pending", "inactive"]),
    typeOfHome: faker.helpers.arrayElement(["Apartment", "House", "Condo"]),
    qualification: faker.helpers.arrayElement([
      "Qualified",
      "Pending",
      "Not Qualified",
    ]),
    home: {},
  }));
};

const meta: Meta<typeof Component> = {
  title: "components/Admin/Table/DashboardTable",
  component: Component,
  decorators: [
    (Story) => (
      <Box w="full" h="auto" bg="greylight.500">
        <Story />
      </Box>
    ),
  ],
} as Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof Component>;

export const DashboardTable: Story = {
  args: {
    data: generateUsers(100),
    totalCount: 100,
  },
};

import { Box } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { createColumnHelper } from "@tanstack/react-table";

import Component from "./Table";

// Define your row shape
export type User = {
  firstName: string;
  lastName: string;
  phone: string;
  date: string; // Assuming date is a string for simplicity
  email: string;
  type: string;
  status: string;
};
const columnHelper = createColumnHelper<User>();
// Make some columns!
const defaultColumns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    //footer: info => info.column.id,
  }),
  columnHelper.accessor("date", {
    header: () => "Date",
    cell: (info) => info.renderValue(),
    //footer: info => info.column.id,
  }),
  columnHelper.accessor("email", {
    header: () => <span>Email</span>,
    cell: (info) => info.renderValue(),
    //footer: info => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.renderValue(),
    //footer: info => info.column.id,
  }),
  columnHelper.accessor("type", {
    header: "Type de contact",
    cell: (info) => <i>{info.getValue()}</i>,
  }),
];

const generateUsers = (numUsers: number): User[] => {
  return Array.from({ length: numUsers }, () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number(),
    date: faker.date.past().toISOString().split("T")[0], // Format date as YYYY-MM-DD
    email: faker.internet.email(),
    type: faker.helpers.arrayElement(["Homeowner", "Investor", "Contact"]),
    status: faker.helpers.arrayElement(["Active", "Pending", "Inactive"]),
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
  title: "components/Admin/Table/Default",
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

export const Table: Story = {
  args: {
    data: generateUsers(100),
    /* @ts-ignore */
    columns: defaultColumns,
    totalCount: 100,
  },
};

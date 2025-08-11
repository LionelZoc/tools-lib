import { Box } from "@chakra-ui/react";
import { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

import Component, { Estimation } from "./EstimationsTable";
import { AssetType } from "@/types/enums/estimationValueType";

const generateUsers = (numUsers: number): Estimation[] => {
  return Array.from({ length: numUsers }, () => {
    const postCode = faker.location.zipCode("#####");
    return {
      firstName: faker.person.firstName(),
      date: faker.date.past().toISOString().split("T")[0], // Format date as YYYY-MM-DD
      type: faker.helpers.arrayElement([
        AssetType.OFFICE_BUILDING,
        AssetType.RESIDENTIAL_BUILDING,
        AssetType.HOTEL,
        AssetType.FACTORY_WASTELAND,
        AssetType.COMMERCIAL_PREMISES,
        AssetType.HOUSE_OR_BARE_LAND,
      ]),
      adresse: {
        ville: faker.location.city(),
        codePostal: postCode,
        adresse: `${faker.location.streetAddress()} ${postCode}`,
      },
      accountStatus: faker.helpers.arrayElement([
        "active",
        "pending",
        "inactive",
      ]),
      inscription: faker.datatype.boolean(),
      consultation: faker.datatype.boolean(),
      qualification: faker.helpers.arrayElement([
        "Nouveau",
        "LeadMort",
        "Injoignable",
        "Contacté",
      ]),
    };
  });
};

const meta: Meta<typeof Component> = {
  title: "components/Admin/Table/EstimationTable",
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

export const EstimationTable: Story = {
  args: {
    data: generateUsers(100),
    totalCount: 100,
    onExport: (elem) => {
      // eslint-disable-next-line
      console.log(elem);
    },
  },
};

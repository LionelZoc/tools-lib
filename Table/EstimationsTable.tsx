import { createColumnHelper, Row } from "@tanstack/react-table";
import Table from "./Table";
import UserStatusCell from "./Cells/UserStatusCell";
import QualificationCell from "./Cells/QualificationCell";
import { exportFunc } from "@/components/Admin/Table/Export/ExportButton";
import { frenchDepartments } from "@/constants/address";
import { AssetType } from "@/types/enums/estimationValueType";

//Todo adapt to our user typing
export type Estimation = {
  firstName: string;
  date: string; // Assuming date is a string for simplicity
  type: string;
  adresse: {
    ville: string;
    codePostal: string;
    adresse: string;
  };
  accountStatus: string;
  inscription: boolean;
  consultation: boolean;
  qualification: string;
};

export const typeFilterList = [
  {
    title: AssetType.RESIDENTIAL_BUILDING,
    hash: AssetType.RESIDENTIAL_BUILDING,
  },
  {
    title: AssetType.OFFICE_BUILDING,
    hash: AssetType.OFFICE_BUILDING,
  },
  {
    title: AssetType.FACTORY_WASTELAND,
    hash: AssetType.FACTORY_WASTELAND,
  },
  {
    title: AssetType.HOTEL,
    hash: AssetType.HOTEL,
  },
  {
    title: AssetType.HOUSE_OR_BARE_LAND,
    hash: AssetType.HOUSE_OR_BARE_LAND,
  },
  {
    title: AssetType.COMMERCIAL_PREMISES,
    hash: AssetType.COMMERCIAL_PREMISES,
  },
  {
    title: AssetType.BUSINESS_OR_LOGISTICS_PREMISES,
    hash: AssetType.BUSINESS_OR_LOGISTICS_PREMISES,
  },
];

//todo import externals filters
const columnHelper = createColumnHelper<Estimation>();
//export column definition for each type
//: ColumnDef<Estimation, string>[]
export const DashboardColumns = [
  columnHelper.accessor("date", {
    header: () => "Date",
    cell: (info) => info.renderValue(),
    enableHiding: false,
    enableGlobalFilter: false,
    filterFn: "isDateWithinRange",
    meta: {
      filterVariant: "date",
    },
    //footer: info => info.column.id,
  }),
  columnHelper.accessor("firstName", {
    header: "Nom",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    enableHiding: false,
    filterFn: "includesString",
    enableGlobalFilter: true,
  }),
  columnHelper.accessor((row) => row.type, {
    id: "type",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Type de bien</span>,
    enableHiding: false,
    enableGlobalFilter: false,
    filterFn: "multipleSelectFunc",
    meta: {
      filterVariant: "multipleSelect",
      filterOptions: typeFilterList,
    },
  }),

  columnHelper.accessor("adresse.adresse", {
    header: () => <span>Adresse du bien</span>,
    cell: (info) => info.renderValue(),
    enableHiding: false,
    enableGlobalFilter: false,
    filterFn: "filterByDepartment",
    meta: {
      filterVariant: "select",
      filterOptions: frenchDepartments.map((dep) => ({
        title: `${dep.code} - ${dep.name}`,
        hash: dep.code,
        type: "text",
      })),
    },
  }),
  columnHelper.accessor("consultation", {
    header: "Consultation",
    cell: (info) => (info.getValue() ? "Oui" : "Non"), //can be put in a cell
    footer: (info) => info.column.id,
    enableHiding: false,
    filterFn: "includesString",
    enableGlobalFilter: false,
    meta: { filterVariant: "select" }, //important de specifier le variant de filtre qu'on veut
  }),
  columnHelper.accessor("inscription", {
    header: "Inscription",
    cell: (info) => (info.renderValue() ? "Oui" : "Non"),
    enableHiding: false,
    enableGlobalFilter: false,
  }),
  columnHelper.accessor("accountStatus", {
    header: "Compte",
    cell: (info) => <UserStatusCell status={info.renderValue()} />,
    enableHiding: false,
    filterFn: "equalsString",
    enableGlobalFilter: false,
    meta: {
      filterVariant: "select",
      filterOptions: [
        //c'est optionnel mais si on connait déjà les valeurs ça optimise le composant
        {
          title: "Actif",
          hash: "active",
          type: "text",
        },
        {
          title: "Inactif",
          hash: "inactive",
          type: "text",
        },
      ],
    },
  }),
  columnHelper.accessor("qualification", {
    header: "Qualification",
    cell: (info) => <QualificationCell type={info.renderValue()} />,
    enableHiding: false,
    enableGlobalFilter: false,
    //add custom filtering
  }),
];

type EstimationTableProps = {
  data: Estimation[];
  totalCount?: number;
  onExport: exportFunc;
};

//totalCount: should be the total count of users from the database

const EstimationTable = ({
  data = [],
  totalCount = 0,
  onExport = () => void 0,
}: EstimationTableProps) => {
  const onRowClick = (_row: Row<Estimation>) => {};
  return (
    <Table
      data={data}
      columns={DashboardColumns}
      totalCount={totalCount ?? data.length}
      filterEnabled
      exportEnabled
      onExport={onExport}
      globalSearchEnabled
      clickableRow
      onRowClick={onRowClick}
    />
  );
};

export default EstimationTable;

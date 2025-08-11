import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import Table from "./Table";
import ContactTypeCell from "./Cells/ContactTypeCell";
import UserStatusCell from "./Cells/UserStatusCell";

//Todo adapt to our user typing
export type User = {
  firstName: string;
  lastName: string;
  phone: string;
  date: string; // Assuming date is a string for simplicity
  email: string;
  type: string;
  status: string;
};

//todo import externals filters
const columnHelper = createColumnHelper<User>();
//export column definition for each type
export const DashboardColumns: ColumnDef<User, string>[] = [
  columnHelper.accessor("date", {
    header: () => "Date",
    cell: (info) => info.renderValue(),
    enableHiding: false,
    //footer: info => info.column.id,
  }),
  columnHelper.accessor("firstName", {
    header: "Nom",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    enableHiding: false,
    filterFn: "includesString",
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Prénom</span>,
    enableHiding: false,
    filterFn: "includesString",
    //footer: info => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "phone",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Téléphone</span>,
    enableHiding: false,
    filterFn: "includesString",
    //footer: info => info.column.id,
  }),

  columnHelper.accessor("email", {
    header: () => <span>Email</span>,
    cell: (info) => info.renderValue(),
    enableHiding: false,
    filterFn: "includesString",
    //footer: info => info.column.id,
  }),
  columnHelper.accessor("type", {
    header: "Type de contact",
    cell: (info) => <ContactTypeCell type={info.getValue()} />,
    footer: (info) => info.column.id,
    enableHiding: false,
  }),
  columnHelper.accessor("status", {
    header: "Status client",
    cell: (info) => <UserStatusCell status={info.renderValue()} />,
    enableHiding: false,
    //add custom filtering
    //footer: info => info.column.id,
  }),
];

type DashboardTableProps = { data: User[]; totalCount?: number };

//totalCount: should be the total count of users from the database

const DashboardTable = ({ data = [], totalCount }: DashboardTableProps) => {
  return (
    <Table
      data={data}
      columns={DashboardColumns}
      totalCount={totalCount ?? data.length}
    />
  );
};

export default DashboardTable;

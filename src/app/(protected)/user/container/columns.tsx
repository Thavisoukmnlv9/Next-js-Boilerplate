import { Badge, Checkbox } from "../../../ui/elements";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from '../../../ui/components/table/data-table-column-header';
import { DataTableRowActions } from '../../../ui/components/table/data-table-row-actions';
import { cn } from "@app/ui/lib/utils";

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]
type RoleLabels = {
  staff: string;
  admin: string;
};
interface User {
  id: number;
  tel: string;
  email: string | null;
  password: string;
  role: RoleLabels;
  fullName: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  index: number;
}

const roleLabels: RoleLabels = {
  staff: 'ພະນັກງານ',
  admin: 'ແອັດມິນ',
};

const getRoleLabel = (role: keyof RoleLabels | string) => {
  console.log("role", role);
  const result = roleLabels[role as keyof RoleLabels]
  return <Badge variant="outline">{result}</Badge>
};

const getStatus = (status: string) => {
  const label = status ? "ເປິດໃຊ້ງານ" : "ປິດໃຊ້ງານ";
  return <Badge variant="outline" className={cn("capitalize", status === "active" ? "bg-red-500" : " bg-green-500")}>{label}</Badge>
};

export const columns: Array<ColumnDef<User>> = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => { table.toggleAllPageRowsSelected(!!value); }}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => { row.toggleSelected(!!value); }}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullName",
    header: "ຊື່ຜູ້ໃຊ້ງານ",
    cell: ({ row }) => <span>{row.original.fullName}</span>,
  },
  {
    accessorKey: "tel",
    header: "ເບີໂທລະສັບ",
    cell: ({ row }) => <span>{`+856 20${row.original.tel}`}</span>,
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ສີດໃຊ້ງານ' />
    ),
    cell: ({ row }) => {
      const role = row.getValue('role') ?? ''
      return (
        <div className='flex space-x-2'>
          {getRoleLabel(role as keyof RoleLabels)}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "ສະຖານະ",
    cell: ({ row }) => {
      const status = row.getValue('status') ?? ''
      return (
        <> {getStatus(status as string)}</>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.original.email || "-"}</span>,
  },
  {
    accessorKey: "id",
    header: "actions",
    cell: ({ row: { original: row } }) => {
      const rwoId = row.id
      return <DataTableRowActions rowId={rwoId} />;
    },
  }
];


import { Badge, Checkbox } from '@/shadcn/elements';
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

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

export const columns: Array<ColumnDef<any>> = [
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
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='role' />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)
      return (
        <div className='flex space-x-2'>
          {label && <Badge variant='outline'>{label.label}</Badge>}
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('role')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => <span>{row.original.fullName}</span>,
  },
  {
    accessorKey: "fullName",
    header: "fullName",
    cell: ({ row }) => <span>{row.original.role}</span>,
  },
  {
    accessorKey: "tel",
    header: "Phone Number",
    cell: ({ row }) => <span>{row.original.tel}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.original.email || "N/A"}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`font-semibold ${row.original.status ? "text-green-600" : "text-red-600"}`}
      >
        {row.original.status ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
    ),
  },
  {
    accessorKey: "actions",
    header: "Updated At",
    cell: ({ row }) => (
      <span>{new Date(row.original.updatedAt).toLocaleDateString()}</span>
    ),
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

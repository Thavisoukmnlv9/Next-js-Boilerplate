import { ArrowDownIcon, CheckCircledIcon, CircleIcon, Cross2Icon, CrossCircledIcon, QuestionMarkCircledIcon, StopwatchIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

// import { Button } from '@/components/custom/button'
import { Input, Button } from  "../../elements";
import { DataTableViewOptions } from "./data-table-view-options";

// import { priorities, statuses } from '../data/data'
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
export const statuses = [
  {
    value: 'Active',
    label: 'Active',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: CircleIcon,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: StopwatchIcon,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircledIcon,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CrossCircledIcon,
  },
]
export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  }]
interface DataTableToolbarProps<TData> {
  setSearch?: (search: string) => void;
  search?: string;
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
  setSearch,
  search,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="ຄົ້ນຫາ..."
          value={search}
          onChange={(e) => setSearch?.(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <div className='flex gap-x-2'>
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title='Status'
              options={statuses}
            />
          )}
          {table.getColumn('role') && (
            <DataTableFacetedFilter
              column={table.getColumn('role')}
              title='role'
              options={priorities}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

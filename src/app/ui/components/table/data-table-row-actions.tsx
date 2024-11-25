"use client";  // Add this directive to indicate this is a client-side component

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Button } from "../../containers/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../elements";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
 
interface DataTableRowActionsProps {
  rowId: number;
  resource?: string
}

export function DataTableRowActions({
  rowId,
  resource,
}: DataTableRowActionsProps) {
  const router = useRouter();
  const pathname = usePathname()
  const handleEdit = () => {
    router.push(`/${resource ? resource : pathname}/edit/${rowId}`);

  };
  const handleDelete = () => {
    console.log(`Deleting row with ID: ${rowId}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

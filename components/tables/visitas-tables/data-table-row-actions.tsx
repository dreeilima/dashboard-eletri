'use client';
import * as React from 'react';
import { TrashIcon } from 'lucide-react';
import { EditIcon } from 'lucide-react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { condutorSchema } from '@/components/data/schema';
import { UpdateCondutorSheet } from './update-task-sheet';
import { DeleteTasksDialog } from './delete-tasks-dialog';
import { useState } from 'react';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {
  const condutor = condutorSchema.parse(row.original);
  const [showUpdateTaskSheet, setShowUpdateTaskSheet] = useState(false);
  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false);

  return (
    <>
      <UpdateCondutorSheet
        condutor={condutor}
        open={showUpdateTaskSheet}
        onOpenChange={setShowUpdateTaskSheet}
        onUpdate={() => row.toggleSelected(false)}
      />
      <DeleteTasksDialog
        open={showDeleteTaskDialog}
        onOpenChange={setShowDeleteTaskDialog}
        condutor={[condutor]}
        showTrigger={false}
        onSuccess={() => row.toggleSelected(false)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={() => setShowUpdateTaskSheet(true)}>
            Editar
            <DropdownMenuShortcut>
              <EditIcon className="ml-2 h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteTaskDialog(true)}
            className="text-red-500"
          >
            Deletar
            <DropdownMenuShortcut>
              <TrashIcon className="ml-2 h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

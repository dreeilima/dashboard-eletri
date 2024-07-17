import { Condu } from '@/components/data/schema';
import { Table } from '@tanstack/react-table';
import { DeleteTasksDialog } from '@/components/tables/visitas-tables/delete-tasks-dialog';

interface TasksTableToolbarActionsProps {
  table: Table<Condu>;
}

export function TasksTableToolbarActions({
  table
}: TasksTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteTasksDialog
          condutor={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
    </div>
  );
}

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/tables/visitas-tables/data-table-view-options';
import { categorias, statusteste } from '@/constants/data';
import { DataTableFacetedFilter } from '@/components/data-tables/data-table-faceted-filter';
import { TasksTableToolbarActions } from '@/components/data-tables/tasks-table-toolbar-actions';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import { CreateTaskDialog } from '@/components/tables/visitas-tables/create-condutor-dialog';
import { ExportToExcel } from '@/components/utils/exporttoexcel';
import { cn } from '@/lib/utils';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const [filteredData, setFilteredData] = useState<TData[]>([]);
  const isFiltered = filteredData.length > 0;

  const handleDateFilter = (from: Date, to: Date) => {};

  const handleResetFilters = () => {
    setFilteredData([]);
  };

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between space-x-2 overflow-auto p-1'
      )}
      {...table}
    >
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Pesquisar por nome..."
          value={(table.getColumn('conNome')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('conNome')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('conStatus') && (
          <DataTableFacetedFilter
            column={table.getColumn('conStatus')}
            title="Status"
            options={statusteste as any}
          />
        )}
        {table.getColumn('habilitacaoCategoria') && (
          <DataTableFacetedFilter
            column={table.getColumn('habilitacaoCategoria')}
            title="Categoria"
            options={categorias}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetFilters}
            className="h-8 px-2 lg:px-3"
          >
            Resetar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <TasksTableToolbarActions table={table as any} />
        <CalendarDateRangePicker />
        <CreateTaskDialog />
        <ExportToExcel table={table as any} />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

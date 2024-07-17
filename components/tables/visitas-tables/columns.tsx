'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { Condu } from '../../data/schema';
import { DataTableColumnHeader } from '@/components/data-tables/data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { format } from 'date-fns';

export const columns: ColumnDef<Condu>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'conId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),

    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'conNome',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[200px] truncate text-sm capitalize">
          {row.getValue('conNome')}
        </div>
      );
    }
  },
  {
    accessorKey: 'conStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),

    cell: ({ row }) => {
      return (
        <div
          className={
            row.getValue('conStatus') === true
              ? 'flex items-center justify-center rounded-md bg-green-600 text-sm text-white'
              : 'flex items-center justify-center rounded-md bg-red-600  px-2 text-sm text-white'
          }
        >
          {row.getValue('conStatus') === true ? 'Ativo' : 'Inativo'}
        </div>
      );
    },

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'conCpf',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cpf" />
    ),

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'habilitacaoCategoria',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoria" />
    ),

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'habilitacaoValidade',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validade" />
    ),

    cell: ({ row }) => {
      const date = new Date(row.getValue('habilitacaoValidade'));
      return (
        <div className="w-[200px] truncate text-base ">
          {format(date, 'dd/MM/yyyy')}
        </div>
      );
    },

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];

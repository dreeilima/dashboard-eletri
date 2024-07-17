'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Condutores } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from '@/components/tables/listacompleta-tables/cell-actions';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const columns: ColumnDef<Condutores>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),

    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'conId',
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => <div className="text-left">{row.original.conId}</div>
  },
  {
    accessorKey: 'conNome',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          NOME
          <span className="ml-2">
            {column.getIsSorted() === 'desc' ? <ChevronDown /> : <ChevronUp />}
          </span>
        </Button>
      );
    }
  },
  {
    accessorKey: 'conCpf',
    header: 'CPF'
  },
  {
    accessorKey: 'habilitacaoCategoria',
    header: 'CATEGORIA'
  },
  {
    accessorKey: 'habilitacaoValidade',
    header: 'VALIDADE',
    cell: ({ row }) => {
      const date = new Date(row.original.habilitacaoValidade);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
  },
  {
    accessorKey: 'conStatus',
    header: 'STATUS',
    cell: ({ row }) => (
      <span>{row.original.conStatus ? 'Ativo' : 'Inativo'}</span>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <CellAction data={row.original} onDataChanged={() => row} />
    )
  }
];

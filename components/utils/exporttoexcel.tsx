import { Table } from '@tanstack/react-table';
import { DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Condu } from '../data/schema';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
interface exportToExcelProps {
  table: Table<Condu>;
}

export function ExportToExcel({ table }: exportToExcelProps) {
  return (
    <Button variant="outline" size="sm" onClick={() => exportToExcel(table)}>
      <DownloadIcon className="mr-2 h-4 w-4" /> Exportar para Excel
    </Button>
  );
}

function exportToExcel(table: Table<Condu>) {
  // obter todas as linhas filtradas e selecionadas
  const seletedRows = table.getFilteredSelectedRowModel().rows;
  const filteredRows = table.getFilteredRowModel().rows;

  // Determinar quais dados devem ser exportados
  let dataToExport;

  if (seletedRows.length > 0) {
    // Se houver linhas selecionadas, exportar apenas as linhas selecionadas
    dataToExport = seletedRows.map((row) => ({
      Id: row.original.conId,
      Nome: row.original.conNome,
      Cpf: row.original.conCpf,
      Categoria: row.original.habilitacaoCategoria,
      Validade: new Date(row.original.habilitacaoValidade).toLocaleDateString(
        'pt-BR'
      ),
      Status: row.original.conStatus ? 'Ativo' : 'Inativo'
    }));
  } else {
    // Se nenhuma linha estiver selecionada, exportar todas as linhas filtradas
    dataToExport = filteredRows.map((row) => ({
      Id: row.original.conId,
      Nome: row.original.conNome,
      Cpf: row.original.conCpf,
      Categoria: row.original.habilitacaoCategoria,
      Validade: new Date(row.original.habilitacaoValidade).toLocaleDateString(
        'pt-BR'
      ),
      Status: row.original.conStatus ? 'Ativo' : 'Inativo'
    }));
  }
  // Exportar dados para Excel
  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Condutores');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'condutores.xlsx');
}

export default exportToExcel;

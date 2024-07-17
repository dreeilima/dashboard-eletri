'use client';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Condutores } from '@/constants/data';
import { useEffect, useState } from 'react';
import { FilterModal } from '@/components/modal/filter-lista';
import { exportToExcel } from '@/components/utils/exporttoexcel';
import { Button } from '@/components/ui/button';
import { columns as defaultColumns } from './columns';
import { CellAction } from './cell-actions';

interface ListacompletaTablesProps {
  data: Condutores[];
}

export const Listacompleta: React.FC<ListacompletaTablesProps> = ({ data }) => {
  const [listData, setListData] = useState<Condutores[]>(data || []);
  const [filteredData, setFilteredData] = useState<Condutores[]>(data || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    conId: '',
    conNome: '',
    conCpf: '',
    veiiculoId: '',
    abastecimentoId: '',
    projetoId: '',
    habilitacaoCategoria: '',
    habilitacaoValidade: '',
    conDataExame: '',
    conStatus: ''
  });

  const reloadListData = async () => {
    try {
      const response = await fetch(
        'https://frotasapiteste.baramaiaservicos.com.br/api/Condutores'
      );
      const result = await response.json();
      setListData(result);
      setFilteredData(result);
    } catch (error) {
      console.error('Falha ao obter dados:', error);
    }
  };

  useEffect(() => {
    reloadListData();
  }, []);

  const applyFilters = (filters: any) => {
    let filtered = [...listData];

    // Aplicar filtros conforme necessário

    setFilteredData(filtered);
  };

  const clearFilters = () => {
    setFilters({
      conId: '',
      conNome: '',
      conCpf: '',
      veiiculoId: '',
      abastecimentoId: '',
      projetoId: '',
      habilitacaoCategoria: '',
      habilitacaoValidade: '',
      conDataExame: '',
      conStatus: ''
    });
    setFilteredData(listData);
  };

  const exportFilteredData = () => {
    exportToExcel(filteredData, 'Condutores_Filtrados');
  };

  const columns = defaultColumns.map((column) => {
    if (column.id === 'actions') {
      return {
        ...column,
        cell: ({ row }: { row: { original: Condutores } }) => (
          <CellAction data={row.original} onDataChanged={reloadListData} />
        )
      };
    }
    return column;
  });

  if (!Array.isArray(listData)) return null;

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Lista Completa (${filteredData.length})`}
          description="Listagem completa gerada"
        />

        <div className="flex space-x-2">
          <Button onClick={() => setIsModalOpen(true)}>Filtrar</Button>
          <Button onClick={exportFilteredData}>Exportar Excel</Button>
        </div>
      </div>
      <Separator />
      <DataTable
        searchKey="conNome"
        columns={columns}
        data={filteredData}
        reloadData={reloadListData}
      />

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApplyFilter={applyFilters}
        filters={filters}
        clearFilters={clearFilters}
        data={listData}
      />
    </>
  );
};

'use client';

import { useState, useEffect } from 'react';

import { columns } from '../visitas-tables/columns';
import { DataTable } from '@/components/data-tables/data-table';
import axios from 'axios';
import { Heading } from '../../ui/heading';
import { Separator } from '@radix-ui/react-dropdown-menu';

export default function VisitasPage() {
  const [condutores, setCondutores] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'https://frotasapiteste.baramaiaservicos.com.br/api/Condutores'
        );
        setCondutores(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Visitas (${condutores.length})`}
          description="Listagem de Visitas"
        />
      </div>
      <Separator />

      <DataTable columns={columns} data={condutores} />
    </>
  );
}

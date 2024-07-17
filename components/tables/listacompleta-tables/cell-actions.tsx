'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { EditModal } from '@/components/modal/edit-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { Condutores } from '@/constants/data';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: Condutores;
  onDataChanged: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
  onDataChanged
}) => {
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentData, setCurrentData] = useState<Condutores>(data);
  const router = useRouter();

  const onConfirm = async () => {
    setLoading(true);
    console.log('Deleting record with ID:', data.conId);
    try {
      const response = await fetch(
        `https://frotasapiteste.baramaiaservicos.com.br/api/Condutores/${data.conId}`,
        {
          method: 'DELETE'
        }
      );
      if (response.ok && response.status === 204) {
        console.log('Record deleted successfully');
        toast({
          title: 'Registro excluído',
          description: 'O registro foi excluído com sucesso',
          variant: 'default'
        });
        onDataChanged(); // Chamada após exclusão
      } else {
        console.error(
          'Erro ao tentar deletar o registro:',
          await response.text()
        );
      }
    } catch (error) {
      console.error('Erro ao tentar deletar o registro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedData: Condutores) => {
    // Convert conStatus to boolean if it's not already
    if (typeof updatedData.conStatus !== 'boolean') {
      updatedData.conStatus =
        updatedData.conStatus === 'true' || updatedData.conStatus === 'false';

      console.log('Updated data:', updatedData);
    }

    setLoading(true);
    console.log('Saving updated data:', updatedData);
    try {
      const response = await fetch(
        `https://frotasapiteste.baramaiaservicos.com.br/api/Condutores/${data.conId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        }
      );
      if (response.ok && response.status === 204) {
        console.log('Record updated successfully');
        setCurrentData(updatedData);
        toast({
          title: 'Registro atualizado',
          description: 'O registro foi atualizado com sucesso',
          variant: 'default'
        });
        onDataChanged(); // Chamada após atualização
      } else {
        const errorText = await response.text();
        console.error('Erro ao tentar atualizar o registro:', errorText);
        toast({
          title: 'Erro ao tentar atualizar o registro',
          description: `Ocorreu um erro ao tentar atualizar o registro: ${errorText}`,
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Erro ao tentar atualizar o registro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={openAlert}
        onClose={() => {
          console.log('Closing alert modal');
          setOpenAlert(false);
        }}
        onConfirm={async () => {
          await onConfirm();
          setOpenAlert(false);
          router.refresh();
        }}
        loading={loading}
      />
      <EditModal
        isOpen={openEdit}
        onClose={() => {
          console.log('Closing edit modal');
          setOpenEdit(false);
        }}
        data={currentData}
        onSave={async (updatedData) => {
          await handleSave(updatedData);
          setOpenEdit(false);
          onDataChanged(); // Chamada após atualização
          router.refresh();
        }}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => console.log('Dropdown menu triggered')}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              console.log('Opening edit modal');
              setOpenEdit(true);
            }}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              console.log('Opening alert modal');
              setOpenAlert(true);
            }}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

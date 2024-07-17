// components/modal/edit-modal.tsx
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Condutores } from '@/constants/data';
import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Condutores;
  onSave: (updatedData: Condutores) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave
}) => {
  const [formData, setFormData] = useState<Condutores>({ ...data });

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: boolean) => {
    setFormData({ ...formData, conStatus: value });
  };

  const handleDateChange = (date: string | null) => {
    setFormData({ ...formData, habilitacaoValidade: date ?? '' });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      title="Editar Condutor"
      description="Atualize os dados do condutor."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="p-4">
        <div className="mb-4">
          <Label htmlFor="conNome">Nome</Label>
          <Input
            id="conNome"
            name="conNome"
            value={formData.conNome}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="conCpf">CPF</Label>
          <Input
            id="conCpf"
            name="conCpf"
            value={formData.conCpf}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="habilitacaoCategoria">Categoria CNH</Label>
          <Input
            id="habilitacaoCategoria"
            name="habilitacaoCategoria"
            value={formData.habilitacaoCategoria}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="habilitacaoValidade">Validade CNH</Label>
          <Input
            type="date"
            id="habilitacaoValidade"
            name="habilitacaoValidade"
            value={formData.habilitacaoValidade}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="conStatus">Status</Label>
          <Select onValueChange={handleSelectChange} value={formData.conStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </div>
      </div>
    </Modal>
  );
};

import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Condutores } from '@/constants/data';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filters: any) => void;
  filters: any;
  clearFilters: () => void;
  data: Condutores[];
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApplyFilter,
  filters,
  clearFilters,
  data
}) => {
  return (
    <Modal
      title="Filtrar Condutores"
      description="Aplique filtros aos dados dos condutores."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>ID</label>
            <Select name="conId" value={filters.conId}>
              <SelectTrigger className="h-8 w-full">
                <SelectValue placeholder="ID" />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem value="">Selecione</SelectItem>
                {data.map((item) => (
                  <SelectItem key={item.conId} value={String(item.conId)}>
                    {item.conId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label>Nome</label>
            <Select name="conNome" value={filters.conNome}>
              <SelectTrigger className="h-8 w-full">
                <SelectValue placeholder="Nome" />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem value="">Selecione</SelectItem>
                {data.map((item) => (
                  <SelectItem key={item.conNome} value={item.conNome}>
                    {item.conNome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label>CPF</label>
            <Select name="conCpf" value={filters.conCpf}>
              <SelectTrigger className="h-8 w-full">
                <SelectValue placeholder="CPF" />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem value="">Selecione</SelectItem>
                {data.map((item) => (
                  <SelectItem key={item.conCpf} value={item.conCpf}>
                    {item.conCpf}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label>Veículo ID</label>
            <Select name="veiiculoId" value={filters.veiiculoId}>
              <SelectTrigger className="h-8 w-full">
                <SelectValue placeholder="Veículo ID" />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem value="">Selecione</SelectItem>
                {data.map((item) => (
                  <SelectItem
                    key={item.veiiculoId}
                    value={String(item.veiiculoId)}
                  >
                    {item.veiiculoId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label>Abastecimento ID</label>
            <Select name="abastecimentoId" value={filters.abastecimentoId}>
              <SelectTrigger className="h-8 w-full">
                <SelectValue placeholder="Abastecimento ID" />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem value="">Selecione</SelectItem>
                {data.map((item) => (
                  <SelectItem
                    key={item.abastecimentoId}
                    value={String(item.abastecimentoId)}
                  >
                    {item.abastecimentoId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label>Projeto ID</label>
            <Select name="projetoId" value={filters.projetoId}>
              <SelectTrigger className="h-8 w-full">
                <SelectValue placeholder="Projeto ID" />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem value="">Selecione</SelectItem>
                {data.map((item) => (
                  <SelectItem
                    key={item.projetoId}
                    value={String(item.projetoId)}
                  >
                    {item.projetoId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label>Habilitação Categoria</label>
            <Select
              name="habilitacaoCategoria"
              value={filters.habilitacaoCategoria}
            >
              <SelectTrigger className="h-8 w-full">
                <SelectValue placeholder="Habilitação Categoria" />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem value="">Selecione</SelectItem>
                {data.map((item) => (
                  <SelectItem
                    key={item.habilitacaoCategoria}
                    value={item.habilitacaoCategoria}
                  >
                    {item.habilitacaoCategoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label>Habilitação Validade</label>
            <Select
              name="habilitacaoValidade"
              value={filters.habilitacaoValidade}
            >
              <SelectTrigger className="h-8 w-full">
                <SelectValue placeholder="Habilitação Validade" />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem value="">Selecione</SelectItem>
                {data.map((item) => (
                  <SelectItem
                    key={item.habilitacaoValidade}
                    value={item.habilitacaoValidade}
                  >
                    {item.habilitacaoValidade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label>Data de Exame</label>
            <Select name="conDataExame" value={filters.conDataExame}>
              <SelectTrigger className="h-8 w-full">
                <SelectValue placeholder="Data de Exame" />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem value="">Selecione</SelectItem>
                {data.map((item) => (
                  <SelectItem key={item.conDataExame} value={item.conDataExame}>
                    {item.conDataExame}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label>Status</label>
            <Select
              name="conStatus"
              value={filters.conStatus}

              // className="mb-4"
            >
              <SelectTrigger className="h-8 w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem value="">Selecione</SelectItem>
                <SelectItem value="true">Ativo</SelectItem>
                <SelectItem value="false">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={clearFilters}>
            Limpar
          </Button>
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </div>
    </Modal>
  );
};

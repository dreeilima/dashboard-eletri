import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toast } from '@/components/ui/toast';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import { updateCondutor } from '@/lib/actions-condutor';
import { UpdateCondutor, updateCondutorSchema } from '@/components/data/schema';
import { categorias, statusteste } from '@/constants/data';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem
} from '@/components/ui/select';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@radix-ui/react-popover';
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface UpdateCondutorSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  condutor: UpdateCondutor;
  onUpdate: () => void; // Função para notificar atualização
}

export function UpdateCondutorSheet({
  condutor,
  onUpdate,
  ...props
}: UpdateCondutorSheetProps) {
  const router = useRouter();
  const [isUpdatePending, startUpdateTransition] = React.useTransition();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(condutor.habilitacaoValidade)
  );

  const formatDateComCapitalize = (date: Date) => {
    const formattedDate = format(date, "dd 'de' LLL 'de' y", {
      locale: ptBR
    });
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  };

  const form = useForm<UpdateCondutor>({
    defaultValues: {
      conId: condutor.conId,
      conNome: condutor.conNome,
      conCpf: condutor.conCpf,
      veiculoId: condutor.veiculoId,
      abastecimentoId: condutor.abastecimentoId,
      projetoId: condutor.projetoId,
      habilitacaoCategoria: condutor.habilitacaoCategoria,
      habilitacaoValidade: condutor.habilitacaoValidade,
      conDataExame: condutor.conDataExame,
      conStatus: condutor.conStatus.toString()
    },
    resolver: zodResolver(updateCondutorSchema)
  });

  async function onSubmit(data: UpdateCondutor) {
    startUpdateTransition(async () => {
      try {
        const { error } = await updateCondutor({
          ...data,
          id: data.conId !== undefined ? data.conId.toString() : undefined,
          habilitacaoValidade: selectedDate ? selectedDate.toISOString() : '',
          conStatus: data.conStatus === 'true' // Converte para booleano se necessário
        });

        if (error) {
          toast.error(error);
        } else {
          form.reset();
          props.onOpenChange?.(false);
          toast.success('Condutor atualizado com sucesso!');
          onUpdate();
        }
      } catch (error) {
        console.error('Erro ao atualizar condutor:', error);
        toast.error('Erro ao atualizar condutor.');
      }
    });
  }

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Atualizar Condutor</SheetTitle>
          <SheetDescription>Atualização de um condutor</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="conNome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Entre com um nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="conStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(value)} // Atualiza o valor do campo
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status " />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {statusteste.map((status) => (
                            <SelectItem
                              key={status.value.toString()}
                              value={status.value.toString()}
                            >
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="habilitacaoCategoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habilitação Categoria</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {categorias.map((categoria) => (
                            <SelectItem
                              key={categoria.value}
                              value={categoria.value}
                            >
                              {categoria.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="habilitacaoValidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habilitação Validade</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[280px] justify-start text-left font-normal',
                            !selectedDate && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? (
                            formatDateComCapitalize(selectedDate)
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto bg-zinc-950 p-0  ">
                        <Calendar
                          mode="single"
                          selected={selectedDate as any}
                          onSelect={(date: Date | undefined) => {
                            setSelectedDate(date || null);
                            field.onChange(date || null);
                          }}
                          initialFocus
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="gap-2 pt-2 sm:space-x-0">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button disabled={isUpdatePending} type="submit">
                {isUpdatePending && (
                  <ReloadIcon
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Save
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

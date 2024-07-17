'use client';

import * as React from 'react';
import { type Condu } from '@/components/data/schema';
import { ReloadIcon, TrashIcon } from '@radix-ui/react-icons';
import { type Row } from '@tanstack/react-table';
import { toast } from 'sonner';

import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';

import { deleteCondutor } from '@/lib/actions-condutor';

interface DeleteTasksDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  condutor: Row<Condu>['original'][];
  showTrigger?: boolean;
  onSuccess?: () => void;
}

export function DeleteTasksDialog({
  condutor,
  showTrigger = true,
  onSuccess,
  ...props
}: DeleteTasksDialogProps) {
  const [isDeletePending, startDeleteTransition] = React.useTransition();
  const isDesktop = useMediaQuery('(min-width: 640px)');

  async function onDelete() {
    try {
      startDeleteTransition(async () => {
        const { error } = await deleteCondutor({
          ids: condutor.map((condutores) => condutores.conId.toString())
        });

        if (error) {
          toast.error(error);
          return;
        }

        props.onOpenChange?.(false);
        toast.success('Condutor deletado');
        onSuccess?.();
      });
    } catch (error) {
      console.error('Failed to delete condutor:', error);
      toast.error('Failed to delete condutor.');
    }
  }

  if (isDesktop) {
    return (
      <Dialog {...props}>
        {showTrigger ? (
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <TrashIcon className="mr-2 size-4" aria-hidden="true" />
              Deletar ({condutor.length})
            </Button>
          </DialogTrigger>
        ) : null}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vôce tem certeza que deseja deletar?</DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita.{' '}
              <span className="font-medium">{condutor.length}</span>
              {condutor.length === 1 ? ' condutor' : ' condutores'} serão
              deletados.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              aria-label="Deletar selecionados"
              variant="destructive"
              onClick={onDelete}
              disabled={isDeletePending}
            >
              {isDeletePending && (
                <ReloadIcon
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Deletar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer {...props}>
      {showTrigger ? (
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({condutor.length})
          </Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Vôce tem certeza que deseja deletar esses condutores?
          </DrawerTitle>
          <DrawerDescription>
            Esta ação não pode ser desfeita.{' '}
            <span className="font-medium">{condutor.length}</span>
            {condutor.length === 1 ? ' condutor' : ' condutores'} serão
            deletados
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={onDelete}
            disabled={isDeletePending}
          >
            {isDeletePending && (
              <ReloadIcon
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Deletar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

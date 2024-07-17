import { z } from 'zod';

export const condutorSchema = z.object({
  conId: z.number(),
  conNome: z.string(),
  conCpf: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
  veiculoId: z.number(),
  abastecimentoId: z.number(),
  projetoId: z.number(),
  habilitacaoCategoria: z.string(),
  habilitacaoValidade: z.string(),
  conDataExame: z.string().nullable(),
  conStatus: z.union([z.boolean(), z.string()])
});

export type Condu = z.infer<typeof condutorSchema>;

export const updateCondutorSchema = z.object({
  conId: z.number().optional(),
  conNome: z.string(),
  conCpf: z.string().optional(),
  veiculoId: z.number().optional(),
  abastecimentoId: z.number().optional(),
  projetoId: z.number().optional(),
  habilitacaoCategoria: z.string(),
  habilitacaoValidade: z.union([z.string(), z.date()]),
  conDataExame: z.string().nullable().optional(),
  conStatus: z.union([z.boolean(), z.string()])
});

export type UpdateCondutor = z.infer<typeof updateCondutorSchema>;

export const deleteCondutorSchema = z.object({
  conId: z.number(),
  conNome: z.string(),
  abastecimentoId: z.number(),
  habilitacaoCategoria: z.string(),
  habilitacaoValidade: z.string(),
  conStatus: z.boolean() || z.string()
});

export type DeleteCondutor = z.infer<typeof deleteCondutorSchema>;

export const createCondutorSchema = z.object({
  // conId: z.number().optional(),
  conNome: z.string(),
  conCpf: z.string().optional(),
  // veiculoId: z.number().optional(),
  // abastecimentoId: z.number().optional(),
  // projetoId: z.number().optional(),
  habilitacaoCategoria: z.string(),
  habilitacaoValidade: z.union([z.string(), z.date()]),
  // conDataExame: z.string().nullable().optional(),
  conStatus: z.union([z.boolean(), z.string()])
});

export type CreateCondutor = z.infer<typeof createCondutorSchema>;

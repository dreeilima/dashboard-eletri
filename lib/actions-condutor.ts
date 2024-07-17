import axios from 'axios';
import {
  updateCondutorSchema,
  type UpdateCondutor
} from '@/components/data/schema';
import {
  createCondutorSchema,
  type CreateCondutor
} from '@/components/data/schema';

export async function updateCondutor(
  input: UpdateCondutor & { id: string | undefined }
) {
  try {
    // Validar os dados de entrada
    const validatedInput = updateCondutorSchema.parse(input);

    // Chamar a API para atualizar o condutor
    console.log(`Updating condutor with ID ${input.id}`, validatedInput);
    const response = await axios.put(
      `https://frotasapiteste.baramaiaservicos.com.br/api/Condutores/${input.conId}`,
      {
        ...validatedInput
      }
    );

    console.log(`Update condutor response:`, response.data);

    return {
      data: null,
      error: null
    };
  } catch (error) {
    console.error('Failed to update condutor:', error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : 'Failed to update condutor'
    };
  }
}

export async function deleteCondutor({ ids }: { ids: string[] }) {
  try {
    // Transforma os IDs em um objeto esperado pela API (por exemplo, um array)
    const requestData = { ids };

    console.log(`Deleting condutores with IDs:`, ids);
    const response = await axios.delete(
      `https://frotasapiteste.baramaiaservicos.com.br/api/Condutores/${ids}`,
      {
        data: requestData
      }
    );

    console.log(`Delete condutores response:`, response.data);

    return {
      data: null,
      error: null
    };
  } catch (err) {
    console.error('Failed to delete condutores:', err);
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Failed to delete condutores'
    };
  }
}

export async function createCondutor(input: CreateCondutor) {
  try {
    const creatValidatedInput = createCondutorSchema.parse(input);
    const response = await axios.post(
      'https://frotasapiteste.baramaiaservicos.com.br/api/Condutores',
      {
        ...creatValidatedInput
      }
    );
    return {
      data: response.data,
      error: null
    };
  } catch (error) {
    console.error('Falha ao criar condutor:', error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : 'Failed to create condutor'
    };
  }
}

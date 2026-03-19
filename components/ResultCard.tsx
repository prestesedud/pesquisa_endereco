import { Endereco } from '@/types/endereco';

type Props = { endereco: Endereco | null };

export function ResultCard({ endereco }: Props) {
  if (!endereco) return null;

  const enderecoCompleto = `${endereco.logradouro},  ${endereco.bairro}, ${endereco.localidade}, ${endereco.uf}, ${endereco.cep}`;

  return (
    <div className="mt-6 border p-4 rounded bg-gray 100">
      <p className="font-bold">CEP encontrado:</p>
      <p className="text-lg text-green-700 font-mono">{endereco.cep}</p>
      <p className="mt-1 text-sm text-gray-600">{enderecoCompleto}</p>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto)}`}
        target="_blank"
        className="
    mt-3 inline-block text-blue-500 hover:underline"
      >
        📍 Ver no Google Maps
      </a>
    </div>
  );
}

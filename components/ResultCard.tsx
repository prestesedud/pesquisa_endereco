import { Endereco } from '@/types/endereco';
import { TSuggestions } from '@/app/page';

type Props = { endereco: TSuggestions | null };

export function ResultCard({ endereco }: Props) {
  if (!endereco) return null;

  const enderecoCompleto = `${endereco.logradouro}, ${endereco.numero}, ${endereco.bairro}, ${endereco.localidade}, ${endereco.uf}, ${endereco.cep}`;

  return (
    <div className="mt-6 border p-4 rounded bg-gray 100">
      <p className="font-bold">CEP encontrado:</p>
      <p className="text-lg text-green-700 font-mono">{endereco.cep}</p>
      <p className="mt-1 text-sm text-gray-600">{enderecoCompleto}</p>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
    mt-3 inline-block text-blue-500 hover:underline"
      >
        📍 Ver no Google Maps
      </a>
    </div>
  );
}

import { Endereco } from '@/types/endereco';
import { ResultCard } from '@/components/ResultCard';
import { useState } from 'react';
type Props = {
  sugestoes: Endereco[];
};

export function SuggestionsList({ sugestoes }: Props) {
  const [item, setItem] = useState<Endereco | null>(null);
  return (
    <>
      <div className="border rounded mt-2 bg-white shadow">
        {sugestoes.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setItem(item);
            }}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            {item.logradouro} - {item.bairro} - CEP: {item.cep}
          </div>
        ))}
      </div>
      <ResultCard endereco={item} />
    </>
  );
}

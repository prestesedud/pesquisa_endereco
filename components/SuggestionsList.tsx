import { Endereco } from '@/types/endereco';
import { ResultCard } from '@/components/ResultCard';
import { useState } from 'react';
import { TSuggestions } from '@/app/page'; // ou do arquivo onde você definiu

type Props = {
  sugestoes: TSuggestions[];
};

export function SuggestionsList({ sugestoes }: Props) {
  return (
    <ul>
      {sugestoes.map((sugestao) => (
        <li key={sugestao.cep}>
          {sugestao.logradouro}, {sugestao.bairro}, {sugestao.localidade} -{' '}
          {sugestao.uf} ({sugestao.cep})
        </li>
      ))}
    </ul>
  );
}

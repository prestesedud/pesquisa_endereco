'use client';
import { useState } from 'react';
import { SearchForm } from '@/components/SearchForm';
import { SuggestionsList } from '@/components/SuggestionsList';
import { Endereco } from '@/types/endereco';
import { estadosMap } from '@/utils/estados';
import { ResultCard } from '@/components/ResultCard';

interface Address {
  uf: string;
  city: string;
  street: string;
  numero: string;
}

interface AddressTypeResponseProps {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string | null;
  unidade: string | null;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export type TSuggestions = Pick<
  AddressTypeResponseProps,
  'cep' | 'logradouro' | 'numero' | 'bairro' | 'localidade' | 'uf'
>;

function buildUrlSearch({ uf, city, street }: Address): string {
  const ufTrimmed = uf.trim();
  const cityTrimmed = city.trim();
  const streetTrimmed = street.trim();

  const ufNormalized = estadosMap[ufTrimmed] || ufTrimmed;

  if (!ufNormalized || !cityTrimmed || !streetTrimmed) {
    throw new Error('Todos os campos devem ser preenchidos.');
  }

  return `https://viacep.com.br/ws/${encodeURIComponent(ufNormalized)}/${encodeURIComponent(cityTrimmed)}/${encodeURIComponent(streetTrimmed)}/json/`;
}

export default function Home() {
  const [address, setAddress] = useState<Address>({
    uf: '',
    city: '',
    street: '',
    numero: '',
  });
  const [suggestion, setSuggestions] = useState<TSuggestions[]>([]);

  async function searchSuggestions() {
    const url = buildUrlSearch(address);
    if (!url) {
      console.warn('Preencha todos os campos antes de buscar');
      return;
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro ao buscar endereço: ${response.status}`);
      }
      const json = await response.json();

      if (!Array.isArray(json)) {
        throw new Error('Resposta inesperada da API');
      }

      const vectors: TSuggestions[] = json.map((item) => ({
        uf: item.uf,
        logradouro: item.logradouro,
        bairro: item.bairro,
        cep: item.cep,
        localidade: item.localidade,
        numero: address.numero,
      }));
      setSuggestions(vectors);
    } catch (error) {
      console.error('Erro ao buscar sugestões: ', error);
    }
  }

  return (
    <main>
      <div>
        <SearchForm
          rua={address?.street ?? ''}
          setRua={(value: string) =>
            setAddress((prev) => ({ ...prev, street: value }))
          }
          cidade={address?.city ?? ''}
          setCidade={(value: string) =>
            setAddress((prev) => ({ ...prev, city: value }))
          }
          uf={address?.uf ?? ''}
          setUf={(value: string) =>
            setAddress((prev) => ({ ...prev, uf: value }))
          }
          numero={address?.numero ?? ''}
          setNumero={(value: string) =>
            setAddress((prev) => ({ ...prev, numero: value }))
          }
          onBuscar={searchSuggestions}
        />
        {suggestion.length > 0 && <ResultCard endereco={suggestion[0]} />}
      </div>
    </main>
  );
}

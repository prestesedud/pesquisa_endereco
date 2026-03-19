'use client';
import { useState } from 'react';
import { SearchForm } from '@/components/SearchForm';
import { SuggestionsList } from '@/components/SuggestionsList';
import { Endereco } from '@/types/endereco';

interface AddressTypesProps {
  uf?: string;
  city?: string;
  street?: string;
}

interface AddressTypeResponseProps {
  cep: string;
  logradouro: string;
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

type TSuggestions = Pick<
  AddressTypeResponseProps,
  'cep' | 'logradouro' | 'bairro' | 'localidade' | 'uf'
>;

function buildUrlSearch({
  uf,
  city,
  street,
}: AddressTypesProps): string | null {
  if (uf && city && street)
    return `https://viacep.com.br/ws/${uf}/${city}/${street}/json/`;
  return null;
}

export default function Home() {
  const [address, setAddress] = useState<AddressTypesProps>({
    uf: '',
    city: '',
    street: '',
  });
  const [suggestion, setSuggestions] = useState<TSuggestions[] | null>(null);

  async function searchSuggestions() {
    try {
      const response = await fetch(buildUrlSearch( {...address })!);
      
      const json = (await response.json()) as TSuggestions[];
      console.log(json)
      if (json) {
        const vectors: TSuggestions[] = json.map((item) => ({
          uf: item.uf,
          logradouro: item.logradouro,
          bairro: item.bairro,
          cep: item.cep,
          localidade: item.localidade,
        }));
        setSuggestions(vectors);
      }
    } catch (error) {
      console.error('Error code: ', error);
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
          onBuscar={searchSuggestions}
        />
    {suggestion?.length ? (
      <SuggestionsList sugestoes={suggestion} />
    ) : null}
            

      </div>
    </main>
  );
}

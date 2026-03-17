'use client';

import { useState } from 'react';

type Endereco = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
};

export default function Home() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function buscarCep() {
    try {
      if (cep.length !== 8) {
        setErro('Por favor, insira um CEP válido!');
        return;
      }

      setErro('');
      setLoading(true);

      const startTime = Date.now();

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      const elapsed = Date.now() - startTime;
      const MIN_TIME = 1000;

      if (elapsed < MIN_TIME) {
        await new Promise((resolve) => setTimeout(resolve, MIN_TIME - elapsed));
      }

      if (data.erro) {
        setErro('CEP não encontrado');
        setEndereco(null);
      } else {
        setEndereco(data);
      }
    } catch (error) {
      setErro('Erro ao buscar o CEP');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-red-100">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-red-500 mb-6 text-center">
          Buscador de CEP
        </h1>

        <input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 rounded-lg shadow-sm placeholder:text-gray-400 text-gray-400"
        />

        <button
          disabled={loading}
          onClick={buscarCep}
          className="mt-3 w-full bg-amber-400 text-white p-3 rounded-lg hover:bg-amber-300 transition"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>

        {erro && (
          <p className="mt-4 bg-red-100 border border-red-300 text-red-600 rounded-lg text-sm font-medium p-3">
            {erro}
          </p>
        )}

        {loading && (
          <div className="mt-4 flex justify-center">
            <div className="w-6 h-6 border-4 border-amber-200 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {endereco && (
          <div className="mt-6 space-y-2 text-red-600">
            <p>
              <strong>Rua: </strong> {endereco.logradouro}
            </p>
            <p>
              <strong>Bairro: </strong> {endereco.bairro}
            </p>
            <p>
              <strong>Cidade: </strong> {endereco.localidade}
            </p>
            <p>
              <strong>Estado: </strong> {endereco.uf}
            </p>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade} - ${endereco.uf}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transitio"
            >
              Google Maps 📍
            </a>
          </div>
        )}
      </div>
    </main>
  );
}

'use client';

type Props = {
  rua: string;
  setRua: (value: string) => void;
  cidade: string;
  setCidade: (value: string) => void;
  uf: string;
  setUf: (value: string) => void;
  onBuscar: () => void;
};

export function SearchForm({
  rua,
  setRua,
  cidade,
  setCidade,
  uf,
  setUf,
  onBuscar,
}: Props) {
  return (
    <div className="space-y-2">
      <input
        placeholder="Estado (ex: SP)"
        value={uf}
        onChange={(e) => setUf(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        placeholder="Cidade"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        className="border w-full p-2 rounded"
      />
      <input
        placeholder="Rua"
        value={rua}
        onChange={(e) => setRua(e.target.value)}
        className="border w-full p-2 rounded"
      />
      <button
        onClick={onBuscar}
        className="bg-blue-500 w-full text-white p-2 rounded hover:bg-blue-600"
      >
        Buscar CEP
      </button>
    </div>
  );
}

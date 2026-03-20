'use client';

import { useState } from 'react';

type Props = {
  rua: string;
  setRua: (value: string) => void;
  cidade: string;
  setCidade: (value: string) => void;
  uf: string;
  setUf: (value: string) => void;
  numero: string;
  setNumero: (value: string) => void;
  onBuscar: () => void;
};

export function SearchForm({
  rua,
  setRua,
  cidade,
  setCidade,
  uf,
  setUf,
  numero,
  setNumero,
  onBuscar,
}: Props) {
  const [errors, setErrors] = useState<{
    uf?: string;
    cidade?: string;
    rua?: string;
    numero?: string;
  }>({});

  function handleBuscar() {
    const newErrors: typeof errors = {};

    if (!uf.trim()) newErrors.uf = 'Campo obrigatório';
    if (!cidade.trim()) newErrors.cidade = 'Campo obrigatório';
    if (!rua.trim()) newErrors.rua = 'Campo obrigatório';
    if (!numero.trim()) newErrors.numero = 'Campo obrigatório';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onBuscar();
    }
  }
  return (
    <div className="space-y-2">
      <div>
        <input
          placeholder="Estado (ex: SP)"
          value={uf}
          onChange={(e) => {
            const value = e.target.value;
            setUf(value);
            setErrors((prev) => ({
              ...prev,
              uf: value.trim() ? undefined : 'Campo requerido',
            }));
          }}
          className={`w-full border p-2 rounded ${errors.uf ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.uf && <p className="text-red-500 text-sm">{errors.uf}</p>}
      </div>
      <div>
        <input
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => {
            const value = e.target.value;
            setCidade(value);
            setErrors((prev) => ({
              ...prev,
              cidade: value.trim() ? undefined : 'Campo obrigatório',
            }));
          }}
          className={`w-full border p-2 rounded ${errors.cidade ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.uf && <p className="text-red-500 text-sm">{errors.cidade}</p>}
      </div>
      <div>
        <input
          placeholder="Rua"
          value={rua}
          onChange={(e) => {
            const value = e.target.value;
            setRua(value);
            setErrors((prev) => ({
              ...prev,
              rua: value.trim() ? undefined : 'Campo obrigatório',
            }));
          }}
          className={`w-full border p-2 rounded ${errors.rua ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.uf && <p className="text-red-500 text-sm">{errors.rua}</p>}
      </div>

      <div>
        <input
          placeholder="Número"
          value={numero}
          onChange={(e) => {
            const value = e.target.value;
            setNumero(value);
            setErrors((prev) => ({
              ...prev,
              numero: value.trim() ? undefined : 'Campo obrigatório',
            }));
          }}
          className={`w-full border p-2 rounded ${errors.numero ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.numero && (
          <p className="text-red-500 text-sm">{errors.numero}</p>
        )}
      </div>
      <button
        onClick={handleBuscar}
        className="bg-blue-500 w-full text-white p-2 rounded hover:bg-blue-600"
      >
        Buscar CEP
      </button>
    </div>
  );
}

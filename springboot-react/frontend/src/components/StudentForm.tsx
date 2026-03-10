import { useState } from 'react';
import type { StudentInput } from '../lib/api';

type StudentFormProps = {
  initialValues?: StudentInput;
  submitLabel: string;
  loading: boolean;
  onSubmit: (input: StudentInput) => Promise<void>;
  onCancel?: () => void;
};

const DEFAULT_VALUES: StudentInput = {
  nombre: '',
  grupo: ''
};

export default function StudentForm({
  initialValues,
  submitLabel,
  loading,
  onSubmit,
  onCancel
}: StudentFormProps) {
  const [values, setValues] = useState<StudentInput>(() => initialValues ?? DEFAULT_VALUES);
  const [formError, setFormError] = useState('');

  function updateField<Key extends keyof StudentInput>(key: Key, value: StudentInput[Key]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!values.nombre.trim() || !values.grupo.trim()) {
      setFormError('Nombre y grupo son requeridos.');
      return;
    }

    setFormError('');
    await onSubmit({
      nombre: values.nombre.trim(),
      grupo: values.grupo.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="w-full">
        <div className="w-full bg-white rounded-lg p-8 flex flex-col mt-0 relative z-10 shadow-md">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">{submitLabel}</h2>

          <div className="relative mb-4">
            <label htmlFor="nombre" className="leading-7 text-sm text-gray-600">Nombre</label>
            <input
              id="nombre"
              value={values.nombre}
              onChange={(event) => updateField('nombre', event.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="relative mb-4">
            <label htmlFor="grupo" className="leading-7 text-sm text-gray-600">Grupo</label>
            <input
              id="grupo"
              value={values.grupo}
              onChange={(event) => updateField('grupo', event.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            {loading ? 'Guardando...' : submitLabel}
          </button>

          {onCancel ? (
            <button type="button" onClick={onCancel} disabled={loading}>
              Cancelar
            </button>
          ) : null}

          {formError ? <p className="text-xs text-gray-500 mt-3">{formError}</p> : null}
        </div>
      </div>
    </form>
  );
}
type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full bg-white rounded-lg p-8 flex flex-col mb-4 shadow-md">
      <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Buscar por Nombre</h2>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="ej. sunt aut facere"
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
    </div>
  );
}

import { useMemo, useState } from 'react';
import SearchBar from './components/SearchBar';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { useStudents } from './hooks/useStudents';
import type { Student, StudentInput } from './lib/api';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const {
    students,
    filteredStudents,
    loading,
    saving,
    error,
    createNewStudent,
  } = useStudents(searchTerm);

  const stats = useMemo(() => {
    return {
      totalStudents: students.length,
      filteredStudents: filteredStudents.length,
      selectedStudentId: selectedStudent?.id ?? 'Ninguno',
    };
  }, [students.length, filteredStudents.length, selectedStudent]);

  async function handleCreate(input: StudentInput) {
    const created = await createNewStudent(input);
    setSelectedStudent(created);
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">Practica React + TypeScript</p>
        <h1>Registro de estudiantes</h1>
        <p>
          Consume una API con <code>fetch</code>, carga datos con <code>useEffect</code> y
          filtra estudiantes por nombre.
        </p>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total de estudiantes</span>
          <strong>{stats.totalStudents}</strong>
        </article>
        <article className="stat-card">
          <span>Estudiantes filtrados</span>
          <strong>{stats.filteredStudents}</strong>
        </article>
        <article className="stat-card">
          <span>Estudiante seleccionado</span>
          <strong>{stats.selectedStudentId}</strong>
        </article>
      </section>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <section style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', alignItems: 'start' }}>
        <StudentForm submitLabel="Crear estudiante" loading={saving} onSubmit={handleCreate} />
      </section>

      <section className="layout">
        <StudentList
          students={filteredStudents}
          selectedStudentId={selectedStudent?.id ?? null}
          onSelectStudent={setSelectedStudent}
          loading={loading}
          error={error}
          saving={saving}
        />
      </section>
    </main>
  );
}
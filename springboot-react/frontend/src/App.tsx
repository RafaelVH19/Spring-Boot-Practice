import { useMemo, useState } from 'react';
import SearchBar from './components/SearchBar';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import TitleCard from './components/TitleCard';
import DataCard from './components/DataCard'
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
      <TitleCard
        head="Practica API con Spring Boot"
        title="Registro de estudiantes"
        body="Utiliza Spring Boot con Jackson y Maven para crear un Backend. Se compila en una imagen Docker con persistencia."
      />

      <section className="stats-grid">
        <DataCard title="Total de estudiantes" number={stats.totalStudents} />
        <DataCard title="Estudiantes filtrados" number={stats.filteredStudents} />
        <DataCard title="Estudiante seleccionado" number={stats.selectedStudentId} />
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
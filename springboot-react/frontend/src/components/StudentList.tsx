import type { Student } from '../lib/api';

type StudentListProps = {
  students: Student[];
  selectedStudentId: number | null;
  onSelectStudent: (student: Student) => void;
  loading: boolean;
  error: string;
  saving: boolean;
};

export default function StudentList({
  students,
  selectedStudentId,
  onSelectStudent,
  loading,
  error
}: StudentListProps) {
  if (loading) {
    return (
      <section className="panel">
        <p>Cargando estudiantes...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="panel">
        <p className="error-text">{error}</p>
      </section>
    );
  }

  if (!students.length) {
    return (
      <section className="panel">
        <p>No hay estudiantes que coincidan con la busqueda.</p>
      </section>
    );
  }

  return (
    <section className="panel post-list">
      {students.map((student) => (
        <article
          key={student.id}
          className={`post-card ${selectedStudentId === student.id ? 'selected' : ''}`}
        >
          <button type="button" onClick={() => onSelectStudent(student)}>
            <span className="post-card-id">Alumno #{student.id}</span>
            <strong>{student.nombre}</strong>
            <p>Grupo: {student.grupo}</p>
          </button>
        </article>
      ))}
    </section>
  );
}

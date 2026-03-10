import {
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  fetchStudents,
  createStudent,
  type Student,
  type StudentInput
} from '../lib/api';

export function useStudents(searchTerm: string) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false)

  async function reloadStudents() {
    try {
      setLoading(true);
      setError('');
      const data = await fetchStudents();
      setStudents(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Error al recargar estudiantes');
      throw loadError;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reloadStudents();
  }, []);

  async function createNewStudent(payload: StudentInput) {
    try {
      setSaving(true);
      setError('');
      const studentCreated = await createStudent(payload);
      setStudents((prev) => [studentCreated, ...prev]);
      return studentCreated;
    } catch(saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Error al crear estudiante')
      throw saveError;
    } finally {
      setSaving(false);
    }
  }

  const filteredStudents = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return students;

    return students.filter((student) => student.nombre.toLowerCase().includes(normalized));
  }, [students, searchTerm]);

  return {
    students,
    filteredStudents,
    loading,
    saving,
    error,
    reloadStudents,
    createNewStudent,
  };
}
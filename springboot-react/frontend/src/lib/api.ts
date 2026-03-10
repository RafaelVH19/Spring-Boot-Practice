export type Student = {
  id: number;
  nombre: string;
  grupo: string;
};

export type StudentInput = {
  nombre: string;
  grupo: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

async function handleResponse<T>(response: Response, defaultMessage: string): Promise<T> {
  if (!response.ok) {
    throw new Error(defaultMessage);
  }

  return response.json() as Promise<T>;
}

export async function fetchStudents(): Promise<Student[]> {
  const response = await fetch(`${API_BASE_URL}/api/items`);
  return handleResponse<Student[]>(response, 'No se pudieron cargar los estudiantes');
}

export async function createStudent(payload: StudentInput): Promise<Student> {
  const response = await fetch(`${API_BASE_URL}/api/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  return handleResponse<Student>(response,'No se pudo crear al estudiante')
}
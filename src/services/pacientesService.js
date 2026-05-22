import api from './api';

// Listar todos los pacientes
export const getPacientes = async () => {
    const response = await api.get('/pacientes');
    return response.data;
};

// Obtener paciente por ID
export const getPacienteById = async (id) => {
    const response = await api.get(`/pacientes/${id}`);
    return response.data;
};

// Buscar paciente por cédula
export const getPacienteByCedula = async (cedula) => {
    const response = await api.get(`/pacientes/cedula/${cedula}`);
    return response.data;
};

// Crear nuevo paciente
export const createPaciente = async (paciente) => {
    const response = await api.post('/pacientes', paciente);
    return response.data;
};

// Actualizar paciente
export const updatePaciente = async (id, paciente) => {
    const response = await api.put(`/pacientes/${id}`, paciente);
    return response.data;
};

// Eliminar paciente (soft delete)
export const deletePaciente = async (id) => {
    const response = await api.delete(`/pacientes/${id}`);
    return response.data;
};

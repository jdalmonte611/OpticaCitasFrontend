import api from './api';

// Listar todas las citas
export const getCitas = async () => {
    const response = await api.get('/citas');
    return response.data;
};

// Obtener cita por ID
export const getCitaById = async (id) => {
    const response = await api.get(`/citas/${id}`);
    return response.data;
};

// Citas de un paciente
export const getCitasPaciente = async (pacienteId) => {
    const response = await api.get(`/citas/paciente/${pacienteId}`);
    return response.data;
};

// Citas de un doctor
export const getCitasDoctor = async (doctorId) => {
    const response = await api.get(`/citas/doctor/${doctorId}`);
    return response.data;
};

// Citas por rango de fechas
export const getCitasByRange = async (startDate, endDate) => {
    const response = await api.get('/citas/rango', {
        params: {
            startDate,
            endDate,
        },
    });
    return response.data;
};

// Citas por estado
export const getCitasByEstado = async (estado) => {
    const response = await api.get(`/citas/estado/${estado}`);
    return response.data;
};

// Verificar disponibilidad del doctor
export const checkDisponibilidad = async (doctorId, startDate, endDate) => {
    const response = await api.get(`/citas/disponibilidad/${doctorId}`, {
        params: {
            startDate,
            endDate,
        },
    });
    return response.data;
};

// Crear nueva cita
export const createCita = async (cita) => {
    const response = await api.post('/citas', cita);
    return response.data;
};

// Actualizar cita completa
export const updateCita = async (id, cita) => {
    const response = await api.put(`/citas/${id}`, cita);
    return response.data;
};

// Actualizar solo el estado
export const updateCitaEstado = async (id, estado, notes = '') => {
    const response = await api.patch(`/citas/${id}/estado`, {
        state: estado,
        notes,
    });
    return response.data;
};

// Eliminar cita
export const deleteCita = async (id) => {
    const response = await api.delete(`/citas/${id}`);
    return response.data;
};

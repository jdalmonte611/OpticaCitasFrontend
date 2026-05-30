import api from './api';

/**
 * @typedef {Object} Cita
 * @property {number} id
 * @property {number} patientId
 * @property {string} patientName
 * @property {number} doctorId
 * @property {string} doctorName
 * @property {string} startedDate
 * @property {string} endedTime
 * @property {string} reason
 * @property {0|1|2|3} state
 * @property {string|null} [notes]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

export const CITA_ESTADOS = {
    PENDIENTE: 0,
    CONFIRMADA: 1,
    COMPLETADA: 2,
    CANCELADA: 3,
};

export const validateCitaPayload = (cita) => {
    const errors = [];
    const startedDate = cita.startedDate ? new Date(cita.startedDate) : null;
    const endedTime = cita.endedTime ? new Date(cita.endedTime) : null;

    if (!Number(cita.patientId)) errors.push('El paciente es obligatorio.');
    if (!Number(cita.doctorId)) errors.push('El doctor es obligatorio.');
    if (!cita.startedDate) errors.push('La fecha de inicio es obligatoria.');
    if (!cita.endedTime) errors.push('La fecha de fin es obligatoria.');
    if (!cita.reason?.trim()) errors.push('La razon de la cita es obligatoria.');
    if (startedDate && endedTime && endedTime <= startedDate) {
        errors.push('La hora de fin debe ser posterior a la hora de inicio.');
    }
    if (cita.state !== undefined && ![0, 1, 2, 3].includes(Number(cita.state))) {
        errors.push('El estado de la cita no es valido.');
    }

    if (errors.length > 0) {
        throw new Error(errors.join(' '));
    }
};

const normalizeCita = (cita) => ({
    ...cita,
    notes: cita.notes || '',
});

const toCitaPayload = (cita) => {
    const payload = {
        patientId: Number(cita.patientId),
        doctorId: Number(cita.doctorId),
        startedDate: new Date(cita.startedDate).toISOString(),
        endedTime: new Date(cita.endedTime).toISOString(),
        reason: cita.reason?.trim(),
        state: Number(cita.state ?? CITA_ESTADOS.PENDIENTE),
        notes: cita.notes?.trim() || '',
    };

    validateCitaPayload(payload);

    return payload;
};

export const getCitas = async (params = {}) => {
    const response = await api.get('/citas', { params });
    return response.data.map(normalizeCita);
};

export const getCitaById = async (id) => {
    const response = await api.get(`/citas/${id}`);
    return normalizeCita(response.data);
};

export const getCitasPaciente = async (pacienteId) => {
    const response = await api.get(`/citas/paciente/${pacienteId}`);
    return response.data.map(normalizeCita);
};

export const getCitasDoctor = async (doctorId, params = {}) => {
    const response = await api.get(`/citas/doctor/${doctorId}`, { params });
    return response.data.map(normalizeCita);
};

export const getCitasByRange = async (startDate, endDate) => getCitas({ startDate, endDate });

export const checkDisponibilidad = async ({ doctorId, startedDate, endedTime, appointmentId = 0 }) => {
    const response = await api.post('/citas/disponibilidad', {
        doctorId: Number(doctorId),
        startedDate: new Date(startedDate).toISOString(),
        endedTime: new Date(endedTime).toISOString(),
        appointmentId: Number(appointmentId || 0),
    });

    return response.data;
};

export const createCita = async (cita) => {
    const response = await api.post('/citas', toCitaPayload(cita));
    return normalizeCita(response.data);
};

export const updateCita = async (id, cita) => {
    const response = await api.put(`/citas/${id}`, toCitaPayload(cita));
    return normalizeCita(response.data);
};

export const updateCitaEstado = async (id, state) => {
    if (![0, 1, 2, 3].includes(Number(state))) {
        throw new Error('El estado de la cita no es valido.');
    }

    await api.patch(`/citas/${id}/estado`, { state: Number(state) });
};

export const deleteCita = async (id) => {
    await api.delete(`/citas/${id}`);
};

import api from './api';

/**
 * @typedef {Object} Paciente
 * @property {number} id
 * @property {string} name
 * @property {string} lastName
 * @property {string|null} [cedula]
 * @property {string} tel
 * @property {string|null} [email]
 * @property {boolean} active
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [fullName]
 */

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validatePacientePayload = (paciente) => {
    const errors = [];

    if (!paciente.name?.trim()) errors.push('El nombre es obligatorio.');
    if (!paciente.lastName?.trim()) errors.push('El apellido es obligatorio.');
    if (!paciente.tel?.trim()) errors.push('El telefono es obligatorio.');
    if (paciente.name?.length > 100) errors.push('El nombre no puede superar 100 caracteres.');
    if (paciente.lastName?.length > 100) errors.push('El apellido no puede superar 100 caracteres.');
    if (paciente.cedula?.length > 20) errors.push('La cedula no puede superar 20 caracteres.');
    if (paciente.tel?.length > 20) errors.push('El telefono no puede superar 20 caracteres.');
    if (paciente.email?.length > 150) errors.push('El email no puede superar 150 caracteres.');
    if (paciente.email && !emailPattern.test(paciente.email)) errors.push('El email no tiene un formato valido.');

    if (errors.length > 0) {
        throw new Error(errors.join(' '));
    }
};

const toPacientePayload = (paciente) => {
    validatePacientePayload(paciente);

    const payload = {
        name: paciente.name.trim(),
        lastName: paciente.lastName.trim(),
        tel: paciente.tel.trim(),
    };

    if (paciente.cedula?.trim()) {
        payload.cedula = paciente.cedula.trim();
    }

    if (paciente.email?.trim()) {
        payload.email = paciente.email.trim();
    }

    return payload;
};

const normalizePaciente = (paciente) => ({
    ...paciente,
    cedula: paciente.cedula || '',
    email: paciente.email || '',
    fullName: `${paciente.name || ''} ${paciente.lastName || ''}`.trim(),
});

export const getPacientes = async () => {
    const response = await api.get('/pacientes');
    return response.data.map(normalizePaciente);
};

export const getPacienteById = async (id) => {
    const response = await api.get(`/pacientes/${id}`);
    return normalizePaciente(response.data);
};

export const getPacienteByCedula = async (cedula) => {
    const response = await api.get(`/pacientes/cedula/${encodeURIComponent(cedula)}`);
    return normalizePaciente(response.data);
};

export const createPaciente = async (paciente) => {
    const response = await api.post('/pacientes', toPacientePayload(paciente));
    return normalizePaciente(response.data);
};

export const updatePaciente = async (id, paciente) => {
    const response = await api.put(`/pacientes/${id}`, toPacientePayload(paciente));
    return normalizePaciente(response.data);
};

export const deletePaciente = async (id) => {
    await api.delete(`/pacientes/${id}`);
};

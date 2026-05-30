import api from './api';

/**
 * @typedef {Object} Usuario
 * @property {number} id
 * @property {string} name
 * @property {string} lastName
 * @property {string} email
 * @property {0|1} rol
 * @property {boolean} active
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [fullName]
 */

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateUsuarioPayload = (usuario, { requirePassword = false } = {}) => {
    const errors = [];

    if (!usuario.name?.trim()) errors.push('El nombre es obligatorio.');
    if (!usuario.lastName?.trim()) errors.push('El apellido es obligatorio.');
    if (!usuario.email?.trim()) errors.push('El email es obligatorio.');
    if (usuario.email && !emailPattern.test(usuario.email)) errors.push('El email no tiene un formato valido.');
    if (![0, 1].includes(Number(usuario.rol))) errors.push('El rol debe ser 0=Admin o 1=Doctor.');
    if (requirePassword && !usuario.password?.trim()) errors.push('La contrasena es obligatoria.');
    if (usuario.password && usuario.password.length < 6) errors.push('La contrasena debe tener minimo 6 caracteres.');

    if (errors.length > 0) {
        throw new Error(errors.join(' '));
    }
};

const normalizeUsuario = (usuario) => ({
    ...usuario,
    fullName: `${usuario.name || ''} ${usuario.lastName || ''}`.trim(),
});

const toCreateUsuarioPayload = (usuario) => {
    validateUsuarioPayload(usuario, { requirePassword: true });

    return {
        name: usuario.name.trim(),
        lastName: usuario.lastName.trim(),
        email: usuario.email.trim(),
        password: usuario.password,
        rol: Number(usuario.rol),
    };
};

const toUpdateUsuarioPayload = (usuario) => {
    validateUsuarioPayload(usuario);

    return {
        name: usuario.name.trim(),
        lastName: usuario.lastName.trim(),
        email: usuario.email.trim(),
        rol: Number(usuario.rol),
        active: usuario.active ?? true,
    };
};

export const getUsuarios = async (params = {}) => {
    const response = await api.get('/usuarios', { params });
    return response.data.map(normalizeUsuario);
};

export const getUsuarioById = async (id) => {
    const response = await api.get(`/usuarios/${id}`);
    return normalizeUsuario(response.data);
};

export const getDoctores = async () => {
    const response = await api.get('/usuarios/doctores');
    return response.data.map(normalizeUsuario);
};

export const createUsuario = async (usuario) => {
    const response = await api.post('/usuarios', toCreateUsuarioPayload(usuario));
    return normalizeUsuario(response.data);
};

export const updateUsuario = async (id, usuario) => {
    const response = await api.put(`/usuarios/${id}`, toUpdateUsuarioPayload(usuario));
    return normalizeUsuario(response.data);
};

export const cambiarContrasena = async (id, newPassword) => {
    if (!newPassword || newPassword.length < 6) {
        throw new Error('La nueva contrasena debe tener minimo 6 caracteres.');
    }

    await api.patch(`/usuarios/${id}/password`, { newPassword });
};

export const changeUsuarioPassword = cambiarContrasena;

export const deleteUsuario = async (id) => {
    await api.delete(`/usuarios/${id}`);
};

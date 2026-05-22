import api from './api';

// Listar todos los usuarios
export const getUsuarios = async () => {
    const response = await api.get('/usuarios');
    return response.data;
};

// Obtener usuario por ID
export const getUsuarioById = async (id) => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
};

// Buscar usuario por email
export const getUsuarioByEmail = async (email) => {
    const response = await api.get(`/usuarios/email/${email}`);
    return response.data;
};

// Obtener usuarios por rol
export const getUsuariosByRol = async (rolId) => {
    const response = await api.get(`/usuarios/rol/${rolId}`);
    return response.data;
};

// Obtener solo doctores
export const getDoctores = async () => {
    const response = await api.get('/usuarios/doctores');
    return response.data;
};

// Crear nuevo usuario
export const createUsuario = async (usuario) => {
    const response = await api.post('/usuarios', usuario);
    return response.data;
};

// Actualizar usuario
export const updateUsuario = async (id, usuario) => {
    const response = await api.put(`/usuarios/${id}`, usuario);
    return response.data;
};

// Cambiar contraseña
export const cambiarContrasena = async (id, currentPassword, newPassword) => {
    const response = await api.patch(`/usuarios/${id}/cambiar-contrasena`, {
        currentPassword,
        newPassword,
    });
    return response.data;
};

// Eliminar usuario (soft delete)
export const deleteUsuario = async (id) => {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
};

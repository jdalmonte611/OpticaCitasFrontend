import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { createUsuario, updateUsuario } from '../../services/usuariosService';

const ROLES = {
    1: 'Admin',
    2: 'Secretaria',
    3: 'Doctor',
};

export default function UsuarioForm({ open, onClose, usuario = null, onSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        rol: 3,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (usuario) {
            setFormData({
                name: usuario.name || '',
                lastName: usuario.lastName || '',
                email: usuario.email || '',
                password: '',
                rol: usuario.rol || 3,
            });
        } else {
            setFormData({
                name: '',
                lastName: '',
                email: '',
                password: '',
                rol: 3,
            });
        }
        setError(null);
    }, [usuario, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!formData.name || !formData.lastName || !formData.email) {
                setError('Los campos requeridos deben estar completos');
                return;
            }

            if (!usuario?.id && !formData.password) {
                setError('La contraseña es requerida para nuevos usuarios');
                return;
            }

            const dataToSend = { ...formData };
            if (!usuario?.id) {
                // Para crear usuario
                dataToSend.rol = parseInt(formData.rol);
            } else {
                // Para actualizar, no enviamos contraseña
                delete dataToSend.password;
            }

            if (usuario?.id) {
                await updateUsuario(usuario.id, dataToSend);
            } else {
                await createUsuario(dataToSend);
            }

            onSuccess?.();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar el usuario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {usuario?.id ? 'Editar Usuario' : 'Nuevo Usuario'}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField
                        label="Nombre"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Apellido"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    {!usuario?.id && (
                        <TextField
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    )}

                    <FormControl fullWidth required>
                        <InputLabel>Rol</InputLabel>
                        <Select
                            name="rol"
                            value={formData.rol}
                            onChange={handleChange}
                            label="Rol"
                        >
                            <MenuItem value={1}>Admin</MenuItem>
                            <MenuItem value={2}>Secretaria</MenuItem>
                            <MenuItem value={3}>Doctor</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? 'Guardando...' : 'Guardar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

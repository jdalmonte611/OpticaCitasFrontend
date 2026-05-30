import { useState } from 'react';
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
import { getErrorMessage } from '../../services/api';

const emptyUsuarioForm = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    rol: 1,
};

const getUsuarioFormData = (usuario) => {
    if (!usuario) {
        return emptyUsuarioForm;
    }

    return {
        name: usuario.name || '',
        lastName: usuario.lastName || '',
        email: usuario.email || '',
        password: '',
        rol: usuario.rol ?? 1,
    };
};

export default function UsuarioForm({ open, onClose, usuario = null, onSuccess }) {
    const [formData, setFormData] = useState(() => getUsuarioFormData(usuario));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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
            setSuccess(null);

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
                dataToSend.rol = parseInt(formData.rol);
            } else {
                delete dataToSend.password;
            }

            if (usuario?.id) {
                await updateUsuario(usuario.id, dataToSend);
            } else {
                await createUsuario(dataToSend);
            }

            onSuccess?.();
            setSuccess('Usuario guardado correctamente.');
            onClose();
        } catch (err) {
            setError(getErrorMessage(err, 'Error al guardar el usuario'));
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
                    {success && <Alert severity="success">{success}</Alert>}

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
                            <MenuItem value={0}>Administrador</MenuItem>
                            <MenuItem value={1}>Doctor</MenuItem>
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

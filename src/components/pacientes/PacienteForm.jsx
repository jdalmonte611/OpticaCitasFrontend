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
} from '@mui/material';
import { createPaciente, updatePaciente } from '../../services/pacientesService';

export default function PacienteForm({ open, onClose, paciente = null, onSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        cedula: '',
        tel: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (paciente) {
            setFormData({
                name: paciente.name || '',
                lastName: paciente.lastName || '',
                cedula: paciente.cedula || '',
                tel: paciente.tel || '',
                email: paciente.email || '',
            });
        } else {
            setFormData({
                name: '',
                lastName: '',
                cedula: '',
                tel: '',
                email: '',
            });
        }
        setError(null);
    }, [paciente, open]);

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

            if (!formData.name || !formData.lastName || !formData.cedula) {
                setError('Los campos requeridos deben estar completos');
                return;
            }

            if (paciente?.id) {
                await updatePaciente(paciente.id, formData);
            } else {
                await createPaciente(formData);
            }

            onSuccess?.();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar el paciente');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {paciente?.id ? 'Editar Paciente' : 'Nuevo Paciente'}
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
                        label="Cédula"
                        name="cedula"
                        value={formData.cedula}
                        onChange={handleChange}
                        fullWidth
                        required
                        placeholder="001-1234567-8"
                    />
                    <TextField
                        label="Teléfono"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                    />
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

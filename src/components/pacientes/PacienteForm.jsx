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
} from '@mui/material';
import { createPaciente, updatePaciente } from '../../services/pacientesService';
import { getErrorMessage } from '../../services/api';

const emptyPacienteForm = {
    name: '',
    lastName: '',
    cedula: '',
    tel: '',
    email: '',
};

const getPacienteFormData = (paciente) => {
    if (!paciente) {
        return emptyPacienteForm;
    }

    return {
        name: paciente.name || '',
        lastName: paciente.lastName || '',
        cedula: paciente.cedula || '',
        tel: paciente.tel || '',
        email: paciente.email || '',
    };
};

export default function PacienteForm({ open, onClose, paciente = null, onSuccess }) {
    const [formData, setFormData] = useState(() => getPacienteFormData(paciente));
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

            if (!formData.name || !formData.lastName || !formData.tel) {
                setError('Los campos requeridos deben estar completos. Teléfono es obligatorio.');
                return;
            }

            if (paciente?.id) {
                await updatePaciente(paciente.id, formData);
            } else {
                await createPaciente(formData);
            }

            onSuccess?.();
            setSuccess('Paciente guardado correctamente.');
            onClose();
        } catch (err) {
            setError(getErrorMessage(err, 'Error al guardar el paciente'));
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
                        label="Cédula"
                        name="cedula"
                        value={formData.cedula}
                        onChange={handleChange}
                        fullWidth
                        placeholder="001-1234567-8"
                        helperText="Opcional"
                    />
                    <TextField
                        label="Teléfono"
                        name="tel"
                        value={formData.tel}
                        onChange={handleChange}
                        fullWidth
                        required
                        type="tel"
                        placeholder="+1 555 123 4567"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        helperText="Opcional"
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

import { useState, useEffect } from 'react';
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
    CircularProgress,
    Typography,
    Paper,
} from '@mui/material';
import { createCita, updateCita, checkDisponibilidad } from '../../services/citasService';
import { getPacientes } from '../../services/pacientesService';
import { getDoctores } from '../../services/usuariosService';
import { getErrorMessage } from '../../services/api';
import { format, addMinutes, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const emptyCitaForm = {
    patientId: '',
    doctorId: '',
    startedDate: '',
    duracionMinutos: 30,
    reason: '',
    notes: '',
};

const getCitaFormData = (cita) => {
    if (!cita) {
        return emptyCitaForm;
    }

    let duracion = 30;
    if (cita.startedDate && cita.endedTime) {
        const start = parseISO(cita.startedDate);
        const end = parseISO(cita.endedTime);
        duracion = Math.round((end - start) / (1000 * 60));
    }

    return {
        patientId: cita.patientId,
        doctorId: cita.doctorId,
        startedDate: cita.startedDate?.slice(0, 16) || '',
        duracionMinutos: duracion,
        reason: cita.reason || '',
        notes: cita.notes || '',
    };
};

export default function CitaForm({ open, onClose, cita = null, onSuccess }) {
    const [formData, setFormData] = useState(() => getCitaFormData(cita));
    const [pacientes, setPacientes] = useState([]);
    const [doctores, setDoctores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState(null);
    const [disponibilidad, setDisponibilidad] = useState(null);
    const endTimePreview = formData.startedDate && formData.duracionMinutos
        ? addMinutes(new Date(formData.startedDate), parseInt(formData.duracionMinutos))
        : null;

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoadingData(true);
                const [pacientesData, doctoresData] = await Promise.all([
                    getPacientes(),
                    getDoctores(),
                ]);
                setPacientes(pacientesData);
                setDoctores(doctoresData);
            } catch {
                setError('Error al cargar datos');
            } finally {
                setLoadingData(false);
            }
        };

        if (open) {
            loadData();
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'duracionMinutos' ? parseInt(value) : value,
        }));
    };

    const verificarDisponibilidad = async () => {
        if (!formData.doctorId || !formData.startedDate || !formData.duracionMinutos) {
            setError('Completa doctor, fecha/hora de inicio y duración');
            return;
        }

        try {
            setLoading(true);
            const startDate = new Date(formData.startedDate);
            const endDate = addMinutes(startDate, formData.duracionMinutos);

            const result = await checkDisponibilidad({
                doctorId: formData.doctorId,
                startedDate: startDate.toISOString(),
                endedTime: endDate.toISOString(),
                appointmentId: cita?.id || 0,
            });

            setDisponibilidad(result.isAvailable);
            if (result.isAvailable) {
                setError(null);
            } else {
                setError(result.message || 'El doctor no está disponible en ese horario');
            }
        } catch (err) {
            setError(getErrorMessage(err, 'Error al verificar disponibilidad'));
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!formData.patientId || !formData.doctorId || !formData.startedDate || !formData.reason) {
                setError('Completa todos los campos requeridos');
                return;
            }

            if (disponibilidad === false) {
                setError('Doctor no disponible. Verifica el horario');
                return;
            }

            if (!cita && disponibilidad !== true) {
                setError('Debes verificar disponibilidad antes de guardar');
                return;
            }

            const startDate = new Date(formData.startedDate);
            const endDate = addMinutes(startDate, formData.duracionMinutos);

            const citaData = {
                patientId: parseInt(formData.patientId),
                doctorId: parseInt(formData.doctorId),
                startedDate: startDate.toISOString(),
                endedTime: endDate.toISOString(),
                reason: formData.reason,
                state: cita?.state ?? 0,
                notes: formData.notes,
            };

            if (cita?.id) {
                await updateCita(cita.id, citaData);
            } else {
                await createCita(citaData);
            }

            onSuccess?.();
            onClose();
        } catch (err) {
            setError(getErrorMessage(err, 'Error al guardar la cita'));
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.3rem', pb: 1 }}>
                {cita?.id ? '✏️ Editar Cita' : '📅 Nueva Cita Médica'}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 2 }}>
                    {error && (
                        <Alert severity="error" sx={{ fontWeight: 'bold' }}>
                            {error}
                        </Alert>
                    )}

                    {disponibilidad === true && (
                        <Alert severity="success" sx={{ fontWeight: 'bold' }}>
                            ✓ Doctor disponible en este horario
                        </Alert>
                    )}

                    {/* Paciente */}
                    <FormControl fullWidth required>
                        <InputLabel>Selecciona Paciente</InputLabel>
                        <Select
                            name="patientId"
                            value={formData.patientId}
                            onChange={handleChange}
                            label="Selecciona Paciente"
                        >
                            {pacientes.map((p) => (
                                <MenuItem key={p.id} value={p.id}>
                                    👤 {p.fullName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Doctor */}
                    <FormControl fullWidth required>
                        <InputLabel>Selecciona Doctor</InputLabel>
                        <Select
                            name="doctorId"
                            value={formData.doctorId}
                            onChange={handleChange}
                            label="Selecciona Doctor"
                        >
                            {doctores.map((d) => (
                                <MenuItem key={d.id} value={d.id}>
                                    👨‍⚕️ {d.fullName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Fecha y Hora de Inicio */}
                    <TextField
                        label="Fecha y Hora de Inicio"
                        name="startedDate"
                        type="datetime-local"
                        value={formData.startedDate}
                        onChange={handleChange}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 1.5
                            }
                        }}
                    />

                    {/* Duración en Minutos */}
                    <FormControl fullWidth required>
                        <InputLabel>⏱️ Duración de la Cita (minutos)</InputLabel>
                        <Select
                            name="duracionMinutos"
                            value={formData.duracionMinutos}
                            onChange={handleChange}
                            label="⏱️ Duración de la Cita (minutos)"
                        >
                            <MenuItem value={15}>15 minutos</MenuItem>
                            <MenuItem value={30}>30 minutos</MenuItem>
                            <MenuItem value={45}>45 minutos</MenuItem>
                            <MenuItem value={60}>1 hora</MenuItem>
                            <MenuItem value={90}>1 hora 30 minutos</MenuItem>
                            <MenuItem value={120}>2 horas</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Preview de Hora de Fin */}
                    {endTimePreview && (
                        <Paper
                            sx={{
                                p: 2,
                                backgroundColor: '#f5f5f5',
                                border: '2px solid #e0e0e0',
                                borderRadius: 1.5
                            }}
                        >
                            <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.5 }}>
                                Hora de Fin (Automática):
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    color: '#1976d2'
                                }}
                            >
                                {format(endTimePreview, 'PPpp', { locale: es })}
                            </Typography>
                        </Paper>
                    )}

                    {/* Verificar Disponibilidad */}
                    <Button
                        variant={disponibilidad === true ? "contained" : "outlined"}
                        onClick={verificarDisponibilidad}
                        disabled={loading || !formData.doctorId || !formData.startedDate}
                        sx={{
                            py: 1.2,
                            fontWeight: 'bold',
                            borderRadius: 1.5
                        }}
                    >
                        {loading ? '⏳ Verificando...' : '🔍 Verificar Disponibilidad'}
                    </Button>

                    {/* Razón de Consulta */}
                    <TextField
                        label="Razón de la Consulta"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        fullWidth
                        required
                        placeholder="Ej: Examen de vista, Cambio de lentes, etc."
                    />

                    {/* Notas */}
                    <TextField
                        label="Notas Adicionales"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Información relevante sobre la cita..."
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} sx={{ textTransform: 'capitalize' }}>
                    Cancelar
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading || (disponibilidad === false)}
                    sx={{
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                        borderRadius: 1,
                        px: 3
                    }}
                >
                    {loading ? '⏳ Guardando...' : cita?.id ? '✓ Actualizar' : '✓ Crear Cita'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

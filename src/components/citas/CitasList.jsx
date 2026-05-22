import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    TextField,
    CircularProgress,
    Alert,
    IconButton,
    TablePagination,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getCitas, deleteCita, updateCitaEstado } from '../../services/citasService';
import CitaForm from './CitaForm';
import { format, parseISO, differenceInMinutes } from 'date-fns';
import { es } from 'date-fns/locale';

const ESTADOS = {
    1: { label: 'Pendiente', color: 'warning', icon: '⏳' },
    2: { label: 'Confirmada', color: 'success', icon: '✓' },
    3: { label: 'Atendida', color: 'info', icon: '👁️' },
    4: { label: 'Cancelada', color: 'error', icon: '✗' },
    5: { label: 'Desestimada', color: 'default', icon: '-' },
    6: { label: 'Completada', color: 'success', icon: '✓✓' },
};

export default function CitasList() {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [selectedCita, setSelectedCita] = useState(null);
    const [filterEstado, setFilterEstado] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const loadCitas = async () => {
        try {
            setLoading(true);
            const data = await getCitas();
            setCitas(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar citas');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCitas();
    }, []);

    const handleEdit = (cita) => {
        setSelectedCita(cita);
        setFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar esta cita?')) {
            try {
                await deleteCita(id);
                loadCitas();
            } catch (err) {
                setError('Error al eliminar cita');
            }
        }
    };

    const handleChangeEstado = async (citaId, nuevoEstado) => {
        try {
            await updateCitaEstado(citaId, nuevoEstado);
            loadCitas();
        } catch (err) {
            setError('Error al actualizar estado');
        }
    };

    const handleAddNew = () => {
        setSelectedCita(null);
        setFormOpen(true);
    };

    const filteredCitas = filterEstado
        ? citas.filter((c) => c.state === parseInt(filterEstado))
        : citas;

    const paginatedCitas = filteredCitas.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    if (loading) return <CircularProgress />;

    return (
        <Box sx={{ width: '100%' }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {/* Toolbar */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { sm: 'center' },
                    flexWrap: 'wrap'
                }}
            >
                <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
                    <InputLabel>📊 Filtrar por Estado</InputLabel>
                    <Select
                        value={filterEstado}
                        onChange={(e) => {
                            setFilterEstado(e.target.value);
                            setPage(0);
                        }}
                        label="📊 Filtrar por Estado"
                    >
                        <MenuItem value="">Todos ({filteredCitas.length})</MenuItem>
                        {Object.entries(ESTADOS).map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                                {value.icon} {value.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddNew}
                    sx={{
                        ml: { sm: 'auto' },
                        backgroundColor: '#388e3c',
                        fontWeight: 'bold',
                        py: 1.2,
                        px: 3,
                        '&:hover': {
                            backgroundColor: '#2e7d32'
                        }
                    }}
                >
                    📅 Nueva Cita
                </Button>
            </Box>

            {/* Tabla */}
            <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow sx={{ borderBottom: '3px solid #e0e0e0' }}>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}>👤 Paciente</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}>👨‍⚕️ Doctor</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}>📅 Fecha</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}>⏱️ Duración</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}>📝 Razón</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}>📊 Estado</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}>⚙️ Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedCitas.length > 0 ? (
                            paginatedCitas.map((cita) => {
                                const duracionMinutos = differenceInMinutes(
                                    parseISO(cita.endedTime),
                                    parseISO(cita.startedDate)
                                );
                                const estadoInfo = ESTADOS[cita.state] || { label: 'N/A', color: 'default', icon: '?' };

                                return (
                                    <TableRow
                                        key={cita.id}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#f9f9f9',
                                            },
                                            borderBottom: '1px solid #e0e0e0'
                                        }}
                                    >
                                        <TableCell>
                                            <Box>
                                                <strong>{cita.patientName}</strong>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ color: '#1976d2', fontWeight: '600' }}>
                                                {cita.doctorName}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ fontSize: '0.9rem' }}>
                                                <strong>{format(parseISO(cita.startedDate), 'dd/MM/yyyy', { locale: es })}</strong>
                                                <br />
                                                <span style={{ color: '#666' }}>
                                                    {format(parseISO(cita.startedDate), 'HH:mm', { locale: es })}
                                                </span>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={`${duracionMinutos} min`}
                                                size="small"
                                                variant="outlined"
                                                sx={{ fontWeight: 'bold' }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {cita.reason}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Select
                                                value={cita.state}
                                                onChange={(e) =>
                                                    handleChangeEstado(cita.id, e.target.value)
                                                }
                                                size="small"
                                                sx={{
                                                    minWidth: 140,
                                                    fontWeight: 'bold',
                                                    '& .MuiOutlinedInput-input': {
                                                        py: 0.8
                                                    }
                                                }}
                                            >
                                                {Object.entries(ESTADOS).map(([key, value]) => (
                                                    <MenuItem key={key} value={parseInt(key)}>
                                                        {value.icon} {value.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Stack direction="row" spacing={0.5} justifyContent="center">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleEdit(cita)}
                                                    sx={{
                                                        color: '#1976d2',
                                                        '&:hover': { backgroundColor: '#e3f2fd' }
                                                    }}
                                                    title="Editar cita"
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDelete(cita.id)}
                                                    sx={{
                                                        color: '#d32f2f',
                                                        '&:hover': { backgroundColor: '#ffebee' }
                                                    }}
                                                    title="Eliminar cita"
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                    <Box sx={{ color: '#999' }}>
                                        <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>📭 No hay citas</p>
                                        <p>Comienza creando una nueva cita</p>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Paginación */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={filteredCitas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
                sx={{
                    backgroundColor: '#f9f9f9',
                    borderTop: '1px solid #e0e0e0'
                }}
            />

            {/* Modal */}
            <CitaForm
                open={formOpen}
                onClose={() => {
                    setFormOpen(false);
                    setSelectedCita(null);
                }}
                cita={selectedCita}
                onSuccess={loadCitas}
            />
        </Box>
    );
}

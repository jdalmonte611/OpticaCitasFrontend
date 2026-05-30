import { useState, useEffect } from 'react';
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
    Stack,
    InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { getPacientes, deletePaciente } from '../../services/pacientesService';
import { getErrorMessage } from '../../services/api';
import PacienteForm from './PacienteForm';

export default function PacientesList() {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const loadPacientes = async () => {
        try {
            setLoading(true);
            const data = await getPacientes();
            setPacientes(data);
            setError(null);
        } catch (err) {
            setError(getErrorMessage(err, 'Error al cargar pacientes'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            loadPacientes();
        }, 0);

        return () => window.clearTimeout(timeoutId);
    }, []);

    const handleEdit = (paciente) => {
        setSelectedPaciente(paciente);
        setFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar este paciente?')) {
            try {
                await deletePaciente(id);
                loadPacientes();
            } catch (err) {
                setError(getErrorMessage(err, 'Error al eliminar paciente'));
            }
        }
    };

    const handleAddNew = () => {
        setSelectedPaciente(null);
        setFormOpen(true);
    };

    const filteredPacientes = pacientes.filter(
        (p) =>
            p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.cedula?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedPacientes = filteredPacientes.slice(
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
                <TextField
                    placeholder="🔍 Buscar por nombre o cédula..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPage(0);
                    }}
                    sx={{ flex: 1, minWidth: { xs: '100%', sm: 200 } }}
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: '#1976d2' }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddNew}
                    sx={{
                        backgroundColor: '#1976d2',
                        fontWeight: 'bold',
                        py: 1.2,
                        px: 3,
                        '&:hover': {
                            backgroundColor: '#1565c0'
                        }
                    }}
                >
                    ➕ Nuevo Paciente
                </Button>
            </Box>

            {/* Tabla */}
            <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow sx={{ borderBottom: '3px solid #e0e0e0' }}>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#1976d2' }}>
                                👤 Nombre Completo
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#1976d2' }}>
                                🆔 Cédula
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#1976d2' }}>
                                📱 Teléfono
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#1976d2' }}>
                                ✉️ Email
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#1976d2' }}>
                                ⚙️ Acciones
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedPacientes.length > 0 ? (
                            paginatedPacientes.map((paciente) => (
                                <TableRow
                                    key={paciente.id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#f9f9f9',
                                        },
                                        borderBottom: '1px solid #e0e0e0',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <TableCell sx={{ fontWeight: '600' }}>
                                        {paciente.fullName}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ fontFamily: 'monospace', fontWeight: '500' }}>
                                            {paciente.cedula || '-'}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ color: '#666' }}>
                                            {paciente.tel || '-'}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ color: '#1976d2', fontSize: '0.9rem' }}>
                                            {paciente.email || '-'}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={0.5} justifyContent="center">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEdit(paciente)}
                                                sx={{
                                                    color: '#1976d2',
                                                    '&:hover': { backgroundColor: '#e3f2fd' }
                                                }}
                                                title="Editar paciente"
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDelete(paciente.id)}
                                                sx={{
                                                    color: '#d32f2f',
                                                    '&:hover': { backgroundColor: '#ffebee' }
                                                }}
                                                title="Eliminar paciente"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                    <Box sx={{ color: '#999' }}>
                                        <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>📭 No hay pacientes</p>
                                        <p>Comienza agregando un nuevo paciente</p>
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
                count={filteredPacientes.length}
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
            {formOpen && (
                <PacienteForm
                    key={selectedPaciente?.id || 'new-paciente'}
                    open={formOpen}
                    onClose={() => {
                        setFormOpen(false);
                        setSelectedPaciente(null);
                    }}
                    paciente={selectedPaciente}
                    onSuccess={loadPacientes}
                />
            )}
        </Box>
    );
}

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
    Chip,
    Stack,
    InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { getUsuarios, deleteUsuario } from '../../services/usuariosService';
import UsuarioForm from './UsuarioForm';

const ROLES = {
    1: { label: '🔐 Admin', color: 'error', icon: '🔐' },
    2: { label: '👩‍💼 Secretaria', color: 'warning', icon: '👩‍💼' },
    3: { label: '👨‍⚕️ Doctor', color: 'success', icon: '👨‍⚕️' },
};

export default function UsuariosList() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const loadUsuarios = async () => {
        try {
            setLoading(true);
            const data = await getUsuarios();
            setUsuarios(data.filter((u) => u.active !== false));
            setError(null);
        } catch (err) {
            setError('Error al cargar usuarios');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsuarios();
    }, []);

    const handleEdit = (usuario) => {
        setSelectedUsuario(usuario);
        setFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Desactivar este usuario?')) {
            try {
                await deleteUsuario(id);
                loadUsuarios();
            } catch (err) {
                setError('Error al desactivar usuario');
            }
        }
    };

    const handleAddNew = () => {
        setSelectedUsuario(null);
        setFormOpen(true);
    };

    const filteredUsuarios = usuarios.filter(
        (u) =>
            u.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedUsuarios = filteredUsuarios.slice(
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
                    placeholder="🔍 Buscar por nombre o email..."
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
                                <SearchIcon sx={{ color: '#d32f2f' }} />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddNew}
                    sx={{
                        backgroundColor: '#d32f2f',
                        fontWeight: 'bold',
                        py: 1.2,
                        px: 3,
                        '&:hover': {
                            backgroundColor: '#c62828'
                        }
                    }}
                >
                    ➕ Nuevo Usuario
                </Button>
            </Box>

            {/* Tabla */}
            <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow sx={{ borderBottom: '3px solid #e0e0e0' }}>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#d32f2f' }}>
                                👤 Nombre Completo
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#d32f2f' }}>
                                ✉️ Email
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#d32f2f' }}>
                                🎯 Rol
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#d32f2f' }}>
                                ⚙️ Acciones
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsuarios.length > 0 ? (
                            paginatedUsuarios.map((usuario) => (
                                <TableRow
                                    key={usuario.id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#fafafa',
                                        },
                                        borderBottom: '1px solid #e0e0e0',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <TableCell sx={{ fontWeight: '600' }}>
                                        {usuario.fullName}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ color: '#d32f2f', fontSize: '0.9rem' }}>
                                            {usuario.email}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={ROLES[usuario.rol]?.label || 'N/A'}
                                            color={ROLES[usuario.rol]?.color || 'default'}
                                            size="small"
                                            variant="filled"
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '0.85rem'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={0.5} justifyContent="center">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEdit(usuario)}
                                                sx={{
                                                    color: '#d32f2f',
                                                    '&:hover': { backgroundColor: '#ffebee' }
                                                }}
                                                title="Editar usuario"
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDelete(usuario.id)}
                                                sx={{
                                                    color: '#c62828',
                                                    '&:hover': { backgroundColor: '#ffcdd2' }
                                                }}
                                                title="Desactivar usuario"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                                    <Box sx={{ color: '#999' }}>
                                        <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>📭 No hay usuarios</p>
                                        <p>Comienza agregando un nuevo usuario</p>
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
                count={filteredUsuarios.length}
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
            <UsuarioForm
                open={formOpen}
                onClose={() => {
                    setFormOpen(false);
                    setSelectedUsuario(null);
                }}
                usuario={selectedUsuario}
                onSuccess={loadUsuarios}
            />
        </Box>
    );
}

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    MenuItem,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { PageHeader, SectionCard, StatusPill } from '../components/common/DashboardWidgets';

const users = [
    { name: 'Alejandro Valencia', email: 'ale.valencia@optica.com', role: 'Admin', status: 'Activo' },
    { name: 'Mariana Ruiz', email: 'm.ruiz@optica.com', role: 'Secretaria', status: 'Activo' },
    { name: 'Jorge Lopez', email: 'jorge.lopez@optica.com', role: 'Doctor', status: 'Inactivo' },
];

export default function ConfiguracionPage() {
    return (
        <Box>
            <PageHeader
                eyebrow="Administracion"
                title="Configuracion"
                description="Administra parametros generales de la clinica y equipo."
                actionLabel="Guardar cambios"
                actionIcon={<SaveIcon />}
            />

            <Grid container spacing={2.5}>
                <Grid item xs={12} lg={6}>
                    <SectionCard title="Datos de la optica">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth size="small" label="Nombre de la clinica" defaultValue="Optica Central Citas" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth size="small" label="Telefono" defaultValue="+52 (55) 1234-5678" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    size="small"
                                    label="Direccion"
                                    defaultValue="Av. Insurgentes Sur 456, Col. Roma Norte, Ciudad de Mexico"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        border: '1px dashed #9fb4c9',
                                        borderRadius: 2,
                                        p: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 2,
                                    }}
                                >
                                    <Box>
                                        <Typography sx={{ fontWeight: 900 }}>Logo de la optica</Typography>
                                        <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>PNG o JPG, maximo 2MB.</Typography>
                                    </Box>
                                    <Button variant="outlined">Subir logo</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </SectionCard>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <SectionCard title="Citas">
                        <Stack spacing={2}>
                            <Select fullWidth size="small" defaultValue="30">
                                <MenuItem value="20">20 minutos</MenuItem>
                                <MenuItem value="30">30 minutos</MenuItem>
                                <MenuItem value="45">45 minutos</MenuItem>
                                <MenuItem value="60">60 minutos</MenuItem>
                            </Select>
                            <Alert severity="info">
                                Esta duracion afecta la visualizacion de bloques en calendario y disponibilidad.
                            </Alert>
                            <TextField fullWidth size="small" label="Recordatorio automatico" defaultValue="24 horas antes" />
                        </Stack>
                    </SectionCard>
                </Grid>

                <Grid item xs={12} md={5}>
                    <SectionCard title="Horario laboral">
                        <Stack spacing={1.5}>
                            {[
                                ['Lunes - Viernes', '09:00 AM a 07:00 PM'],
                                ['Sabado', '10:00 AM a 02:00 PM'],
                                ['Domingo', 'Cerrado'],
                            ].map(([day, time]) => (
                                <Stack key={day} direction="row" justifyContent="space-between">
                                    <Typography sx={{ fontWeight: 800 }}>{day}</Typography>
                                    <Typography sx={{ color: time === 'Cerrado' ? 'error.main' : 'text.secondary' }}>{time}</Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </SectionCard>
                </Grid>

                <Grid item xs={12} md={7}>
                    <SectionCard title="Usuarios y roles" action={<Button size="small">Invitar usuario</Button>}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Usuario</TableCell>
                                    <TableCell>Rol</TableCell>
                                    <TableCell>Estado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.email} hover>
                                        <TableCell>
                                            <Typography sx={{ fontWeight: 900, fontSize: 13 }}>{user.name}</Typography>
                                            <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{user.email}</Typography>
                                        </TableCell>
                                        <TableCell><StatusPill label={user.role} tone={user.role === 'Admin' ? 'info' : 'neutral'} /></TableCell>
                                        <TableCell><StatusPill label={user.status} tone={user.status === 'Activo' ? 'success' : 'neutral'} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </SectionCard>
                </Grid>

                <Grid item xs={12}>
                    <Card sx={{ borderColor: '#ffc9c9', bgcolor: '#fff7f7' }}>
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                            <Box>
                                <Typography sx={{ color: 'error.main', fontWeight: 900 }}>Zona de riesgo</Typography>
                                <Typography sx={{ color: 'error.main', fontSize: 13 }}>
                                    Las acciones aqui son permanentes y afectan a toda la clinica.
                                </Typography>
                            </Box>
                            <Button color="error" variant="outlined">Cerrar cuenta de optica</Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

import { Avatar, Box, Button, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { PageHeader, SectionCard, StatCard, StatusPill } from '../components/common/DashboardWidgets';

const consultations = [
    { patient: 'Elena Martinez', time: '09:30 AM', optometrist: 'Dr. Vance', status: 'Confirmada', initials: 'EM' },
    { patient: 'Ricardo Gomez', time: '10:15 AM', optometrist: 'Dra. Silva', status: 'Pendiente', initials: 'RG' },
    { patient: 'Lucia Herrera', time: '11:00 AM', optometrist: 'Dr. Perez', status: 'En sala', initials: 'LH' },
];

export default function ConsultasPage() {
    return (
        <Box>
            <PageHeader
                eyebrow="Atencion clinica"
                title="Consultas"
                description="Gestiona las consultas, examenes visuales y seguimiento medico."
                actionLabel="Nueva consulta"
                actionIcon={<AddIcon />}
            />

            <Grid container spacing={2.5}>
                <Grid item xs={12} md={4}>
                    <Stack spacing={2.5}>
                        <StatCard title="Consultas hoy" value="24" subtitle="Agenda clinica" icon={<MonitorHeartIcon />} />
                        <StatCard title="En progreso" value="6" subtitle="Pacientes en sala" icon={<VisibilityIcon />} color="#2f80ed" />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={8}>
                    <SectionCard title="Proximas consultas">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Paciente</TableCell>
                                    <TableCell>Hora</TableCell>
                                    <TableCell>Optometrista</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell align="right">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {consultations.map((consultation) => (
                                    <TableRow key={`${consultation.patient}-${consultation.time}`} hover>
                                        <TableCell>
                                            <Stack direction="row" spacing={1.2} alignItems="center">
                                                <Avatar sx={{ width: 32, height: 32, fontSize: 12, bgcolor: '#e4f0ff', color: '#1b65c9' }}>
                                                    {consultation.initials}
                                                </Avatar>
                                                <Box>
                                                    <Typography sx={{ fontSize: 13, fontWeight: 900 }}>{consultation.patient}</Typography>
                                                    <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>ID pendiente</Typography>
                                                </Box>
                                            </Stack>
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 800 }}>{consultation.time}</TableCell>
                                        <TableCell>{consultation.optometrist}</TableCell>
                                        <TableCell>
                                            <StatusPill
                                                label={consultation.status}
                                                tone={consultation.status === 'Confirmada' ? 'success' : consultation.status === 'En sala' ? 'info' : 'warning'}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button size="small" variant="outlined">Abrir</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </SectionCard>
                </Grid>
            </Grid>
        </Box>
    );
}

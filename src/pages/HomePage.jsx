import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import GroupsIcon from '@mui/icons-material/Groups';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { PageHeader, SectionCard, StatCard, StatusPill } from '../components/common/DashboardWidgets';
import { patients, todayAppointments } from '../data/clinicMockData';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <Box>
            <PageHeader
                eyebrow="Bienvenido de nuevo, Dr. Perez"
                title="Panel de Administracion"
                description="Aqui tienes el resumen operativo de hoy."
                actionLabel="Nueva cita"
                actionIcon={<AddIcon />}
                onAction={() => navigate('/citas')}
            />

            <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
                <Grid item xs={12} sm={6} lg={2.4}>
                    <StatCard title="Citas de hoy" value="12" subtitle="Agenda activa" icon={<CalendarMonthIcon />} badge="+12%" />
                </Grid>
                <Grid item xs={12} sm={6} lg={2.4}>
                    <StatCard title="Pacientes registrados" value="1,240" subtitle="Base clinica" icon={<GroupsIcon />} color="#7f8fa6" badge="+5" />
                </Grid>
                <Grid item xs={12} sm={6} lg={2.4}>
                    <StatCard title="Citas pendientes" value="8" subtitle="Por confirmar" icon={<ScheduleIcon />} color="#2f80ed" />
                </Grid>
                <Grid item xs={12} sm={6} lg={2.4}>
                    <StatCard title="Citas confirmadas" value="42" subtitle="Semana actual" icon={<CheckCircleIcon />} color="#19a84f" />
                </Grid>
                <Grid item xs={12} sm={6} lg={2.4}>
                    <StatCard title="Citas canceladas" value="3" subtitle="Ultimos 7 dias" icon={<ReportProblemIcon />} color="#d93636" />
                </Grid>
            </Grid>

            <Grid container spacing={2.5}>
                <Grid item xs={12} lg={8}>
                    <SectionCard
                        title="Agenda de hoy"
                        action={<Button size="small" onClick={() => navigate('/calendario')}>Ver calendario completo</Button>}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Paciente</TableCell>
                                    <TableCell>Hora</TableCell>
                                    <TableCell>Doctor</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell align="center">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {todayAppointments.map((appointment) => (
                                    <TableRow key={`${appointment.patient}-${appointment.time}`} hover>
                                        <TableCell>
                                            <Stack direction="row" spacing={1.2} alignItems="center">
                                                <Avatar sx={{ width: 30, height: 30, fontSize: 11, bgcolor: '#e8f0f8', color: '#6a7e95' }}>
                                                    {appointment.patient.split(' ').map((name) => name[0]).join('').slice(0, 2)}
                                                </Avatar>
                                                <Typography sx={{ fontSize: 13, fontWeight: 800 }}>{appointment.patient}</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 800 }}>{appointment.time}</TableCell>
                                        <TableCell>{appointment.doctor}</TableCell>
                                        <TableCell>
                                            <StatusPill
                                                label={appointment.status}
                                                tone={appointment.status === 'Confirmada' ? 'success' : appointment.status === 'Cancelada' ? 'danger' : 'info'}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <MoreHorizIcon fontSize="small" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </SectionCard>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <SectionCard
                        title="Ultimos pacientes registrados"
                        action={<Button size="small" onClick={() => navigate('/pacientes')}>Ver todos</Button>}
                    >
                        <Stack spacing={2}>
                            {patients.slice(1, 4).map((patient) => (
                                <Stack key={patient.id} direction="row" alignItems="center" spacing={1.5}>
                                    <Avatar sx={{ bgcolor: '#eef2f6', color: '#66758a', width: 38, height: 38 }}>
                                        {patient.initials}
                                    </Avatar>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography sx={{ fontSize: 13, fontWeight: 900 }}>{patient.name}</Typography>
                                        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{patient.register}</Typography>
                                    </Box>
                                    <Typography sx={{ color: 'text.secondary' }}>›</Typography>
                                </Stack>
                            ))}
                            <Button variant="outlined" onClick={() => navigate('/pacientes')}>Ver todos los pacientes</Button>
                        </Stack>
                    </SectionCard>
                </Grid>

                <Grid item xs={12} lg={8}>
                    <SectionCard title="Citas por semana">
                        <Box sx={{ height: 205, display: 'flex', alignItems: 'flex-end', gap: 2, px: 2, pt: 2 }}>
                            {[25, 42, 58, 36, 61, 19].map((value, index) => (
                                <Box key={value} sx={{ flex: 1 }}>
                                    <Box
                                        sx={{
                                            height: value * 2,
                                            bgcolor: index === 4 ? '#082947' : '#d7e6f6',
                                            borderRadius: '12px 12px 0 0',
                                        }}
                                    />
                                    <Typography sx={{ mt: 1, textAlign: 'center', color: 'text.secondary', fontSize: 12 }}>
                                        {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'][index]}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </SectionCard>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Card sx={{ bgcolor: '#082947', color: 'white', height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Typography variant="h6">Inventario bajo</Typography>
                                <StatusPill label="Alerta" tone="danger" />
                            </Stack>
                            <Typography sx={{ fontSize: 13, color: '#b9c7d6', mb: 3 }}>
                                3 modelos de armazones Ray-Ban estan por agotarse.
                            </Typography>
                            <LinearProgress variant="determinate" value={72} sx={{ height: 8, borderRadius: 8, bgcolor: '#173a5c' }} />
                            <Button fullWidth variant="contained" sx={{ mt: 3, bgcolor: '#234d73' }} onClick={() => navigate('/inventario')}>
                                Gestionar pedidos
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

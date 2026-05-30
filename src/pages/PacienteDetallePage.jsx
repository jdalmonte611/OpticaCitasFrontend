import { Avatar, Box, Button, Card, CardContent, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { PageHeader, SectionCard, StatCard, StatusPill } from '../components/common/DashboardWidgets';
import { patients, recentOrders } from '../data/clinicMockData';

export default function PacienteDetallePage() {
    const { id } = useParams();
    const patient = patients.find((item) => item.id === id) || patients[0];

    return (
        <Box>
            <PageHeader
                eyebrow="Pacientes / Detalle"
                title={patient.name}
                description={`ID: ${patient.id}`}
            />

            <Grid container spacing={2.5}>
                <Grid item xs={12} lg={8}>
                    <Card>
                        <CardContent sx={{ p: 3 }}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} alignItems={{ sm: 'center' }}>
                                <Avatar sx={{ width: 96, height: 96, bgcolor: '#eef2f6', color: '#7d8fa3', fontSize: 24 }}>
                                    {patient.initials}
                                </Avatar>
                                <Box sx={{ flex: 1 }}>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                                        <Typography variant="h4">{patient.name}</Typography>
                                        <StatusPill label={patient.status} tone={patient.status === 'Activo' ? 'success' : 'neutral'} />
                                    </Stack>
                                    <Grid container spacing={1.5}>
                                        <Grid item xs={12} sm={6}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <PhoneIcon fontSize="small" color="primary" />
                                                <Typography sx={{ fontSize: 13 }}>{patient.phone}</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <EmailIcon fontSize="small" color="primary" />
                                                <Typography sx={{ fontSize: 13 }}>{patient.email}</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <CalendarTodayIcon fontSize="small" color="primary" />
                                                <Typography sx={{ fontSize: 13 }}>{patient.age}</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <LocationOnIcon fontSize="small" color="primary" />
                                                <Typography sx={{ fontSize: 13 }}>{patient.city}</Typography>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <SectionCard title="Acciones rapidas">
                        <Grid container spacing={1.5}>
                            <Grid item xs={6}>
                                <Button fullWidth variant="contained" startIcon={<CalendarTodayIcon />}>Agendar</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth variant="outlined" startIcon={<EditIcon />}>Editar</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth variant="outlined" startIcon={<RemoveRedEyeIcon />}>Consulta</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth variant="contained" color="secondary" startIcon={<AddIcon />}>Orden</Button>
                            </Grid>
                        </Grid>
                    </SectionCard>
                </Grid>

                <Grid item xs={12}>
                    <Tabs value={0} sx={{ borderBottom: '1px solid #dfe7f0' }}>
                        <Tab label="Resumen" />
                        <Tab label="Citas" />
                        <Tab label="Recetas visuales" />
                        <Tab label="Ordenes" />
                        <Tab label="Pagos" />
                        <Tab label="Notas" />
                    </Tabs>
                </Grid>

                <Grid item xs={12} md={3}>
                    <StatCard title="Proxima cita" value="24 Oct" subtitle="10:30 AM" icon={<CalendarTodayIcon />} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title="Ultima cita" value="12 Ago" subtitle="Revision anual" icon={<RemoveRedEyeIcon />} color="#7f8fa6" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title="Total de citas" value="08" subtitle="Desde 2021" icon={<CalendarTodayIcon />} color="#2f80ed" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title="Ultima receta" value="-2.25 OD" subtitle="Miopia leve" icon={<RemoveRedEyeIcon />} color="#20b455" />
                </Grid>

                <Grid item xs={12} lg={6}>
                    <SectionCard title="Ordenes recientes" action={<Button size="small">Ver todo</Button>}>
                        <Stack spacing={1.5}>
                            {recentOrders.slice(0, 3).map((order) => (
                                <Stack key={order.folio} direction="row" spacing={1.5} alignItems="center">
                                    <ShoppingCartIcon color="primary" fontSize="small" />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography sx={{ fontSize: 13, fontWeight: 900 }}>{order.lens}</Typography>
                                        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{order.folio}</Typography>
                                    </Box>
                                    <StatusPill label={order.status} tone={order.status === 'Lista' ? 'success' : 'neutral'} />
                                </Stack>
                            ))}
                        </Stack>
                    </SectionCard>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <SectionCard title="Evolucion visual">
                        <Box sx={{ height: 190, bgcolor: '#f1f5f9', borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    background:
                                        'linear-gradient(160deg, transparent 45%, rgba(8,41,71,0.16) 46%, transparent 48%), linear-gradient(20deg, transparent 52%, rgba(47,128,237,0.16) 53%, transparent 55%)',
                                }}
                            />
                            <Stack sx={{ height: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <Typography sx={{ fontWeight: 900 }}>Tendencia de graduacion estable</Typography>
                                <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>Basado en las ultimas 4 consultas</Typography>
                            </Stack>
                        </Box>
                    </SectionCard>
                </Grid>
            </Grid>
        </Box>
    );
}

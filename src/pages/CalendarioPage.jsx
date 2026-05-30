import { Fragment } from 'react';
import { Box, Button, Card, CardContent, Grid, MenuItem, Select, Stack, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TodayIcon from '@mui/icons-material/Today';
import { PageHeader } from '../components/common/DashboardWidgets';

const days = ['Lun 23', 'Mar 24', 'Mie 25', 'Jue 26', 'Vie 27', 'Sab 28', 'Dom 29'];
const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
const events = [
    { day: 0, hour: 1, title: 'Juan Perez', subtitle: 'Control visual', color: '#fff1a8' },
    { day: 1, hour: 2, title: 'Maria Luz', subtitle: 'Entrega de lentes', color: '#cfe4ff' },
    { day: 3, hour: 2, title: 'Carlos Ruiz', subtitle: 'Examen completo', color: '#bdf5d0' },
    { day: 2, hour: 5, title: 'Sofia Loren', subtitle: 'Revision', color: '#c8f8d2' },
    { day: 4, hour: 3, title: 'Ana Gomez', subtitle: 'Consulta', color: '#cfe4ff' },
    { day: 6, hour: 6, title: 'Roberto Ruiz', subtitle: 'Adaptacion', color: '#fff1a8' },
];

export default function CalendarioPage() {
    return (
        <Box>
            <PageHeader
                eyebrow="Citas y disponibilidad"
                title="Agenda de citas"
                description="Coordina y controla las consultas diarias de la clinica."
            />

            <Card>
                <CardContent sx={{ p: 2.5 }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ mb: 2 }} alignItems={{ md: 'center' }}>
                        <Select size="small" defaultValue="todos" sx={{ minWidth: 220 }}>
                            <MenuItem value="todos">Todos los especialistas</MenuItem>
                            <MenuItem value="vance">Dr. Julian Vance</MenuItem>
                            <MenuItem value="silva">Dra. Silva</MenuItem>
                        </Select>
                        <Select size="small" defaultValue="todos" sx={{ minWidth: 180 }}>
                            <MenuItem value="todos">Todos los estados</MenuItem>
                            <MenuItem value="confirmada">Confirmadas</MenuItem>
                            <MenuItem value="pendiente">Pendientes</MenuItem>
                        </Select>
                        <Button variant="outlined" startIcon={<TodayIcon />}>Hoy</Button>
                        <Stack direction="row" spacing={1} sx={{ ml: { md: 'auto' } }}>
                            <Button variant="outlined"><ChevronLeftIcon /></Button>
                            <Button variant="outlined"><ChevronRightIcon /></Button>
                        </Stack>
                    </Stack>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '78px repeat(7, minmax(120px, 1fr))',
                            overflowX: 'auto',
                            border: '1px solid #e3eaf2',
                            borderRadius: 2,
                        }}
                    >
                        <Box sx={{ bgcolor: '#f6f8fb', borderRight: '1px solid #e3eaf2', minHeight: 54 }} />
                        {days.map((day) => (
                            <Box key={day} sx={{ p: 1.5, textAlign: 'center', bgcolor: '#f6f8fb', borderRight: '1px solid #e3eaf2' }}>
                                <Typography sx={{ fontSize: 12, fontWeight: 900 }}>{day}</Typography>
                            </Box>
                        ))}

                        {hours.map((hour, hourIndex) => (
                            <Fragment key={hour}>
                                <Box sx={{ p: 1, borderTop: '1px solid #eef2f6', borderRight: '1px solid #e3eaf2' }}>
                                    <Typography sx={{ color: 'text.secondary', fontSize: 11 }}>{hour}</Typography>
                                </Box>
                                {days.map((day, dayIndex) => {
                                    const event = events.find((item) => item.day === dayIndex && item.hour === hourIndex);

                                    return (
                                        <Box
                                            key={`${day}-${hour}`}
                                            sx={{
                                                position: 'relative',
                                                minHeight: 62,
                                                borderTop: '1px solid #eef2f6',
                                                borderRight: '1px solid #eef2f6',
                                                bgcolor: hourIndex === 2 ? 'rgba(217, 54, 54, 0.03)' : 'transparent',
                                            }}
                                        >
                                            {event && (
                                                <Box
                                                    sx={{
                                                        m: 0.7,
                                                        p: 0.8,
                                                        borderRadius: 1,
                                                        bgcolor: event.color,
                                                        borderLeft: '4px solid #2f80ed',
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: 11, fontWeight: 900 }}>{event.title}</Typography>
                                                    <Typography sx={{ fontSize: 10, color: '#4f5d6d' }}>{event.subtitle}</Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    );
                                })}
                            </Fragment>
                        ))}
                    </Box>
                </CardContent>
            </Card>

            <Grid container spacing={2.5} sx={{ mt: 0 }}>
                <Grid item xs={12} md={4}>
                    <Card><CardContent><Typography variant="h6">Bloques libres</Typography><Typography sx={{ color: 'text.secondary' }}>7 espacios disponibles manana.</Typography></CardContent></Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card><CardContent><Typography variant="h6">Mayor demanda</Typography><Typography sx={{ color: 'text.secondary' }}>10:00 AM - 12:00 PM.</Typography></CardContent></Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card><CardContent><Typography variant="h6">Recordatorios</Typography><Typography sx={{ color: 'text.secondary' }}>5 mensajes pendientes por enviar.</Typography></CardContent></Card>
                </Grid>
            </Grid>
        </Box>
    );
}

import { Box, Button, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { PageHeader, SectionCard, StatCard, StatusPill } from '../components/common/DashboardWidgets';
import { recentOrders } from '../data/clinicMockData';

function getTone(status) {
    if (status === 'Lista') return 'success';
    if (status === 'Demorado') return 'danger';
    if (status === 'Entregado') return 'neutral';
    return 'warning';
}

export default function OrdenesPage() {
    return (
        <Box>
            <PageHeader
                eyebrow="Laboratorio y optica"
                title="Gestion de ordenes"
                description="Supervisa el flujo de trabajo de laboratorio y entregas."
                actionLabel="Nueva orden de lentes"
                actionIcon={<AddIcon />}
            />

            <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
                <Grid item xs={12} md={3}>
                    <StatCard title="En proceso" value="24" subtitle="Ordenes activas" icon={<PendingActionsIcon />} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title="Listas para entrega" value="12" subtitle="Avisar paciente" icon={<AssignmentTurnedInIcon />} color="#20b455" badge="+5%" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title="Entregadas hoy" value="08" subtitle="Cierre diario" icon={<LocalShippingIcon />} color="#2f80ed" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title="Demoradas" value="02" subtitle="Revisar laboratorio" icon={<ReportProblemIcon />} color="#d93636" />
                </Grid>
            </Grid>

            <Grid container spacing={2.5}>
                <Grid item xs={12} lg={8}>
                    <SectionCard title="Ordenes recientes" action={<Button size="small" variant="outlined">Exportar</Button>}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Folio</TableCell>
                                    <TableCell>Paciente</TableCell>
                                    <TableCell>Tipo de lente</TableCell>
                                    <TableCell>Armazon</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Promesa</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recentOrders.map((order) => (
                                    <TableRow key={order.folio} hover>
                                        <TableCell sx={{ fontWeight: 900 }}>{order.folio}</TableCell>
                                        <TableCell>{order.patient}</TableCell>
                                        <TableCell>{order.lens}</TableCell>
                                        <TableCell>{order.frame}</TableCell>
                                        <TableCell><StatusPill label={order.status} tone={getTone(order.status)} /></TableCell>
                                        <TableCell>{order.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </SectionCard>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <SectionCard title="Actualizaciones">
                        <Stack spacing={2}>
                            {recentOrders.slice(0, 3).map((order) => (
                                <Box key={order.folio} sx={{ borderLeft: '3px solid #f5b83b', pl: 1.5 }}>
                                    <Typography sx={{ fontSize: 13, fontWeight: 900 }}>{order.folio} - {order.status}</Typography>
                                    <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Actualizado hace 1 hora</Typography>
                                </Box>
                            ))}
                            <Button fullWidth variant="outlined">Ver historial</Button>
                        </Stack>
                    </SectionCard>
                </Grid>
            </Grid>
        </Box>
    );
}

import { Box, Button, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import InsightsIcon from '@mui/icons-material/Insights';
import PaidIcon from '@mui/icons-material/Paid';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { PageHeader, SectionCard, StatCard, StatusPill } from '../components/common/DashboardWidgets';
import { products, transactions } from '../data/clinicMockData';

export default function ReportesPage() {
    return (
        <Box>
            <PageHeader
                eyebrow="Analitica"
                title="Reportes de desempeno"
                description="Analisis detallado de la productividad y salud financiera de la clinica."
                actionLabel="Exportar CSV"
                actionIcon={<DownloadIcon />}
            />

            <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
                <Grid item xs={12} md={3}>
                    <StatCard title="Citas totales" value="342" subtitle="Este mes" icon={<InsightsIcon />} badge="+12%" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title="Ingresos mensuales" value="$12,450" subtitle="Facturado" icon={<PaidIcon />} color="#20b455" badge="+8.4%" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title="Conversion ventas" value="68%" subtitle="Consulta a compra" icon={<TrendingUpIcon />} color="#2f80ed" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title="Ticket promedio" value="$185" subtitle="Estable" icon={<ShoppingBagIcon />} color="#7f8fa6" />
                </Grid>
            </Grid>

            <Grid container spacing={2.5}>
                <Grid item xs={12} lg={8}>
                    <SectionCard title="Ingresos mensuales">
                        <Box sx={{ height: 260, display: 'flex', alignItems: 'flex-end', gap: 2, px: 2 }}>
                            {[20, 38, 55, 48, 72, 91].map((value, index) => (
                                <Box key={value} sx={{ flex: 1 }}>
                                    <Box
                                        sx={{
                                            height: value * 2,
                                            bgcolor: index === 5 ? '#082947' : '#d7e6f6',
                                            borderRadius: '14px 14px 0 0',
                                        }}
                                    />
                                    <Typography sx={{ mt: 1, color: 'text.secondary', textAlign: 'center', fontSize: 12 }}>
                                        {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'][index]}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </SectionCard>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <SectionCard title="Productos mas vendidos">
                        <Stack spacing={2}>
                            {products.map((product) => (
                                <Box key={product.name}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                                        <Typography sx={{ fontSize: 13, fontWeight: 900 }}>{product.name}</Typography>
                                        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{product.sold} unidades</Typography>
                                    </Stack>
                                    <Box sx={{ height: 6, borderRadius: 6, bgcolor: '#edf2f7' }}>
                                        <Box sx={{ height: 6, width: `${product.sold}%`, borderRadius: 6, bgcolor: '#082947' }} />
                                    </Box>
                                </Box>
                            ))}
                            <Button variant="outlined">Ver inventario completo</Button>
                        </Stack>
                    </SectionCard>
                </Grid>
                <Grid item xs={12}>
                    <SectionCard title="Historial de transacciones recientes">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Paciente</TableCell>
                                    <TableCell>Servicio / Producto</TableCell>
                                    <TableCell>Monto</TableCell>
                                    <TableCell>Estado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((transaction, index) => (
                                    <TableRow key={`${transaction.patient}-${transaction.amount}`} hover>
                                        <TableCell>{`${14 - index} Jun, 2024`}</TableCell>
                                        <TableCell sx={{ fontWeight: 800 }}>{transaction.patient}</TableCell>
                                        <TableCell>{transaction.concept}</TableCell>
                                        <TableCell sx={{ fontWeight: 900 }}>{transaction.amount}</TableCell>
                                        <TableCell>
                                            <StatusPill
                                                label={transaction.status}
                                                tone={transaction.status === 'Completado' ? 'success' : 'warning'}
                                            />
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

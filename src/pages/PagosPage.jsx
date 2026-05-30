import { Box, Button, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddCardIcon from '@mui/icons-material/AddCard';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { PageHeader, SectionCard, StatCard, StatusPill } from '../components/common/DashboardWidgets';
import { transactions } from '../data/clinicMockData';

export default function PagosPage() {
    return (
        <Box>
            <PageHeader
                eyebrow="Caja y facturacion"
                title="Pagos y caja"
                description="Gestion diaria de ingresos y conciliacion de cuentas."
                actionLabel="Registrar pago"
                actionIcon={<AddCardIcon />}
            />

            <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
                <Grid item xs={12} md={5}>
                    <StatCard title="Cierre de caja actual" value="$12,450.00" subtitle="vs. ayer" icon={<AccountBalanceWalletIcon />} badge="+12%" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard title="Pendientes" value="$3,120.40" subtitle="8 facturas abiertas" icon={<ReceiptLongIcon />} color="#d93636" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ height: '100%', bgcolor: '#061a2f', color: 'white', borderRadius: 3, p: 2.5 }}>
                        <Typography sx={{ color: '#9fb4c9', fontSize: 12, fontWeight: 900 }}>Top metodo</Typography>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
                            <Box>
                                <Typography variant="h6">Tarjeta cred.</Typography>
                                <Typography sx={{ fontSize: 12, color: '#c7d3df' }}>65% de las ventas</Typography>
                            </Box>
                            <CreditCardIcon sx={{ fontSize: 44, color: '#324f6b' }} />
                        </Stack>
                    </Box>
                </Grid>
            </Grid>

            <SectionCard title="Transacciones recientes" action={<Button size="small" variant="outlined">Exportar</Button>}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Paciente</TableCell>
                            <TableCell>Concepto</TableCell>
                            <TableCell>Monto</TableCell>
                            <TableCell>Metodo</TableCell>
                            <TableCell>Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={`${transaction.patient}-${transaction.concept}`} hover>
                                <TableCell sx={{ fontWeight: 800 }}>{transaction.patient}</TableCell>
                                <TableCell>{transaction.concept}</TableCell>
                                <TableCell sx={{ fontWeight: 900 }}>{transaction.amount}</TableCell>
                                <TableCell>{transaction.method}</TableCell>
                                <TableCell>
                                    <StatusPill label={transaction.status} tone={transaction.status === 'Completado' ? 'success' : 'danger'} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </SectionCard>
        </Box>
    );
}

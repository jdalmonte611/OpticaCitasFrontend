import { Box, Grid, LinearProgress, MenuItem, Select, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { PageHeader, MiniBars, SectionCard, StatCard, StatusPill } from '../components/common/DashboardWidgets';
import { inventory } from '../data/clinicMockData';

export default function InventarioPage() {
    return (
        <Box>
            <PageHeader
                eyebrow="Stock y productos"
                title="Gestion de inventario"
                description="Control centralizado de armazones, micas y accesorios clinicos."
                actionLabel="Agregar producto"
                actionIcon={<AddIcon />}
            />

            <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
                <Grid item xs={12} md={4}>
                    <StatCard title="Total SKU" value="1,248" subtitle="Activos en sistema" icon={<Inventory2Icon />} color="#20b455" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard title="Stock bajo" value="24" subtitle="Requieren reabastecimiento" icon={<ReportProblemIcon />} color="#d93636" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <StatCard title="Rotacion mensual" value="82%" subtitle="Promedio de salida" icon={<TrendingUpIcon />} color="#2f80ed" />
                </Grid>
            </Grid>

            <SectionCard
                title="Productos"
                action={
                    <Stack direction="row" spacing={1}>
                        <Select size="small" defaultValue="categorias">
                            <MenuItem value="categorias">Todas las categorias</MenuItem>
                            <MenuItem value="armazones">Armazones</MenuItem>
                            <MenuItem value="micas">Micas</MenuItem>
                        </Select>
                        <MiniBars values={[18, 26, 34, 41]} />
                    </Stack>
                }
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>SKU</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Stock actual</TableCell>
                            <TableCell>Precio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventory.map((product) => (
                            <TableRow key={product.sku} hover>
                                <TableCell sx={{ fontWeight: 900 }}>{product.sku}</TableCell>
                                <TableCell>{product.product}</TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell><StatusPill label={product.category} tone={product.category === 'Micas' ? 'success' : 'info'} /></TableCell>
                                <TableCell sx={{ minWidth: 130 }}>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        <Box sx={{ flex: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={Math.min(product.stock, 100)}
                                                color={product.stock < 5 ? 'error' : 'success'}
                                                sx={{ height: 7, borderRadius: 7 }}
                                            />
                                        </Box>
                                        <Box sx={{ fontWeight: 900, color: product.stock < 5 ? 'error.main' : 'success.main' }}>
                                            {product.stock}
                                        </Box>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 900 }}>{product.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </SectionCard>
        </Box>
    );
}

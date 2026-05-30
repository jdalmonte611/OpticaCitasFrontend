import { Box, Grid } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PacientesList from '../components/pacientes/PacientesList';
import { PageHeader, StatCard } from '../components/common/DashboardWidgets';

export default function PacientesPage() {
  return (
    <Box>
      <PageHeader
        eyebrow="Pacientes"
        title="Gestion de pacientes"
        description="Administra la base clinica, contactos y seguimiento de cada paciente."
      />
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} md={4}>
          <StatCard title="Total pacientes" value="1,284" subtitle="Activos en sistema" icon={<GroupsIcon />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Nuevos este mes" value="+42" subtitle="Registro reciente" icon={<TrendingUpIcon />} color="#20b455" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Citas hoy" value="18" subtitle="Pacientes programados" icon={<CalendarTodayIcon />} color="#7f8fa6" />
        </Grid>
      </Grid>
      <PacientesList />
    </Box>
  );
}

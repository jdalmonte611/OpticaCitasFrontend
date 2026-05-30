import { Box, Grid } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CitasList from '../components/citas/CitasList';
import { PageHeader, StatCard } from '../components/common/DashboardWidgets';

export default function CitasPage() {
  return (
    <Box>
      <PageHeader
        eyebrow="Citas"
        title="Gestion de citas medicas"
        description="Agenda, confirma y da seguimiento a las consultas de la clinica."
      />
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} md={4}>
          <StatCard title="Citas de hoy" value="24" subtitle="Total programado" icon={<CalendarMonthIcon />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Confirmadas" value="18" subtitle="Pacientes notificados" icon={<CheckCircleIcon />} color="#20b455" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Pendientes" value="6" subtitle="Requieren llamada" icon={<PendingActionsIcon />} color="#f5b83b" />
        </Grid>
      </Grid>
      <CitasList />
    </Box>
  );
}

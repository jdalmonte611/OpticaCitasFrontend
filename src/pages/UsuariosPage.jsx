import { Box, Grid } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';
import UsuariosList from '../components/usuarios/UsuariosList';
import { PageHeader, StatCard } from '../components/common/DashboardWidgets';

export default function UsuariosPage() {
  return (
    <Box>
      <PageHeader
        eyebrow="Equipo"
        title="Gestion de usuarios"
        description="Administra doctores, secretarias y permisos del sistema."
      />
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} md={4}>
          <StatCard title="Usuarios activos" value="18" subtitle="Equipo operativo" icon={<GroupsIcon />} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Doctores" value="7" subtitle="Especialistas" icon={<BadgeIcon />} color="#20b455" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard title="Administradores" value="3" subtitle="Acceso completo" icon={<AdminPanelSettingsIcon />} color="#d93636" />
        </Grid>
      </Grid>
      <UsuariosList />
    </Box>
  );
}

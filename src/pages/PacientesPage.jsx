import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import PacientesList from '../components/pacientes/PacientesList';

export default function PacientesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            mb: 1,
            color: '#1976d2',
            fontSize: { xs: '1.8rem', md: '2.5rem' }
          }}
        >
          👤 Gestión de Pacientes
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1.05rem' }}>
          Administra, edita y controla la información de todos tus pacientes
        </Typography>
      </Box>
      <PacientesList />
    </Container>
  );
}

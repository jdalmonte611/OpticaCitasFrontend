import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import CitasList from '../components/citas/CitasList';

export default function CitasPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            mb: 1,
            color: '#388e3c',
            fontSize: { xs: '1.8rem', md: '2.5rem' }
          }}
        >
          📅 Gestión de Citas Médicas
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1.05rem' }}>
          Agenda, gestiona y controla todas las citas con validación inteligente de disponibilidad
        </Typography>
      </Box>
      <CitasList />
    </Container>
  );
}

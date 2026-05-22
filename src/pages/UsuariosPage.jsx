import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import UsuariosList from '../components/usuarios/UsuariosList';

export default function UsuariosPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            mb: 1,
            color: '#d32f2f',
            fontSize: { xs: '1.8rem', md: '2.5rem' }
          }}
        >
          👨‍⚕️ Gestión de Usuarios
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1.05rem' }}>
          Administra doctores, secretarias y otros usuarios del sistema
        </Typography>
      </Box>
      <UsuariosList />
    </Container>
  );
}

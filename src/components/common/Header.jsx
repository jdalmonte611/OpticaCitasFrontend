import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/', label: 'Inicio', icon: <HomeIcon sx={{ mr: 1 }} /> },
        { path: '/pacientes', label: 'Pacientes', icon: <PeopleIcon sx={{ mr: 1 }} /> },
        { path: '/citas', label: 'Citas', icon: <EventIcon sx={{ mr: 1 }} /> },
        { path: '/usuarios', label: 'Usuarios', icon: <AdminPanelSettingsIcon sx={{ mr: 1 }} /> },
    ];

    return (
        <AppBar
            position="sticky"
            sx={{
                mb: 3,
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
        >
            <Container maxWidth="lg">
                <Toolbar sx={{ py: 1.5 }}>
                    {/* Logo */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            mr: 4,
                            '&:hover': { opacity: 0.8 }
                        }}
                        onClick={() => navigate('/')}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: { xs: '1.2rem', md: '1.5rem' },
                                letterSpacing: 1
                            }}
                        >
                            👁️ OpticaApp
                        </Typography>
                    </Box>

                    {/* Navigation Links */}
                    <Box sx={{ display: 'flex', gap: 0.5, ml: 'auto', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    color: 'white',
                                    textTransform: 'capitalize',
                                    fontSize: { xs: '0.85rem', md: '1rem' },
                                    py: 1,
                                    px: { xs: 1, md: 2 },
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderBottom: isActive(item.path) ? '3px solid white' : 'none',
                                    borderRadius: 0,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        borderBottom: '3px solid white'
                                    }
                                }}
                            >
                                {item.icon}
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

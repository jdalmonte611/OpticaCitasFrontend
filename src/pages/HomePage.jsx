import React from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Paper,
    Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function HomePage() {
    const navigate = useNavigate();

    const features = [
        {
            title: 'Gestionar Pacientes',
            description: 'Base de datos completa y organizada de todos tus pacientes',
            icon: <PeopleIcon sx={{ fontSize: 50 }} />,
            action: () => navigate('/pacientes'),
            buttonText: 'Abrir',
            accentColor: '#1976d2',
            lightColor: '#e3f2fd',
            darkColor: '#1565c0',
            stats: '1,250+ registros'
        },
        {
            title: 'Agendar Citas',
            description: 'Sistema inteligente con disponibilidad automática de doctores',
            icon: <EventIcon sx={{ fontSize: 50 }} />,
            action: () => navigate('/citas'),
            buttonText: 'Agendar',
            accentColor: '#388e3c',
            lightColor: '#e8f5e9',
            darkColor: '#2e7d32',
            stats: '98% eficiencia'
        },
        {
            title: 'Administrar Usuarios',
            description: 'Control total de doctores, secretarias y personal',
            icon: <AdminPanelSettingsIcon sx={{ fontSize: 50 }} />,
            action: () => navigate('/usuarios'),
            buttonText: 'Gestionar',
            accentColor: '#d32f2f',
            lightColor: '#ffebee',
            darkColor: '#c62828',
            stats: '45+ usuarios'
        },
    ];

    const benefits = [
        { icon: <CheckCircleIcon sx={{ color: '#388e3c', fontSize: 32 }} />, text: 'Interfaz intuitiva' },
        { icon: <SpeedIcon sx={{ color: '#1976d2', fontSize: 32 }} />, text: 'Rápido y eficiente' },
        { icon: <SecurityIcon sx={{ color: '#d32f2f', fontSize: 32 }} />, text: 'Datos seguros' },
        { icon: <TrendingUpIcon sx={{ color: '#f57c00', fontSize: 32 }} />, text: 'Reportes avanzados' },
    ];

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 25%, #388e3c 75%, #2e7d32 100%)',
                    color: 'white',
                    py: { xs: 8, sm: 12, md: 16 },
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        transform: 'translate(50%, -50%)'
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        transform: 'translate(-50%, 50%)'
                    }
                }}
            >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        {/* Main Title */}
                        <Typography
                            component="div"
                            sx={{
                                fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                                fontWeight: 'bold',
                                mb: 2,
                                letterSpacing: '-1px',
                                animation: 'fadeInDown 1s ease-out',
                                '@keyframes fadeInDown': {
                                    from: { opacity: 0, transform: 'translateY(-30px)' },
                                    to: { opacity: 1, transform: 'translateY(0)' }
                                }
                            }}
                        >
                            👁️ OpticaApp
                        </Typography>

                        {/* Subtitle */}
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 1,
                                fontWeight: '300',
                                letterSpacing: '0.5px',
                                animation: 'fadeInUp 1s ease-out 0.2s both',
                                '@keyframes fadeInUp': {
                                    from: { opacity: 0, transform: 'translateY(30px)' },
                                    to: { opacity: 1, transform: 'translateY(0)' }
                                }
                            }}
                        >
                            La Solución Completa para tu Clínica Oftalmológica
                        </Typography>

                        {/* Description */}
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 4,
                                fontWeight: '300',
                                opacity: 0.95,
                                fontSize: { xs: '0.95rem', md: '1.1rem' },
                                animation: 'fadeInUp 1s ease-out 0.4s both',
                                '@keyframes fadeInUp': {
                                    from: { opacity: 0, transform: 'translateY(30px)' },
                                    to: { opacity: 1, transform: 'translateY(0)' }
                                }
                            }}
                        >
                            Gestiona pacientes, agenda citas inteligentes y administra tu equipo en un solo lugar
                        </Typography>

                        {/* CTA Button */}
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/citas')}
                            sx={{
                                backgroundColor: 'white',
                                color: '#1976d2',
                                fontWeight: 'bold',
                                py: 1.8,
                                px: 4,
                                fontSize: '1.1rem',
                                borderRadius: 2,
                                animation: 'fadeInUp 1s ease-out 0.6s both',
                                '@keyframes fadeInUp': {
                                    from: { opacity: 0, transform: 'translateY(30px)' },
                                    to: { opacity: 1, transform: 'translateY(0)' }
                                },
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-3px)',
                                    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                                    backgroundColor: '#f5f5f5'
                                }
                            }}
                            endIcon={<ArrowForwardIcon />}
                        >
                            Comenzar Ahora
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Main Content */}
            <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
                {/* Features Grid */}
                <Box sx={{ mb: { xs: 8, md: 12 } }}>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 1,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#1976d2'
                        }}
                    >
                        ✨ Módulos Principales
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            color: '#666',
                            mb: 5,
                            fontSize: '1.1rem'
                        }}
                    >
                        Todo lo que necesitas para gestionar tu clínica de forma profesional
                    </Typography>

                    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        cursor: 'pointer',
                                        border: '1px solid #e0e0e0',
                                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: '4px',
                                            backgroundColor: feature.accentColor,
                                            transform: 'scaleX(0)',
                                            transformOrigin: 'left',
                                            transition: 'transform 0.4s ease'
                                        },
                                        '&:hover': {
                                            transform: 'translateY(-16px) scale(1.02)',
                                            boxShadow: `0 24px 48px ${feature.accentColor}30`,
                                            borderColor: feature.accentColor,
                                            '&::before': {
                                                transform: 'scaleX(1)'
                                            }
                                        }
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            flexGrow: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            pt: 4,
                                            pb: 3,
                                            px: 3
                                        }}
                                    >
                                        {/* Icon Container */}
                                        <Box
                                            sx={{
                                                backgroundColor: feature.lightColor,
                                                borderRadius: '50%',
                                                p: 3,
                                                mb: 2.5,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 110,
                                                height: 110,
                                                color: feature.accentColor,
                                                transition: 'all 0.3s ease',
                                                '& svg': {
                                                    fontSize: 50
                                                }
                                            }}
                                        >
                                            {feature.icon}
                                        </Box>

                                        {/* Title */}
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                mb: 1.5,
                                                fontWeight: 'bold',
                                                fontSize: '1.3rem',
                                                color: '#1a1a1a'
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>

                                        {/* Description */}
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mb: 2.5,
                                                flexGrow: 1,
                                                color: '#666',
                                                lineHeight: 1.7,
                                                minHeight: 60
                                            }}
                                        >
                                            {feature.description}
                                        </Typography>

                                        {/* Stats */}
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                backgroundColor: feature.lightColor,
                                                color: feature.accentColor,
                                                px: 2,
                                                py: 0.8,
                                                borderRadius: 1.5,
                                                fontWeight: 'bold',
                                                mb: 2.5,
                                                display: 'inline-block'
                                            }}
                                        >
                                            {feature.stats}
                                        </Typography>

                                        {/* Button */}
                                        <Button
                                            variant="contained"
                                            onClick={feature.action}
                                            fullWidth
                                            sx={{
                                                backgroundColor: feature.accentColor,
                                                py: 1.3,
                                                fontWeight: 'bold',
                                                textTransform: 'capitalize',
                                                fontSize: '1rem',
                                                borderRadius: 1.5,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: feature.darkColor,
                                                    boxShadow: `0 8px 16px ${feature.accentColor}40`,
                                                    transform: 'translateY(-2px)'
                                                }
                                            }}
                                            endIcon={<ArrowForwardIcon sx={{ fontSize: '1.2rem' }} />}
                                        >
                                            {feature.buttonText}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Benefits Section */}
                <Box
                    sx={{
                        backgroundColor: '#f9f9f9',
                        borderRadius: 3,
                        p: { xs: 3, md: 5 },
                        mb: { xs: 6, md: 8 }
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 4,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#1976d2'
                        }}
                    >
                        🎯 ¿Por qué elegir OpticaApp?
                    </Typography>

                    <Grid container spacing={3}>
                        {benefits.map((benefit, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        gap: 1.5
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            p: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                                boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
                                            }
                                        }}
                                    >
                                        {benefit.icon}
                                    </Box>
                                    <Typography
                                        sx={{
                                            fontWeight: '600',
                                            fontSize: '1rem',
                                            color: '#1a1a1a'
                                        }}
                                    >
                                        {benefit.text}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* CTA Section */}
                <Paper
                    elevation={0}
                    sx={{
                        background: 'linear-gradient(135deg, #1976d2 0%, #388e3c 100%)',
                        color: 'white',
                        p: { xs: 4, md: 6 },
                        borderRadius: 3,
                        textAlign: 'center'
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 2,
                            fontWeight: 'bold',
                            fontSize: { xs: '1.5rem', md: '2rem' }
                        }}
                    >
                        ¿Listo para optimizar tu clínica?
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 3,
                            opacity: 0.95,
                            fontSize: { xs: '0.95rem', md: '1.1rem' }
                        }}
                    >
                        Comienza ahora a gestionar tus pacientes y citas de manera eficiente
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'white',
                            color: '#1976d2',
                            fontWeight: 'bold',
                            py: 1.5,
                            px: 4,
                            fontSize: '1rem',
                            borderRadius: 1.5,
                            '&:hover': {
                                backgroundColor: '#f5f5f5'
                            }
                        }}
                        onClick={() => navigate('/pacientes')}
                    >
                        Comenzar a Gestionar Pacientes
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
}

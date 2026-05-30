import { useState } from 'react';
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Divider,
    Drawer,
    IconButton,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';

const drawerWidth = 248;

const navItems = [
    { path: '/', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/pacientes', label: 'Pacientes', icon: <PeopleAltIcon /> },
    { path: '/citas', label: 'Citas', icon: <EventAvailableIcon /> },
    { path: '/calendario', label: 'Calendario', icon: <CalendarMonthIcon /> },
    { path: '/consultas', label: 'Consultas', icon: <DescriptionIcon /> },
    { path: '/ordenes', label: 'Ordenes', icon: <ShoppingCartIcon /> },
    { path: '/pagos', label: 'Pagos', icon: <PointOfSaleIcon /> },
    { path: '/inventario', label: 'Inventario', icon: <Inventory2Icon /> },
    { path: '/reportes', label: 'Reportes', icon: <LocalAtmIcon /> },
    { path: '/configuracion', label: 'Configuracion', icon: <SettingsIcon /> },
];

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const activeItem = navItems.find((item) => {
        if (item.path === '/') {
            return location.pathname === '/';
        }

        return location.pathname.startsWith(item.path);
    });

    const handleNavigate = (path) => {
        navigate(path);
        setMobileOpen(false);
    };

    const drawer = (
        <Box
            sx={{
                height: '100%',
                bgcolor: '#061a2f',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box sx={{ px: 3, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                    sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 2,
                        bgcolor: '#dcefff',
                        color: '#061a2f',
                        display: 'grid',
                        placeItems: 'center',
                    }}
                >
                    <VisibilityIcon fontSize="small" />
                </Box>
                <Box>
                    <Typography sx={{ fontWeight: 900, lineHeight: 1 }}>OpticaCitas</Typography>
                    <Typography sx={{ color: '#8da5be', fontSize: 11 }}>Clinical Management</Typography>
                </Box>
            </Box>

            <List sx={{ px: 1.5, py: 1 }}>
                {navItems.map((item) => {
                    const selected = item.path === '/'
                        ? location.pathname === '/'
                        : location.pathname.startsWith(item.path);

                    return (
                        <ListItemButton
                            key={item.path}
                            selected={selected}
                            onClick={() => handleNavigate(item.path)}
                            sx={{
                                mb: 0.5,
                                borderRadius: 1.5,
                                color: selected ? 'white' : '#7f98b3',
                                bgcolor: selected ? 'rgba(145, 180, 219, 0.24)' : 'transparent',
                                '&.Mui-selected': {
                                    bgcolor: 'rgba(145, 180, 219, 0.24)',
                                },
                                '&:hover': {
                                    bgcolor: 'rgba(145, 180, 219, 0.16)',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit', minWidth: 34 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontSize: 13,
                                    fontWeight: selected ? 800 : 700,
                                }}
                            />
                        </ListItemButton>
                    );
                })}
            </List>

            <Box sx={{ mt: 'auto' }}>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
                <List sx={{ px: 1.5, py: 1.5 }}>
                    <ListItemButton sx={{ borderRadius: 1.5, color: '#7f98b3' }}>
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 34 }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Salir" primaryTypographyProps={{ fontSize: 13, fontWeight: 700 }} />
                    </ListItemButton>
                </List>
            </Box>
        </Box>
    );

    return (
        <>
            <AppBar
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    borderBottom: '1px solid #e1e8f0',
                    bgcolor: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(16px)',
                }}
            >
                <Toolbar sx={{ minHeight: 64, gap: 2 }}>
                    <IconButton
                        color="primary"
                        edge="start"
                        onClick={() => setMobileOpen(true)}
                        sx={{ display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <TextField
                        size="small"
                        placeholder={`Buscar en ${activeItem?.label || 'OpticaCitas'}...`}
                        sx={{
                            width: { xs: '100%', sm: 360 },
                            '& .MuiOutlinedInput-root': {
                                bgcolor: '#f2f5f8',
                                borderRadius: 2,
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton size="small">
                            <Badge color="error" variant="dot">
                                <NotificationsNoneIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                        <IconButton size="small">
                            <InfoOutlinedIcon fontSize="small" />
                        </IconButton>
                        <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right' }}>
                            <Typography sx={{ fontSize: 12, fontWeight: 900 }}>Admin Role</Typography>
                            <Typography sx={{ fontSize: 10, color: 'text.secondary', fontWeight: 700 }}>
                                Optica General
                            </Typography>
                        </Box>
                        <Avatar sx={{ width: 34, height: 34, bgcolor: '#e7edf4', color: '#728196', fontSize: 12 }}>
                            OC
                        </Avatar>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { width: drawerWidth, border: 0 },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { width: drawerWidth, border: 0 },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
}

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import PacientesPage from './pages/PacientesPage';
import PacienteDetallePage from './pages/PacienteDetallePage';
import CitasPage from './pages/CitasPage';
import CalendarioPage from './pages/CalendarioPage';
import ConsultasPage from './pages/ConsultasPage';
import OrdenesPage from './pages/OrdenesPage';
import PagosPage from './pages/PagosPage';
import InventarioPage from './pages/InventarioPage';
import ReportesPage from './pages/ReportesPage';
import ConfiguracionPage from './pages/ConfiguracionPage';
import UsuariosPage from './pages/UsuariosPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#082947',
      light: '#16466f',
      dark: '#051c32',
    },
    secondary: {
      main: '#61e978',
    },
    info: {
      main: '#2f80ed',
    },
    warning: {
      main: '#f5b83b',
    },
    error: {
      main: '#d93636',
    },
    background: {
      default: '#f4f7fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#061423',
      secondary: '#66758a',
    },
  },
  typography: {
    fontFamily: [
      '"Plus Jakarta Sans"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h3: {
      fontSize: '2rem',
      fontWeight: 800,
      letterSpacing: '-0.04em',
    },
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h6: {
      fontWeight: 800,
    },
    button: {
      fontWeight: 800,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #dfe7f0',
          boxShadow: '0 16px 40px rgba(8, 41, 71, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#5c6b7c',
          fontSize: '0.72rem',
          fontWeight: 800,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          backgroundColor: '#f3f6f9',
        },
        body: {
          borderColor: '#eef2f6',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <Header />
          <Box
            component="main"
            sx={{
              minHeight: '100vh',
              pt: { xs: 9, md: 3 },
              pb: 4,
              pl: { xs: 2, md: '276px' },
              pr: { xs: 2, md: 3 },
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pacientes" element={<PacientesPage />} />
              <Route path="/pacientes/:id" element={<PacienteDetallePage />} />
              <Route path="/citas" element={<CitasPage />} />
              <Route path="/calendario" element={<CalendarioPage />} />
              <Route path="/consultas" element={<ConsultasPage />} />
              <Route path="/ordenes" element={<OrdenesPage />} />
              <Route path="/pagos" element={<PagosPage />} />
              <Route path="/inventario" element={<InventarioPage />} />
              <Route path="/reportes" element={<ReportesPage />} />
              <Route path="/configuracion" element={<ConfiguracionPage />} />
              <Route path="/usuarios" element={<UsuariosPage />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

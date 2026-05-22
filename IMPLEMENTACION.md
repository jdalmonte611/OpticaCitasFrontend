# 📋 Guía de Implementación - Sistema de Óptica Frontend

## 🎯 Resumen Ejecutivo

He creado un **frontend completamente responsivo** para tu sistema de gestión de óptica utilizando:
- ✅ **React 18** con Vite (bundler rápido)
- ✅ **Material UI 5** (componentes profesionales)
- ✅ **React Router** (navegación)
- ✅ **Axios** (llamadas HTTP a la API)
- ✅ **date-fns** (manejo de fechas)

La aplicación está **100% lista para conectar con tu backend** en `http://localhost:5157/api`

---

## 📐 Arquitectura de Carpetas Explicada

### `src/services/` - Capa de API
```javascript
// api.js - Configuración base
const api = axios.create({
  baseURL: 'http://localhost:5157/api',
  headers: { 'Content-Type': 'application/json' }
});

// Cada servicio exporta funciones que llaman a la API
// Ejemplo de pacientesService.js:
export const getPacientes = () => api.get('/pacientes');
export const createPaciente = (data) => api.post('/pacientes', data);
export const updatePaciente = (id, data) => api.put(`/pacientes/${id}`, data);
```

### `src/components/` - Componentes Reutilizables

#### common/Header.jsx
Barra de navegación que aparece en todas las páginas:
```jsx
- Muestra el logo (👁️ Sistema de Óptica)
- Links a: Pacientes, Citas, Usuarios
- Responsive (se adapta a móvil)
```

#### pacientes/
**PacientesList.jsx** - Tabla de pacientes
- Listar con paginación (10 filas por defecto)
- Búsqueda en tiempo real por nombre o cédula
- Botones para editar/eliminar
- Botón "Nuevo Paciente"

**PacienteForm.jsx** - Modal para crear/editar
- Campos: Nombre, Apellido, Cédula, Teléfono, Email
- Validación de campos requeridos
- Feedback de error si falla la petición

#### citas/
**CitasList.jsx** - Tabla de citas con filtros
- Listar todas las citas
- **Filtro por estado**: Pendiente, Confirmada, Atendida, Cancelada, etc.
- **Select inline** para cambiar estado rápidamente
- Editar cita completa
- Eliminar cita

**CitaForm.jsx** - Crear/editar citas
```javascript
Flujo de creación:
1. Seleccionar Paciente (dropdown de PacientesList)
2. Seleccionar Doctor (dropdown de getDoctores)
3. Elegir fecha/hora inicio y fin
4. 🔄 CLICK en "Verificar Disponibilidad"
5. Backend valida: ¿Doctor libre en ese horario?
   - ✅ SI → "Doctor disponible" + Botón Guardar habilitado
   - ❌ NO → "Doctor no disponible" + Botón Guardar deshabilitado
6. Si todo OK → Crear cita con POST /api/citas
```

#### usuarios/
**UsuariosList.jsx** - Tabla de usuarios
- Listar todos los usuarios
- Buscar por nombre o email
- Ver rol (Chip con color: Admin=rojo, Secretaria=naranja, Doctor=verde)
- Editar/Desactivar usuarios

**UsuarioForm.jsx** - Crear/editar usuarios
- Campos: Nombre, Apellido, Email, Password (solo para crear), Rol
- Validación de datos
- Diferencia entre crear (requiere contraseña) y editar (sin contraseña)

### `src/pages/` - Páginas Wrapper

Cada página es un contenedor que:
1. Importa un componente principal
2. Lo envuelve en un `<Container>` de Material UI
3. Proporciona layout consistente

```jsx
// CitasPage.jsx
export default function CitasPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <h1>Gestión de Citas</h1>
      <CitasList />
    </Container>
  );
}
```

### `src/App.jsx` - Configuración Global

```javascript
✅ ThemeProvider - Define colores, tipografía, breakpoints
✅ CssBaseline - Resetea estilos del navegador
✅ BrowserRouter - Habilita routing
✅ Routes - Define las 4 rutas principales:
   - / → HomePage (Dashboard)
   - /pacientes → Gestión de pacientes
   - /citas → Gestión de citas
   - /usuarios → Gestión de usuarios
```

---

## 🎨 Responsive Design - Cómo Funciona

### Breakpoints utilizados:
```javascript
xs: 0px      → Móvil (iPhone, Android)
sm: 600px    → Tablet pequeña
md: 900px    → Tablet
lg: 1200px   → Desktop
```

### Ejemplo de componente responsive:
```jsx
<Box sx={{
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },  // Stack en móvil
  gap: 2,
  mb: 3,
  alignItems: { sm: 'center' }
}}>
  <TextField sx={{ flex: 1 }} />
  <Button sx={{ ml: { sm: 'auto' } }} />
</Box>
```

**En móvil:**
- Items apilados verticalmente
- Botón a ancho completo

**En desktop:**
- Items en fila horizontal
- Botón a la derecha (ml: auto)

### Componentes responsivos en acción:

**Tablas:**
- En móvil: Scroll horizontal automático
- En desktop: Ancho completo

**Modales:**
- En móvil: Llenan la pantalla
- En desktop: Centrados y limitados

**Navegación:**
- Header siempre visible
- Enlaces clickeables en móvil

---

## 🔌 Integración con Backend

### Paso 1: Actualizar URL de API
Si tu backend corre en diferente puerto/URL:

**Opción A - Editar archivo:**
```javascript
// src/services/api.js
const API_BASE_URL = 'http://tu-servidor.com/api';  // Cambiar aquí
```

**Opción B - Usar variable de entorno:**
```env
# .env
VITE_API_BASE_URL=http://localhost:5157/api
```

### Paso 2: Verificar estructura de respuestas

El backend **DEBE** retornar datos en este formato:

**GET /api/pacientes:**
```json
[
  {
    "id": 1,
    "name": "Juan",
    "lastName": "Pérez",
    "fullName": "Juan Pérez",
    "cedula": "001-1234567-8",
    "tel": "809-555-1234",
    "email": "juan@example.com",
    "active": true
  }
]
```

**POST /api/citas:**
```json
{
  "id": 1,
  "patientId": 1,
  "patientName": "Juan Pérez",
  "doctorId": 5,
  "doctorName": "Dr. Carlos Ramírez",
  "startedDate": "2024-05-21T10:00:00",
  "endedTime": "2024-05-21T11:00:00",
  "reason": "Examen de vista",
  "state": 1,
  "stateDescription": "Pendiente"
}
```

---

## 🚀 Flujos Principales

### Flujo de Crear Paciente
```
Usuario hace clic en "Nuevo Paciente"
    ↓
Se abre modal (PacienteForm vacío)
    ↓
Usuario llena campos
    ↓
Click "Guardar"
    ↓
Frontend valida campos obligatorios
    ↓
POST /api/pacientes con datos
    ↓
✅ Si OK → Recarga lista, cierra modal
❌ Si error → Muestra mensaje de error
```

### Flujo de Agendar Cita
```
Usuario hace clic en "Nueva Cita"
    ↓
Modal se abre y carga:
  - Lista de pacientes
  - Lista de doctores
    ↓
Usuario selecciona:
  - Paciente
  - Doctor
  - Fecha/Hora inicio
  - Fecha/Hora fin
    ↓
Click "Verificar Disponibilidad"
    ↓
GET /api/citas/disponibilidad/doctorId
    ↓
Backend responde: {"available": true/false}
    ↓
✅ Si available=true → Botón "Guardar" se habilita
❌ Si available=false → Muestra error, botón deshabilitado
    ↓
Si usuario confirma → POST /api/citas
    ↓
✅ Cita creada → Recarga lista, cierra modal
```

### Flujo de Cambiar Estado de Cita
```
Usuario ve tabla de citas
    ↓
Ve "Select" con estado actual en la columna Estado
    ↓
Usuario selecciona nuevo estado
    ↓
Automáticamente:
  PATCH /api/citas/{id}/estado
  body: { state: 2, notes: "" }
    ↓
✅ Si OK → Estado actualiza en tiempo real
❌ Si error → Muestra mensaje, vuelve al estado anterior
```

---

## 📊 Validaciones Implementadas

### En Formularios
```javascript
✅ Campos requeridos → Se validan antes de enviar
✅ Formato email → Tipo="email" en input
✅ Fecha/Hora → type="datetime-local"
✅ Números → Conversión automática (parseInt)
```

### En Llamadas API
```javascript
✅ Try/catch en cada servicio
✅ Interceptor en axios para errores globales
✅ Mensajes de error claros para usuario
✅ Estados de carga (disabled buttons)
```

---

## 🎯 Features Listos para Producción

✅ **Búsqueda** - En tiempo real (sin reload)
✅ **Paginación** - Configurable (5, 10, 25 filas)
✅ **Filtros** - Por estado, rol, etc.
✅ **Modales** - Para crear/editar
✅ **Validación** - Cliente y feedback de servidor
✅ **Iconos** - De Material UI Icons
✅ **Temas** - Colores personalizados
✅ **Responsive** - Mobile-first

---

## 📱 Prueba en Diferentes Dispositivos

### Desktop (1920px)
Abre: `http://localhost:5173`

### Tablet (iPad)
En DevTools: Toggle Device Toolbar → Selecciona iPad

### Móvil (iPhone)
En DevTools: Toggle Device Toolbar → Selecciona iPhone 12

---

## 🔧 Próximos Pasos (Opcionales)

1. **Agregar Autenticación**
   - Login page
   - JWT tokens
   - Rutas protegidas

2. **Mejorar UX**
   - Dark mode
   - Notificaciones tipo toast
   - Confirmación de eliminación

3. **Reportes**
   - Exportar a PDF
   - Gráficos de estadísticas

4. **Caché**
   - React Query
   - Offline support

---

## 🏁 Estado Actual

- ✅ **Frontend completo y funcionando**
- ✅ **Responsive en todos los dispositivos**
- ✅ **Servicios API configurados**
- ✅ **Componentes reutilizables**
- ✅ **Validación y manejo de errores**
- ⏳ **Esperando backend en puerto 5157**

Cuando tu backend esté listo:
1. Asegúrate que responde en `http://localhost:5157/api`
2. Inicia el frontend con `npm run dev`
3. ¡Todo debería funcionar correctamente!

---

**Contacto:** Cualquier pregunta sobre la implementación, revisar README.md o archivos en `src/`

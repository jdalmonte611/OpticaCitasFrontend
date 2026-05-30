export const todayAppointments = [
    { patient: 'Mariana Valenzuela', time: '09:00 AM', doctor: 'Dr. Ricardo Perez', status: 'Confirmada' },
    { patient: 'Jorge Ramirez', time: '10:30 AM', doctor: 'Dra. Sofia Luna', status: 'En espera' },
    { patient: 'Lucia Mendoza', time: '11:15 AM', doctor: 'Dr. Ricardo Perez', status: 'Cancelada' },
    { patient: 'Arturo Lopez', time: '12:00 PM', doctor: 'Dra. Sofia Luna', status: 'Confirmada' },
];

export const patients = [
    {
        id: '1035-2938-102',
        name: 'Ricardo Alberto Montes Vega',
        initials: 'RS',
        phone: '+52 (55) 1234-5678',
        email: 'ricardo.montes@gmail.com',
        age: '42 anos',
        city: 'CDMX, Mexico',
        status: 'Activo',
        register: '15 Ene 2023',
    },
    {
        id: '2214-7732-558',
        name: 'Mariana Bermudez',
        initials: 'MB',
        phone: '+506 8888-0001',
        email: 'mariana.b@gmail.com',
        age: '38 anos',
        city: 'San Jose',
        status: 'Activo',
        register: '04 May 2023',
    },
    {
        id: '0987-6543',
        name: 'Roberto Villalobos',
        initials: 'RV',
        phone: '+506 7070-7334',
        email: 'roberto@outlook.com',
        age: '29 anos',
        city: 'Escazu',
        status: 'Activo',
        register: '15 Jan 2023',
    },
    {
        id: '3044-5568',
        name: 'Elena Castillo',
        initials: 'EC',
        phone: '+506 8885-9876',
        email: 'ecastillo@pro.cr',
        age: '55 anos',
        city: 'Cartago',
        status: 'Inactivo',
        register: '20 Sep 2022',
    },
];

export const recentOrders = [
    { folio: '#ORD-4592', patient: 'Roberto Villalobos', lens: 'Progresivo Premium', frame: 'Ray-Ban Aviator Blue', status: 'En armado', date: 'Oct 24, 2023' },
    { folio: '#ORD-4538', patient: 'Mariana Arreola', lens: 'Monofocal AR', frame: 'Oakley Holbrook Black', status: 'Lista', date: 'Oct 23, 2023' },
    { folio: '#ORD-4525', patient: 'Jorge Lozano', lens: 'Bifocal Invisible', frame: 'Prada Heritage Tortoise', status: 'Entregado', date: 'Oct 21, 2023' },
    { folio: '#ORD-4395', patient: 'Sofia Paredes', lens: 'Progresivo Digital', frame: 'Gucci GG0250', status: 'Demorado', date: 'Oct 18, 2023' },
];

export const inventory = [
    { sku: 'RB-4165-601', product: 'Ray Ban Justin Classic', brand: 'Ray Ban', category: 'Armazones', stock: 3, price: '$3,450.00' },
    { sku: 'MC-CR39-PL', product: 'Mica CR 39 Policarbonato', brand: 'Essilor', category: 'Micas', stock: 42, price: '$850.00' },
    { sku: 'AC-CASE-HD', product: 'Estuche Rigido Premium', brand: 'OpticaCitas', category: 'Accesorios', stock: 120, price: '$120.00' },
    { sku: 'OK-9208-01', product: 'Oakley Radar EV Path', brand: 'Oakley', category: 'Armazones', stock: 1, price: '$4,800.00' },
    { sku: 'MC-VAR-TR9', product: 'Mica Progresiva Varilux X', brand: 'Varilux', category: 'Micas', stock: 15, price: '$6,200.00' },
];

export const transactions = [
    { patient: 'Ricardo Mendoza', concept: 'Examen de vista + Armazon Ray-Ban', amount: '$2,450.00', method: 'Visa ****4210', status: 'Completado' },
    { patient: 'Ana Garcia', concept: 'Lentes de contacto Acuvue', amount: '$850.00', method: 'Efectivo', status: 'Completado' },
    { patient: 'Luis Castillo', concept: 'Cirugia refractiva (anticipo)', amount: '$5,000.00', method: 'Transferencia', status: 'Pendiente' },
    { patient: 'Elena Perez', concept: 'Ajuste de montura', amount: '$150.00', method: 'Mastercard', status: 'Completado' },
];

export const products = [
    { name: 'Lentes Pro-Vision Alpha', sold: 58 },
    { name: 'Lentes de Contacto BioSoft', sold: 43 },
    { name: 'Solucion Multiproposito', sold: 32 },
    { name: 'Filtro de Luz Azul Premium', sold: 24 },
];

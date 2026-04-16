// ── Vitta Complex — Mock Data ──

export const complexStats = {
  facturacionHoy: 15800,
  facturacionAyer: 14058,
  tendencia: 12.4,
  localesActivos: 4,
  localesTotal: 4,
  ultimaActualizacion: new Date().toISOString(),
};

export const revenueHistory = [
  { dia: 'Lun', total: 11200, frigorifico: 3800, gastronomia: 2900, toyota: 3400, taller: 1100 },
  { dia: 'Mar', total: 13500, frigorifico: 4200, gastronomia: 3100, toyota: 4800, taller: 1400 },
  { dia: 'Mié', total: 12100, frigorifico: 3600, gastronomia: 2800, toyota: 4100, taller: 1600 },
  { dia: 'Jue', total: 14800, frigorifico: 4900, gastronomia: 3400, toyota: 5100, taller: 1400 },
  { dia: 'Vie', total: 16200, frigorifico: 5200, gastronomia: 3800, toyota: 5600, taller: 1600 },
  { dia: 'Sáb', total: 14058, frigorifico: 4700, gastronomia: 3600, toyota: 4200, taller: 1558 },
  { dia: 'Hoy', total: 15800, frigorifico: 5100, gastronomia: 3700, toyota: 5400, taller: 1600 },
];

export const frigorifico = {
  id: 'frigorifico',
  nombre: 'Nave Norte — Frigorífico',
  tipo: 'frigorifico',
  estado: 'activo',
  facturacionHoy: 5100,
  tendencia: 8.5,
  stockTotal: 8.5, // toneladas
  stockMinimo: 3.0,
  camaras: [
    { id: 'CAM-01', nombre: 'Cámara 1 — Vacuno', temp: 1.2, tempMax: 2.0, estado: 'normal', humedad: 88 },
    { id: 'CAM-02', nombre: 'Cámara 2 — Porcino', temp: 0.8, tempMax: 2.0, estado: 'normal', humedad: 85 },
    { id: 'CAM-03', nombre: 'Cámara 3 — Aves', temp: 1.8, tempMax: 2.0, estado: 'alerta', humedad: 90 },
    { id: 'CAM-04', nombre: 'Cámara Congelado', temp: -18.2, tempMax: -15.0, estado: 'normal', humedad: 75 },
  ],
  stockItems: [
    { id: 'SK001', producto: 'Cuarto Trasero Vacuno', ingreso: '2025-01-14', cantidad: 2.4, unidad: 'tn', estado: 'optimo' },
    { id: 'SK002', producto: 'Paleta Porcina', ingreso: '2025-01-13', cantidad: 1.8, unidad: 'tn', estado: 'optimo' },
    { id: 'SK003', producto: 'Pollo Entero Fresco', ingreso: '2025-01-15', cantidad: 1.2, unidad: 'tn', estado: 'reciente' },
    { id: 'SK004', producto: 'Costillar Vacuno', ingreso: '2025-01-12', cantidad: 1.6, unidad: 'tn', estado: 'optimo' },
    { id: 'SK005', producto: 'Medias Reses', ingreso: '2025-01-11', cantidad: 1.5, unidad: 'tn', estado: 'proximo-venc' },
  ],
  despachos: [
    { id: 'D001', cliente: 'Resto El Molino', peso: 320, tipo: 'Vacuno', hora: '08:30', estado: 'completado' },
    { id: 'D002', cliente: 'Carnicería Norte', peso: 185, tipo: 'Porcino', hora: '09:15', estado: 'completado' },
    { id: 'D003', cliente: 'Hotel Mendoza', peso: 250, tipo: 'Aves', hora: '11:00', estado: 'pendiente' },
  ],
};

export const gastronomia = {
  id: 'gastronomia',
  nombre: 'Nave Norte — Gastronomía',
  tipo: 'gastronomia',
  estado: 'activo',
  facturacionHoy: 3700,
  tendencia: 15.2,
  ordenesHoy: 112,
  mesasActivas: 8,
  mesasTotal: 14,
  ticketPromedio: 33.04,
  horaPico: { hora: '13:00 — 14:30', ingresos: 3200 },
  categorias: [
    { nombre: 'Parrilla', ordenes: 38, ingresos: 1520, color: '#f0b429' },
    { nombre: 'Minutas', ordenes: 29, ingresos: 870, color: '#00d4ff' },
    { nombre: 'Bebidas', ordenes: 45, ingresos: 810, color: '#00e5a0' },
  ],
  insumosBajoStock: [
    { producto: 'Aceite Girasol', stock: 4.2, minimo: 10, unidad: 'L' },
    { producto: 'Harina 000', stock: 8, minimo: 15, unidad: 'kg' },
  ],
  ultimasOrdenes: [
    { id: 'ORD-0112', mesa: 4, items: 'Bife + Ensalada + Vino', total: 68, estado: 'servido' },
    { id: 'ORD-0111', mesa: 7, items: 'Pollo + Papas + Agua', total: 42, estado: 'cocina' },
    { id: 'ORD-0110', mesa: 2, items: '2x Minutas + Bebidas', total: 55, estado: 'servido' },
    { id: 'ORD-0109', mesa: 9, items: 'Parrillada + Vinos', total: 124, estado: 'cerrado' },
  ],
};

export const toyota = {
  id: 'toyota',
  nombre: 'Nave Sur — Toyota Oficial',
  tipo: 'toyota',
  estado: 'activo',
  facturacionHoy: 5400,
  tendencia: 18.0,
  vehiculosVendidosMes: 14,
  vehiculosVendidosHoy: 1,
  stockVehiculos: 23,
  stockRepuestos: 2100,
  repuestosBajoStock: 3,
  vehiculos: [
    { modelo: 'Hilux 4x4 SRX', stock: 6, precio: 42000, color: '#00d4ff' },
    { modelo: 'Corolla XEI', stock: 4, precio: 28000, color: '#00e5a0' },
    { modelo: 'SW4 GR-S', stock: 3, precio: 68000, color: '#f0b429' },
    { modelo: 'Etios XLS', stock: 5, precio: 18000, color: '#a78bfa' },
    { modelo: 'RAV4 VXL', stock: 5, precio: 52000, color: '#ff6b35' },
  ],
  ventasRecientes: [
    { id: 'VTA-0892', modelo: 'Hilux 4x4 SRX', cliente: 'Agro Del Valle SRL', monto: 42000, hora: '10:30', estado: 'cerrado' },
    { id: 'VTA-0891', modelo: 'Corolla XEI', cliente: 'Martínez, Pablo R.', monto: 28000, hora: '09:15', estado: 'cerrado' },
    { id: 'VTA-0890', modelo: 'SW4 GR-S', cliente: 'Consultora Sur SA', monto: 68000, hora: 'Ayer', estado: 'cerrado' },
  ],
  topRepuestos: [
    { codigo: 'TY-A001', descripcion: 'Filtro Aceite Hilux', stock: 48, minimo: 20 },
    { codigo: 'TY-B221', descripcion: 'Pastillas Freno Corolla', stock: 12, minimo: 15 },
    { codigo: 'TY-C440', descripcion: 'Filtro Combustible 4x4', stock: 8, minimo: 10 },
  ],
};

export const taller = {
  id: 'taller',
  nombre: 'Nave Sur — Chapa & Pintura',
  tipo: 'taller',
  estado: 'activo',
  facturacionHoy: 1600,
  tendencia: 5.3,
  ordenesActivas: 25,
  ordenesCompletadasHoy: 8,
  tecnicosActivos: 6,
  tiempoPromedioHs: 4.2,
  eficiencia: 87,
  ordenes: [
    { id: 'OT-0341', vehiculo: 'Ford Ranger 2022', cliente: 'González, M.', tipo: 'Chapa Completa', tecnico: 'Rodríguez A.', inicio: '08:00', progreso: 85, estado: 'en-progreso' },
    { id: 'OT-0342', vehiculo: 'VW Amarok 2023', cliente: 'Trans Cuyo SA', tipo: 'Pintura Total', tecnico: 'Méndez P.', inicio: '07:30', progreso: 100, estado: 'completado' },
    { id: 'OT-0343', vehiculo: 'Renault Duster', cliente: 'López, C.', tipo: 'Reparación Guardabarro', tecnico: 'Suárez R.', inicio: '09:30', progreso: 45, estado: 'en-progreso' },
    { id: 'OT-0344', vehiculo: 'Toyota Hilux 2021', cliente: 'Finca El Sauce', tipo: 'Pintura Parcial', tecnico: 'Flores J.', inicio: '10:00', progreso: 20, estado: 'en-progreso' },
    { id: 'OT-0345', vehiculo: 'Chevrolet S10', cliente: 'Perez, H.', tipo: 'Chapa Puerta', tecnico: 'Torres M.', inicio: '11:00', progreso: 0, estado: 'pendiente' },
    { id: 'OT-0346', vehiculo: 'Peugeot 3008', cliente: 'Estudio Romano', tipo: 'Pintura + Chapa', tecnico: 'Ríos L.', inicio: '08:30', progreso: 100, estado: 'completado' },
  ],
  tecnicoPerformance: [
    { nombre: 'Rodríguez A.', ordenes: 5, horas: 38, eficiencia: 92 },
    { nombre: 'Méndez P.', ordenes: 4, horas: 32, eficiencia: 88 },
    { nombre: 'Suárez R.', ordenes: 6, horas: 41, eficiencia: 85 },
    { nombre: 'Flores J.', ordenes: 4, horas: 28, eficiencia: 90 },
    { nombre: 'Torres M.', ordenes: 3, horas: 22, eficiencia: 78 },
    { nombre: 'Ríos L.', ordenes: 5, horas: 36, eficiencia: 91 },
  ],
};

export const alertas = [
  {
    id: 'ALT-001',
    tipo: 'critica',
    hora: '10:45',
    modulo: 'Frigorífico',
    titulo: 'Fluctuación de Temperatura — Cámara 3',
    detalle: 'Temp. detectada: 1.2°C → 1.8°C. Rango límite alcanzado.',
    estado: 'resuelta',
    horaResolucion: '10:48',
  },
  {
    id: 'ALT-002',
    tipo: 'info',
    hora: '09:30',
    modulo: 'Toyota Oficial',
    titulo: 'Backup CRM Toyota completado',
    detalle: 'Copia de seguridad estándar de base de datos CRM ejecutada con éxito.',
    estado: 'informativa',
    horaResolucion: null,
  },
  {
    id: 'ALT-003',
    tipo: 'advertencia',
    hora: '09:00',
    modulo: 'Gastronomía',
    titulo: 'Stock bajo: Aceite Girasol',
    detalle: 'Stock actual 4.2L — Mínimo requerido: 10L. Reposición urgente.',
    estado: 'pendiente',
    horaResolucion: null,
  },
  {
    id: 'ALT-004',
    tipo: 'info',
    hora: '08:01',
    modulo: 'Nave Norte',
    titulo: 'Reporte de apertura generado',
    detalle: 'Informe diario de apertura Nave Norte procesado y enviado.',
    estado: 'informativa',
    horaResolucion: null,
  },
  {
    id: 'ALT-005',
    tipo: 'advertencia',
    hora: 'Ayer 21:30',
    modulo: 'Taller',
    titulo: 'Cierre de caja diferido',
    detalle: 'Cierre registrado con 30 min de retraso respecto al horario estándar.',
    estado: 'resuelta',
    horaResolucion: 'Ayer 21:45',
  },
  {
    id: 'ALT-006',
    tipo: 'critica',
    hora: 'Ayer 18:00',
    modulo: 'Frigorífico',
    titulo: 'Stock próximo a mínimo — Costillar',
    detalle: 'Costillar Vacuno: 1.5tn disponibles. Mínimo operativo: 1.2tn.',
    estado: 'resuelta',
    horaResolucion: 'Ayer 19:30',
  },
];
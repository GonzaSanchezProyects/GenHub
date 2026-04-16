// src/data/mockData.js

const hoy = new Date();
const restaDias = (dias) => {
  const d = new Date();
  d.setDate(hoy.getDate() - dias);
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
};

const generarMovimientosMasivos = (localNombre, cantidad = 50) => {
  const tipos = ['ingreso', 'egreso', 'info'];
  const descripciones = {
    ingreso: ['Venta minorista', 'Cobro de factura', 'Reserva de unidad', 'Venta mayorista', 'Aporte de capital'],
    egreso: ['Pago a proveedores', 'Servicios luz/gas', 'Mantenimiento preventivo', 'Compra de insumos', 'Limpieza y seguridad'],
    info: ['Apertura de caja', 'Control de stock', 'Cierre de turno', 'Auditoría interna']
  };

  return Array.from({ length: cantidad }, (_, i) => {
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    const monto = tipo === 'info' ? 0 : Math.floor(Math.random() * 50000) + 1000;
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - Math.floor(Math.random() * 7));
    
    return {
      id: `${localNombre}-${i}`,
      hora: `${Math.floor(Math.random() * 12 + 8)}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`,
      fecha: fecha.toLocaleDateString('es-AR'),
      texto: descripciones[tipo][Math.floor(Math.random() * descripciones[tipo].length)],
      tipo,
      monto
    };
  }).sort((a, b) => b.id - a.id);
};

export const locales = {
  frigorifico: {
    id: 'frigorifico',
    nombre: 'Frigorífico',
    nave: 'Nave Norte',
    finanzas: { ingresosDia: 12500, egresosDia: 4200, ingresosMes: 320000 },
    stock: { estado: 'Óptimo', capacidad: '80%', criticos: 0 },
    personal: { presentes: 10, total: 10 },
    movimientos: generarMovimientosMasivos('Frigorífico', 60)
  },
  gastronomia: {
    id: 'gastronomia',
    nombre: 'Gastronomía',
    nave: 'Nave Norte',
    finanzas: { ingresosDia: 8400, egresosDia: 2100, ingresosMes: 215000 },
    stock: { estado: 'Alerta', capacidad: '40%', criticos: 4 },
    personal: { presentes: 7, total: 8 },
    movimientos: generarMovimientosMasivos('Gastronomía', 45)
  },
  agencia: {
    id: 'agencia',
    nombre: 'Agencia & Taller',
    nave: 'Nave Sur',
    finanzas: { ingresosDia: 45000, egresosDia: 12000, ingresosMes: 1100000 },
    stock: { estado: 'Normal', capacidad: '70%', criticos: 15 },
    personal: { presentes: 22, total: 25 },
    movimientos: generarMovimientosMasivos('Agencia', 80)
  }
};

// ¡AQUÍ ESTÁ LA CONSTANTE QUE FALTABA PARA EL DASHBOARD!
export const movimientosSemanales = [
  { id: 1, fecha: restaDias(0), hora: '14:30', local: 'Gastronomía', texto: 'Cierre de caja - Turno Mañana', monto: 4500, tipo: 'ingreso' },
  { id: 2, fecha: restaDias(0), hora: '12:15', local: 'Frigorífico', texto: 'Pago a proveedor de logística', monto: 1200, tipo: 'egreso' },
  { id: 3, fecha: restaDias(0), hora: '10:00', local: 'Agencia', texto: 'Venta Toyota Hilux SRX (Reserva)', monto: 15000, tipo: 'ingreso' },
  { id: 4, fecha: restaDias(1), hora: '18:45', local: 'Taller', texto: 'Service oficial 10k km completado', monto: 3200, tipo: 'ingreso' },
  { id: 5, fecha: restaDias(1), hora: '11:20', local: 'Frigorífico', texto: 'Compra de insumos de embalaje', monto: 800, tipo: 'egreso' },
  { id: 6, fecha: restaDias(2), hora: '16:30', local: 'Gastronomía', texto: 'Reposición de stock bebidas', monto: 1500, tipo: 'egreso' },
  { id: 7, fecha: restaDias(2), hora: '09:15', local: 'Agencia', texto: 'Entrega de unidad 0km', monto: 25000, tipo: 'ingreso' },
  { id: 8, fecha: restaDias(3), hora: '14:00', local: 'Taller', texto: 'Compra de repuestos (Pastillas de freno)', monto: 2200, tipo: 'egreso' }
];

export const globales = {
  metas: { objetivoMes: 2000000 },
  historico: { ingresosAyer: 62000 }
};
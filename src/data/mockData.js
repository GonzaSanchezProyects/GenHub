export const locales = {
  frigorifico: {
    id: 'frigorifico',
    nombre: 'Frigorífico',
    nave: 'Nave Norte',
    finanzas: { ingresosDia: 12500, egresosDia: 4200, ingresosMes: 320000 },
    stock: { estado: 'Óptimo', capacidad: '80%', criticos: 0 },
    personal: { presentes: 10, total: 10 }
  },
  gastronomia: {
    id: 'gastronomia',
    nombre: 'Gastronomía',
    nave: 'Nave Norte',
    finanzas: { ingresosDia: 8400, egresosDia: 2100, ingresosMes: 215000 },
    stock: { estado: 'Alerta', capacidad: '40%', criticos: 4 },
    personal: { presentes: 7, total: 8 }
  },
  agencia: {
    id: 'agencia',
    nombre: 'Agencia & Taller',
    nave: 'Nave Sur',
    finanzas: { ingresosDia: 45000, egresosDia: 12000, ingresosMes: 1100000 },
    stock: { estado: 'Normal', capacidad: '70%', criticos: 15 },
    personal: { presentes: 22, total: 25 }
  }
};

export const globales = {
  metas: { objetivoMes: 2000000 },
  historico: { ingresosAyer: 62000 }
};
import React from 'react';
import { locales, globales } from '../data/mockData';
import MetricCard from '../components/MetricCard/MetricCard';

export default function Dashboard() {
  const localesArr = Object.values(locales);
  const totalIngresosHoy = localesArr.reduce((acc, l) => acc + l.finanzas.ingresosDia, 0);
  const totalEgresosHoy = localesArr.reduce((acc, l) => acc + l.finanzas.egresosDia, 0);
  const ingresosMes = localesArr.reduce((acc, l) => acc + l.finanzas.ingresosMes, 0);
  
  // Buscar local que más facturó
  const localTop = localesArr.reduce((prev, curr) => 
    (prev.finanzas.ingresosDia > curr.finanzas.ingresosDia) ? prev : curr
  );

  // Calcular progreso de la meta
  const progresoMeta = ((ingresosMes / globales.metas.objetivoMes) * 100).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Resumen Hoy */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 style={{ color: '#fff', fontSize: '18px', margin: 0 }}>Balance General Hoy</h2>
        <MetricCard title="Ingresos Totales" value={totalIngresosHoy} type="ingreso" />
        <MetricCard title="Egresos Totales" value={totalEgresosHoy} type="egreso" />
      </section>

      {/* Meta Mensual */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 style={{ color: '#fff', fontSize: '18px', margin: 0 }}>Objetivo Mensual</h2>
        <div style={{ background: '#111820', padding: '16px', borderRadius: '16px', border: '1px solid #1f2028' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#7a8899', fontSize: '12px' }}>Progreso: {progresoMeta}%</span>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>
              ${ingresosMes.toLocaleString()} / ${(globales.metas.objetivoMes / 1000000).toFixed(1)}M
            </span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#1f2028', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${progresoMeta}%`, height: '100%', background: '#00d4ff', borderRadius: '4px' }} />
          </div>
        </div>
      </section>

      {/* Destacado */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 style={{ color: '#fff', fontSize: '18px', margin: 0 }}>Liderando Hoy</h2>
        <div style={{ background: '#111820', padding: '16px', borderRadius: '16px', border: '1px solid #00d4ff40', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#7a8899', fontSize: '12px', textTransform: 'uppercase' }}>Top Performer</span>
            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>{localTop.nombre}</span>
          </div>
          <span style={{ color: '#00e5a0', fontWeight: 'bold', fontSize: '18px' }}>
            +${localTop.finanzas.ingresosDia.toLocaleString()}
          </span>
        </div>
      </section>

    </div>
  );
}
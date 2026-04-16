import React from 'react';
import { useNavigate } from 'react-router-dom';
import { locales, globales, movimientosSemanales } from '../data/mockData'; // <-- Agregamos movimientosSemanales
import MetricCard from '../components/MetricCard/MetricCard';

export default function Dashboard() {
  const navigate = useNavigate();
  const localesArr = Object.values(locales);

  // --- LÓGICA DE CÁLCULOS ---
  const totalIngresosHoy = localesArr.reduce((acc, l) => acc + l.finanzas.ingresosDia, 0);
  const totalEgresosHoy = localesArr.reduce((acc, l) => acc + l.finanzas.egresosDia, 0);
  const saldoNetoHoy = totalIngresosHoy - totalEgresosHoy;

  const difAyer = totalIngresosHoy - globales.historico.ingresosAyer;
  const porcentajeAyer = ((difAyer / globales.historico.ingresosAyer) * 100).toFixed(1);
  const esPositivo = difAyer >= 0;

  const ingresosMes = localesArr.reduce((acc, l) => acc + l.finanzas.ingresosMes, 0);
  const progresoMeta = ((ingresosMes / globales.metas.objetivoMes) * 100).toFixed(1);

  const localTop = localesArr.reduce((prev, curr) => 
    (prev.finanzas.ingresosDia > curr.finanzas.ingresosDia) ? prev : curr
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* ACCESO RÁPIDO A HISTORIAL */}
      <button 
        onClick={() => navigate('/movimientos')}
        style={{
          background: 'rgba(0, 212, 255, 0.1)',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          color: '#00d4ff',
          padding: '14px',
          borderRadius: '16px',
          fontWeight: '700',
          cursor: 'pointer',
          fontSize: '13px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span>Ver movimientos últimos 7 días</span>
        <span style={{ fontSize: '18px' }}>→</span>
      </button>

      {/* SECCIÓN: BALANCE DEL DÍA */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 style={{ color: '#ffffff', fontSize: '18px', margin: 0, fontWeight: '700' }}>Balance General Hoy</h2>
        <MetricCard 
          title="Ingresos Totales" 
          value={totalIngresosHoy} 
          type="ingreso" 
          subtitle={`${esPositivo ? '↑' : '↓'} ${Math.abs(porcentajeAyer)}% vs ayer`}
        />
        <MetricCard 
          title="Caja Neta Hoy" 
          value={saldoNetoHoy} 
          type={saldoNetoHoy >= 0 ? 'neutral' : 'egreso'} 
        />
      </section>

      {/* SECCIÓN: OBJETIVO MENSUAL */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 style={{ color: '#ffffff', fontSize: '18px', margin: 0, fontWeight: '700' }}>Objetivo Mensual</h2>
        <div style={{ 
          background: 'rgba(17, 24, 32, 0.4)', 
          backdropFilter: 'blur(12px)', 
          padding: '20px', 
          borderRadius: '20px', 
          border: '1px solid rgba(255, 255, 255, 0.05)' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: '#8b9bb4', fontSize: '12px', fontWeight: '600' }}>Progreso: {progresoMeta}%</span>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>
              ${ingresosMes.toLocaleString()} / ${(globales.metas.objetivoMes / 1000000).toFixed(1)}M
            </span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${progresoMeta}%`, 
              height: '100%', 
              background: '#00d4ff', 
              borderRadius: '4px', 
              boxShadow: '0 0 12px rgba(0, 212, 255, 0.5)' 
            }} />
          </div>
        </div>
      </section>

      {/* SECCIÓN: TOP PERFORMER */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 style={{ color: '#ffffff', fontSize: '18px', margin: 0, fontWeight: '700' }}>Liderando Hoy</h2>
        <div style={{ 
          background: 'rgba(17, 24, 32, 0.4)', 
          backdropFilter: 'blur(12px)', 
          padding: '18px', 
          borderRadius: '20px', 
          border: '1px solid rgba(0, 212, 255, 0.2)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#8b9bb4', fontSize: '11px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '1px' }}>Top Unidad</span>
            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>{localTop.nombre}</span>
          </div>
          <span style={{ color: '#00e5a0', fontWeight: '800', fontSize: '20px' }}>
            +${localTop.finanzas.ingresosDia.toLocaleString()}
          </span>
        </div>
      </section>

      {/* SECCIÓN: AUDITORÍA RECIENTE (Ahora lee los primeros 3 de movimientosSemanales) */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        <h2 style={{ color: '#ffffff', fontSize: '18px', margin: 0, fontWeight: '700' }}>Últimos Movimientos</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {movimientosSemanales.slice(0, 3).map(mov => (
            <div key={mov.id} style={{ 
              background: 'rgba(17, 24, 32, 0.4)', 
              backdropFilter: 'blur(12px)', 
              padding: '16px', 
              borderRadius: '16px', 
              border: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}>
              <div style={{ color: '#8b9bb4', fontSize: '11px', fontWeight: '700', minWidth: '35px' }}>{mov.hora}</div>
              <div style={{ 
                width: '6px', 
                height: '6px', 
                borderRadius: '50%', 
                background: mov.tipo === 'ingreso' ? '#00e5a0' : '#ff4757',
                boxShadow: `0 0 8px ${mov.tipo === 'ingreso' ? '#00e5a0' : '#ff4757'}`
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ color: '#ffffff', fontSize: '13px', lineHeight: '1.4', fontWeight: '500' }}>{mov.texto}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
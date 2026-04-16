import React from 'react';
import { useNavigate } from 'react-router-dom';
import { movimientosSemanales } from '../data/mockData';

export default function MovementsView() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#00d4ff', textAlign: 'left', padding: 0, cursor: 'pointer', fontWeight: '600' }}>
        ← Volver
      </button>

      <h2 style={{ color: '#fff', fontSize: '22px', margin: 0 }}>Historial 7 Días</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {movimientosSemanales.map(mov => (
          <div key={mov.id} style={{ 
            background: 'rgba(17, 24, 32, 0.4)', 
            backdropFilter: 'blur(12px)', 
            padding: '16px', 
            borderRadius: '16px', 
            border: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#8b9bb4', fontSize: '11px', fontWeight: '700' }}>{mov.fecha} - {mov.hora}</span>
              <span style={{ 
                color: mov.tipo === 'ingreso' ? '#00e5a0' : '#ff4757', 
                fontWeight: '800', 
                fontSize: '16px' 
              }}>
                {mov.tipo === 'ingreso' ? '+' : '-'}${mov.monto.toLocaleString()}
              </span>
            </div>
            <div style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>{mov.texto}</div>
            <div style={{ color: '#00d4ff', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{mov.local}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
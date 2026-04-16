import React from 'react';

export default function MetricCard({ title, value, type = 'neutral', format = 'currency', subtitle = '' }) {
  const colors = {
    ingreso: '#00e5a0',
    egreso: '#ff4757',
    alerta: '#ffa502',
    neutral: '#00d4ff'
  };

  const formattedValue = format === 'currency' 
    ? `$${value.toLocaleString('es-AR')}` 
    : value;

  return (
    <div style={{
      /* Efecto translúcido (Glassmorphism) */
      background: 'rgba(17, 24, 32, 0.4)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      padding: '18px 20px',
      borderRadius: '20px',
      border: `1px solid ${type === 'alerta' ? 'rgba(255, 165, 2, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      transition: 'transform 0.2s ease'
    }}>
      <span style={{ color: '#8b9bb4', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
        {title}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ color: colors[type], fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px' }}>
          {formattedValue}
        </span>
        {subtitle && <span style={{ color: '#5c6b7f', fontSize: '12px', fontWeight: '500' }}>{subtitle}</span>}
      </div>
    </div>
  );
}
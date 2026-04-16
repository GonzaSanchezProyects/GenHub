import React from 'react';

export default function MetricCard({ title, value, type = 'neutral', format = 'currency', subtitle = '' }) {
  const colors = {
    ingreso: '#00e5a0', // Verde
    egreso: '#ff4757',  // Rojo
    alerta: '#ffa502',  // Naranja
    neutral: '#00d4ff'  // Azul
  };

  const formattedValue = format === 'currency' 
    ? `$${value.toLocaleString('es-AR')}` 
    : value;

  return (
    <div style={{
      background: '#111820',
      padding: '16px 20px',
      borderRadius: '16px',
      border: `1px solid ${type === 'alerta' ? '#ffa50240' : '#1f2028'}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    }}>
      <span style={{ color: '#7a8899', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        {title}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ color: colors[type], fontSize: '24px', fontWeight: 'bold' }}>
          {formattedValue}
        </span>
        {subtitle && <span style={{ color: '#7a8899', fontSize: '12px' }}>{subtitle}</span>}
      </div>
    </div>
  );
}
// src/components/MetricCard/MetricCard.jsx
import React from 'react';

export default function MetricCard({ title, value, type = 'neutral', subtitle, format }) {
  
  // Colores dinámicos según el tipo de métrica
  const glowColor = {
    ingreso: 'rgba(0, 229, 160, 0.1)',
    egreso: 'rgba(255, 71, 87, 0.1)',
    alerta: 'rgba(255, 165, 2, 0.1)',
    neutral: 'rgba(0, 212, 255, 0.1)'
  }[type];

  const valueColor = {
    ingreso: '#00e5a0',
    egreso: '#ff4757',
    alerta: '#ffa502',
    neutral: '#00d4ff'
  }[type];

  // Formateo del valor (números a moneda, textos se mantienen)
  const displayValue = format === 'text' || format === 'fraction' 
    ? value 
    : `$${Number(value).toLocaleString('es-AR')}`;

  return (
    <div style={{
      background: 'var(--bg-card)',            // <- Cambiado
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      padding: '20px',
      borderRadius: '24px',
      border: '1px solid var(--border-color)', // <- Cambiado
      boxShadow: `inset 0 0 20px ${glowColor}`, 
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      position: 'relative',
      overflow: 'hidden',
      animation: `metricItemFadeIn 0.5s ease-out 0.1s both`
    }}>
      <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '3px', background: glowColor.replace('0.1', '1'), borderRadius: '0 4px 4px 0' }} />
      
      <div style={{ color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600' }}> {/* <- Cambiado */}
        {title}
      </div>
      <div style={{ color: valueColor, fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>
        {displayValue}
      </div>
      
      {subtitle && (
        <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px', fontWeight: '500' }}> {/* <- Cambiado */}
          {subtitle}
        </div>
      )}
    </div>
  );
}
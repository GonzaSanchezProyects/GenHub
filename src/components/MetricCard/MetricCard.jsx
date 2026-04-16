// src/components/MetricCard/MetricCard.jsx
import React from 'react';

export default function MetricCard({ title, value, type = 'neutral', subtitle, format }) {
  
  // Colores de acento ajustados dinámicamente por CSS
  // Usamos clases o estilos que respeten el tema
  const glowColor = {
    ingreso: 'rgba(0, 229, 160, 0.15)',
    egreso: 'rgba(255, 71, 87, 0.15)',
    alerta: 'rgba(255, 165, 2, 0.15)',
    neutral: 'rgba(0, 212, 255, 0.15)'
  }[type];

  // IMPORTANTE: En modo claro usamos colores más saturados para los números
  const valueColor = {
    ingreso: 'var(--accent-green, #00e5a0)', 
    egreso: '#ff4757',
    alerta: '#ffa502',
    neutral: 'var(--accent-cyan)'
  }[type];

  const displayValue = format === 'text' || format === 'fraction' 
    ? value 
    : `$${Number(value).toLocaleString('es-AR')}`;

  return (
    <div style={{
      background: 'var(--bg-card)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      padding: '22px 20px',
      borderRadius: '26px',
      border: '1px solid var(--border-color)',
      boxShadow: `inset 0 0 20px ${glowColor}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      position: 'relative',
      overflow: 'hidden',
      animation: `metricItemFadeIn 0.5s ease-out both`
    }}>
      {/* Indicador lateral más sólido para el modo claro */}
      <div style={{ 
        position: 'absolute', left: 0, top: 0, bottom: 0, 
        width: '4px', background: valueColor, opacity: 0.8
      }} />
      
      <div style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {title}
      </div>
      
      {/* El valor principal siempre usa el color de acento o el principal del tema */}
      <div style={{ color: valueColor, fontSize: '26px', fontWeight: '900', letterSpacing: '-0.5px' }}>
        {displayValue}
      </div>
      
      {subtitle && (
        <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px', fontWeight: '600' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
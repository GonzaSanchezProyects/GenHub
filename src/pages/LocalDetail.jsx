// src/pages/LocalDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { locales } from '../data/mockData';
import MetricCard from '../components/MetricCard/MetricCard';

export default function LocalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = locales[id];

  if (!data) return null;

  // Tomamos solo los primeros 5 para la vista previa
  const vistaPrevia = data.movimientos.slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#00d4ff', textAlign: 'left', padding: 0, marginBottom: '5px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
        ← Volver
      </button>

      <div style={{ marginBottom: '5px' }}>
        <h2 style={{ color: '#fff', fontSize: '26px', margin: '0 0 6px 0', fontWeight: '800' }}>{data.nombre}</h2>
        <span style={{ background: 'rgba(17, 24, 32, 0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#8b9bb4', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>
          {data.nave}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <MetricCard title="Ingresos Hoy" value={data.finanzas.ingresosDia} type="ingreso" />
        <MetricCard title="Egresos Hoy" value={data.finanzas.egresosDia} type="egreso" />
      </div>

      {/* Vista Previa del Historial */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ color: '#ffffff', fontSize: '18px', margin: 0, fontWeight: '700' }}>Actividad Reciente</h3>
          <button 
            onClick={() => navigate(`/local/${id}/historial`)}
            style={{ background: 'none', border: 'none', color: '#00d4ff', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
          >
            Ver todo ➔
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {vistaPrevia.map(mov => (
            <div key={mov.id} style={{ background: 'rgba(17, 24, 32, 0.4)', backdropFilter: 'blur(12px)', padding: '14px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: '#fff', fontSize: '13px', fontWeight: '500' }}>{mov.texto}</div>
              <div style={{ color: mov.tipo === 'ingreso' ? '#00e5a0' : mov.tipo === 'egreso' ? '#ff4757' : '#00d4ff', fontWeight: '800' }}>
                {mov.monto > 0 ? `$${mov.monto.toLocaleString('es-AR')}` : '--'}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
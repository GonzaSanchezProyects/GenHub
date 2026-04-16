import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { locales } from '../data/mockData';
import MetricCard from '../components/MetricCard/MetricCard';

export default function LocalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = locales[id];

  if (!data) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#00d4ff', textAlign: 'left', padding: 0, marginBottom: '10px', cursor: 'pointer', fontSize: '14px' }}>
        ← Volver a la Nave
      </button>

      <div style={{ marginBottom: '10px' }}>
        <h2 style={{ color: '#fff', fontSize: '24px', margin: '0 0 4px 0' }}>{data.nombre}</h2>
        <span style={{ background: '#1f2028', color: '#7a8899', padding: '4px 10px', borderRadius: '12px', fontSize: '12px' }}>
          {data.nave}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <MetricCard title="Ingresos" value={data.finanzas.ingresosDia} type="ingreso" />
        <MetricCard title="Egresos" value={data.finanzas.egresosDia} type="egreso" />
      </div>

      <MetricCard 
        title="Personal en Planta" 
        value={`${data.personal.presentes}/${data.personal.total}`} 
        format="fraction" 
        type={data.personal.presentes === data.personal.total ? 'ingreso' : 'alerta'} 
        subtitle="Presentes vs Total"
      />

      <MetricCard 
        title="Estado de Stock" 
        value={data.stock.estado} 
        format="text" 
        type={data.stock.criticos > 0 ? 'alerta' : 'ingreso'}
        subtitle={data.stock.criticos > 0 ? `${data.stock.criticos} items críticos (Reponer)` : 'Operando normalmente'}
      />
    </div>
  );
}
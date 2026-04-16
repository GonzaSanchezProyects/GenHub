// src/pages/LocalMovements.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { locales } from '../data/mockData';

export default function LocalMovements() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = locales[id];
  const [page, setPage] = useState(1);
  const perPage = 10;

  if (!data) return null;

  const totalPages = Math.ceil(data.movimientos.length / perPage);
  const items = data.movimientos.slice((page - 1) * perPage, page * perPage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#00d4ff', textAlign: 'left', padding: 0, cursor: 'pointer', fontWeight: '600' }}>
        ← Volver al Detalle
      </button>

      <h2 style={{ color: '#fff', fontSize: '22px', margin: 0 }}>Historial Completo: {data.nombre}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map(mov => (
          <div key={mov.id} style={{ background: 'rgba(17, 24, 32, 0.4)', backdropFilter: 'blur(12px)', padding: '16px', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#8b9bb4', fontSize: '11px', fontWeight: '700' }}>{mov.fecha} - {mov.hora}</span>
              <span style={{ color: mov.tipo === 'ingreso' ? '#00e5a0' : mov.tipo === 'egreso' ? '#ff4757' : '#00d4ff', fontWeight: '800' }}>
                {mov.monto > 0 ? `${mov.tipo === 'ingreso' ? '+' : '-'}$${mov.monto.toLocaleString('es-AR')}` : 'Auditoría'}
              </span>
            </div>
            <div style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>{mov.texto}</div>
          </div>
        ))}
      </div>

      {/* Controles de Paginación Premium */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', background: 'rgba(17, 24, 32, 0.6)', padding: '10px', borderRadius: '16px' }}>
        <button 
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          style={{ background: 'rgba(0, 212, 255, 0.1)', border: 'none', color: '#00d4ff', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', opacity: page === 1 ? 0.3 : 1 }}
        >
          Anterior
        </button>
        <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>Pág {page} / {totalPages}</span>
        <button 
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          style={{ background: 'rgba(0, 212, 255, 0.1)', border: 'none', color: '#00d4ff', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', opacity: page === totalPages ? 0.3 : 1 }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { locales } from '../data/mockData';

export default function NaveView() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const localesDeNave = Object.values(locales).filter(loc => 
    loc.nave.toLowerCase().includes(id)
  );

  const ingresosNave = localesDeNave.reduce((acc, loc) => acc + loc.finanzas.ingresosDia, 0);
  const egresosNave = localesDeNave.reduce((acc, loc) => acc + loc.finanzas.egresosDia, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Resumen de la Nave */}
      <section style={{ background: '#111820', padding: '20px', borderRadius: '20px', border: '1px solid #1f2028' }}>
        <h2 style={{ color: '#7a8899', fontSize: '12px', textTransform: 'uppercase', margin: '0 0 16px 0' }}>
          Resumen Consolidado ({id === 'norte' ? 'Nave Norte' : 'Nave Sur'})
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#fff' }}>Ingresos Hoy</span>
            <span style={{ color: '#00e5a0', fontWeight: 'bold', fontSize: '18px' }}>${ingresosNave.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#fff' }}>Egresos Hoy</span>
            <span style={{ color: '#ff4757', fontWeight: 'bold', fontSize: '18px' }}>${egresosNave.toLocaleString()}</span>
          </div>
          <div style={{ height: '1px', background: '#1f2028', margin: '4px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#7a8899' }}>Caja Neta Diaria</span>
            <span style={{ color: '#00d4ff', fontWeight: 'bold', fontSize: '20px' }}>${(ingresosNave - egresosNave).toLocaleString()}</span>
          </div>
        </div>
      </section>

      {/* Accesos a Locales */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ color: '#fff', fontSize: '16px', margin: '0 0 4px 0' }}>Unidades de Negocio</h3>
        {localesDeNave.map(local => (
          <button 
            key={local.id}
            onClick={() => navigate(`/local/${local.id}`)}
            style={{
              background: '#1a222c',
              border: '1px solid #2d3748',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div>
              <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>{local.nombre}</div>
              <div style={{ color: '#7a8899', fontSize: '12px' }}>Ver métricas detalladas</div>
            </div>
            <span style={{ color: '#00d4ff', fontSize: '20px' }}>→</span>
          </button>
        ))}
      </section>

    </div>
  );
}
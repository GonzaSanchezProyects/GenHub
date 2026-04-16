import React from 'react';
import { useNavigate } from 'react-router-dom';
import { locales, movimientosSemanales } from '../data/mockData';

export default function SummariesView() {
  const navigate = useNavigate();

  // Función para exportar a Excel (CSV)
  const descargarCSV = (tipo) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    let fileName = "";

    if (tipo === 'semanal') {
      fileName = "Reporte_Semanal_GenHub.csv";
      csvContent += "Fecha,Hora,Local,Concepto,Monto,Tipo\n";
      movimientosSemanales.forEach(m => {
        csvContent += `${m.fecha},${m.hora},${m.local},${m.texto},${m.monto},${m.tipo}\n`;
      });
    } else {
      fileName = "Resumen_Mensual_Locales.csv";
      csvContent += "Local,Nave,Ingresos Mes,Egresos Mes,Saldo\n";
      Object.values(locales).forEach(l => {
        const saldo = l.finanzas.ingresosMes - (l.finanzas.egresosMes || 0);
        csvContent += `${l.nombre},${l.nave},${l.finanzas.ingresosMes},${l.finanzas.egresosMes || 0},${saldo}\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingBottom: '20px' }}>
      
      {/* Botón Volver con el color temático */}
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: 'none', border: 'none', color: '#ff4785', textAlign: 'left', padding: 0, cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}
      >
        ← Volver
      </button>

      {/* Cabecera Temática */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h2 style={{ color: '#fff', fontSize: '32px', margin: 0, fontWeight: '800', letterSpacing: '-0.5px' }}>
          Centro de <span style={{ color: '#ff4785' }}>Reportes</span>
        </h2>
        <p style={{ color: '#8b9bb4', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
          Exportá la información contable y operativa del complejo en formato Excel (.csv).
        </p>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* TARJETA 1: Reporte Semanal (Destacada con gradiente magenta) */}
        <div style={{ 
          background: 'linear-gradient(145deg, rgba(255, 71, 133, 0.15) 0%, rgba(17, 24, 32, 0.8) 100%)', 
          backdropFilter: 'blur(12px)', 
          WebkitBackdropFilter: 'blur(12px)',
          padding: '26px', 
          borderRadius: '24px', 
          border: '1px solid rgba(255, 71, 133, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ 
              width: '46px', height: '46px', borderRadius: '14px', 
              background: 'linear-gradient(135deg, rgba(255, 71, 133, 0.3), rgba(255, 71, 133, 0.1))', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' 
            }}>
              📅
            </div>
            <div>
              <h3 style={{ color: '#fff', fontSize: '19px', margin: '0 0 2px 0', fontWeight: '700' }}>Historial 7 Días</h3>
              <p style={{ color: '#ff7fa8', fontSize: '12px', margin: 0, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Operaciones al detalle
              </p>
            </div>
          </div>
          
          <p style={{ color: '#a6b6cc', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>
            Incluye todos los movimientos individuales (ingresos, egresos y auditoría) de todas las naves en la última semana.
          </p>
          
          <button 
            onClick={() => descargarCSV('semanal')}
            style={{ 
              background: 'linear-gradient(90deg, #ff4785, #ec4899)', 
              color: '#fff', border: 'none', padding: '16px', borderRadius: '16px', 
              fontWeight: '800', cursor: 'pointer', fontSize: '14px', 
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', 
              boxShadow: '0 4px 20px rgba(255, 71, 133, 0.4)' 
            }}
          >
            <span style={{ fontSize: '18px' }}>📥</span> Descargar Excel Semanal
          </button>
        </div>

        {/* TARJETA 2: Reporte Mensual (Secundaria) */}
        <div style={{ 
          background: 'rgba(17, 24, 32, 0.6)', 
          backdropFilter: 'blur(12px)', 
          WebkitBackdropFilter: 'blur(12px)',
          padding: '26px', 
          borderRadius: '24px', 
          border: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ 
              width: '46px', height: '46px', borderRadius: '14px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' 
            }}>
              📊
            </div>
            <div>
              <h3 style={{ color: '#fff', fontSize: '19px', margin: '0 0 2px 0', fontWeight: '700' }}>Balance Mensual</h3>
              <p style={{ color: '#8b9bb4', fontSize: '12px', margin: 0, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Resumen consolidado
              </p>
            </div>
          </div>
          
          <p style={{ color: '#7a8899', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>
            Totales de facturación, gastos operativos y caja neta separados por unidad de negocio y nave.
          </p>
          
          <button 
            onClick={() => descargarCSV('mensual')}
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)', color: '#fff', 
              border: '1px solid rgba(255, 255, 255, 0.1)', padding: '16px', borderRadius: '16px', 
              fontWeight: '700', cursor: 'pointer', fontSize: '14px', 
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' 
            }}
          >
            <span style={{ fontSize: '18px' }}>📑</span> Generar Resumen del Mes
          </button>
        </div>

      </section>
    </div>
  );
}
Frigorifico · JSX
Copiar

import React, { useState } from 'react'
import { frigorifico } from '../../data/mockData'
import MetricCard from '../../components/MetricCard/MetricCard'
import styles from './Frigorifico.module.css'
 
const TEMP_SAFE = 2.0
 
export default function Frigorifico() {
  const [activeTab, setActiveTab] = useState('camaras')
 
  return (
    <div className={styles.page}>
 
      {/* ── Metrics Row ── */}
      <div className={styles.metricsRow}>
        <MetricCard label="Stock Total" value="8.5" unit="Ton" trend={8.5} trendLabel="semana" icon="⬡" accent="cyan" />
        <MetricCard label="Facturación Hoy" value="$5,100" trend={8.5} icon="$" accent="green" />
        <MetricCard label="Despachos Hoy" value="3" sub="2 completados · 1 pendiente" icon="◧" accent="gold" />
        <MetricCard label="Temp. Promedio" value="1.2°C" sub="Cadena de frío OK" icon="❄" accent="cyan" mono />
      </div>
 
      {/* ── Cameras ── */}
      <div className={styles.sectionTitle}>Cámaras Frigoríficas — Monitoreo en Tiempo Real</div>
      <div className={styles.camarasGrid}>
        {frigorifico.camaras.map(cam => {
          const isAlert = cam.estado === 'alerta'
          const isCongelado = cam.temp < 0
          const pct = isCongelado
            ? Math.min(100, Math.abs(cam.temp / -25) * 100)
            : Math.min(100, (cam.temp / cam.tempMax) * 100)
 
          return (
            <div key={cam.id} className={`${styles.camaraCard} ${isAlert ? styles.camaraAlert : ''}`}>
              <div className={styles.camaraHeader}>
                <span className={styles.camaraId}>{cam.id}</span>
                <span className={`${styles.camaraStatus} ${isAlert ? styles.statusAlerta : styles.statusOk}`}>
                  {isAlert ? '⚠ ALERTA' : '✓ NORMAL'}
                </span>
              </div>
              <div className={styles.camaraName}>{cam.nombre}</div>
 
              {/* Thermometer */}
              <div className={styles.thermoContainer}>
                <div className={styles.thermoTrack}>
                  <div
                    className={`${styles.thermoFill} ${isAlert ? styles.thermoAlert : isCongelado ? styles.thermoFreeze : styles.thermoNormal}`}
                    style={{ height: `${pct}%` }}
                  />
                </div>
                <div className={styles.thermoValue}>
                  <span className={`${styles.tempNum} ${isAlert ? styles.tempAlertColor : ''}`}>
                    {cam.temp}°C
                  </span>
                  <span className={styles.tempMax}>Máx: {cam.tempMax}°C</span>
                </div>
              </div>
 
              <div className={styles.camaraFooter}>
                <div className={styles.camaraMetric}>
                  <span className={styles.camaraMetricLabel}>Humedad</span>
                  <span className={styles.camaraMetricValue}>{cam.humedad}%</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
 
      {/* ── Tabs: Stock / Despachos ── */}
      <div className={styles.tabsRow}>
        {['camaras', 'stock', 'despachos'].map(t => (
          <button
            key={t}
            className={`${styles.tab} ${activeTab === t ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t === 'camaras' ? '❄ Cadena de Frío' : t === 'stock' ? '⬡ Inventario por Peso' : '◧ Despachos'}
          </button>
        ))}
      </div>
 
      {activeTab === 'stock' && (
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th><th>Producto</th><th>Fecha Ingreso</th>
                <th>Cantidad</th><th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {frigorifico.stockItems.map(item => (
                <tr key={item.id}>
                  <td><span className={styles.monoTag}>{item.id}</span></td>
                  <td className={styles.tdMain}>{item.producto}</td>
                  <td className={styles.tdMono}>{item.ingreso}</td>
                  <td className={styles.tdMono}><strong>{item.cantidad}</strong> {item.unidad}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[`badge_${item.estado}`]}`}>
                      {item.estado === 'optimo' ? 'ÓPTIMO' : item.estado === 'reciente' ? 'RECIENTE' : 'PRÓX. VENC.'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
 
      {activeTab === 'despachos' && (
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Despacho</th><th>Cliente</th><th>Tipo</th>
                <th>Peso (kg)</th><th>Hora</th><th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {frigorifico.despachos.map(d => (
                <tr key={d.id}>
                  <td><span className={styles.monoTag}>{d.id}</span></td>
                  <td className={styles.tdMain}>{d.cliente}</td>
                  <td className={styles.tdMono}>{d.tipo}</td>
                  <td className={styles.tdMono}><strong>{d.peso}</strong> kg</td>
                  <td className={styles.tdMono}>{d.hora}</td>
                  <td>
                    <span className={`${styles.badge} ${d.estado === 'completado' ? styles.badge_optimo : styles.badge_proximo}`}>
                      {d.estado === 'completado' ? '✓ COMPLETADO' : '◷ PENDIENTE'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
 
      {activeTab === 'camaras' && (
        <div className={styles.trazabilidadTag}>
          <span>❄</span>
          <span>TRAZABILIDAD TOTAL POR PESO — Todos los movimientos auditados y timestamped</span>
        </div>
      )}
    </div>
  )
}
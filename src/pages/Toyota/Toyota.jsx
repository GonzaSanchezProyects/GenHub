import React from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { toyota } from '../../data/mockData'
import MetricCard from '../../components/MetricCard/MetricCard'
import styles from './Toyota.module.css'

export default function Toyota() {
  return (
    <div className={styles.page}>
      <div className={styles.metricsRow}>
        <MetricCard label="Vehículos Vendidos Mes" value={toyota.vehiculosVendidosMes} trend={toyota.tendencia} icon="◈" accent="green" />
        <MetricCard label="Facturación Hoy" value={`$${toyota.facturacionHoy.toLocaleString()}`} trend={toyota.tendencia} icon="$" accent="green" />
        <MetricCard label="Stock Vehículos" value={toyota.stockVehiculos} sub="unidades disponibles" icon="⬡" accent="cyan" />
        <MetricCard label="Repuestos en Stock" value={toyota.stockRepuestos.toLocaleString()} sub={`${toyota.repuestosBajoStock} bajo mínimo`} icon="◧" accent="gold" />
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Stock de Vehículos por Modelo</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={toyota.vehiculos} layout="vertical">
              <XAxis type="number" tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="modelo" type="category" width={130} tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-dim)', borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: 11 }} />
              <Bar dataKey="stock" fill="var(--accent-green)" radius={[0,4,4,0]} fillOpacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Ventas Recientes</div>
          <div className={styles.ventasList}>
            {toyota.ventasRecientes.map(v => (
              <div key={v.id} className={styles.ventaItem}>
                <div className={styles.ventaLeft}>
                  <div className={styles.ventaId}>{v.id}</div>
                  <div className={styles.ventaModelo}>{v.modelo}</div>
                  <div className={styles.ventaCliente}>{v.cliente}</div>
                </div>
                <div className={styles.ventaRight}>
                  <div className={styles.ventaMonto}>${v.monto.toLocaleString()}</div>
                  <div className={styles.ventaHora}>{v.hora}</div>
                  <span className={styles.ventaBadge}>✓ CERRADO</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.sectionTitle}>Repuestos Críticos</div>
      <div className={styles.repuestosGrid}>
        {toyota.topRepuestos.map(r => {
          const pct = Math.round((r.stock / (r.minimo * 3)) * 100)
          const bajo = r.stock < r.minimo
          return (
            <div key={r.codigo} className={`${styles.repuestoCard} ${bajo ? styles.repuestoBajo : ''}`}>
              <div className={styles.repuestoCodigo}>{r.codigo}</div>
              <div className={styles.repuestoDesc}>{r.descripcion}</div>
              <div className={styles.repuestoBar}>
                <div className={`${styles.repuestoFill} ${bajo ? styles.fillRed : styles.fillGreen}`} style={{ width: `${Math.min(100, pct)}%` }} />
              </div>
              <div className={styles.repuestoNums}>
                <span className={bajo ? styles.red : styles.green}>{r.stock} ud.</span>
                <span>mín. {r.minimo}</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.crmTag}>INTEGRACIÓN CRM TOYOTA REAL-TIME — Sincronización automática cada 15 minutos</div>
    </div>
  )
}
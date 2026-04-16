import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'
import { complexStats, revenueHistory, frigorifico, gastronomia, toyota, taller, alertas } from '../../data/mockData'
import MetricCard from '../../components/MetricCard/MetricCard'
import styles from './Overview.module.css'

const BUSINESS_UNITS = [
  {
    id: 'frigorifico',
    to: '/frigorifico',
    nombre: 'Nave Norte',
    tipo: 'Frigorífico',
    icon: '❄',
    color: '#00d4ff',
    colorDim: 'rgba(0,212,255,0.08)',
    estado: 'activo',
    metrics: [
      { label: 'Temp. Cadena Frío', value: '1.2°C', ok: true },
      { label: 'Stock Actual', value: '8.5 Ton' },
      { label: 'Facturación Hoy', value: '$5,100' },
    ],
    tag: 'TRAZABILIDAD TOTAL POR PESO',
  },
  {
    id: 'gastronomia',
    to: '/gastronomia',
    nombre: 'Nave Norte',
    tipo: 'Gastronomía',
    icon: '◉',
    color: '#f0b429',
    colorDim: 'rgba(240,180,41,0.08)',
    estado: 'activo',
    metrics: [
      { label: 'Pedidos Hoy', value: '112 órd.' },
      { label: 'Mesas Activas', value: '8 / 14' },
      { label: 'Facturación Hoy', value: '$3,700' },
    ],
    tag: 'AUDITORÍA DE PROCESOS GASTRONÓMICOS',
  },
  {
    id: 'toyota',
    to: '/toyota',
    nombre: 'Nave Sur',
    tipo: 'Toyota Oficial',
    icon: '◈',
    color: '#00e5a0',
    colorDim: 'rgba(0,229,160,0.08)',
    estado: 'activo',
    metrics: [
      { label: 'Vehículos Mes', value: '14 ud.' },
      { label: 'Inventario Repuestos', value: '2,100 ud.' },
      { label: 'Facturación Hoy', value: '$5,400' },
    ],
    tag: 'INTEGRACIÓN CRM TOYOTA REAL-TIME',
  },
  {
    id: 'taller',
    to: '/taller',
    nombre: 'Nave Sur',
    tipo: 'Chapa & Pintura',
    icon: '⬢',
    color: '#ff6b35',
    colorDim: 'rgba(255,107,53,0.08)',
    estado: 'activo',
    metrics: [
      { label: 'OTs Activas', value: '25 órd.' },
      { label: 'Completadas Hoy', value: '8 ud.' },
      { label: 'Eficiencia', value: '87%' },
    ],
    tag: 'CONTROL DE TIEMPOS OPERATIVOS',
  },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-accent)',
        borderRadius: 8,
        padding: '10px 14px',
        fontFamily: 'var(--font-mono)',
      }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: 10, marginBottom: 6 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color, fontSize: 11 }}>
            {p.name}: ${p.value?.toLocaleString()}
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function Overview() {
  const navigate = useNavigate()
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    setAnimating(true)
  }, [])

  const alertasCriticas = alertas.filter(a => a.tipo === 'critica' && a.estado !== 'resuelta')
  const alertasActivas = alertas.filter(a => a.estado === 'pendiente' || a.estado === 'critica')

  return (
    <div className={`${styles.page} ${animating ? styles.pageVisible : ''}`}>

      {/* ── KPI Strip ── */}
      <div className={styles.kpiStrip}>
        <div className={styles.kpiMain}>
          <div className={styles.kpiLabel}>Facturación Total Hoy</div>
          <div className={styles.kpiValue}>
            <span className={styles.kpiCurrency}>$</span>
            {complexStats.facturacionHoy.toLocaleString('es-AR')}
            <span className={styles.kpiUsd}>USD</span>
          </div>
          <div className={styles.kpiTrend}>
            <span className={styles.kpiTrendArrow}>↑</span>
            +{complexStats.tendencia}% vs ayer
          </div>
        </div>
        <div className={styles.kpiDivider} />
        <div className={styles.kpiStats}>
          <div className={styles.kpiStat}>
            <span className={styles.kpiStatValue}>4 / 4</span>
            <span className={styles.kpiStatLabel}>Locales Activos</span>
          </div>
          <div className={styles.kpiStat}>
            <span className={styles.kpiStatValue}>0</span>
            <span className={styles.kpiStatLabel}>Alertas Críticas</span>
          </div>
          <div className={styles.kpiStat}>
            <span className={styles.kpiStatValue}>87%</span>
            <span className={styles.kpiStatLabel}>Eficiencia Global</span>
          </div>
          <div className={styles.kpiStat}>
            <span className={styles.kpiStatValue}>1.2°C</span>
            <span className={styles.kpiStatLabel}>Temp. Cámara Prom.</span>
          </div>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className={styles.mainGrid}>

        {/* Revenue Chart */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>Facturación Semanal por Unidad</div>
              <div className={styles.cardSub}>Últimos 7 días — Desglose por módulo</div>
            </div>
            <div className={styles.chartLegend}>
              {[
                { label: 'Frigorífico', color: '#00d4ff' },
                { label: 'Gastronomía', color: '#f0b429' },
                { label: 'Toyota', color: '#00e5a0' },
                { label: 'Taller', color: '#ff6b35' },
              ].map(l => (
                <div key={l.label} className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: l.color }} />
                  <span>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueHistory} barGap={2}>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="dia" tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="frigorifico" name="Frigorífico" stackId="a" fill="#00d4ff" fillOpacity={0.85} radius={[0,0,0,0]} />
              <Bar dataKey="gastronomia" name="Gastronomía" stackId="a" fill="#f0b429" fillOpacity={0.85} />
              <Bar dataKey="toyota" name="Toyota" stackId="a" fill="#00e5a0" fillOpacity={0.85} />
              <Bar dataKey="taller" name="Taller" stackId="a" fill="#ff6b35" fillOpacity={0.85} radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts panel */}
        <div className={styles.alertsCard}>
          <div className={styles.cardHeader}>
            <div>
              <div className={styles.cardTitle}>Alertas Recientes</div>
              <div className={styles.cardSub}>Feed en tiempo real</div>
            </div>
            <button className={styles.viewAllBtn} onClick={() => navigate('/alertas')}>Ver todo →</button>
          </div>
          <div className={styles.alertsList}>
            {alertas.slice(0, 5).map((alerta, i) => (
              <div key={alerta.id} className={`${styles.alertItem} ${styles[`alert_${alerta.tipo}`]}`}
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className={styles.alertLeft}>
                  <span className={styles.alertIcon}>
                    {alerta.tipo === 'critica' ? '⚠' : alerta.tipo === 'advertencia' ? '◈' : 'ℹ'}
                  </span>
                </div>
                <div className={styles.alertBody}>
                  <div className={styles.alertTitle}>{alerta.titulo}</div>
                  <div className={styles.alertMeta}>
                    <span>{alerta.modulo}</span>
                    <span>·</span>
                    <span>{alerta.hora}</span>
                    {alerta.horaResolucion && (
                      <span className={styles.alertResolved}>✓ Resuelto {alerta.horaResolucion}</span>
                    )}
                  </div>
                </div>
                <div className={`${styles.alertBadge} ${styles[`badge_${alerta.estado}`]}`}>
                  {alerta.estado === 'resuelta' ? 'RESUELTA' : alerta.estado === 'pendiente' ? 'ACTIVA' : 'INFO'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Business Units ── */}
      <div className={styles.sectionTitle}>
        <span>Unidades de Negocio</span>
        <div className={styles.sectionLine} />
        <span className={styles.sectionSub}>Estado operativo en tiempo real</span>
      </div>

      <div className={styles.unitsGrid}>
        {BUSINESS_UNITS.map((unit, i) => (
          <div
            key={unit.id}
            className={styles.unitCard}
            style={{
              '--unit-color': unit.color,
              '--unit-color-dim': unit.colorDim,
              animationDelay: `${i * 100}ms`,
            }}
            onClick={() => navigate(unit.to)}
          >
            {/* Header */}
            <div className={styles.unitHeader}>
              <div className={styles.unitIcon} style={{ color: unit.color, borderColor: unit.color }}>
                {unit.icon}
              </div>
              <div className={styles.unitMeta}>
                <div className={styles.unitNave}>{unit.nombre}</div>
                <div className={styles.unitName}>{unit.tipo}</div>
              </div>
              <div className={styles.unitStatus}>
                <span className={styles.unitStatusDot} />
                ACTIVO
              </div>
            </div>

            {/* Metrics */}
            <div className={styles.unitMetrics}>
              {unit.metrics.map((m, j) => (
                <div key={j} className={styles.unitMetric}>
                  <div className={styles.unitMetricLabel}>{m.label}</div>
                  <div className={styles.unitMetricValue} style={{ color: m.ok ? 'var(--accent-green)' : undefined }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Tag */}
            <div className={styles.unitTag} style={{ color: unit.color, borderColor: unit.color }}>
              {unit.tag}
            </div>

            {/* Hover arrow */}
            <div className={styles.unitArrow}>→</div>
          </div>
        ))}
      </div>
    </div>
  )
}
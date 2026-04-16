import React from 'react'
import { taller } from '../../data/mockData'
import MetricCard from '../../components/MetricCard/MetricCard'
import styles from './Taller.module.css'

export default function Taller() {
  return (
    <div className={styles.page}>
      <div className={styles.metricsRow}>
        <MetricCard label="OTs Activas" value={taller.ordenesActivas} trend={taller.tendencia} icon="⬢" accent="orange" />
        <MetricCard label="Completadas Hoy" value={taller.ordenesCompletadasHoy} sub="de 25 totales" icon="✓" accent="green" />
        <MetricCard label="Eficiencia Global" value={`${taller.eficiencia}%`} sub="rendimiento técnicos" icon="◉" accent="cyan" />
        <MetricCard label="T. Promedio por OT" value={`${taller.tiempoPromedioHs}hs`} sub="tiempo medio operativo" icon="◷" accent="gold" />
      </div>

      <div className={styles.sectionTitle}>Órdenes de Trabajo Activas</div>
      <div className={styles.ordenesGrid}>
        {taller.ordenes.map((ot, i) => (
          <div key={ot.id} className={`${styles.otCard} ${styles[`ot_${ot.estado}`]}`}>
            <div className={styles.otHeader}>
              <span className={styles.otId}>{ot.id}</span>
              <span className={`${styles.otBadge} ${styles[`badge_${ot.estado}`]}`}>
                {ot.estado === 'completado' ? '✓ COMPLETADO' : ot.estado === 'en-progreso' ? '▶ EN PROGRESO' : '○ PENDIENTE'}
              </span>
            </div>
            <div className={styles.otVehiculo}>{ot.vehiculo}</div>
            <div className={styles.otCliente}>{ot.cliente}</div>
            <div className={styles.otTipo}>{ot.tipo}</div>
            <div className={styles.progressRow}>
              <div className={styles.progressTrack}>
                <div className={`${styles.progressFill} ${ot.progreso === 100 ? styles.fillDone : styles.fillActive}`} style={{ width: `${ot.progreso}%` }} />
              </div>
              <span className={styles.progressPct}>{ot.progreso}%</span>
            </div>
            <div className={styles.otFooter}>
              <span className={styles.otTecnico}>👤 {ot.tecnico}</span>
              <span className={styles.otInicio}>Inicio: {ot.inicio}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.sectionTitle}>Performance por Técnico</div>
      <div className={styles.tecnicosGrid}>
        {taller.tecnicoPerformance.map(tec => (
          <div key={tec.nombre} className={styles.tecnicoCard}>
            <div className={styles.tecnicoAvatar}>{tec.nombre.split(' ')[0][0]}{tec.nombre.split(' ')[1]?.[0]}</div>
            <div className={styles.tecnicoInfo}>
              <div className={styles.tecnicoNombre}>{tec.nombre}</div>
              <div className={styles.tecnicoMeta}>{tec.ordenes} OTs · {tec.horas}hs</div>
            </div>
            <div className={styles.tecnicoEficiencia}>
              <div className={styles.efBar}>
                <div className={styles.efFill} style={{ width: `${tec.eficiencia}%`, background: tec.eficiencia >= 90 ? 'var(--accent-green)' : tec.eficiencia >= 80 ? 'var(--accent-gold)' : 'var(--accent-red)' }} />
              </div>
              <span className={styles.efNum}>{tec.eficiencia}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
import React, { useState } from 'react'
import { alertas } from '../../data/mockData'
import styles from './AlertCenter.module.css'

const TIPOS = ['todas', 'critica', 'advertencia', 'info']

export default function AlertCenter() {
  const [filter, setFilter] = useState('todas')
  const filtered = filter === 'todas' ? alertas : alertas.filter(a => a.tipo === filter)

  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <div className={styles.stat}><span className={styles.statN} style={{color:'var(--accent-red)'}}>1</span><span className={styles.statL}>Críticas Activas</span></div>
        <div className={styles.stat}><span className={styles.statN} style={{color:'var(--accent-gold)'}}>1</span><span className={styles.statL}>Advertencias</span></div>
        <div className={styles.stat}><span className={styles.statN} style={{color:'var(--accent-green)'}}>4</span><span className={styles.statL}>Resueltas Hoy</span></div>
        <div className={styles.stat}><span className={styles.statN}>6</span><span className={styles.statL}>Total 24hs</span></div>
      </div>
      <div className={styles.filterRow}>
        {TIPOS.map(t => (
          <button key={t} className={`${styles.filterBtn} ${filter===t ? styles.filterActive : ''}`} onClick={() => setFilter(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className={styles.alertsList}>
        {filtered.map((a,i) => (
          <div key={a.id} className={`${styles.alertCard} ${styles[`alert_${a.tipo}`]}`} style={{ animationDelay:`${i*60}ms` }}>
            <div className={styles.alertIcon}>{a.tipo==='critica'?'⚠':a.tipo==='advertencia'?'◈':'ℹ'}</div>
            <div className={styles.alertBody}>
              <div className={styles.alertTitleRow}>
                <span className={styles.alertTitle}>{a.titulo}</span>
                <span className={`${styles.alertBadge} ${styles[`badge_${a.estado}`]}`}>{a.estado.toUpperCase()}</span>
              </div>
              <div className={styles.alertDetalle}>{a.detalle}</div>
              <div className={styles.alertMeta}>
                <span className={styles.alertModulo}>{a.modulo}</span>
                <span>·</span>
                <span>{a.hora}</span>
                {a.horaResolucion && <span className={styles.alertResolved}>✓ Resuelto: {a.horaResolucion}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
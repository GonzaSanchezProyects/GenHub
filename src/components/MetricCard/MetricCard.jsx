import React from 'react'
import styles from './MetricCard.module.css'

export default function MetricCard({
  label,
  value,
  unit,
  sub,
  trend,
  trendLabel,
  accent = 'cyan',
  size = 'md',
  icon,
  mono = false,
  className,
}) {
  const trendPositive = trend > 0
  const trendNeutral = trend === 0 || trend === undefined

  return (
    <div className={`${styles.card} ${styles[`accent_${accent}`]} ${styles[`size_${size}`]} ${className || ''}`}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.body}>
        <span className={styles.label}>{label}</span>
        <div className={styles.valueRow}>
          <span className={`${styles.value} ${mono ? styles.mono : ''}`}>{value}</span>
          {unit && <span className={styles.unit}>{unit}</span>}
        </div>
        {(sub || trend !== undefined) && (
          <div className={styles.footer}>
            {sub && <span className={styles.sub}>{sub}</span>}
            {trend !== undefined && (
              <span className={`${styles.trend} ${trendPositive ? styles.trendUp : trendNeutral ? styles.trendFlat : styles.trendDown}`}>
                {trendPositive ? '↑' : trendNeutral ? '→' : '↓'} {Math.abs(trend)}%{trendLabel ? ` ${trendLabel}` : ''}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
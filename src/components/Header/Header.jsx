

import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Header.module.css'
 
const PAGE_TITLES = {
  '/': { title: 'Dashboard Global', sub: 'Visión consolidada del complejo' },
  '/frigorifico': { title: 'Módulo Frigorífico', sub: 'Nave Norte — Control de cadena de frío y stock' },
  '/gastronomia': { title: 'Módulo Gastronomía', sub: 'Nave Norte — POS, recetas e inventario' },
  '/toyota': { title: 'Toyota Oficial', sub: 'Nave Sur — Ventas de vehículos y repuestos' },
  '/taller': { title: 'Chapa & Pintura', sub: 'Nave Sur — Órdenes de trabajo y tiempos' },
  '/alertas': { title: 'Centro de Alertas', sub: 'Notificaciones y eventos críticos en tiempo real' },
  '/reportes': { title: 'Reportes', sub: 'Métricas consolidadas y auditoría' },
  '/config': { title: 'Configuración', sub: 'Sistema y parámetros operativos' },
}
 
const TICKER_ITEMS = [
  '❄ CAM-01: 1.2°C NORMAL',
  '◉ PEDIDOS HOY: 112',
  '◈ VEHÍCULOS MES: 14',
  '⬢ OTs ACTIVAS: 25',
  '$ FACTURACIÓN: $15,800',
  '❄ CAM-02: 0.8°C NORMAL',
  '◉ MESA ACTIVAS: 8/14',
  '◈ REPUESTOS: 2,100 ud.',
  '⬢ EFICIENCIA TALLER: 87%',
]
 
export default function Header() {
  const location = useLocation()
  const page = PAGE_TITLES[location.pathname] || { title: 'Panel Maestro', sub: '' }
  const [time, setTime] = useState(new Date())
 
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
 
  const tickerText = TICKER_ITEMS.join('   ·   ')
 
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.pageTitle}>{page.title}</div>
        <div className={styles.pageSub}>{page.sub}</div>
      </div>
 
      <div className={styles.headerCenter}>
        <div className={styles.ticker}>
          <span className={styles.tickerLabel}>LIVE</span>
          <div className={styles.tickerTrack}>
            <span className={styles.tickerContent}>
              {tickerText} &nbsp;&nbsp;&nbsp;&nbsp; {tickerText}
            </span>
          </div>
        </div>
      </div>
 
      <div className={styles.headerRight}>
        <div className={styles.clock}>
          <span className={styles.clockTime}>
            {time.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
          <span className={styles.clockDate}>
            {time.toLocaleDateString('es-AR', { weekday: 'short', day: '2-digit', month: 'short' })}
          </span>
        </div>
        <div className={styles.alertIndicator}>
          <span className={styles.alertDot} />
          <span className={styles.alertCount}>2</span>
        </div>
      </div>
    </header>
  )
}
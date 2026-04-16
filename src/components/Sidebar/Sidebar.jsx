import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.css'
 
const NAV_ITEMS = [
  {
    group: 'CONTROL',
    items: [
      { to: '/', icon: '⬡', label: 'Dashboard Global', exact: true },
      { to: '/alertas', icon: '◈', label: 'Centro de Alertas', badge: 2 },
      { to: '/reportes', icon: '◧', label: 'Reportes', },
    ]
  },
  {
    group: 'NAVE NORTE',
    items: [
      { to: '/frigorifico', icon: '❄', label: 'Frigorífico', sub: 'Stock · Cadena de Frío' },
      { to: '/gastronomia', icon: '◉', label: 'Gastronomía', sub: 'POS · Recetas · Stock' },
    ]
  },
  {
    group: 'NAVE SUR',
    items: [
      { to: '/toyota', icon: '◈', label: 'Toyota Oficial', sub: 'Ventas · Repuestos' },
      { to: '/taller', icon: '⬢', label: 'Chapa & Pintura', sub: 'OTs · Tiempos' },
    ]
  },
  {
    group: 'SISTEMA',
    items: [
      { to: '/config', icon: '◫', label: 'Configuración' },
    ]
  }
]
 
export default function Sidebar() {
  const location = useLocation()
 
  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoMark}>
          <span className={styles.logoHex}>V</span>
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoTitle}>VITTA</span>
          <span className={styles.logoSub}>Complex Control</span>
        </div>
      </div>
 
      {/* Status bar */}
      <div className={styles.statusBar}>
        <span className={styles.statusDot} />
        <span className={styles.statusText}>4 / 4 Locales Activos</span>
        <span className={styles.statusTime}>{new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
 
      {/* Navigation */}
      <nav className={styles.nav}>
        {NAV_ITEMS.map(group => (
          <div key={group.group} className={styles.navGroup}>
            <span className={styles.navGroupLabel}>{group.group}</span>
            {group.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                }
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navContent}>
                  <span className={styles.navLabel}>{item.label}</span>
                  {item.sub && <span className={styles.navSub}>{item.sub}</span>}
                </span>
                {item.badge && (
                  <span className={styles.navBadge}>{item.badge}</span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
 
      {/* Footer */}
      <div className={styles.sidebarFooter}>
        <div className={styles.footerUser}>
          <div className={styles.footerAvatar}>IN</div>
          <div className={styles.footerInfo}>
            <span className={styles.footerName}>Inversor</span>
            <span className={styles.footerRole}>Panel Maestro</span>
          </div>
        </div>
        <div className={styles.footerVersion}>v1.0.0</div>
      </div>
 
      {/* Decorative scanline */}
      <div className={styles.scanline} />
    </aside>
  )
}
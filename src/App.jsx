// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import NaveView from './pages/NaveView';
import LocalDetail from './pages/LocalDetail';
import LocalMovements from './pages/LocalMovements';
import MovementsView from './pages/MovementsView';
import SummariesView from './pages/SummariesView';

import styles from './App.module.css';

// Ícono sol — SVG puro, sin emoji
function SunIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="3" />
      <line x1="8" y1="1" x2="8" y2="2.5" />
      <line x1="8" y1="13.5" x2="8" y2="15" />
      <line x1="1" y1="8" x2="2.5" y2="8" />
      <line x1="13.5" y1="8" x2="15" y2="8" />
      <line x1="3.05" y1="3.05" x2="4.1" y2="4.1" />
      <line x1="11.9" y1="11.9" x2="12.95" y2="12.95" />
      <line x1="12.95" y1="3.05" x2="11.9" y2="4.1" />
      <line x1="4.1" y1="11.9" x2="3.05" y2="12.95" />
    </svg>
  );
}

// Ícono luna — SVG puro, sin emoji
function MoonIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.5 10.5A6 6 0 0 1 5.5 2.5a.5.5 0 0 0-.62-.62A7 7 0 1 0 14.12 11.12a.5.5 0 0 0-.62-.62z" />
    </svg>
  );
}

// Ícono usuario — SVG puro, sin emoji
function UserIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="7" r="3.5" />
      <path d="M2.5 18c0-4 3.4-7 7.5-7s7.5 3 7.5 7" />
    </svg>
  );
}

export default function App() {
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('genhub-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('genhub-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  const getTitle = () => {
    if (location.pathname === '/') return 'Resumen Global';
    if (location.pathname.includes('norte')) return 'Nave Norte';
    if (location.pathname.includes('sur')) return 'Nave Sur';
    if (location.pathname.includes('resumenes')) return 'Reportes';
    if (location.pathname.includes('historial')) return 'Auditoría';
    if (location.pathname.includes('movimientos')) return 'Historial 7d';
    if (location.pathname.includes('local')) return 'Operaciones';
    return 'Panel de Control';
  };

  const isDark = theme === 'dark';

  return (
    <div className={styles.mobileContainer}>

      <header className={styles.header}>
        <div className={styles.brandContainer}>
          <h1 className={styles.brandName}>
            <span className={styles.brandSuffix}>Gen</span><span className={styles.brandSuffix}>Hub</span>
          </h1>
          <span className={styles.pageTitle}>{getTitle()}</span>
        </div>

        <div className={styles.headerControls}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            <span className={styles.toggleTrack}>
              <span className={styles.toggleThumb} />
            </span>
            {isDark
              ? <MoonIcon className={styles.toggleIcon} style={{ color: '#3aa0e6' }} />
              : <SunIcon  className={styles.toggleIcon} style={{ color: '#e6a020' }} />
            }
          </button>

          <div className={styles.avatarBtn}>
            <UserIcon className={styles.avatarIcon} style={{ color: 'var(--text-muted)' }} />
          </div>
        </div>
      </header>

      <main className={styles.content}>
        <div key={location.pathname} className={styles.pageTransition}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/nave/:id" element={<NaveView />} />
            <Route path="/local/:id" element={<LocalDetail />} />
            <Route path="/local/:id/historial" element={<LocalMovements />} />
            <Route path="/movimientos" element={<MovementsView />} />
            <Route path="/resumenes" element={<SummariesView />} />
          </Routes>
        </div>
      </main>

      <nav className={styles.bottomNav}>
        <NavLink to="/" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`} end>
          <div className={`${styles.iconContainer} ${styles.homeIcon}`}><span /></div>
          <span className={styles.navLabel}>Inicio</span>
        </NavLink>

        <NavLink to="/nave/norte" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <div className={`${styles.iconContainer} ${styles.naveIcon}`}><span /></div>
          <span className={styles.navLabel}>Norte</span>
        </NavLink>

        <NavLink to="/nave/sur" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <div className={`${styles.iconContainer} ${styles.naveIcon}`}><span /></div>
          <span className={styles.navLabel}>Sur</span>
        </NavLink>

        <NavLink to="/resumenes" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <div className={`${styles.iconContainer} ${styles.reportIcon}`}>
            <div className={styles.barGraph}>
              <span className={styles.bar1} />
              <span className={styles.bar2} />
              <span className={styles.bar3} />
            </div>
          </div>
          <span className={styles.navLabel}>Reportes</span>
        </NavLink>
      </nav>

    </div>
  );
}
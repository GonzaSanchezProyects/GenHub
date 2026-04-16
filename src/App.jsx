import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NaveView from './pages/NaveView';
import LocalDetail from './pages/LocalDetail';
import styles from './App.module.css';

export default function App() {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === '/') return 'GenHub Inicio';
    if (location.pathname.includes('norte')) return 'Nave Norte';
    if (location.pathname.includes('sur')) return 'Nave Sur';
    if (location.pathname.includes('local')) return 'Detalle Operativo';
    return 'GenHub Control';
  };

  return (
    <div className={styles.mobileContainer}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>{getTitle()}</div>
      </header>

      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/nave/:id" element={<NaveView />} />
          <Route path="/local/:id" element={<LocalDetail />} />
        </Routes>
      </main>

      <nav className={styles.bottomNav}>
        <NavLink to="/" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`} end>
          <span className={styles.icon}>⬡</span>
          <span className={styles.navLabel}>Inicio</span>
        </NavLink>
        
        <NavLink to="/nave/norte" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <span className={styles.icon}>◈</span>
          <span className={styles.navLabel}>Nave Norte</span>
        </NavLink>

        <NavLink to="/nave/sur" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <span className={styles.icon}>◈</span>
          <span className={styles.navLabel}>Nave Sur</span>
        </NavLink>
      </nav>
    </div>
  );
}
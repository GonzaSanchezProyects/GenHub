// src/App.jsx
import React from 'react';
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NaveView from './pages/NaveView';
import LocalDetail from './pages/LocalDetail';
import LocalMovements from './pages/LocalMovements';
import MovementsView from './pages/MovementsView';
import SummariesView from './pages/SummariesView'; // La vista que creamos
import styles from './App.module.css';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = () => {
    if (location.pathname === '/') return 'Resumen Global';
    if (location.pathname.includes('norte')) return 'Nave Norte';
    if (location.pathname.includes('sur')) return 'Nave Sur';
    if (location.pathname.includes('resumenes')) return 'Reportes';
    if (location.pathname.includes('historial')) return 'Auditoría';
    if (location.pathname.includes('movimientos')) return 'Historial 7d';
    return 'GenHub';
  };

  return (
    <div className={styles.mobileContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <span className={styles.greeting}>Hola Administrador 👋</span>
            <h1 className={styles.headerTitle}>{getTitle()}</h1>
          </div>
          
          {/* ACCESO RÁPIDO EN EL HEADER (Opcional) */}
          <button 
            onClick={() => navigate('/resumenes')}
            className={styles.headerActionButton}
            title="Descargar Reportes"
          >
            📊
          </button>
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

      {/* NAVBAR ACTUALIZADO CON 4 SECCIONES */}
      <nav className={styles.bottomNav}>
        <NavLink to="/" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`} end>
          <div className={`${styles.iconContainer} ${styles.homeIcon}`}>
            <span></span>
          </div>
          <span className={styles.navLabel}>Inicio</span>
        </NavLink>
        
        <NavLink to="/nave/norte" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <div className={`${styles.iconContainer} ${styles.naveIcon}`}>
            <span></span>
          </div>
          <span className={styles.navLabel}>Norte</span>
        </NavLink>

        <NavLink to="/nave/sur" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <div className={`${styles.iconContainer} ${styles.naveIcon}`}>
            <span></span>
          </div>
          <span className={styles.navLabel}>Sur</span>
        </NavLink>

        <NavLink to="/resumenes" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <div className={`${styles.iconContainer} ${styles.reportIcon}`}>
            <div className={styles.barGraph}>
              <span className={styles.bar1}></span>
              <span className={styles.bar2}></span>
              <span className={styles.bar3}></span>
            </div>
          </div>
          <span className={styles.navLabel}>Reportes</span>
        </NavLink>
      </nav>
    </div>
  );
}
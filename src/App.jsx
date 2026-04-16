import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import Overview from './pages/Overview/Overview'
import Frigorifico from './pages/Frigorifico/Frigorifico'
import Gastronomia from './pages/Gastronomia/Gastronomia'
import Toyota from './pages/Toyota/Toyota'
import Taller from './pages/Taller/Taller'
import AlertCenter from './pages/AlertCenter/AlertCenter'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <main className={styles.content}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/frigorifico" element={<Frigorifico />} />
            <Route path="/gastronomia" element={<Gastronomia />} />
            <Route path="/toyota" element={<Toyota />} />
            <Route path="/taller" element={<Taller />} />
            <Route path="/alertas" element={<AlertCenter />} />
            <Route path="/reportes" element={<div style={{color:'var(--text-secondary)',fontFamily:'var(--font-mono)',padding:'40px',textAlign:'center'}}>Módulo de Reportes — En desarrollo</div>} />
            <Route path="/config" element={<div style={{color:'var(--text-secondary)',fontFamily:'var(--font-mono)',padding:'40px',textAlign:'center'}}>Configuración — En desarrollo</div>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
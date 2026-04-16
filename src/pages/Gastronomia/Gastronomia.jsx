import React, { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { gastronomia } from '../../data/mockData'
import MetricCard from '../../components/MetricCard/MetricCard'
import styles from './Gastronomia.module.css'

const MESA_COLS = 4

export default function Gastronomia() {
  const [activeTab, setActiveTab] = useState('ordenes')

  return (
    <div className={styles.page}>

      {/* Metrics */}
      <div className={styles.metricsRow}>
        <MetricCard label="Pedidos Hoy" value={gastronomia.ordenesHoy} trend={gastronomia.tendencia} icon="◉" accent="gold" />
        <MetricCard label="Facturación Hoy" value={`$${gastronomia.facturacionHoy.toLocaleString()}`} trend={gastronomia.tendencia} icon="$" accent="green" />
        <MetricCard label="Ticket Promedio" value={`$${gastronomia.ticketPromedio}`} sub="por orden" icon="◧" accent="cyan" />
        <MetricCard label="Mesas Activas" value={`${gastronomia.mesasActivas} / ${gastronomia.mesasTotal}`} sub="en este momento" icon="⬡" accent="gold" />
      </div>

      <div className={styles.mainGrid}>

        {/* Mesas map */}
        <div className={styles.mesasCard}>
          <div className={styles.cardTitle}>Mapa de Mesas — En Vivo</div>
          <div className={styles.mesasGrid}>
            {Array.from({ length: gastronomia.mesasTotal }, (_, i) => {
              const num = i + 1
              const activa = num <= gastronomia.mesasActivas
              const conOrden = gastronomia.ultimasOrdenes.find(o => o.mesa === num)
              return (
                <div
                  key={num}
                  className={`${styles.mesa} ${activa ? styles.mesaActiva : styles.mesaLibre}`}
                >
                  <span className={styles.mesaNum}>{num}</span>
                  {activa && (
                    <span className={styles.mesaStatus}>
                      {conOrden ? conOrden.estado === 'cocina' ? '🔥' : '✓' : '·'}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
          <div className={styles.mesaLegend}>
            <span className={styles.legendItem}><span className={styles.dotGreen} /> Ocupada</span>
            <span className={styles.legendItem}><span className={styles.dotGray} /> Libre</span>
          </div>
        </div>

        {/* Category donut */}
        <div className={styles.donutCard}>
          <div className={styles.cardTitle}>Ventas por Categoría</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={gastronomia.categorias}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="ingresos"
                nameKey="nombre"
              >
                {gastronomia.categorias.map((cat, i) => (
                  <Cell key={i} fill={cat.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => [`$${v}`, 'Ingresos']}
                contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-dim)', borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: 11 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.catList}>
            {gastronomia.categorias.map(cat => (
              <div key={cat.nombre} className={styles.catItem}>
                <span className={styles.catDot} style={{ background: cat.color }} />
                <span className={styles.catName}>{cat.nombre}</span>
                <span className={styles.catOrdenes}>{cat.ordenes} órd.</span>
                <span className={styles.catIngresos}>${cat.ingresos}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hora pico */}
        <div className={styles.picoCard}>
          <div className={styles.cardTitle}>Pico de Facturación</div>
          <div className={styles.picoHora}>{gastronomia.horaPico.hora}</div>
          <div className={styles.picoValue}>${gastronomia.horaPico.ingresos.toLocaleString()}</div>
          <div className={styles.picoSub}>ingresos en hora pico</div>

          {gastronomia.insumosBajoStock.length > 0 && (
            <div className={styles.stockAlert}>
              <div className={styles.stockAlertTitle}>⚠ Stock Bajo</div>
              {gastronomia.insumosBajoStock.map(ins => (
                <div key={ins.producto} className={styles.stockAlertItem}>
                  <span>{ins.producto}</span>
                  <span className={styles.stockVal}>{ins.stock}{ins.unidad} / mín. {ins.minimo}{ins.unidad}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Last orders */}
      <div className={styles.sectionTitle}>Últimas Órdenes</div>
      <div className={styles.ordenesGrid}>
        {gastronomia.ultimasOrdenes.map(ord => (
          <div key={ord.id} className={`${styles.ordenCard} ${styles[`orden_${ord.estado}`]}`}>
            <div className={styles.ordenHeader}>
              <span className={styles.ordenId}>{ord.id}</span>
              <span className={`${styles.ordenBadge} ${styles[`badge_${ord.estado}`]}`}>
                {ord.estado === 'servido' ? '✓ Servido' : ord.estado === 'cocina' ? '🔥 Cocina' : '✓ Cerrado'}
              </span>
            </div>
            <div className={styles.ordenMesa}>Mesa {ord.mesa}</div>
            <div className={styles.ordenItems}>{ord.items}</div>
            <div className={styles.ordenTotal}>${ord.total}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
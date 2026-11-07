
import { useState, useRef } from 'react'

import {
  Activity,
  AlertTriangle,
  Anchor,
  BarChart3,
  Bell,
  ChevronDown,
  ChevronUp,
  Clock3,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Radio,
  Satellite,
  Settings,
  ShieldCheck,
  Ship,
  Waves,
  X
} from 'lucide-react'

import './Dashboard.css'

// SIDEBAR NAVIGATION
const navItems = [
  ['Overview', LayoutDashboard],
  ['Live Monitoring', Radio],
  ['Oil Spill Detection', AlertTriangle],
  ['Vessel Tracking', Ship],
  ['Incident Reports', FileText],
  ['Satellite Imagery', Satellite],
  ['Analytics', BarChart3],
  ['Settings', Settings]
]

// DASHBOARD METRICS
const metrics = [
  {
    label: 'Potential Spill Detections',
    icon: AlertTriangle,
    tone: 'orange',
    note: 'Awaiting model results'
  },
  {
    label: 'Vessels Tracked',
    icon: Ship,
    tone: 'blue',
    note: 'Awaiting vessel data'
  },
  {
    label: 'Satellite Images Analysed',
    icon: Satellite,
    tone: 'teal',
    note: 'Awaiting processing records'
  },
  {
    label: 'Detection Accuracy',
    icon: ShieldCheck,
    tone: 'purple',
    note: 'Available after model evaluation'
  }
]

// SIDEBAR
function Sidebar({ active, onSelect, onLogout }) {
  return (
    <aside className="sidebar">

      <div className="sidebar-brand">

        <div className="sidebar-logo">
          <img
            src="/images/coastal-logo.png"
            alt="Coastal Spill Monitoring logo"
          />
        </div>

        <strong>Coastal Spill</strong>
        <strong>Monitoring</strong>

        <span>MARINE ENVIRONMENTAL SURVEILLANCE</span>

      </div>

      <div className="sidebar-label">
        WORKSPACE
      </div>

      <nav className="sidebar-nav">

        {navItems.map(([label, Icon]) => (
          <button
            key={label}
            className={`sidebar-link ${
              active === label ? 'active' : ''
            }`}
            onClick={() => onSelect(label)}
          >
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}

      </nav>

      <div className="sidebar-bottom">

        <div className="sidebar-footer">
          <span className="workspace-dot" />
          Monitoring Workspace
        </div>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          <LogOut size={17} />
          Sign out
        </button>

      </div>

    </aside>
  )
}

// TOP NAVIGATION
function Topbar({ onMenu, onLogout }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <header className="topbar">

      <button
        className="mobile-menu"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <Menu size={21} />
      </button>

      <div className="topbar-status">

        <span className="workspace-dot" />

        <strong>Monitoring Workspace</strong>

        <span className="topbar-separator" />

        <span>
          Satellite and data integrations pending
        </span>

      </div>

      <div className="topbar-right">

        <div className="notification-wrap">

          <button
            className="header-icon"
            onClick={() =>
              setNotificationsOpen(!notificationsOpen)
            }
            aria-label="Notifications"
          >
            <Bell size={19} />
          </button>

          {notificationsOpen && (
            <div className="notification-popover">

              <strong>Notifications</strong>

              <p>No notifications available yet.</p>

              <span>
                Monitoring alerts will appear when connected.
              </span>

            </div>
          )}

        </div>

        <div className="officer-profile">

          <div className="officer-avatar">
            CO
          </div>

          <div>
            <strong>Coastal Officer</strong>
            <span>Monitoring Workspace</span>
          </div>

          <ChevronDown size={15} />

        </div>

        <button
          className="topbar-logout"
          onClick={onLogout}
          title="Sign out"
        >
          <LogOut size={17} />
        </button>

      </div>

    </header>
  )
}

// METRIC CARD
function MetricCard({ item }) {
  const Icon = item.icon

  return (
    <article className="metric-card glass-card">

      <div className={`metric-icon ${item.tone}`}>
        <Icon size={25} />
      </div>

      <div className="metric-copy">

        <span className="metric-label">
          {item.label}
        </span>

        <strong className="metric-value">
          —
        </strong>

        <span className="metric-note">
          {item.note}
        </span>

      </div>

    </article>
  )
}

// PANEL HEADING
function PanelHeading({ icon: Icon, title, action }) {
  return (
    <div className="panel-heading">

      <div className="panel-heading-title">

        {Icon && <Icon size={21} />}

        <h2>{title}</h2>

      </div>

      {action && (
        <button className="panel-action">
          {action}
        </button>
      )}

    </div>
  )
}

// CENTRAL OCEAN MODEL
function OceanModel() {
  return (
    <section className="ocean-model glass-panel">

      <div className="model-heading">

        <div>

          <PanelHeading
            icon={Waves}
            title="Marine Monitoring & Analysis"
          />

          <p>
            Satellite-based coastal surveillance and spill detection
          </p>

        </div>

        <div className="model-tabs">

          <span className="selected">
            <Satellite size={16} />
            Satellite
          </span>

          <span>
            <Ship size={16} />
            Vessels
          </span>

          <span>
            <Anchor size={16} />
            Combined
          </span>

        </div>

      </div>

      <div className="ocean-model-view">

        <img
          src="/images/satellite-ocean.png"
          alt="Satellite ocean monitoring area"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />

        <div className="model-view-shade" />

        <div className="model-map-label">

          <span className="live-dot" />

          MARINE MODEL DISPLAY AREA

        </div>

        <div className="model-placeholder">

          <div className="model-placeholder-icon">
            <Waves size={34} />
          </div>

          <h3>Ocean Model Showcase</h3>

          <p>
            Your 3D ocean model, satellite imagery,
            oil spill detection overlays and vessel
            positions will appear here.
          </p>

          <span>
            MODEL INTEGRATION PENDING
          </span>

        </div>

        <div className="model-map-controls">

          <button aria-label="Zoom in">+</button>
          <button aria-label="Zoom out">−</button>
          <button aria-label="Reset map">◎</button>

        </div>

        <div className="model-map-bottom">
          Geographic monitoring area · Awaiting imagery
        </div>

      </div>

      <div className="model-footer">

        <span>
          <Radio size={15} />
          Satellite integration pending
        </span>

        <span>
          <Clock3 size={15} />
          No acquisition timestamp available
        </span>

      </div>

    </section>
  )
}

// LATEST ALERT
function AlertPanel() {
  return (
    <section className="glass-panel information-panel">

      <PanelHeading
        icon={AlertTriangle}
        title="Latest Alert"
        action="View all"
      />

      <div className="information-empty">

        <div className="empty-icon alert-icon">
          <AlertTriangle size={27} />
        </div>

        <strong>No alerts generated</strong>

        <p>
          Potential spill alerts will appear after
          satellite imagery has been processed.
        </p>

      </div>

      <div className="panel-footnote">
        Detection model integration pending
      </div>

    </section>
  )
}

// NEARBY VESSELS
function VesselPanel() {
  return (
    <section className="glass-panel information-panel">

      <PanelHeading
        icon={Ship}
        title="Nearby Vessels"
        action="View all"
      />

      <div className="information-empty">

        <div className="empty-icon vessel-icon">
          <Ship size={27} />
        </div>

        <strong>Vessel data unavailable</strong>

        <p>
          Vessel identification, positions and proximity
          details will appear after data integration.
        </p>

      </div>

      <div className="panel-footnote">
        Vessel data integration pending
      </div>

    </section>
  )
}

// DETECTION ANALYTICS
function AnalyticsPanel() {
  return (
    <section className="glass-panel lower-panel">

      <PanelHeading
        icon={BarChart3}
        title="Detection Analytics"
        action="View analytics"
      />

      <div className="analytics-placeholder">

        <div className="analytics-grid-lines">
          <i />
          <i />
          <i />
          <i />
        </div>

        <Activity size={40} />

      </div>

      <p>
        Historical detection trends will appear after
        model results become available.
      </p>

    </section>
  )
}

// RECENT ACTIVITY
function ActivityPanel() {
  return (
    <section className="glass-panel lower-panel">

      <PanelHeading
        icon={Clock3}
        title="Recent Activity"
        action="View all"
      />

      <div className="activity-empty">

        <Activity size={32} />

        <strong>No recent activity</strong>

        <p>
          Satellite processing, detections and vessel
          updates will be listed here.
        </p>

      </div>

    </section>
  )
}

// CLEANER OCEANS IMAGE
function ConservationPanel() {
  return (
    <section className="conservation-panel glass-panel">

      <img
        src="/images/ocean-life.png"
        alt="Marine wildlife in the ocean"
        onError={(event) => {
          event.currentTarget.style.display = 'none'
        }}
      />

      <div className="conservation-shade" />

      <div className="conservation-copy">

        <span>MARINE CONSERVATION</span>

        <h2>
          Together for
          <br />
          Cleaner Oceans
        </h2>

        <p>
          Monitoring today for
          <br />
          a healthier tomorrow.
        </p>

      </div>

    </section>
  )
}

// MAIN DASHBOARD
export default function Dashboard({ onLogout }) {

  const [active, setActive] = useState('Overview')
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const touchStartY = useRef(null)
  const lastWheelTime = useRef(0)

  function openDashboard() {
    setDashboardOpen(true)
  }

  function closeDashboard() {
    setDashboardOpen(false)
  }

  // SWIPE UP AND DOWN
  function handleTouchStart(event) {
    touchStartY.current = event.touches[0].clientY
  }

  function handleTouchEnd(event) {
    if (touchStartY.current === null) return

    const endY = event.changedTouches[0].clientY

    const difference = touchStartY.current - endY

    if (difference > 55) {
      openDashboard()
    }

    else if (difference < -55) {

      const main = document.querySelector('.dashboard-main')

      if (!main || main.scrollTop <= 0) {
        closeDashboard()
      }

    }

    touchStartY.current = null
  }

  // DESKTOP MOUSE WHEEL
  function handleWheel(event) {

    const now = Date.now()

    if (now - lastWheelTime.current < 700) return

    if (event.deltaY > 35 && !dashboardOpen) {
      openDashboard()
      lastWheelTime.current = now
    }

    if (event.deltaY < -35 && dashboardOpen) {

      const main = document.querySelector('.dashboard-main')

      if (!main || main.scrollTop <= 0) {
        closeDashboard()
        lastWheelTime.current = now
      }

    }
  }

  return (
    <div
      className={`coastal-experience ${
        dashboardOpen ? 'dashboard-is-open' : ''
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >

      {/* FULL-SCREEN SATELLITE OCEAN IMAGE */}

      <div className="ocean-background" />

      <div className="ocean-background-overlay" />

      {/* INITIAL OCEAN SCREEN */}

      {!dashboardOpen && (
        <div className="ocean-intro">

          {/* Minimal swipe-up instruction */}

          <div className="ocean-swipe-hint">

            <div className="swipe-arrow">
              <ChevronUp size={23} />
            </div>

            <span>SWIPE UP</span>

            <small>
              To explore the monitoring dashboard
            </small>

          </div>

        </div>
      )}

      {/* DASHBOARD SLIDE-UP PANEL */}

      <div
        className={`dashboard-sheet ${
          dashboardOpen ? 'sheet-visible' : ''
        }`}
      >

        <div className="sheet-handle-area">

          <button
            className="sheet-handle"
            onClick={closeDashboard}
            aria-label="Return to ocean view"
          >
            <ChevronDown size={20} />
          </button>

          <span>MARINE MONITORING WORKSPACE</span>

          <button
            className="sheet-close"
            onClick={closeDashboard}
            aria-label="Close dashboard"
          >
            <X size={19} />
          </button>

        </div>

        <div className="dashboard-layout">

          <Sidebar
            active={active}
            onSelect={setActive}
            onLogout={onLogout}
          />

          <div className="dashboard-main">

            <Topbar
              onMenu={() => setMobileOpen(!mobileOpen)}
              onLogout={onLogout}
            />

            {/* MOBILE NAVIGATION */}

            {mobileOpen && (
              <div className="mobile-navigation">

                {navItems.map(([label, Icon]) => (

                  <button
                    key={label}
                    onClick={() => {
                      setActive(label)
                      setMobileOpen(false)
                    }}
                  >
                    <Icon size={18} />
                    {label}
                  </button>

                ))}

              </div>
            )}

            <main className="dashboard-content">

              {/* PAGE HEADING */}

              <div className="page-heading">

                <div>

                  <div className="breadcrumb">
                    COASTAL SPILL MONITORING
                    <span>/</span>
                    {active.toUpperCase()}
                  </div>

                  <h1>
                    {active === 'Overview'
                      ? 'Marine Monitoring Overview'
                      : active}
                  </h1>

                  <p>
                    Satellite-based oil spill detection
                    and vessel surveillance
                  </p>

                </div>

                <span className="image-monitoring-label">
                  <Clock3 size={15} />
                  Image-based monitoring
                </span>

              </div>

              {/* FOUR LARGE METRIC CARDS */}

              <div className="metrics-grid">

                {metrics.map((item) => (
                  <MetricCard
                    key={item.label}
                    item={item}
                  />
                ))}

              </div>

              {/* CENTRAL MODEL AND RIGHT PANELS */}

              <div className="main-grid">

                <OceanModel />

                <div className="right-column">

                  <AlertPanel />

                  <VesselPanel />

                </div>

              </div>

              {/* BOTTOM ANALYTICS PANELS */}

              <div className="bottom-grid">

                <AnalyticsPanel />

                <ActivityPanel />

                <ConservationPanel />

              </div>

              <footer className="dashboard-footer">

                <span>
                  COASTAL SPILL MONITORING
                </span>

                <span>
                  Marine Environmental Surveillance Workspace
                </span>

              </footer>

            </main>

          </div>

        </div>

      </div>

    </div>
  )
}

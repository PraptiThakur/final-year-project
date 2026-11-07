
import { useMemo, useRef, useState } from 'react'
import {
  Activity,
  AlertCircle,
  Anchor,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Download,
  FileText,
  Filter,
  Layers,
  MapPin,
  Maximize2,
  Menu,
  MoreHorizontal,
  Radio,
  Search,
  Settings2,
  ShieldAlert,
  Ship,
  SlidersHorizontal,
  Upload,
  Waves,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import './Dashboard.css'

const navigation = [
  { label: 'Overview', icon: Activity },
  { label: 'Incidents', icon: ShieldAlert },
  { label: 'Vessel Traffic', icon: Ship },
  { label: 'Analytics', icon: Waves },
  { label: 'Reports', icon: FileText },
]

const metrics = [
  {
    label: 'Active Incidents',
    value: '—',
    note: 'Awaiting model integration',
    icon: AlertCircle,
    tone: 'orange',
  },
  {
    label: 'Estimated Affected Area',
    value: '—',
    unit: 'km²',
    note: 'Requires georeferenced results',
    icon: Waves,
    tone: 'blue',
  },
  {
    label: 'Vessels Detected',
    value: '—',
    note: 'YOLOv8 not connected',
    icon: Ship,
    tone: 'teal',
  },
  {
    label: 'High Risk Zones',
    value: '—',
    note: 'Awaiting analysis',
    icon: ShieldAlert,
    tone: 'red',
  },
]

function MetricCard({ item }) {
  const Icon = item.icon

  return (
    <article className="metric-card">
      <div className="metric-top">
        <div className={`metric-icon ${item.tone}`}>
          <Icon size={17} />
        </div>
        <span className="metric-label">{item.label}</span>
        <button className="icon-button small" aria-label={`More about ${item.label}`}>
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="metric-value">
        {item.value}
        {item.unit && <span className="metric-unit">{item.unit}</span>}
      </div>

      <div className="metric-note">
        <span className="note-dot" />
        {item.note}
      </div>
    </article>
  )
}

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  )
}

function SatelliteWorkspace({ image, onUpload }) {
  const [zoom, setZoom] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)
  const [layersOpen, setLayersOpen] = useState(false)
  const inputRef = useRef(null)

  return (
    <section className={`panel satellite-panel ${fullscreen ? 'viewer-fullscreen' : ''}`}>
      <div className="panel-header satellite-header">
        <SectionHeading
          eyebrow="SATELLITE ANALYSIS"
          title="Environmental Risk Map"
        />

        <div className="map-actions">
          <button className="map-mode active">Satellite</button>

          <div className="layer-control">
            <button
              className={`icon-button ${layersOpen ? 'selected' : ''}`}
              onClick={() => setLayersOpen(!layersOpen)}
              title="Layer options"
            >
              <Layers size={17} />
            </button>

            {layersOpen && (
              <div className="layer-popover">
                <strong>Map layers</strong>
                <label><input type="checkbox" defaultChecked /> Satellite image</label>
                <label><input type="checkbox" disabled /> Spill segmentation (model pending)</label>
                <label><input type="checkbox" disabled /> Vessel detections (model pending)</label>
              </div>
            )}
          </div>

          <button
            className="icon-button"
            onClick={() => setFullscreen(!fullscreen)}
            title="Toggle full screen"
          >
            {fullscreen ? <X size={17} /> : <Maximize2 size={17} />}
          </button>
        </div>
      </div>

      <div className="map-image-area">
        {image ? (
          <img
            src={image}
            alt="Uploaded satellite image"
            className="satellite-image"
            style={{ transform: `scale(${zoom})` }}
          />
        ) : (
          <img
            src="/oceanimage.png"
            alt="Ocean satellite reference image"
            className="satellite-image"
            style={{ transform: `scale(${zoom})` }}
            onError={(event) => {
              event.currentTarget.style.display = 'none'
            }}
          />
        )}

        <div className="map-image-label">
          <MapPin size={14} />
          {image ? 'Uploaded image preview' : 'Ocean reference imagery'}
        </div>

        <div className="map-status">
          <span className="status-dot" />
          {image ? 'IMAGE LOADED' : 'REFERENCE IMAGE'}
        </div>

        <div className="map-zoom-controls">
          <button
            className="zoom-button"
            onClick={() => setZoom((current) => Math.min(current + 0.2, 2))}
            title="Zoom in"
          >
            <ZoomIn size={17} />
          </button>
          <button
            className="zoom-button"
            onClick={() => setZoom((current) => Math.max(current - 0.2, 1))}
            title="Zoom out"
          >
            <ZoomOut size={17} />
          </button>
        </div>

        <div className="map-empty-message">
          <div className="empty-message-icon"><Waves size={20} /></div>
          <strong>No analysis results yet</strong>
          <span>Upload a satellite image to begin analysis.</span>
          <button onClick={() => inputRef.current?.click()}>
            <Upload size={14} /> Upload image
          </button>
        </div>
      </div>

      <div className="map-footer">
        <div className="map-footer-left">
          <span><Clock3 size={13} /> Waiting for image analysis</span>
          <span><Radio size={13} /> Model connection pending</span>
        </div>
        <span className="map-scale">Image scale unavailable</span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => onUpload(event.target.files?.[0])}
      />
    </section>
  )
}

function IncidentPanel() {
  return (
    <section className="panel incidents-panel">
      <SectionHeading
        eyebrow="REVIEW QUEUE"
        title="Incident Records"
        action={
          <span className="muted-action">No records yet</span>
        }
      />

      <div className="incident-empty">
        <div className="empty-circle"><ShieldAlert size={21} /></div>
        <strong>No detected incidents</strong>
        <p>Incident records will appear here after an image has been processed by the oil-spill model.</p>
      </div>
    </section>
  )
}

function VesselPanel() {
  return (
    <section className="panel vessel-panel">
      <div className="panel-header">
        <SectionHeading
          eyebrow="VESSEL DETECTION"
          title="Vessel Image Preview"
        />
        <button className="icon-button" title="More options">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="vessel-image-wrap">
        <img
          src="/images/ship-satellite.jpg"
          alt="Reference satellite image of a ship"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
            event.currentTarget.parentElement.classList.add('image-unavailable')
          }}
        />
        <div className="vessel-image-fallback">
          <Ship size={32} />
          <span>Add ship-satellite.jpg to public/images</span>
        </div>
        <div className="reference-image-tag">REFERENCE IMAGE</div>
      </div>

      <div className="vessel-details">
        <div>
          <span>Detection model</span>
          <strong>YOLOv8</strong>
        </div>
        <div>
          <span>Integration status</span>
          <strong className="pending-text">Pending</strong>
        </div>
        <div>
          <span>Confidence score</span>
          <strong>Not available</strong>
        </div>
        <div>
          <span>Vessel coordinates</span>
          <strong>Not available</strong>
        </div>
      </div>

      <div className="vessel-bottom-note">
        <CircleHelp size={14} />
        Vessel detection results will appear after model integration.
      </div>
    </section>
  )
}

function SpillChart() {
  return (
    <section className="panel chart-panel">
      <SectionHeading
        eyebrow="SPILL MONITORING"
        title="Spill Area Evolution"
        action={<span className="small-select">Awaiting data <ChevronDown size={13} /></span>}
      />

      <div className="chart-empty">
        <div className="chart-placeholder">
          <div className="chart-grid-line" />
          <div className="chart-grid-line" />
          <div className="chart-grid-line" />
          <div className="chart-center-icon"><Activity size={23} /></div>
        </div>
        <span>Historical spill measurements will appear after analysis.</span>
      </div>
    </section>
  )
}

function ModelConfidence() {
  return (
    <section className="panel confidence-panel">
      <SectionHeading
        eyebrow="MODEL PERFORMANCE"
        title="Model Status"
      />

      <div className="model-row">
        <div className="model-row-top">
          <div>
            <strong>SegFormer</strong>
            <span>Oil spill segmentation</span>
          </div>
          <span className="status-pill pending">Not connected</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill unavailable" />
        </div>
      </div>

      <div className="model-row">
        <div className="model-row-top">
          <div>
            <strong>YOLOv8</strong>
            <span>Vessel detection</span>
          </div>
          <span className="status-pill pending">Not connected</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill unavailable" />
        </div>
      </div>

      <div className="model-footnote">
        <CircleHelp size={13} />
        Accuracy metrics will be displayed after model evaluation.
      </div>
    </section>
  )
}

function RiskPanel() {
  return (
    <section className="panel risk-panel">
      <SectionHeading
        eyebrow="ENVIRONMENTAL ASSESSMENT"
        title="Coastal Threat Index"
      />

      <div className="risk-empty">
        <div className="risk-circle">
          <ShieldAlert size={25} />
        </div>
        <div>
          <strong>Awaiting assessment</strong>
          <p>A threat score requires verified detection and geographic data.</p>
        </div>
      </div>

      <div className="risk-footer">
        <span><CheckCircle2 size={13} /> No assessment generated</span>
      </div>
    </section>
  )
}

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [image, setImage] = useState(null)
  const [imageName, setImageName] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const uploadRef = useRef(null)

  const pageTitle = useMemo(() => {
    const titles = {
      Overview: 'Environmental Risk Overview',
      Incidents: 'Incident Records',
      'Vessel Traffic': 'Vessel Traffic',
      Analytics: 'Environmental Analytics',
      Reports: 'Analysis Reports',
    }
    return titles[activeNav] || 'Environmental Risk Overview'
  }, [activeNav])

  function handleUpload(file) {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      window.alert('Please select a valid image file.')
      return
    }

    if (image) URL.revokeObjectURL(image)

    const previewUrl = URL.createObjectURL(file)
    setImage(previewUrl)
    setImageName(file.name)
  }

  function handleExport() {
    window.alert('Report export will be available after analysis and report generation are integrated.')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-symbol">
            <Waves size={23} />
          </div>
          <div className="brand-copy">
            <strong>MARINEGUARD</strong>
            <span>COASTAL INTELLIGENCE</span>
          </div>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle navigation"
        >
          {mobileMenu ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={`main-navigation ${mobileMenu ? 'mobile-open' : ''}`}>
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-link ${activeNav === label ? 'active' : ''}`}
              onClick={() => {
                setActiveNav(label)
                setMobileMenu(false)
              }}
            >
              <Icon size={15} className="mobile-nav-icon" />
              {label}
            </button>
          ))}
        </nav>

        <div className="topbar-tools">
          <button
            className={`icon-button top-tool ${searchOpen ? 'selected' : ''}`}
            onClick={() => setSearchOpen(!searchOpen)}
            title="Search"
          >
            <Search size={18} />
          </button>
          <button
            className={`icon-button top-tool notification-button ${notificationOpen ? 'selected' : ''}`}
            onClick={() => setNotificationOpen(!notificationOpen)}
            title="Notifications"
          >
            <Bell size={18} />
          </button>

          <div className="profile">
            <div className="profile-avatar">MG</div>
            <div className="profile-copy">
              <strong>MarineGuard</strong>
              <span>Research Workspace</span>
            </div>
            <ChevronDown size={15} />
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="top-popover search-popover">
          <Search size={16} />
          <input autoFocus placeholder="Search dashboard..." />
          <button onClick={() => setSearchOpen(false)}><X size={16} /></button>
        </div>
      )}

      {notificationOpen && (
        <div className="top-popover notification-popover">
          <strong>Notifications</strong>
          <p>No new notifications.</p>
          <span>System notifications will appear here.</span>
        </div>
      )}

      <main className="dashboard-content">
        <div className="page-heading">
          <div>
            <div className="breadcrumb">
              <span className="breadcrumb-dot" />
              MARINEGUARD WORKSPACE
              <span className="breadcrumb-divider">/</span>
              <span>{activeNav.toUpperCase()}</span>
            </div>
            <h1>{pageTitle}</h1>
            <p>Satellite-based marine oil spill and vessel analysis</p>
          </div>

          <div className="heading-actions">
            <div className="date-display">
              <CalendarDays size={15} />
              <span>Image-based analysis</span>
            </div>
            <button className="primary-button" onClick={handleExport}>
              <Download size={16} />
              Export Brief
            </button>
          </div>
        </div>

        <div className="metrics-grid">
          {metrics.map((item) => (
            <MetricCard key={item.label} item={item} />
          ))}
        </div>

        <div className="main-grid">
          <SatelliteWorkspace
            image={image}
            onUpload={(file) => {
              handleUpload(file)
            }}
          />

          <div className="right-column">
            <IncidentPanel />
            <VesselPanel />
          </div>
        </div>

        <div className="upload-strip">
          <div className="upload-strip-icon"><Upload size={19} /></div>
          <div className="upload-strip-copy">
            <strong>{imageName || 'Upload a satellite image for analysis'}</strong>
            <span>
              {imageName
                ? 'Image preview loaded. Model processing is not connected yet.'
                : 'Supported formats: JPG, JPEG, PNG, TIFF'}
            </span>
          </div>
          <input
            ref={uploadRef}
            type="file"
            accept="image/*,.tif,.tiff"
            hidden
            onChange={(event) => handleUpload(event.target.files?.[0])}
          />
          <button
            className="secondary-button"
            onClick={() => uploadRef.current?.click()}
          >
            <Upload size={15} />
            {imageName ? 'Replace Image' : 'Choose Image'}
          </button>
          {imageName && (
            <button
              className="icon-button"
              title="Remove image"
              onClick={() => {
                if (image) URL.revokeObjectURL(image)
                setImage(null)
                setImageName('')
              }}
            >
              <X size={17} />
            </button>
          )}
        </div>

        <div className="bottom-grid">
          <SpillChart />
          <ModelConfidence />
          <RiskPanel />
        </div>

        <footer className="dashboard-footer">
          <span>MARINEGUARD · COASTAL INTELLIGENCE PLATFORM</span>
          <span>Image-based analysis · Model integration pending</span>
        </footer>
      </main>
    </div>
  )
}


import { useState } from 'react'
import './LandingPage.css'

export default function LandingPage({ onLoginSuccess, onAdminLogin }) {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const openLogin = () => {
    setShowRegister(false)
    setShowLogin(true)
  }

  const closeLogin = () => {
    setShowLogin(false)
    setShowRegister(false)
  }

  const handleOfficerLogin = (event) => {
    event.preventDefault()
    closeLogin()

    if (onLoginSuccess) {
      onLoginSuccess()
    }
  }

  const handleAdminLogin = () => {
    closeLogin()

    if (onAdminLogin) {
      onAdminLogin()
    }
  }

  return (
    <main className="ocean-landing">

      {/* Navigation */}
      <nav className="ocean-navbar">

        <a href="#home" className="ocean-brand">
          <img
            src="/images/coastal-logo.png"
            alt="Coastal Spill Monitoring Logo"
          />
          <span>Coastal Spill Monitoring</span>
        </a>

        <div className="ocean-nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#explore">Explore</a>

          <button
            type="button"
            className="nav-login"
            onClick={openLogin}
          >
            Login
          </button>
        </div>

      </nav>

      {/* Main Hero Section */}
      <section className="ocean-hero" id="home">

        <div className="hero-content">

          <p className="hero-eyebrow">
            GLOBAL MARINE MONITORING INITIATIVE
          </p>

          <h1>
            Marine Pollution
            <br />
            Detection &amp; Monitoring
          </h1>

          <p className="hero-description">
            Satellite-based oil spill detection and vessel
            surveillance across global marine environments.
          </p>

        </div>

        {/* Bottom Information */}
        <div className="hero-bottom">
          <span>COASTAL SPILL MONITORING</span>
          <span>GLOBAL MARINE ENVIRONMENT</span>
        </div>

      </section>

      {/* Officer Login Popup */}
      {showLogin && (

        <div
          className="login-overlay"
          onClick={closeLogin}
        >

          <div
            className="login-card"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              type="button"
              className="modal-close"
              onClick={closeLogin}
              aria-label="Close login"
            >
              ×
            </button>

            <img
              src="/images/coastal-logo.png"
              alt="Coastal Spill Monitoring Logo"
              className="login-logo"
            />

            <h2>Officer Login</h2>

            <p className="login-subtitle">
              Secure access for authorised marine monitoring personnel.
            </p>

            {/* Officer Login Form */}
            <form onSubmit={handleOfficerLogin}>

              <label htmlFor="officer-id">
                Officer ID / Official Email
              </label>

              <input
                id="officer-id"
                type="text"
                placeholder="Enter your officer ID or email"
                autoComplete="username"
                required
              />

              <label htmlFor="officer-password">
                Password
              </label>

              <input
                id="officer-password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="submit"
                className="sign-in-button"
              >
                Sign In
              </button>

            </form>

            {/* Officer Access Request */}
            <p className="register-prompt">
              Don't have access?{' '}
              <button
                type="button"
                onClick={() => setShowRegister(true)}
              >
                Request Officer Access
              </button>
            </p>

            {showRegister && (

              <div className="registration-notice">

                <h3>Request Officer Access</h3>

                <p>
                  Access to Coastal Spill Monitoring is
                  restricted to authorised government and
                  coastal response personnel. Please contact
                  your system administrator for identity
                  verification and account approval.
                </p>

                <button
                  type="button"
                  onClick={() => setShowRegister(false)}
                >
                  Back to Login
                </button>

              </div>

            )}

            {/* Administrator Login */}
            <div className="admin-login-link">

              <p>System Administrator?</p>

              <button
                type="button"
                onClick={handleAdminLogin}
              >
                Administrator Login
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  )
}

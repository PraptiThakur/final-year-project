
import './Admin.css'

export default function AdminLogin({ onLoginSuccess, onBack }) {
  const handleSubmit = (event) => {
    event.preventDefault()

    // Frontend prototype only.
    // Real administrator verification must happen on the backend.
    onLoginSuccess()
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">

        <img
          src="/images/coastal-logo.png"
          alt="Coastal Spill Monitoring"
          className="admin-logo"
        />

        <p className="admin-label">RESTRICTED SYSTEM ACCESS</p>

        <h1>Administrator Login</h1>

        <p className="admin-description">
          Sign in to manage officer accounts and system access.
        </p>

        <form onSubmit={handleSubmit}>

          <label htmlFor="admin-email">Administrator Email</label>
          <input
            id="admin-email"
            type="email"
            placeholder="Enter administrator email"
            required
          />

          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            placeholder="Enter password"
            required
          />

          <button type="submit" className="admin-submit">
            Sign In
          </button>

        </form>

        <p className="admin-security-note">
          This area is intended for designated system administrators only.
        </p>

        <button
          type="button"
          className="admin-back"
          onClick={onBack}
        >
          ← Back to Website
        </button>

        <p className="admin-prototype-note">
          Prototype interface — backend authentication is not connected.
        </p>

      </div>
    </main>
  )
}

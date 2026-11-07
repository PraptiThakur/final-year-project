
import { useState } from 'react'
import './Admin.css'

export default function AdminDashboard({ onLogout }) {
  const [officers, setOfficers] = useState([
    {
      id: 1,
      name: 'Officer 001',
      email: 'officer001@example.com',
      department: 'Coastal Monitoring',
      active: true
    },
    {
      id: 2,
      name: 'Officer 002',
      email: 'officer002@example.com',
      department: 'Marine Surveillance',
      active: true
    },
    {
      id: 3,
      name: 'Officer 003',
      email: 'officer003@example.com',
      department: 'Coastal Monitoring',
      active: false
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    department: ''
  })

  const activeCount = officers.filter(o => o.active).length
  const inactiveCount = officers.length - activeCount

  const openAddForm = () => {
    setEditingId(null)
    setForm({ name: '', email: '', department: '' })
    setShowForm(true)
  }

  const openEditForm = (officer) => {
    setEditingId(officer.id)
    setForm({
      name: officer.name,
      email: officer.email,
      department: officer.department
    })
    setShowForm(true)
  }

  const saveOfficer = (event) => {
    event.preventDefault()

    if (editingId) {
      setOfficers(previous =>
        previous.map(officer =>
          officer.id === editingId
            ? { ...officer, ...form }
            : officer
        )
      )
    } else {
      setOfficers(previous => [
        ...previous,
        {
          id: Date.now(),
          ...form,
          active: true
        }
      ])
    }

    setShowForm(false)
  }

  const toggleStatus = (id) => {
    setOfficers(previous =>
      previous.map(officer =>
        officer.id === id
          ? { ...officer, active: !officer.active }
          : officer
      )
    )
  }

  const deleteOfficer = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to remove this officer?'
    )

    if (confirmed) {
      setOfficers(previous =>
        previous.filter(officer => officer.id !== id)
      )
    }
  }

  return (
    <main className="admin-dashboard">

      <header className="admin-topbar">
        <div className="admin-brand">
          <img src="/images/coastal-logo.png" alt="Logo" />
          <div>
            <strong>Coastal Spill Monitoring</strong>
            <span>System Administration</span>
          </div>
        </div>

        <button className="admin-logout" onClick={onLogout}>
          Sign Out
        </button>
      </header>

      <div className="admin-main">

        <div className="admin-heading">
          <div>
            <p>ADMINISTRATION</p>
            <h1>Administrator Dashboard</h1>
            <span>Manage authorised officer accounts and access.</span>
          </div>
          <button className="add-officer-button" onClick={openAddForm}>
            + Add Officer
          </button>
        </div>

        <section className="admin-stats">

          <div className="admin-stat-card">
            <span>Total Officers</span>
            <strong>{officers.length}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Active Accounts</span>
            <strong>{activeCount}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Inactive Accounts</span>
            <strong>{inactiveCount}</strong>
          </div>

        </section>

        {showForm && (
          <section className="admin-form-card">

            <h2>{editingId ? 'Edit Officer' : 'Add New Officer'}</h2>

            <form onSubmit={saveOfficer}>

              <label htmlFor="officer-name">Officer Name</label>
              <input
                id="officer-name"
                value={form.name}
                onChange={e =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Enter officer name"
                required
              />

              <label htmlFor="officer-email">Official Email</label>
              <input
                id="officer-email"
                type="email"
                value={form.email}
                onChange={e =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="Enter official email"
                required
              />

              <label htmlFor="officer-department">Department</label>
              <input
                id="officer-department"
                value={form.department}
                onChange={e =>
                  setForm({ ...form, department: e.target.value })
                }
                placeholder="Enter department"
                required
              />

              <div className="admin-form-actions">
                <button type="submit" className="admin-submit">
                  {editingId ? 'Save Changes' : 'Add Officer'}
                </button>

                <button
                  type="button"
                  className="admin-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>

            </form>
          </section>
        )}

        <section className="officer-table-card">

          <div className="officer-table-heading">
            <div>
              <h2>Officer Accounts</h2>
              <p>Manage registered monitoring personnel.</p>
            </div>
          </div>

          <div className="officer-table-scroll">
            <table className="officer-table">
              <thead>
                <tr>
                  <th>Officer</th>
                  <th>Official Email</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {officers.map(officer => (
                  <tr key={officer.id}>
                    <td>{officer.name}</td>
                    <td>{officer.email}</td>
                    <td>{officer.department}</td>

                    <td>
                      <span className={
                        officer.active
                          ? 'status-active'
                          : 'status-inactive'
                      }>
                        {officer.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    <td>
                      <div className="officer-actions">
                        <button
                          onClick={() => openEditForm(officer)}
                          title="Edit officer"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => toggleStatus(officer.id)}
                          title="Change account status"
                        >
                          {officer.active ? 'Deactivate' : 'Activate'}
                        </button>

                        <button
                          className="delete-officer"
                          onClick={() => deleteOfficer(officer.id)}
                          title="Remove officer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {officers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="empty-officers">
                      No officer accounts have been added yet.
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>

        </section>

        <p className="admin-demo-warning">
          Demonstration data only. Changes are temporary and are not
          saved to a database.
        </p>

      </div>
    </main>
  )
}

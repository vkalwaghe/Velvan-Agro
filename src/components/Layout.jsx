import { NavLink, Outlet } from 'react-router-dom'
import { companyInfo } from '../data/siteData'

export default function Layout() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="brand">
          <div className="brand__logo" aria-hidden="true">
            🌿
          </div>
          <div>
            <div className="brand__title">{companyInfo.name}</div>
            <div className="brand__tagline">{companyInfo.tagline}</div>
          </div>
        </div>

        <nav className="primary-nav" aria-label="Primary">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/divisions">Divisions</NavLink>
          <NavLink to="/dealerships">Dealerships</NavLink>
          <NavLink to="/order">Order</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer__content">
          <p>
            © {new Date().getFullYear()} {companyInfo.name}. All rights
            reserved.
          </p>
          <p>
            {companyInfo.location} • Established {companyInfo.established}
          </p>
        </div>
      </footer>
    </div>
  )
}

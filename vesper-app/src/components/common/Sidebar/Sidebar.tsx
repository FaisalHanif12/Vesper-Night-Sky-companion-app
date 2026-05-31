import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';

const navItems = [
  { label: 'Tonight', icon: 'nights_stay', path: '/tonight' },
  { label: 'Sky Map', icon: 'map', path: '/sky-map' },
  { label: 'Orrery', icon: 'settings_brightness', path: '/orrery' },
  { label: 'Events', icon: 'event', path: '/events' },
  { label: 'Moon', icon: 'dark_mode', path: '/moon' },
  { label: 'Sun', icon: 'light_mode', path: '/sun-twilight' },
  { label: 'Passes', icon: 'satellite_alt', path: '/passes' },
  { label: 'Conditions', icon: 'wb_cloudy', path: '/sky-conditions' },
  { label: 'Log', icon: 'menu_book', path: '/observation-log' },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <nav className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo} onClick={() => navigate('/tonight')} style={{ cursor: 'pointer' }}>
        <div className={styles.logoIcon}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>settings_brightness</span>
        </div>
        <div>
          <h1 className={styles.logoTitle}>VESPER</h1>
          <p className={styles.logoSub}>Celestial Console</p>
        </div>
      </div>

      {/* Nav Items */}
      <ul className={styles.navList}>
        {navItems.map(item => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.navItemActive : styles.navItemInactive}`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Settings at bottom */}
      <div className={styles.bottomSection}>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.navItemActive : styles.navItemInactive}`
          }
        >
          <span className="material-symbols-outlined">settings</span>
          <span className={styles.navLabel}>Settings</span>
        </NavLink>
      </div>
    </nav>
  );
}

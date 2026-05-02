import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Home, BookOpen, MapPin, User, Landmark, ShieldCheck } from 'lucide-react';

export default function BottomNav() {
  const { t } = useLanguage();
  const navItems = [
    { to: '/home', icon: Home, label: t('home') },
    { to: '/learn', icon: BookOpen, label: t('learn') },
    // { to: '/history', icon: Landmark, label: t('nav_history') },
    { to: '/schemes', icon: ShieldCheck, label: t('nav_schemes') },
    { to: '/find', icon: MapPin, label: t('find') },
    { to: '/profile', icon: User, label: t('profile') },
  ];
  return (
    <nav className="bottom-nav" aria-label="Main navigation" style={{ overflowX: 'auto', justifyContent: 'flex-start' }}>
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink key={to} to={to} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} aria-label={label} style={{ minWidth: 64 }}>
          <div className="nav-icon-wrap">
            <Icon size={20} strokeWidth={2} />
          </div>
          <span style={{ fontSize: '0.65rem' }}>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

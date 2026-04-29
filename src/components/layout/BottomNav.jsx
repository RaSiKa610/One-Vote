import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Home, BookOpen, MapPin, User } from 'lucide-react';

export default function BottomNav() {
  const { t } = useLanguage();
  const navItems = [
    { to: '/home', icon: Home, label: t('home') },
    { to: '/learn', icon: BookOpen, label: t('learn') },
    { to: '/find', icon: MapPin, label: t('find') },
    { to: '/profile', icon: User, label: t('profile') },
  ];
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink key={to} to={to} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} aria-label={label}>
          <div className="nav-icon-wrap">
            <Icon size={22} strokeWidth={2} />
          </div>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

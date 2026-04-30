import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Search, Navigation, ExternalLink, Building2 } from 'lucide-react';
import { useOffline } from '../hooks/useOffline';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const SAMPLE_BOOTHS = [
  { id: 1, nameKey: 'booth_1_name', addrKey: 'booth_1_addr', dist: '0.3 km', boothNum: '47' },
  { id: 2, nameKey: 'booth_2_name', addrKey: 'booth_2_addr', dist: '0.7 km', boothNum: '48' },
  { id: 3, nameKey: 'booth_3_name', addrKey: 'booth_3_addr', dist: '1.1 km', boothNum: '49' },
];

export default function Find() {
  const { t } = useLanguage();
  const isOffline = useOffline();
  const [search, setSearch] = useState('');
  const [userPos, setUserPos] = useState(null);
  const mapRef = useRef(null);

  const getLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {}
    );
  };

  useEffect(() => { getLocation(); }, []);

  useEffect(() => {
    if (isOffline || !mapRef.current || !userPos) return;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => {
      if (window.google && mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: userPos,
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
        });
        new window.google.maps.Marker({
          position: userPos,
          map,
          title: 'Your Location',
          icon: { path: window.google.maps.SymbolPath.CIRCLE, scale: 8, fillColor: '#C0392B', fillOpacity: 1, strokeWeight: 2, strokeColor: '#fff' }
        });
      }
    };
    if (!document.querySelector('script[src*="maps.googleapis"]')) {
      document.head.appendChild(script);
    }
  }, [userPos, isOffline]);

  return (
    <div className="page-enter" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #C0392B, #922b21)', padding: '28px 20px 20px', color: 'white' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20 }}>POLLING STATION FINDER</span>
        <h1 className="heading-lg" style={{ color: 'white', marginTop: 10 }}>{t('find_booth_header')}</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 6, fontSize: '0.85rem' }}>{t('find_booth_subtitle')}</p>
      </div>

      {/* Search */}
      <div style={{ padding: '16px 20px', background: 'white', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder={t('enter_pincode')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 44px', borderRadius: 12, border: '2px solid var(--border)', fontSize: '0.9rem', fontFamily: 'var(--font-body)', outline: 'none', transition: 'var(--transition)' }}
              onFocus={e => e.target.style.borderColor = 'var(--navy)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <button
            onClick={getLocation}
            style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--navy)', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'var(--transition)' }}
            aria-label="Use my location"
          >
            <Navigation size={18} />
          </button>
        </div>
      </div>

      {/* Map */}
      {!isOffline ? (
        <div ref={mapRef} style={{ height: 260, background: 'var(--cream)', flexShrink: 0 }}>
          {!userPos && (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--cream-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={24} color="var(--text-muted)" />
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>{t('allow_location')}</p>
              <button onClick={getLocation} className="btn btn-outline btn-sm">{t('enable_location')}</button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ margin: '16px 20px', background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.3)', borderRadius: 12, padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Navigation size={16} color="#a07800" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: '0.82rem', color: '#a07800', fontWeight: 600 }}>
            {t('offline_map')}
          </p>
        </div>
      )}

      {/* Booth list */}
      <div style={{ padding: '16px 20px 24px' }}>
        <p className="label" style={{ color: 'var(--text-muted)', marginBottom: 12 }}>{t('nearby_booths')}</p>
        {SAMPLE_BOOTHS.map(booth => (
          <div key={booth.id} style={{ background: 'white', borderRadius: 16, border: '2px solid var(--border)', padding: '16px', marginBottom: 10, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(192,57,43,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Building2 size={20} color="var(--red)" strokeWidth={1.75} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy)', letterSpacing: '0.02em' }}>{t(booth.nameKey)}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 3 }}>{t(booth.addrKey)}</p>
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--teal)', background: 'rgba(42,157,143,0.1)', padding: '3px 10px', borderRadius: 20 }}>{t('booth_tag')} #{booth.boothNum}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--red)', background: 'rgba(192,57,43,0.08)', padding: '3px 10px', borderRadius: 20 }}>{booth.dist}</span>
              </div>
            </div>
          </div>
        ))}

        <a
          href="https://voters.eci.gov.in/booth-locator"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px', background: 'var(--navy)', color: 'white', borderRadius: 16, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.02em', marginTop: 8 }}
        >
          {t('find_official_booth')} <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from 'recharts';
import { TURNOUT_DATA, GENDER_DATA, AGE_DATA, ELECTORATE_GROWTH, STATE_TURNOUT } from '../data/electionData';
import { Info } from 'lucide-react';

export default function Analytics() {
  const { t } = useLanguage();

  return (
    <div className="page-enter" style={{ paddingBottom: 40 }}>
      <div className="hero-banner" style={{ background: 'linear-gradient(135deg, #1A304D 0%, #2A9D8F 100%)' }}>
        <p className="label" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>{t('election_analytics').toUpperCase()}</p>
        <h1 className="heading-lg" style={{ color: 'white' }}>{t('analytics_title')}</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: 8, fontSize: '0.9rem' }}>
          {t('analytics_sub')}
        </p>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Turnout Trends */}
        <section className="chart-card">
          <h2 className="chart-title">{t('analytics_turnout')}</h2>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <LineChart data={TURNOUT_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: 'var(--text-muted)'}} />
                <YAxis axisLine={false} tickLine={false} domain={[50, 75]} tick={{fontSize: 12, fill: 'var(--text-muted)'}} />
                <Tooltip contentStyle={{borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{fontSize: 12, paddingTop: 10}} />
                <Line type="monotone" dataKey="turnout" name={t('overall_pct')} stroke="var(--navy)" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="female" name={t('female_pct')} stroke="var(--teal)" strokeWidth={2} dot={{r: 3}} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* State Turnout */}
        <section className="chart-card">
          <h2 className="chart-title">{t('analytics_states')}</h2>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <BarChart data={STATE_TURNOUT} layout="vertical" margin={{left: 20}}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                <XAxis type="number" hide />
                <YAxis dataKey="state" type="category" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: 'var(--navy)', fontWeight: 600}} width={90} tickFormatter={(val) => t(val)} />
                <Tooltip cursor={{fill: 'var(--cream)'}} contentStyle={{borderRadius: 12, border: 'none'}} labelFormatter={(val) => t(val)} />
                <Bar dataKey="value" name={t('turnout_pct')} fill="var(--teal)" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* Gender */}
          <section className="chart-card" style={{ padding: '16px 8px' }}>
            <h2 className="chart-title" style={{ fontSize: '0.85rem', textAlign: 'center' }}>{t('analytics_gender')}</h2>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={GENDER_DATA} innerRadius={45} outerRadius={65} paddingAngle={5} dataKey="value">
                    {GENDER_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0 8px' }}>
              {GENDER_DATA.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                    <span style={{ color: 'var(--text-muted)' }}>{t(item.name)}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </section>

          {/* Age */}
          <section className="chart-card" style={{ padding: '16px 8px' }}>
            <h2 className="chart-title" style={{ fontSize: '0.85rem', textAlign: 'center' }}>{t('analytics_age')}</h2>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={AGE_DATA} outerRadius={65} dataKey="count" labelLine={false}>
                    {AGE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0 8px' }}>
              {AGE_DATA.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                    <span style={{ color: 'var(--text-muted)' }}>{t(item.group)}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{item.count}%</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Growth */}
        <section className="chart-card">
          <h2 className="chart-title">{t('analytics_growth')}</h2>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <AreaChart data={ELECTORATE_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="electors" name={t('electors_cr')} stroke="var(--navy)" fill="var(--cream)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Info size={12} />
            Data in Crores. Total electors reached ~97Cr in 2024.
          </p>
        </section>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .chart-card {
          background: white;
          border-radius: 24px;
          border: 2px solid var(--border);
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }
        .chart-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--navy);
          margin-bottom: 20px;
          letter-spacing: 0.02em;
        }
      `}} />
    </div>
  );
}

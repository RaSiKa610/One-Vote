import React from 'react';
import Header from '../components/layout/Header';
import { Shield, Eye, Lock, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="page-enter">
      <Header title="Privacy Policy" showBack={true} />
      
      <div style={{ padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: 20, border: '2px solid var(--border)', padding: '24px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Shield size={24} color="var(--navy)" />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--navy)' }}>Privacy Commitment</h2>
          </div>
          
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
            <strong>One Vote</strong> is a non-partisan educational platform. We prioritize your privacy and do not collect personal identifiers beyond what is necessary for the educational experience.
          </p>

          <section style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Eye size={18} color="var(--teal)" />
              <h3 style={{ fontSize: '1rem', color: 'var(--navy)', fontWeight: 700 }}>Data Collection</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              We use Firebase Authentication (Google Login) to allow you to save your 'Voter Checklist' progress and quiz scores. We do NOT collect Voter ID numbers, Aadhaar details, or biometric data.
            </p>
          </section>

          <section style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Lock size={18} color="var(--teal)" />
              <h3 style={{ fontSize: '1rem', color: 'var(--navy)', fontWeight: 700 }}>Data Security</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              All progress is stored securely in Firebase. We do not sell or share your data with third parties.
            </p>
          </section>

          <section style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <FileText size={18} color="var(--teal)" />
              <h3 style={{ fontSize: '1rem', color: 'var(--navy)', fontWeight: 700 }}>Disclaimer</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              This application is an educational prototype for the #PromptWarsVirtual competition and is not an official government service.
            </p>
          </section>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Last Updated: May 2026
        </p>
      </div>
    </div>
  );
}

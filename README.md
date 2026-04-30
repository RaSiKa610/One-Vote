# 🗳️ One Vote - Empowering Every Indian Voter

**One Vote** is a high-performance, multi-lingual civic engagement platform designed to eliminate voter apathy and education gaps in India. It provides a personalized, secure, and accessible journey for every citizen—from first-time voters to experienced electors.

---

## 🏛️ Project Overview

### **Vertical: Voter Education & Civic Engagement**
In a democracy of 1.4 billion people, information fragmentation is the biggest barrier to participation. **One Vote** centralizes critical civic data (history, schemes, polling locations) into a single, localized interface.

### **The Approach & Logic**
- **Mobile-First Progressive App**: Designed for the 700M+ smartphone users in India, ensuring a smooth experience even on mid-range devices.
- **Context-Aware Onboarding**: Logic filters content based on the user's "Voter Type" (New vs. Existing), reducing information overload.
- **Centralized Localization (i18n)**: A custom lookup architecture allows for instant translation across 10 regional languages without page reloads.

---

## 🛠️ How the Solution Works

1.  **Identity & Persistence**: Users sign in via **Google Authentication**. Their progress (Voter Checklist, Quiz Scores) is synced in real-time to **Firebase Firestore**, ensuring continuity across devices.
2.  **Educational Core**: 
    - **History**: A visual timeline of Indian democracy (1947–2025) using high-resolution assets.
    - **Schemes**: Dynamic directory of government benefits mapped to eligibility.
3.  **Geospatial Intelligence**: The **Google Maps API** powers the Polling Station finder, providing visual confirmation of booth locations.
4.  **AI Assistance**: A voice-enabled **AI Assistant** provides a natural language interface for users who prefer speaking over typing.

---

## ☁️ Google Services Integration

The platform is a showcase of the **Google Cloud Ecosystem**:
- **Hosting**: Deployed on **Google Cloud Run** for global scalability and sub-second cold starts.
- **CI/CD**: Built using **Cloud Build** and stored in **Artifact Registry**.
- **Auth**: **Firebase Authentication** provides a secure, passwordless entry point.
- **Database**: **Cloud Firestore** handles multi-user synchronization with millisecond latency.
- **Maps**: **Google Maps Javascript API** with custom styling for booth locating.

---

## 🛡️ Evaluation Parameters

### **Code Quality**
- **Structure**: Clean separation of concerns (Components vs. Context vs. Data).
- **Maintainability**: Centralized data files (`politicalHistory.js`, `schemes.js`) allow for content updates without touching code logic.

### **Security**
- **Safe Auth**: Transitioned to **Google Sign-In** to eliminate SMS spoofing risks.
- **Secret Management**: API keys are isolated in `.env` and injected into the build pipeline via **Cloud Build**.
- **Secure Deployment**: Implemented `.gcloudignore` and locked down Firestore rules to `request.auth.uid`.

### **Efficiency**
- **Optimized Assets**: Uses Wikimedia thumbnail optimization (e.g., `500px` widths) to reduce payload size.
- **Vite Build**: Tree-shaking and minification ensure the final JS bundle is highly optimized for slow 3G/4G connections.

### **Accessibility**
- **Semantic HTML**: Proper use of `<header>`, `<main>`, and `<button>` for screen reader compatibility.
- **Contrast**: High-contrast "Democratic Navy" on "Cream" background for readability in sunlight (outdoor voting conditions).
- **Aria Labels**: Comprehensive ARIA support for icon buttons.

---

## 📝 Assumptions Made
1.  **Connectivity**: Assumes the user has intermittent internet access (PWA capabilities allow for offline reading of cached history/schemes).
2.  **Language**: Assumes that while users speak regional languages, they can recognize the standard Google Sign-In interface.
3.  **Booth Data**: Polling booth data in the "Find" section is currently illustrative; in production, this would hook into the ECI's real-time API.

---

## 🚀 Deployment Command

```powershell
gcloud run deploy one-vote --source . --region us-central1 --allow-unauthenticated
```

---
*Developed for the Google Cloud Virtual Competition - Focus on Democratic Resilience.*

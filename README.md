# 🗳️ One Vote - Empowering Every Indian Voter

**One Vote** is a high-performance, multi-lingual civic engagement platform designed to eliminate voter apathy and education gaps in India. It provides a personalized, secure, and accessible journey for every citizen—from first-time voters to experienced electors.

---

## 🏛️ Project Overview

### **Vertical: Voter Education & Civic Engagement**
In a democracy of 1.4 billion people, information fragmentation and complex onboarding are barriers to participation. **One Vote** (v2.0) simplifies the user journey by removing mandatory authentication gates and providing a "Guest-First" experience, ensuring education is accessible to everyone instantly.

### **The Approach & Logic**
- **Authentication-Optional Architecture:** Users can browse the entire SVEEP educational hub, use the AI assistant, and view analytics as a guest. Google Sign-In is moved to the profile page for optional progress syncing.
- **SVEEP Feature Parity:** Integrated comprehensive educational modules based on the ECI SVEEP program (Voter Types, How-to-Vote visual guides, ELCs, and Resources).
- **Data-Driven Transparency:** A new Analytics Dashboard provides historical context and social proof by visualizing 15+ years of ECI data.
- **Political Knowledge AI:** Upgraded the assistant from a simple router to a knowledge-base responder capable of answering political trivia and current government facts.

---

## 🛠️ How the Solution Works

1.  **Guest Access**: The app defaults to a "Guest Voter" state. Navigation guards are removed to allow immediate access to the **Learn** and **Find** hubs.
2.  **Educational Hub (v2.0)**:
    - **Voter Types**: Dedicated information for General, Service, Overseas, and PwD voters.
    - **Visual How-to-Vote**: A 7-step journey through the polling booth process.
    - **NVD Pledge**: An interactive tool to take and share the National Voter's Pledge.
3.  **Analytics Dashboard**: Uses **Recharts** to render 6 dynamic visualizations of historical ECI data (2009-2024), including turnout trends, gender distribution, and electorate growth.
4.  **Upgraded AI Assistant**: Uses an intent-matching logic coupled with a political knowledge base. It can answer questions like "Who is the PM?" or "What is the voting age?" in any of the 10 supported languages.
5.  **Localization Sync**: A specialized translation pipeline ensures that 100% of the app's content, including analytics labels and AI answers, is available in 10 Indian languages.

---

## ☁️ Google Services Integration

The platform is a showcase of the **Google Cloud Ecosystem**:
- **Hosting**: Deployed on **Google Cloud Run** for global scalability and sub-second cold starts.
- **AI/ML**: Natural Language intent matching for the voice assistant.
- **Auth**: **Firebase Authentication** (Google Provider) used for optional profile syncing.
- **Database**: **Cloud Firestore** stores user checklists and quiz progress.
- **Maps**: **Google Maps Javascript API** powers the Polling Station finder.

---

## 🛡️ Evaluation Parameters

### **Code Quality**
- **Clean Architecture**: Functional components with strict separation of business logic (Context/Utils) and UI.
- **Performance**: PWA service worker with custom runtime caching for Google Fonts and Maps assets.

### **Security**
- **Responsible AI**: The assistant is grounded in a static knowledge base to prevent hallucinations regarding sensitive political data.
- **Data Privacy**: No personal data is collected from guest users. Firebase rules ensure authenticated users can only access their own sync records.

### **Efficiency**
- **Optimized Rendering**: Recharts implementation uses lightweight SVG rendering for maximum performance on mobile browsers.
- **Resource Management**: Minimal dependency footprint; uses vanilla CSS for styling to keep bundle size under 200KB.

---

## 📝 Assumptions Made
1.  **Data Currency**: Historical ECI data (2009-2024) is used for analytics as real-time booth data is not publicly available via API.
2.  **Connectivity**: The app is designed as an "Offline-First" PWA. All educational content and previously viewed analytics are cached for offline use.
3.  **Verification**: For the "How to Vote" guide, it is assumed the user will follow the official ECI procedure once at the booth.

---

## 🚀 Deployment Command

```powershell
gcloud run deploy one-vote --source . --region us-central1 --allow-unauthenticated
```

---
*Developed for the Google Cloud Virtual Competition - Focus on Democratic Resilience.*

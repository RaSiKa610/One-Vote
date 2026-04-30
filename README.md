# 🗳️ One Vote - Empowering Every Indian Voter

**One Vote** is a comprehensive, multi-lingual digital platform designed to eliminate voter apathy and education gaps in the world's largest democracy. Built for the citizens of India, it provides a seamless journey from understanding democratic history to finding your polling booth.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://one-vote-388302556359.us-central1.run.app)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Firebase-blue)](https://github.com/RaSiKa610/One-Vote)

---

## 🌟 Key Features

### 🌍 Hyper-Local Localization
- Fully translated into **10 Indian Languages**: English, Hindi, Marathi, Gujarati, Bengali, Tamil, Telugu, Kannada, Malayalam, and Punjabi.
- Dynamic language switching that updates the entire UI instantly.

### 🏛️ Interactive Political History
- Explore the evolution of Indian democracy from 1947 to today.
- High-resolution visual history of political parties and key leaders like **Kanshi Ram**, **Sardar Patel**, and **B.R. Ambedkar**.

### 🗺️ Smart Booth Finder
- Integrated **Google Maps** to help voters locate their polling stations.
- Sample data provided for testing, fully localized for each region.

### 📜 Government Schemes Portal
- A curated directory of central government schemes (PM-KISAN, Ayushman Bharat, etc.).
- Detailed eligibility criteria and benefits translated for grassroots understanding.

### 🤖 AI Call Assistant
- A futuristic AI-powered voice assistant to guide new voters through the registration process and answer FAQs about the election process.

---

## 🛠️ Technical Architecture

- **Frontend**: React 18 with Vite for blazing fast development and builds.
- **Styling**: Modern, premium CSS with a "Democratic Gold & Navy" aesthetic.
- **Backend**: Firebase Authentication (Google Login) and Firestore (Cloud Sync).
- **Hosting**: Google Cloud Run for scalable, serverless deployment.
- **CI/CD**: Dockerized builds via Cloud Build.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Google Cloud SDK (`gcloud`)
- Firebase Account

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/RaSiKa610/One-Vote.git
   cd One-Vote
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Create a `.env` file with your Firebase and Google Maps keys:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_key
   VITE_FIREBASE_API_KEY=your_key
   ...
   ```
4. Run locally:
   ```bash
   npm run dev
   ```

---

## ☁️ Deployment

The project is optimized for **Google Cloud Run**.

1. **Build and Deploy**:
   ```powershell
   gcloud run deploy one-vote --source . --region us-central1 --allow-unauthenticated
   ```

---

## 🔒 Security
- **Secure Authentication**: Uses Firebase Google Auth for verified identity.
- **Authorized Domains**: Strict domain whitelisting to prevent unauthorized API usage.
- **Environment Variables**: Managed via Vite and Cloud Run secrets.

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License
This project is for educational and democratic empowerment purposes. 

---
*Created with ❤️ for a better India.*

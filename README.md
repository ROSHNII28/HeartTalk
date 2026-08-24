# HeartTalk 💗

HeartTalk is a responsive, warm digital companion designed to support emotional wellness and mental wellbeing. It provides a safe space to track your mood, journal your thoughts, relax with ambient sounds, play calming games, and chat with an empathetic AI chatbot.

## Core Features

- **Mood Check & Tracking**: A quick 5-question wellness quiz that maps your emotional state and charts it on a monthly calendar.
- **Private Journal**: A secure diary with guided reflection prompts (anxieties, bodily responses, controls, positive affirmations) and auto-saving.
- **Joy Hub**: Calm mini-games including:
  - **Memory Match**: A relaxing tile-pairing game.
  - **Color & Heal**: A responsive drawing canvas with touch support, color palettes, and digital sticker placement.
- **Relaxing sound library**: A curated soundboard featuring nature sounds (rain, ocean waves) and cozy atmospheres (meditation bowls, crackling fireplace).
- **Empathic Chatbot**: A Gemini-powered AI companion that listens and responds supportively without judgment.
- **Daily Planner & Self-Care Checklist**: A tracker to set intentions, customize sleep/hydration targets, and log self-care routines.

## Tech Stack

- **Frontend**: React (Vite, React Router DOM, Lucide Icons)
- **Backend**: Node.js, Express, Cors, Dotenv
- **Services**: Firebase Authentication & Firestore Database
- **Styling**: Responsive Vanilla CSS & inline styles

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 1. Run the Backend API
The backend handles routing, chat queries, and notifications.
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Express server:
   ```bash
   npm start
   ```
   *The server runs at `http://localhost:5050`.*

### 2. Run the Frontend React App
1. In the project root directory, install dependencies:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will open at `http://localhost:5173/`.*

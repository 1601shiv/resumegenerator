# CV Builder & Resume Generator - Local Setup Guide

A production-grade, full-stack Resume & Portfolio Generator built using React, Vite, Node.js, Express, and MongoDB. Follow these steps to run the application locally on your system.

---

## Prerequisites

Ensure you have the following installed on your machine:
1. **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB Community Server** (running locally) - [Download here](https://www.mongodb.com/try/download/community)
   * *Alternatively*, you can use a MongoDB Atlas cloud database connection string.

---

## Local Setup Instructions

### Step 1: Open Terminal
Open your terminal (PowerShell, Command Prompt, or Git Bash) and navigate to the project directory:
```bash
cd C:\Users\1602s\Desktop\resume-generator
```

### Step 2: Install Dependencies
The project is configured as a monorepo. We have written a helper script that automatically installs dependencies in the root, client, and server folders:
```bash
npm run install:all
```

### Step 3: Configure Database (Optional)
By default, the server connects to a local MongoDB instance: `mongodb://127.0.0.1:27017/resume-generator`.

If you prefer to connect to a MongoDB Atlas cluster:
1. Open the file `server/.env` in a text editor.
2. Edit or add the `MONGODB_URI` environment variable with your connection string:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/resume-generator?retryWrites=true&w=majority
   ```

### Step 4: Run Development Servers
Start both the Express backend API server and the Vite React frontend client concurrently with a single command:
```bash
npm run dev
```

---

## Accessing the Application

Once both servers start successfully, open your browser and navigate to:
* **Frontend Dashboard:** [http://localhost:3000/](http://localhost:3000/) (or `http://localhost:3001` if port 3000 is occupied).
* **Backend API Health:** [http://localhost:5000/api/templates](http://localhost:5000/api/templates)

---

## Features Guide

1. **SaaS Dashboard:** Sign in or register an account. It creates your cloud profile where you can create, rename, duplicate, and delete multiple resumes.
2. **120+ Templates:** Browse the massive templates library using the search and layout/color dropdown filters.
3. **✨ AI Bullet Enhancer:** Click the sparkle button `✨` next to summary or bullet inputs to view optimized rewrites.
4. **🔗 Inline Links:** Type `[Text](https://url)` in summaries or job highlights to render custom hyperlinks on the A4 CV.
5. **Download PDF:** Click "Download PDF" to launch the system print dialog. Ensure background graphics are enabled in print options to preserve HSL accent colors.

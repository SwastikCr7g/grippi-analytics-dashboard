# 📊 Grippi Campaign Analytics Dashboard

Readme File of Grippi Junior Full-Stack Developer Intern Assignment. It is Campaign Analytics Dashboard that fetches data from API.

* **Frontend**: Next.js (App Router) + React 
* **Styling**: TailwindCSS 
* **Backend**: FastAPI (Python)
* **Mock Database**: PostgreSQL (simulated with in-memory data) 
* **Deployment**: Vercel (Frontend) & Railway (Backend) 

---

## Live Deployment Links 

| Service | Platform | URL |
| :--- | :--- | :--- |
| **GitHub Repository (Source Code)** | GitHub | **https://github.com/SwastikCr7g/grippi-analytics-dashboard** |
| **Frontend Dashboard** | Vercel | [https://grippi-analytics-dashboard.vercel.app](https://grippi-analytics-dashboard.vercel.app) |
| **Backend API (Base URL)** | Railway | [https://web-production-07d6e.up.railway.app](https://web-production-07d6e.up.railway.app) |
| **Backend API Endpoint** | Railway | [https://web-production-07d6e.up.railway.app/campaigns](https://web-production-07d6e.up.railway.app/campaigns) |

---

## 🛠️ Local Setup Instructions 

### 1. Backend (FastAPI) Setup

1.  **Navigate to the root directory:** `cd grippi-assignment`
2.  **Create and activate a Python Virtual Environment:**
    ```bash
    python -m venv venv
    .\venv\Scripts\Activate # Windows PowerShell
    # source venv/bin/activate # macOS/Linux
    ```
3.  **Install Python Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Run the FastAPI Server:**
    ```bash
    python -m uvicorn main:app --reload
    ```
    The API should run on `http://127.0.0.1:8000`.

### 2. Frontend (Next.js) Setup

1.  **Open a second terminal and navigate to the frontend directory:** `cd frontend`
2.  **Install Node Dependencies:**
    ```bash
    npm install
    ```
3.  **Run the Next.js Development Server:**
    ```bash
    npm run dev
    ```
    The dashboard will be available at `http://localhost:3000`.

---

## 📝 Database Schema

The SQL script for table creation is located in `database_setup.sql`. The table structure is:

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `SERIAL PRIMARY KEY` | Unique identifier |
| `name` | `VARCHAR(255)` | Campaign Name |
| `status` | `VARCHAR(10)` | Active/Paused |
| `clicks` | `INTEGER` | Number of Clicks |
| `cost` | `NUMERIC(10, 2)` | Cost (Currency) |
| `impressions` | `INTEGER` | Number of Impressions |
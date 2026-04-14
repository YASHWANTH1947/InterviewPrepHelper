# InterviewGuide

An AI-powered interview preparation tool. Upload your resume, paste a job description, and get a personalized interview report — tailored questions, skill gap analysis, and a day-by-day prep plan — generated instantly using Google Gemini AI.

---

## Features

- **AI Interview Report** — Submits your resume (PDF), job description, and a self description to Gemini AI. Returns a structured report including:
  - **Match Score** — 0–100 rating of how well your profile fits the role
  - **Technical Questions** — Role-specific questions with interviewer intent and ideal answer strategy
  - **Behavioral Questions** — Soft-skill questions with context and how to answer them
  - **Skill Gaps** — Missing skills ranked by severity (low / medium / high)
  - **Preparation Plan** — A day-by-day study roadmap to close gaps before the interview

- **Report History** — All generated reports are saved per user. You can view a list of past reports (title, match score, date) and open any of them in full detail.

- **Authentication** — JWT-based auth using HTTP-only cookies. Register, login, and logout. All report endpoints are protected.

---

## Tech Stack

**Frontend**
- React 19 + Vite
- TanStack Query (data fetching & mutations)
- React Router v7
- Axios
- Tailwind CSS

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- Google Gemini AI (`@google/genai`) with structured JSON output via Zod schemas
- `pdf-parse` for extracting text from uploaded PDF resumes
- Multer for file uploads
- JWT + bcryptjs for authentication
- Cookie-parser for reading auth cookies

---

## Project Structure

```
InterViewGuide/
├── backend/
│   └── src/
│       ├── controllers/    # generateInterviewReport, getSingleReport, getAllUserReports, auth
│       ├── models/         # interviewReport, user, blackList schemas
│       ├── routes/         # /api/auth, /api/interviewReport
│       ├── services/       # Gemini AI prompt + Zod schema definition
│       ├── middlewares/    # authMiddleware, multer
│       └── db/             # MongoDB connection
└── frontend/
    └── src/
        ├── api/            # auth.services.js, interview.services.js
        ├── pages/          # Home, Login, Register, InterviewReport, InterviewReportResult, PreviousReports
        └── components/     # AuthLayout, AuthField
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)
- Google Gemini API key

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the server:

```bash
npm run fire
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and expects the backend at `http://localhost:8000`.

---

## API Routes

### Auth — `/api/auth`

| Method | Path       | Description          |
|--------|------------|----------------------|
| POST   | `/register` | Create a new account |
| POST   | `/login`    | Login, sets auth cookie |
| POST   | `/logout`   | Clears auth cookie   |
| GET    | `/getMe`    | Returns current user |

### Interview Reports — `/api/interviewReport`

All routes require authentication.

| Method | Path    | Description                                              |
|--------|---------|----------------------------------------------------------|
| POST   | `/`     | Generate a new report (multipart: `file`, `jobDescription`, `selfDescription`) |
| GET    | `/`     | Get all reports for the logged-in user (summary: title, matchScore, createdAt) |
| GET    | `/:id`  | Get a single report by ID (full data)                    |

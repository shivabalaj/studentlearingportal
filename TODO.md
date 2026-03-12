# Student Learning Portal Deployment TODO

## Status: [ ] In Progress

### 1. [ ] Create Render Account
- Sign up at https://render.com with GitHub (repo: shivabalaj/studentlearingportal ready)

### 2. [ ] Deploy Backend (Web Service)
- New+ → Web Service → Connect repo
- Name: `student-portal-backend`
- Root Directory: `backend`
- Environment: Node
- Build Command: `npm install`
- Start Command: `npm start`
- Plan: Free
- **Environment Variables*:
  | Key | Value |
  |-----|-------|
  | `MONGO_URI` | `mongodb://chandrashekar:balaji123b@ac-lyvutqh-shard-00-00.tdp4abz.mongodb.net:27017,...` (your Atlas URI, whitelist Render IPs if needed) |
  | `JWT_SECRET` | Generate strong secret (e.g., `openssl rand -base64 32`) |
- Click Create → Wait for build → Note URL: `https://student-portal-backend.onrender.com`
- Test: `/health`, `/api/courses`

### 3. [ ] Deploy Frontend (Static Site)
- New+ → Static Site → Connect repo
- Name: `student-portal-frontend`
- Root Directory: `frontend`
- Build Command: `npm run build`
- Publish Directory: `build`
- **Environment Variable**:
  | Key | Value |
  |-----|-------|
  | `REACT_APP_API_URL` | `https://student-portal-backend.onrender.com` (your backend URL)
- Click Create → Wait for build → Note URL: `https://student-portal-frontend.onrender.com`
- Test full app

### 4. [x] Verify & Seed Data (Local)
- Run `node backend/seed-admin.js` locally to seed admin/data if needed

### 5. [ ] Update README.md
```
Frontend: https://student-portal-frontend.onrender.com
Backend API: https://student-portal-backend.onrender.com
Admin: /admin (login needed)
```

**Notes**:
- Free tier sleeps after inactivity (15min cold start).
- MongoDB Atlas: Network Access → Add Render IP if connection fails.
- No code changes needed—repo clean & pushed.


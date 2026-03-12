# Fix Backend Render Deployment "Cannot GET" Error

## Steps:
- [x] 1. Add root '/' GET route handler in backend/server.js ✓ Backend "Cannot GET" fixed (confirmed).
- [x] 2. Commit/push done (user deployed).
- [x] 3. Root returns JSON ✓.
- [ ] 4. **Frontend fetch fix (almost done):**
  - Code updated ✓ All use REACT_APP_API_URL.
  - Backend: https://studentlearingportal-backend.onrender.com/ ✓
  - **Set Render frontend Env Var:** REACT_APP_API_URL=https://studentlearingportal-backend.onrender.com
  - Deploy frontend.
  - Visit frontend, courses load without "Failed to fetch".

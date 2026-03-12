# Fix Backend Render Deployment "Cannot GET" Error

## Steps:
- [x] 1. Add root '/' GET route handler in backend/server.js ✓ Backend "Cannot GET" fixed (confirmed).
- [x] 2. Commit/push done (user deployed).
- [x] 3. Root returns JSON ✓.
- [ ] 4. **Frontend fetch fix:**
  - Updated login/signup.js to use API_URL.
  - All fetches now `process.env.REACT_APP_API_URL || localhost:5000`.
  - **Set on Render frontend dashboard > Environment > Add Var: `REACT_APP_API_URL=https://your-backend.onrender.com`**
  - Push/redeploy frontend.
  - Test courses load.

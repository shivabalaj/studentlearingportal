# Fix MongoDB Atlas Connection Issue

## Steps to Complete:

### 1. Whitelist IP in MongoDB Atlas ✅
- [x] Login to [MongoDB Atlas](https://cloud.mongodb.com/)
- [x] Select your project containing cluster `atlas-hrb0g9-shard-0`
- [x] Go to **Security** > **Network Access** (left sidebar)
- [x] Click **Add IP Address**
- [x] Added `49.204.14.46/32` and `0.0.0.0/0` ✅ (Active)
- [x] Wait 1-2 minutes for changes to propagate

### 2. Test Backend Connection ⏳
- [ ] Stop current server (Ctrl+C)
- [ ] Run: `cd backend && npm start`
- [ ] Verify logs show:
  ```
  MongoDB Connected Successfully
  Server is running on port 5000
  ```

### 3. Additional Troubleshooting (if still fails)
- [ ] Check Atlas cluster status (paused?)
- [ ] Verify MONGO_URI in backend/.env has correct credentials
- [ ] Disable VPN/firewall temporarily
- [ ] Re-fetch IP: `powershell -Command \"(Invoke-WebRequest -Uri 'https://api.ipify.org').Content.Trim()\"`
- [ ] Update whitelist if IP changed

### 4. Seed Data (Optional)
- [ ] Run `node backend/seed-admin.js` to create admin user

**Progress: 1/4 steps complete (Whitelist updated)**

---

*Updated by BLACKBOXAI*


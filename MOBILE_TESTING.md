# 📱 Mobile Testing Setup Guide

## 🌐 Network Access Configuration

Your development server is running on:
- **Local**: http://localhost:5173/
- **Network**: http://192.168.100.9:5173/

### For Mobile Device Testing:

#### 1. **Check Network Connection**
- Ensure your phone and computer are on the same WiFi network
- Verify the network IP address: `192.168.100.9`

#### 2. **Firewall Configuration (Windows)**
```powershell
# Run as Administrator
New-NetFirewallRule -DisplayName "Vite Dev Server" -Direction Inbound -Protocol TCP -LocalPort 5173 -Action Allow
```

#### 3. **Alternative Access Methods**

**Option A: Use ngrok for public tunnel**
```bash
# Install ngrok globally
npm install -g ngrok

# Create public tunnel
ngrok http 5173
```

**Option B: Use Cloudflare Tunnel**
```bash
# Install cloudflared
# Then run:
cloudflared tunnel --url http://localhost:5173
```

**Option C: Use your local IP**
- Find your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
- Use: `http://[YOUR_IP]:5173`

### 🧪 Test Connection
Visit: http://localhost:5173/test-connection

### 📱 Mobile Browser Access
1. Connect phone to same WiFi
2. Open browser on phone
3. Navigate to: `http://192.168.100.9:5173`
4. If blocked, try: `http://192.168.100.9:5173/test-connection`

### 🔧 Troubleshooting
- **"This site can't be reached"**: Check firewall settings
- **"Connection timeout"**: Verify both devices on same network
- **"Load error"**: Try clearing browser cache on mobile

### 🎯 Test User Accounts
Use these pre-configured accounts:

**Normal User:**
- Email: user@test.com
- Password: password123

**Fundi Account:**
- Email: fundi@test.com  
- Password: password123

**Business Account:**
- Email: business@test.com
- Password: password123

### 🚨 Quick Fix Commands
```bash
# Restart dev server with network access
npm run dev

# Check if port is open
netstat -an | find "5173"

# Kill process on port (if needed)
taskkill /F /PID [PID_NUMBER]
```

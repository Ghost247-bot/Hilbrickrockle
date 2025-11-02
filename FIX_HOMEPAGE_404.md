# Fix: Homepage 404 Error

## Issue
- GET http://localhost:3000/ 404 (Not Found)
- Homepage not loading

## Solution

### Step 1: Stop All Node Processes

```powershell
# Kill all Node.js processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

### Step 2: Clear Build Cache

```powershell
# Remove .next directory (already done)
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Remove node_modules/.cache if exists
Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue
```

### Step 3: Restart Dev Server

```bash
npm run dev
```

### Step 4: Verify

Visit: `http://localhost:3000/`

---

## If Still Not Working

### Check Port Availability

```powershell
# Check if port 3000 is in use
netstat -ano | findstr :3000
```

### Try Different Port

```bash
npm run dev -- -p 3001
```

Then visit: `http://localhost:3001/`

### Check for Build Errors

Look for any errors in the terminal when starting `npm run dev`

### Verify File Structure

Make sure `src/pages/index.tsx` exists and has:
- ✅ Default export: `export default HomePage;`
- ✅ Proper React component
- ✅ No syntax errors

---

## Quick Fix Script

Run this PowerShell script:

```powershell
# Stop all node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Clear cache
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue

# Start dev server
npm run dev
```


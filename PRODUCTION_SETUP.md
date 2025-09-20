# 🚀 VIZUP Production Deployment Setup

## ✅ **CURRENT STATUS**
- ✅ **Backend**: Deployed and operational on Railway
- ✅ **Frontend**: Ready for Vercel deployment with backend integration
- ✅ **Authentication**: Supabase + Backend JWT validation configured
- ✅ **API Integration**: Complete with real-time SSE support

---

## 🔧 **ENVIRONMENT VARIABLES**

### **Vercel Environment Variables**
Add these to your Vercel project settings:

```bash
# Production Backend API
REACT_APP_API_URL=https://vizupauditvisibilityaug25-production.up.railway.app/api/v1

# Your existing Supabase configuration
REACT_APP_SUPABASE_URL=your_actual_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_actual_supabase_anon_key

# Production mode
REACT_APP_DEMO_MODE=false
```

### **Required for Backend Team**
Update Railway environment variables to include:
```bash
CORS_ORIGIN=https://your-vercel-domain.vercel.app,https://localhost:3000
```

---

## 🔗 **API ENDPOINTS INTEGRATED**

### **Authentication (Supabase Direct)**
- ✅ Frontend continues using Supabase auth
- ✅ Backend validates Supabase JWTs automatically
- ✅ No auth flow changes needed

### **Data Operations (Backend API)**
- ✅ `GET /api/v1/profiles/me` - User profile
- ✅ `PATCH /api/v1/profiles/me` - Update profile
- ✅ `POST /api/v1/monitor/runs` - Start monitoring
- ✅ `POST /api/v1/monitor/csv-upload` - CSV processing
- ✅ `GET /api/v1/monitor/runs/{id}/events` - Real-time updates (SSE)

---

## 🚀 **DEPLOYMENT STEPS**

### **1. Verify Backend Health**
```bash
curl https://vizupauditvisibilityaug25-production.up.railway.app/api/v1/health
```
**Expected:** `{"server":"ok","database":"ok"...}`

### **2. Deploy to Vercel**
```bash
# Commit latest changes
git add .
git commit -m "feat: production backend integration complete"
git push origin main

# Deploy will trigger automatically on Vercel
```

### **3. Configure Vercel Environment**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add the environment variables listed above
3. Redeploy if needed

### **4. Test Production Integration**
1. **Health Check**: Visit `your-app.vercel.app` - should load without errors
2. **Auth Flow**: Sign up/in with Supabase - should work normally
3. **Profile Data**: Check profile page - should load from backend API
4. **Monitor Tool**: Start a monitoring run - should connect to backend

---

## 🔧 **INTEGRATION DETAILS**

### **Authentication Flow**
```
User → Supabase Auth → Frontend gets JWT → Backend validates JWT → API Access
```

### **API Client Pattern**
```javascript
// Automatic token injection
const data = await apiClient.get('/profiles/me')
// Token automatically added from Supabase session
```

### **Real-time Updates**
```javascript
// SSE connection for monitoring progress
const { progress, status } = useMonitorProgress(runId)
// Connects to /monitor/runs/{id}/events
```

---

## 🧪 **TESTING CHECKLIST**

### **Pre-Deployment**
- [ ] Backend health endpoint responds
- [ ] CORS origins include Vercel domain
- [ ] Environment variables configured

### **Post-Deployment**
- [ ] App loads without console errors
- [ ] User can sign up/sign in (Supabase)
- [ ] Profile page loads data (Backend API)
- [ ] Monitor tool starts runs (Backend API)
- [ ] Real-time updates work (SSE)

---

## 🚨 **TROUBLESHOOTING**

### **Common Issues**

**1. CORS Errors**
```bash
# Backend team needs to add your domain:
CORS_ORIGIN=https://your-app.vercel.app
```

**2. Auth Token Issues**
```javascript
// Check browser console for token errors
// Verify Supabase configuration is correct
```

**3. API Connection Fails**
```javascript
// Verify REACT_APP_API_URL is set correctly
// Check backend health endpoint
```

### **Debug Commands**
```bash
# Test backend directly
curl -H "Authorization: Bearer YOUR_SUPABASE_TOKEN" \
     https://vizupauditvisibilityaug25-production.up.railway.app/api/v1/profiles/me

# Check environment in deployed app
console.log(process.env.REACT_APP_API_URL)
```

---

## 📋 **FINAL CHECKLIST**

- [ ] Environment variables set in Vercel
- [ ] CORS configured on backend
- [ ] Supabase project properly configured
- [ ] Backend health endpoint accessible
- [ ] All auth flows tested
- [ ] All API endpoints tested
- [ ] Real-time features tested
- [ ] Production domain pointing correctly

---

## 🎯 **SUCCESS CRITERIA**

When everything is working correctly:

1. ✅ **Landing page loads** without errors
2. ✅ **Sign up/sign in works** via Supabase
3. ✅ **Profile page displays** user data from backend
4. ✅ **Monitor tool launches** and connects to backend
5. ✅ **Real-time progress** updates during monitoring
6. ✅ **CSV upload and processing** works end-to-end

**🎉 Your Vizup platform is now live and fully integrated!**

# Quick Start Guide for Social Mentor

## First Time Setup (5 minutes)

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Setup Environment

**Backend - Create .env file:**
```bash
cd backend
cp .env.example .env
```

The default values in .env should work for local development:
- MongoDB: `mongodb://localhost:27017/social-mentor`
- Port: `5000`
- JWT Secret: Update this in production!

### Step 3: Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
# If installed as service, it should be running already
# Or run: mongod
```

**Mac/Linux:**
```bash
# If installed via brew:
brew services start mongodb-community

# Or manually:
mongod --config /usr/local/etc/mongod.conf
```

### Step 4: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running at http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend running at http://localhost:3000

## Testing the Application

### 1. Create a Donor Account
1. Go to http://localhost:3000
2. Click "Register"
3. Fill in details:
   - Name: John Donor
   - Email: donor@test.com
   - Password: password123
   - Role: Donor
   - City: Mumbai
   - Pincode: 400001
4. You'll be redirected to Donor Dashboard

### 2. Create a Donation
1. Click "Create Donation"
2. Fill in donation details:
   - Title: "Food Donation"
   - Category: Food
   - Description: "50 meal packets"
   - Quantity: "50"
   - Pickup Address: "123 Main Street"
   - City: Mumbai
   - Pincode: 400001
3. Click "Create Donation"

### 3. Create a Volunteer Account
1. Logout (top right)
2. Register again:
   - Name: Jane Volunteer
   - Email: volunteer@test.com
   - Password: password123
   - Role: Volunteer
   - City: Mumbai (same as donor!)
   - Pincode: 400001 (same as donor!)
3. You'll see the donation in "Available Tasks"

### 4. Complete the Workflow
1. Click "Accept Task"
2. Go to "My Tasks" tab
3. Click "Mark Picked Up"
4. Click "Mark Delivered"
5. Check your points increased!

### 5. View Leaderboard
1. Navigate to "Leaderboard" from navbar
2. See your volunteer ranking

### 6. Create Admin Account (Optional)

**Option A: Use MongoDB Compass or mongosh**
```javascript
db.users.insertOne({
  name: "Admin User",
  email: "admin@test.com",
  password: "$2a$10$YourHashedPasswordHere", // Hash "password123" using bcrypt
  role: "admin",
  points: 0,
  tasksCompleted: 0,
  donationsCreated: 0,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**Option B: Temporarily modify registration**
- In `backend/controllers/authController.js`, temporarily add "admin" to role options
- Register normally with role "admin"
- Remove the modification after creating admin account

Then login with admin credentials to see the admin dashboard!

## Common Issues & Solutions

### MongoDB Connection Error
**Problem:** `MongooseServerSelectionError`
**Solution:** 
- Make sure MongoDB is running: `mongod`
- Check if port 27017 is available
- Verify MONGO_URI in .env file

### Port Already in Use
**Problem:** `EADDRINUSE: address already in use :::5000`
**Solution:**
- Change PORT in backend/.env to another port (e.g., 5001)
- Or kill the process using the port

### Frontend Can't Connect to Backend
**Problem:** API calls fail with network error
**Solution:**
- Make sure backend is running on port 5000
- Check vite.config.js proxy configuration
- Verify no CORS errors in browser console

### JWT Token Issues
**Problem:** "Not authorized" errors
**Solution:**
- Logout and login again
- Clear localStorage in browser DevTools
- Check JWT_SECRET is set in .env

## Project Structure Quick Reference

```
Backend Endpoints:
- POST /api/auth/register     → Register user
- POST /api/auth/login        → Login user
- POST /api/donations         → Create donation
- GET  /api/volunteers/...    → Volunteer operations
- GET  /api/admin/...         → Admin operations

Frontend Routes:
- /                           → Home page
- /login                      → Login page
- /register                   → Register page
- /donor/dashboard            → Donor dashboard
- /volunteer/dashboard        → Volunteer dashboard
- /admin/dashboard            → Admin dashboard
- /leaderboard                → Public leaderboard
```

## Development Tips

### Backend Development
- Use `npm run dev` (with nodemon) for auto-restart
- Check MongoDB data: Use MongoDB Compass GUI
- Test APIs: Use Postman or Thunder Client
- Logs: Check terminal for errors

### Frontend Development
- Vite HMR updates instantly
- Check browser console for errors
- React DevTools for component inspection
- Network tab to debug API calls

## Next Steps for Hackathon

1. **Enhance UI**: Add more Tailwind styling
2. **Add Features**: 
   - Image uploads
   - Real-time notifications
   - Chat functionality
3. **Improve UX**:
   - Loading states
   - Better error messages
   - Success notifications
4. **Deploy**:
   - Backend → Railway/Render
   - Frontend → Vercel/Netlify
   - Database → MongoDB Atlas

---

Happy Coding! 🚀 Good luck with your hackathon! 🎉

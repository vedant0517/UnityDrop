# Social Mentor - Donation & Volunteer Coordination Platform

A full-stack hackathon MVP for connecting donors with volunteers through location-based donation coordination.

## 🎯 Features

### Core Functionality
- **User Authentication**: JWT-based secure registration and login
- **Role-Based Access**: Three user roles - Donor, Volunteer, and Admin
- **Donation Management**: Create, view, and track donations
- **Location-Based Matching**: Volunteers matched with donations by city/pincode
- **Status Workflow**: CREATED → ASSIGNED → PICKED_UP → DELIVERED
- **Points System**: Volunteers earn points for completed tasks
- **Leaderboard**: Public ranking of top volunteers
- **Admin Dashboard**: Comprehensive view of all users and donations
 - **Live Tracking (Zomato-style)**: Real-time volunteer GPS updates with map view
 - **Impact Statistics**: Live platform stats on the home page
 - **Toast Notifications**: Success/error alerts across key actions
 - **Search & Filters**: Quick filtering of tasks and donations

## 🛠️ Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Context API for state management
 - React Hot Toast for notifications
 - Leaflet + React-Leaflet for live tracking maps

## 📁 Project Structure

```
teamCreators/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── donationController.js
│   │   ├── volunteerController.js
│   │   └── adminController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Donation.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── donationRoutes.js
│   │   ├── volunteerRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
   │   ├── components/
   │   │   ├── Navbar.jsx
   │   │   ├── ProtectedRoute.jsx
   │   │   ├── Toast.jsx
   │   │   └── SearchFilter.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
   │   ├── pages/
   │   │   ├── Home.jsx
   │   │   ├── Login.jsx
   │   │   ├── Register.jsx
   │   │   ├── DonorDashboard.jsx
   │   │   ├── VolunteerDashboard.jsx
   │   │   ├── AdminDashboard.jsx
   │   │   ├── Leaderboard.jsx
   │   │   └── TrackingPage.jsx
   │   ├── services/
   │   │   └── api.js
   │   ├── utils/
   │   │   └── location.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account **or** local MongoDB
- npm or yarn package manager

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` file with your configuration:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/social-mentor
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

> If using Atlas, add your IP to Network Access (or use 0.0.0.0/0 for hackathon only).

5. Make sure MongoDB is running, then start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory (in a new terminal):
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Donations (Donor)
- `POST /api/donations` - Create donation (Donor only)
- `GET /api/donations/my-donations` - Get donor's donations (Donor only)
- `GET /api/donations/:id` - Get single donation
- `PUT /api/donations/:id` - Update donation (Donor only)
- `DELETE /api/donations/:id` - Delete donation (Donor only)

### Volunteers
- `GET /api/volunteers/available-tasks` - Get available donations (Volunteer only)
- `POST /api/volunteers/accept/:donationId` - Accept task (Volunteer only)
- `GET /api/volunteers/my-tasks` - Get assigned tasks (Volunteer only)
- `PUT /api/volunteers/update-status/:donationId` - Update task status (Volunteer only)
- `PUT /api/volunteers/update-location/:donationId` - Update live GPS location (Volunteer only)
- `GET /api/volunteers/track/:donationId` - Tracking info for a task (Volunteer only)
- `GET /api/volunteers/leaderboard` - Get top volunteers (Public)

### Admin
- `GET /api/admin/donations` - Get all donations (Admin only)
- `GET /api/admin/volunteers` - Get all volunteers (Admin only)
- `GET /api/admin/donors` - Get all donors (Admin only)
- `GET /api/admin/stats` - Get platform statistics (Admin only)

## 👥 User Roles

### Donor
- Create donations with details (title, description, category, quantity, location)
- View and manage their donations
- Track donation status and assigned volunteer

### Volunteer
- View available donations in their area
- Accept donation tasks
- Update task status (Picked Up, Delivered)
- Earn points for completed tasks
- View personal task history and points

### Admin
- View all donations, volunteers, and donors
- Monitor platform statistics
- Access comprehensive dashboard

## 🎨 Features Walkthrough

### For Donors:
1. Register as a donor
2. Login to donor dashboard
3. Create a new donation with pickup details
4. Track donation status as volunteers process it
5. View all your donations in one place
6. See live volunteer location on the map once tracking starts

### For Volunteers:
1. Register as a volunteer with your location
2. View available tasks in your area
3. Accept tasks that match your location
4. Update status as you pick up and deliver donations
5. Start live tracking to share your GPS location
6. Earn points and climb the leaderboard

### For Admins:
1. Login with admin credentials
2. View comprehensive statistics
3. Monitor all donations and their status
4. Track volunteer and donor activity

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected routes with role-based access control
- Token expiration (30 days)
- Secure HTTP headers with CORS

## 🎯 Donation Status Flow

1. **CREATED** - Donation is posted by donor
2. **ASSIGNED** - Volunteer accepts the task
3. **PICKED_UP** - Volunteer picks up the donation
4. **DELIVERED** - Volunteer completes delivery (points awarded)

## 💡 Points System

- Volunteers earn points for each completed delivery
- Default: 10 points per completed donation
- Leaderboard ranks volunteers by total points
- Points are awarded when status changes to DELIVERED

## 🐛 Testing

### Create Test Users:

Use these default test accounts (already created in DB):

- **Donor**: donor@test.com / test123
- **Volunteer**: volunteer@test.com / test123

Or register new accounts from the UI.

### Sample Test Flow (Live Tracking):
1. Create donor account and post a donation
2. Create volunteer account in same location
3. Volunteer accepts the task
4. Volunteer updates status to PICKED_UP
5. Volunteer opens Live Tracking and clicks Start Tracking
6. Donor opens My Donations to see live map and location updates
7. Volunteer marks as DELIVERED
8. Check points awarded and leaderboard updated

## 📦 Production Deployment

### Backend:
1. Set up MongoDB Atlas or production MongoDB
2. Update environment variables
3. Deploy to services like Heroku, Railway, or Render
4. Enable HTTPS

### Frontend:
1. Build production bundle: `npm run build`
2. Deploy to Vercel, Netlify, or similar
3. Update API endpoint to production backend URL

## 🤝 Contributing

This is a hackathon MVP. Feel free to fork and enhance with:
- Donation image uploads
- In-app chat between donors and volunteers
- Email/SMS notifications
- Route/ETA display on live maps
- Advanced analytics and reporting

## 📄 License

MIT License - feel free to use for learning and hackathons!

## 👨‍💻 Developer Notes

- Code is intentionally kept simple for hackathon speed
- Focus on core features and clean structure
- Styled with Tailwind for rapid UI development
- All APIs follow RESTful conventions
- Error handling included at controller level

---

**Built for 1-day hackathon MVP** 🚀

Happy Hacking! 🎉
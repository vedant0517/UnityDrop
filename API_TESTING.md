# 🧪 API Testing Guide for Social Mentor

Use this guide with Postman, Thunder Client, or curl to test the APIs.

## Base URL
```
http://localhost:5000/api
```

## 1. Authentication APIs

### Register Donor
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Donor",
  "email": "donor@test.com",
  "password": "password123",
  "role": "donor",
  "phone": "9876543210",
  "city": "Mumbai",
  "pincode": "400001"
}
```

**Expected Response (201):**
```json
{
  "_id": "...",
  "name": "John Donor",
  "email": "donor@test.com",
  "role": "donor",
  "city": "Mumbai",
  "pincode": "400001",
  "points": 0,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Register Volunteer
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Jane Volunteer",
  "email": "volunteer@test.com",
  "password": "password123",
  "role": "volunteer",
  "phone": "9876543211",
  "city": "Mumbai",
  "pincode": "400001"
}
```

### Login
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "donor@test.com",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "_id": "...",
  "name": "John Donor",
  "email": "donor@test.com",
  "role": "donor",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Get Profile
```http
GET http://localhost:5000/api/auth/profile
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 2. Donation APIs (Donor)

### Create Donation
```http
POST http://localhost:5000/api/donations
Authorization: Bearer YOUR_DONOR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Food Donation",
  "description": "50 meal packets ready for distribution",
  "category": "food",
  "quantity": "50",
  "pickupAddress": "123 Main Street, Near City Mall",
  "city": "Mumbai",
  "pincode": "400001"
}
```

**Expected Response (201):**
```json
{
  "_id": "...",
  "donor": {
    "_id": "...",
    "name": "John Donor",
    "email": "donor@test.com"
  },
  "title": "Food Donation",
  "description": "50 meal packets ready for distribution",
  "category": "food",
  "quantity": "50",
  "pickupAddress": "123 Main Street, Near City Mall",
  "city": "Mumbai",
  "pincode": "400001",
  "status": "CREATED",
  "pointsAwarded": 10,
  "createdAt": "2026-02-07T...",
  "updatedAt": "2026-02-07T..."
}
```

### Get My Donations
```http
GET http://localhost:5000/api/donations/my-donations
Authorization: Bearer YOUR_DONOR_JWT_TOKEN
```

### Get Single Donation
```http
GET http://localhost:5000/api/donations/:donationId
Authorization: Bearer YOUR_JWT_TOKEN
```

### Update Donation
```http
PUT http://localhost:5000/api/donations/:donationId
Authorization: Bearer YOUR_DONOR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Updated Food Donation",
  "quantity": "60"
}
```

**Note:** Can only update if status is still "CREATED"

### Delete Donation
```http
DELETE http://localhost:5000/api/donations/:donationId
Authorization: Bearer YOUR_DONOR_JWT_TOKEN
```

**Note:** Can only delete if status is still "CREATED"

---

## 3. Volunteer APIs

### Get Available Tasks
```http
GET http://localhost:5000/api/volunteers/available-tasks
Authorization: Bearer YOUR_VOLUNTEER_JWT_TOKEN
```

**Expected Response (200):**
```json
[
  {
    "_id": "...",
    "title": "Food Donation",
    "description": "50 meal packets ready for distribution",
    "category": "food",
    "quantity": "50",
    "pickupAddress": "123 Main Street, Near City Mall",
    "city": "Mumbai",
    "pincode": "400001",
    "status": "CREATED",
    "pointsAwarded": 10,
    "donor": {
      "_id": "...",
      "name": "John Donor",
      "phone": "9876543210",
      "city": "Mumbai",
      "pincode": "400001"
    },
    "createdAt": "2026-02-07T..."
  }
]
```

### Accept Task
```http
POST http://localhost:5000/api/volunteers/accept/:donationId
Authorization: Bearer YOUR_VOLUNTEER_JWT_TOKEN
```

**Expected Response (200):**
```json
{
  "_id": "...",
  "status": "ASSIGNED",
  "assignedVolunteer": "volunteer_id",
  "assignedAt": "2026-02-07T...",
  ...
}
```

### Get My Tasks
```http
GET http://localhost:5000/api/volunteers/my-tasks
Authorization: Bearer YOUR_VOLUNTEER_JWT_TOKEN
```

### Update Task Status - Mark Picked Up
```http
PUT http://localhost:5000/api/volunteers/update-status/:donationId
Authorization: Bearer YOUR_VOLUNTEER_JWT_TOKEN
Content-Type: application/json

{
  "status": "PICKED_UP"
}
```

### Update Task Status - Mark Delivered
```http
PUT http://localhost:5000/api/volunteers/update-status/:donationId
Authorization: Bearer YOUR_VOLUNTEER_JWT_TOKEN
Content-Type: application/json

{
  "status": "DELIVERED"
}
```

**Expected Response (200):**
```json
{
  "_id": "...",
  "status": "DELIVERED",
  "deliveredAt": "2026-02-07T...",
  ...
}
```

**Note:** Volunteer's points will be automatically updated!

### Get Leaderboard (Public)
```http
GET http://localhost:5000/api/volunteers/leaderboard
```

**Expected Response (200):**
```json
[
  {
    "_id": "...",
    "name": "Jane Volunteer",
    "points": 30,
    "tasksCompleted": 3,
    "city": "Mumbai"
  },
  {
    "_id": "...",
    "name": "Bob Helper",
    "points": 20,
    "tasksCompleted": 2,
    "city": "Delhi"
  }
]
```

---

## 4. Admin APIs

### Get All Donations
```http
GET http://localhost:5000/api/admin/donations
Authorization: Bearer YOUR_ADMIN_JWT_TOKEN
```

### Get All Volunteers
```http
GET http://localhost:5000/api/admin/volunteers
Authorization: Bearer YOUR_ADMIN_JWT_TOKEN
```

### Get All Donors
```http
GET http://localhost:5000/api/admin/donors
Authorization: Bearer YOUR_ADMIN_JWT_TOKEN
```

### Get Platform Statistics
```http
GET http://localhost:5000/api/admin/stats
Authorization: Bearer YOUR_ADMIN_JWT_TOKEN
```

**Expected Response (200):**
```json
{
  "totalDonations": 15,
  "totalVolunteers": 8,
  "totalDonors": 5,
  "donationsByStatus": [
    { "_id": "CREATED", "count": 3 },
    { "_id": "ASSIGNED", "count": 2 },
    { "_id": "PICKED_UP", "count": 1 },
    { "_id": "DELIVERED", "count": 9 }
  ]
}
```

---

## Testing Flow Example

### Complete Workflow Test

**1. Register Donor:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Donor",
    "email": "donor@test.com",
    "password": "password123",
    "role": "donor",
    "city": "Mumbai",
    "pincode": "400001"
  }'
```
Save the token from response.

**2. Create Donation:**
```bash
curl -X POST http://localhost:5000/api/donations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_DONOR_TOKEN" \
  -d '{
    "title": "Food Donation",
    "description": "50 meals",
    "category": "food",
    "quantity": "50",
    "pickupAddress": "123 Main St",
    "city": "Mumbai",
    "pincode": "400001"
  }'
```
Save the donation ID from response.

**3. Register Volunteer:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Volunteer",
    "email": "volunteer@test.com",
    "password": "password123",
    "role": "volunteer",
    "city": "Mumbai",
    "pincode": "400001"
  }'
```
Save the volunteer token.

**4. Get Available Tasks:**
```bash
curl -X GET http://localhost:5000/api/volunteers/available-tasks \
  -H "Authorization: Bearer YOUR_VOLUNTEER_TOKEN"
```

**5. Accept Task:**
```bash
curl -X POST http://localhost:5000/api/volunteers/accept/DONATION_ID \
  -H "Authorization: Bearer YOUR_VOLUNTEER_TOKEN"
```

**6. Mark Picked Up:**
```bash
curl -X PUT http://localhost:5000/api/volunteers/update-status/DONATION_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_VOLUNTEER_TOKEN" \
  -d '{"status": "PICKED_UP"}'
```

**7. Mark Delivered:**
```bash
curl -X PUT http://localhost:5000/api/volunteers/update-status/DONATION_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_VOLUNTEER_TOKEN" \
  -d '{"status": "DELIVERED"}'
```

**8. Check Leaderboard:**
```bash
curl -X GET http://localhost:5000/api/volunteers/leaderboard
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "User already exists"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, no token"
}
```

### 403 Forbidden
```json
{
  "message": "User role 'volunteer' is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "message": "Donation not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Error details..."
}
```

---

## Postman Collection Setup

### Environment Variables
```
base_url: http://localhost:5000
donor_token: (set after login)
volunteer_token: (set after login)
admin_token: (set after login)
donation_id: (set after creating donation)
```

### Auto-save Tokens (Postman)
Add this to Login request's "Tests" tab:
```javascript
const response = pm.response.json();
if (response.token) {
    pm.environment.set("donor_token", response.token);
    // or volunteer_token, admin_token
}
```

---

## Status Transition Rules

```
CREATED ──────► ASSIGNED ──────► PICKED_UP ──────► DELIVERED
                    ▲                  ▲                ▲
                    │                  │                │
                Volunteer          Volunteer        Volunteer
                accepts           picks up         completes
                                                  (Points awarded!)
```

**Invalid Transitions:**
- CREATED → PICKED_UP ❌
- CREATED → DELIVERED ❌
- ASSIGNED → DELIVERED ❌
- Any backwards transition ❌

---

Happy Testing! 🧪✨

# MongoDB Atlas Setup Instructions

## Step-by-Step:

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Create a FREE cluster (M0)
4. Create database user:
   - Username: socialmentor
   - Password: (create a strong password)
5. Add IP: Click "Add Current IP Address" or use 0.0.0.0/0 for all IPs (less secure)
6. Get connection string:
   - Click "Connect" button
   - Choose "Connect your application"
   - Copy the connection string
   - Replace <password> with your database password

## Your connection string will look like:
mongodb+srv://socialmentor:<password>@cluster0.xxxxx.mongodb.net/social-mentor?retryWrites=true&w=majority

## Then update backend/.env:
MONGO_URI=mongodb+srv://socialmentor:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/social-mentor?retryWrites=true&w=majority

## After updating .env, restart the backend server!

# Vercel Deployment Guide for PP_web

## Project Structure

This project uses:
- **Frontend**: Vite + React (in `frontend/` directory)
- **Backend**: Express.js converted to Vercel Serverless Functions (in `api/` directory)
- **Database**: MongoDB

## Deployment Steps

### 1. Prepare Your Repository

Ensure your code is pushed to GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin sayga
```

### 2. Set Up Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository: `Sain-orshikh/PP_web`
4. Select the branch: `sayga`

### 3. Configure Build Settings

Vercel should auto-detect the configuration from `vercel.json`, but verify:

- **Framework Preset**: Other
- **Root Directory**: ./
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/dist`
- **Install Command**: `npm install`

### 4. Set Environment Variables

In Vercel project settings, add these environment variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secure_random_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
```

**Important**: 
- Use your actual MongoDB connection string
- Generate a secure JWT_SECRET (use a random string generator)
- Get Cloudinary credentials from your [Cloudinary Dashboard](https://cloudinary.com/console)
- FRONTEND_URL will be provided by Vercel after first deployment (you can update it later)

### 5. Deploy

Click "Deploy" and Vercel will:
1. Install dependencies
2. Build the frontend
3. Set up serverless functions for the backend
4. Deploy everything

### 6. Update FRONTEND_URL

After first deployment:
1. Copy your deployment URL (e.g., `https://your-app.vercel.app`)
2. Go to Project Settings → Environment Variables
3. Update `FRONTEND_URL` with your actual URL
4. Redeploy

### 7. Update Frontend API URL

If your API URL changes, update the API calls in your frontend code to point to your Vercel deployment URL instead of `localhost:5000`.

## Local Development

To run locally:

### Backend (Development Server)
```bash
# From project root
cd backend
npm install
npm run dev
```

### Frontend
```bash
# From project root
cd frontend
npm install
npm run dev
```

Make sure you have a `.env` file in the project root with all required variables.

## Troubleshooting

### MongoDB Connection Issues
- Ensure your MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or add Vercel's IP ranges
- Check that your connection string is correct

### CORS Errors
- Verify `FRONTEND_URL` matches your actual Vercel deployment URL
- Check that credentials are included in API requests

### Serverless Function Timeouts
- Vercel free tier has 10s timeout for serverless functions
- Optimize database queries if you hit timeouts

### Build Failures
- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility (Vercel uses Node 18 by default)

## Architecture Notes

- **API Routes**: All backend routes are handled through `/api/index.js` which wraps the Express app
- **Database Connection**: Uses connection pooling optimized for serverless
- **Static Files**: Frontend build is served as static files
- **Image Uploads**: Handled by Cloudinary (not local file system)

## Next.js Version

A Next.js version of this project is available in the `nextjs-migration` branch for future migration.

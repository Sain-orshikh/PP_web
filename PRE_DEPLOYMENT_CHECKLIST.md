# Pre-Deployment Checklist

## Files Created/Modified for Vercel Deployment

### New Files
- ✅ `api/index.js` - Main serverless function handler wrapping Express app
- ✅ `vercel.json` - Vercel configuration for builds and routes
- ✅ `.vercelignore` - Files to exclude from deployment
- ✅ `.env.example` - Environment variables template
- ✅ `DEPLOYMENT.md` - Comprehensive deployment guide

### Modified Files
- ✅ `backend/db/connectMongoDB.js` - Added connection caching for serverless
- ✅ `package.json` - Added build and start scripts

## Pre-Deployment Tests

### Local Tests (Optional but Recommended)

1. **Test Frontend Build**
   ```bash
   cd frontend
   npm install
   npm run build
   ```
   Expected: Build completes successfully, creates `dist/` folder

2. **Test Backend Routes**
   ```bash
   # Ensure .env exists with MongoDB URI and other vars
   node backend/server.js
   ```
   Expected: Server starts, MongoDB connects

### Environment Variables Checklist

Before deploying to Vercel, ensure you have:
- [ ] MongoDB connection string (from MongoDB Atlas)
- [ ] JWT_SECRET (generate a secure random string)
- [ ] Cloudinary credentials (cloud_name, api_key, api_secret)
- [ ] Frontend URL (can be set after first deployment)

### Vercel Configuration Checklist

- [ ] Project connected to GitHub repository
- [ ] Branch selected: `sayga` (or your deployment branch)
- [ ] All environment variables added in Vercel dashboard
- [ ] Build settings configured (should auto-detect from vercel.json)

## Deployment Process

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Configure for Vercel serverless deployment"
   git push origin sayga
   ```

2. **Deploy on Vercel**
   - Go to vercel.com/dashboard
   - Import PP_web repository
   - Add environment variables
   - Deploy

3. **Post-Deployment**
   - [ ] Test API endpoints: `https://your-app.vercel.app/api/health`
   - [ ] Test frontend loads correctly
   - [ ] Test authentication flow
   - [ ] Test blog creation/viewing
   - [ ] Update FRONTEND_URL environment variable with actual URL
   - [ ] Redeploy after updating FRONTEND_URL

## Known Considerations

### Database
- MongoDB Atlas IP whitelist must allow Vercel connections (0.0.0.0/0 or Vercel IP ranges)
- Connection pooling is optimized for serverless (maxPoolSize: 10)

### File Uploads
- Using Cloudinary for image uploads (serverless doesn't support local file storage)
- Ensure Cloudinary credentials are correct

### CORS
- API handler includes CORS configuration
- Update FRONTEND_URL after first deployment for proper CORS

### Serverless Limitations
- Function timeout: 10 seconds (free tier), 60 seconds (pro)
- Function size: 50MB
- No persistent file system

## Troubleshooting

### Build Fails
- Check that all dependencies are in package.json
- Verify build command works locally
- Check build logs in Vercel dashboard

### API Errors
- Verify environment variables are set correctly
- Check MongoDB connection string and IP whitelist
- Review function logs in Vercel dashboard

### CORS Errors
- Ensure FRONTEND_URL matches deployment URL
- Check that credentials are included in fetch requests

## Rollback Plan

If deployment fails, you can:
1. Roll back to previous deployment in Vercel dashboard
2. Original code is preserved in Git
3. Local development environment unchanged

## Next Steps After Successful Deployment

1. Test all features thoroughly
2. Monitor serverless function performance
3. Consider migrating to Next.js version (nextjs-migration branch) for better serverless optimization
4. Set up custom domain (optional)
5. Configure analytics and monitoring

---

**Ready to deploy!** Follow the steps in DEPLOYMENT.md for detailed instructions.

# FastAPI Backend Deployment Guide

## Option 1: Deploy to Render (Recommended - Free Tier Available)

1. **Sign up at [render.com](https://render.com)**

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository (or upload files)
   - Select the `backend` directory as the root

3. **Configure the service**:
   - **Name**: `diabetes-prediction-api`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn fast_api:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Free

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete (3-5 minutes)
   - Your API URL will be: `https://diabetes-prediction-api.onrender.com`

5. **Update Frontend**
   - Copy your Render URL
   - Update `BASE_URL` in `src/pages/Dashboard.tsx`

---

## Option 2: Deploy to Railway

1. **Sign up at [railway.app](https://railway.app)**

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo" (or upload files)
   - Select your repository

3. **Configure**:
   - Railway auto-detects Python
   - Set root directory to `backend`
   - Add environment variable: `PORT=8000`

4. **Deploy**
   - Railway will generate a URL like: `https://your-app.railway.app`
   - Copy this URL for your frontend

---

## Option 3: Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login and Create App**
   ```bash
   cd backend
   heroku login
   heroku create diabetes-prediction-api
   ```

3. **Deploy**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a diabetes-prediction-api
   git push heroku main
   ```

4. **Your API URL**: `https://diabetes-prediction-api.herokuapp.com`

---

## Option 4: Deploy to Google Cloud Run

1. **Install Google Cloud CLI**
   - Follow: https://cloud.google.com/sdk/docs/install

2. **Create Dockerfile** (already provided below)

3. **Deploy**
   ```bash
   cd backend
   gcloud run deploy diabetes-api \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

---

## After Deployment

1. **Test your API**:
   ```bash
   curl https://your-api-url.com/health
   ```

2. **Update Frontend**:
   - In Lovable, go to `src/pages/Dashboard.tsx`
   - Change `BASE_URL` from `http://127.0.0.1:8000` to your deployed URL

3. **Redeploy Frontend**:
   - Click "Publish" in Lovable
   - Your app will now use the deployed backend

---

## Important Notes

⚠️ **Model File**: Make sure `diabetes_model.pkl` is included in your deployment. If it's too large for Git:
- Upload it manually to your deployment platform
- Or train the model in the cloud after deployment

🔒 **CORS**: The backend is configured to allow all origins. For production, update CORS settings in `fast_api.py`:
```python
allow_origins=["https://your-frontend-domain.lovable.app"]
```

📊 **Free Tier Limits**:
- **Render**: Goes to sleep after 15 min of inactivity (first request may be slow)
- **Railway**: $5/month free credit
- **Heroku**: Requires credit card, no free tier anymore

---

## Recommended: Render
✅ Easy setup
✅ Free tier available
✅ Auto-deploys from GitHub
✅ Good for ML models

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
from typing import List
import uvicorn

# Initialize FastAPI
app = FastAPI(title="Diabetes Prediction API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
try:
    model = joblib.load("diabetes_model.pkl")
    print("✓ Model loaded successfully")
except Exception as e:
    print(f"✗ Error loading model: {e}")
    model = None

# Request model
class PredictionRequest(BaseModel):
    features: List[float]
    
    class Config:
        schema_extra = {
            "example": {
                "features": [6, 148, 72, 35, 0, 33.6, 0.627, 50]
            }
        }

# Response model
class PredictionResponse(BaseModel):
    prediction: int
    probability: float
    risk_level: str

@app.get("/")
async def root():
    return {
        "message": "Diabetes Prediction API",
        "status": "running",
        "model_loaded": model is not None
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """
    Predict diabetes risk based on input features
    
    Features (in order):
    1. Pregnancies: Number of times pregnant
    2. Glucose: Plasma glucose concentration
    3. BloodPressure: Diastolic blood pressure (mm Hg)
    4. SkinThickness: Triceps skin fold thickness (mm)
    5. Insulin: 2-Hour serum insulin (mu U/ml)
    6. BMI: Body mass index (weight in kg/(height in m)^2)
    7. DiabetesPedigreeFunction: Diabetes pedigree function
    8. Age: Age in years
    """
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        # Validate input
        if len(request.features) != 8:
            raise HTTPException(
                status_code=400, 
                detail="Expected 8 features, got {}".format(len(request.features))
            )
        
        # Prepare features
        features = np.array(request.features).reshape(1, -1)
        
        # Make prediction
        prediction = int(model.predict(features)[0])
        probability = float(model.predict_proba(features)[0][1])
        
        # Determine risk level
        if probability < 0.3:
            risk_level = "Low"
        elif probability < 0.6:
            risk_level = "Medium"
        else:
            risk_level = "High"
        
        return PredictionResponse(
            prediction=prediction,
            probability=round(probability, 3),
            risk_level=risk_level
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": model is not None
    }

if __name__ == "__main__":
    print("\n🚀 Starting Diabetes Prediction API...")
    print("📊 Model:", "Loaded ✓" if model else "Not loaded ✗")
    print("🌐 API will be available at: http://127.0.0.1:8000")
    print("📖 API docs: http://127.0.0.1:8000/docs")
    print("\nPress CTRL+C to stop the server\n")
    
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)

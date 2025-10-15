from fastapi import FastAPI, Request
import joblib
import numpy as np

app = FastAPI()
model = joblib.load("diabetes_model.pkl")

@app.post("/predict")
async def predict(request: Request):
    data = await request.json()
    features = np.array(data["features"]).reshape(1, -1)
    prediction = model.predict(features)[0]
    return {"prediction": int(prediction)}

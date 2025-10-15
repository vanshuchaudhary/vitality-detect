# Diabetes Prediction API

## Setup and Run Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Train the Model (if not already done)

If `diabetes_model.pkl` doesn't exist, run the Jupyter notebook to train it:

```bash
jupyter notebook "diabetes dataset.ipynb"
```

Or train it directly with Python (extract the code from the notebook).

### 3. Start the API Server

```bash
python fast_api.py
```

The API will be available at:
- **API Endpoint**: http://127.0.0.1:8000
- **API Documentation**: http://127.0.0.1:8000/docs
- **Health Check**: http://127.0.0.1:8000/health

### 4. Test the API

#### Using the Browser
Open http://127.0.0.1:8000/docs and use the interactive Swagger UI.

#### Using curl
```bash
curl -X POST "http://127.0.0.1:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "features": [6, 148, 72, 35, 0, 33.6, 0.627, 50]
  }'
```

#### Using Python
```python
import requests

response = requests.post(
    "http://127.0.0.1:8000/predict",
    json={"features": [6, 148, 72, 35, 0, 33.6, 0.627, 50]}
)
print(response.json())
```

## Input Features

The model expects 8 features in this order:

1. **Pregnancies**: Number of times pregnant
2. **Glucose**: Plasma glucose concentration (mg/dL)
3. **BloodPressure**: Diastolic blood pressure (mm Hg)
4. **SkinThickness**: Triceps skin fold thickness (mm)
5. **Insulin**: 2-Hour serum insulin (mu U/ml)
6. **BMI**: Body mass index (weight in kg/(height in m)^2)
7. **DiabetesPedigreeFunction**: Diabetes pedigree function
8. **Age**: Age in years

## Example Input

```json
{
  "features": [5, 120, 70, 20, 79, 25.0, 0.5, 33]
}
```

## Example Response

```json
{
  "prediction": 0,
  "probability": 0.234,
  "risk_level": "Low"
}
```

- **prediction**: 0 (No diabetes) or 1 (Diabetes)
- **probability**: Probability of having diabetes (0-1)
- **risk_level**: "Low", "Medium", or "High"

## Troubleshooting

### Model not loading
Make sure `diabetes_model.pkl` exists in the `backend` folder. Run the Jupyter notebook to generate it.

### Port already in use
Change the port in `fast_api.py`:
```python
uvicorn.run(app, host="127.0.0.1", port=8001, reload=True)
```

### CORS errors
The API is configured to allow all origins. If you still face issues, check your browser console.

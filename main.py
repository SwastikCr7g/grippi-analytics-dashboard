from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from decimal import Decimal

# --- 1. CONFIGURATION ---

# Initialize FastAPI App
app = FastAPI(title="Grippi Campaign Analytics API")

# Configure CORS (Crucial for frontend/backend communication)
# Allow the Next.js frontend to access this API from any origin during development
origins = [
    "*",  # Replace with the actual Vercel domain later, but use "*" for local development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, etc.)
    allow_headers=["*"], # Allow all headers
)

# --- 2. DATA MODEL (Pydantic Schema) ---

# Defines the structure of the data returned by the API
class Campaign(BaseModel):
    id: int
    name: str
    status: str  # Expected to be 'Active' or 'Paused'
    clicks: int
    cost: Decimal # Use Decimal for precise currency handling
    impressions: int

    class Config:
        # Allows fields that are not standard types (like Decimal) to be returned
        from_attributes = True


# --- 3. MOCK DATABASE (Matching SQL script) ---

# This list fulfills the assignment requirement for a mock API with 10 fake campaigns.
MOCK_CAMPAIGNS = [
    {"id": 1, "name": "Summer Sale", "status": "Active", "clicks": 150, "cost": Decimal("45.99"), "impressions": 1000},
    {"id": 2, "name": "Black Friday", "status": "Paused", "clicks": 320, "cost": Decimal("89.50"), "impressions": 2500},
    {"id": 3, "name": "Q4 Holiday Push", "status": "Active", "clicks": 450, "cost": Decimal("120.75"), "impressions": 4800},
    {"id": 4, "name": "Spring Collection Launch", "status": "Active", "clicks": 90, "cost": Decimal("22.00"), "impressions": 600},
    {"id": 5, "name": "Back to School", "status": "Paused", "clicks": 210, "cost": Decimal("55.30"), "impressions": 1500},
    {"id": 6, "name": "New User Discount", "status": "Active", "clicks": 700, "cost": Decimal("210.45"), "impressions": 8000},
    {"id": 7, "name": "Local Awareness Ad", "status": "Paused", "clicks": 15, "cost": Decimal("5.00"), "impressions": 200},
    {"id": 8, "name": "Geo-Targeting Test", "status": "Active", "clicks": 35, "cost": Decimal("12.99"), "impressions": 450},
    {"id": 9, "name": "Retargeting Campaign A", "status": "Paused", "clicks": 180, "cost": Decimal("40.00"), "impressions": 1100},
    {"id": 10, "name": "Video Ad Series", "status": "Active", "clicks": 550, "cost": Decimal("155.80"), "impressions": 6200},
]


# --- 4. ENDPOINT DEFINITION ---
# Optional: Add a root endpoint for health check
@app.get("/")
def read_root():
    return {"message": "Welcome to the Grippi Campaign Analytics API. Access data at /campaigns."}


# GET /campaigns endpoint

# ... rest of the code
# GET /campaigns endpoint
@app.get("/campaigns", response_model=List[Campaign])
def get_campaigns(status: str = None):
    """
    Returns a list of all campaigns.
    Supports an optional 'status' query parameter to filter campaigns (Active/Paused).
    """
    if status:
        # Filtering logic for the assignment requirement
        valid_status = status.capitalize()
        if valid_status not in ["Active", "Paused"]:
             raise HTTPException(status_code=400, detail="Invalid status filter. Must be 'Active' or 'Paused'.")

        filtered_campaigns = [
            c for c in MOCK_CAMPAIGNS if c["status"] == valid_status
        ]
        return filtered_campaigns
    
    # Return all campaigns if no status filter is provided
    return MOCK_CAMPAIGNS
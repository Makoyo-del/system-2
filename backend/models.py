# backend/models.py
from pydantic import BaseModel
from typing import List, Optional

class SeatHoldRequest(BaseModel):
    show_id: int
    seat_ids: List[int]
    user_id: Optional[int] = None

class ConfirmHoldRequest(BaseModel):
    reservation_id: int

class PaymentRequest(BaseModel):
    reservation_id: int
    amount: float
    method: str

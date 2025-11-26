from fastapi import APIRouter
from api_hold import hold_seats, confirm_hold  # your existing hold/confirm functions
from email_utils import send_email

router = APIRouter()

@router.post("/hold")
def api_hold(payload: dict):
    res = hold_seats(payload["show_id"], payload["seat_ids"], payload["user_id"])
    # Send email confirmation
    send_email(
        to_email=payload.get("user_email", "user@example.com"),  # pass email in payload
        subject="Seat Hold Confirmation",
        body=f"Your seats {payload['seat_ids']} have been held successfully. Reservation ID: {res['reservation_id']}"
    )
    return res

@router.post("/confirm")
def api_confirm(payload: dict):
    res = confirm_hold(payload["reservation_id"])
    send_email(
        to_email=payload.get("user_email", "user@example.com"),
        subject="Seat Reservation Confirmed",
        body=f"Your reservation {payload['reservation_id']} has been confirmed. Enjoy the show!"
    )
    return res

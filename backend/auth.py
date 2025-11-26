from supabase import create_client
from fastapi import HTTPException

SUPABASE_URL = "YOUR_SUPABASE_URL"
SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY"

supabase = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

def signup(email: str, password: str):
    res = supabase.auth.sign_up({"email": email, "password": password})
    if res.get("error"):
        raise HTTPException(status_code=400, detail=res["error"]["message"])
    return {"user_id": res["user"]["id"]}

def login(email: str, password: str):
    res = supabase.auth.sign_in({"email": email, "password": password})
    if res.get("error"):
        raise HTTPException(status_code=400, detail=res["error"]["message"])
    return {"user_id": res["user"]["id"]}

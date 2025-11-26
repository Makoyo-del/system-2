from supabase import create_client

SUPABASE_URL =https://zyeztzyzxjgwpdzovtfp.supabase.co
SUPABASE_SERVICE_KEY =eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5ZXp0enl6eGpnd3Bkem92dGZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDEyMTY1MCwiZXhwIjoyMDc5Njk3NjUwfQ.vIMd_WMFup7XzQ7QLRALmc1ZeNE6nlYT7TIwAdT39eM
supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

def get_all_reservations():
    res = supabase.table("reservations").select("*").execute()
    return res.data

def get_seats_by_show(show_id: int):
    res = supabase.table("seat_inventory").select("*").eq("show_id", show_id).execute()
    return res.data

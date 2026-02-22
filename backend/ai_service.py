from google import genai
import os
from dotenv import load_dotenv

# This loads the hidden variables from your .env file
load_dotenv()

# This grabs the key securely so it isn't visible in the code
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

def generate_medical_summary(extracted_text: str) -> str:
    prompt = f"""
You are a medical AI assistant.

Your task:
Summarize the following medical report clearly and safely.

Rules:
- Do NOT hallucinate.
- Only use information present in the report.
- Clearly structure into:
    1. Patient Details
    2. Key Medical Findings
    3. Observations
    4. Missing or Unclear Information
- If something is not mentioned, say "Not specified in report."
- Keep tone factual and safe.

Medical Report:
{extracted_text}
"""
    response = client.models.generate_content(
        model="gemini-2.0-flash-lite",
        contents=prompt
    )
    return response.text
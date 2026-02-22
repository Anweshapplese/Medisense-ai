from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import pdfplumber
from io import BytesIO
import httpx

app = FastAPI(title="Medisense AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")


class ExplainRequest(BaseModel):
    text: str
    level: str = "basic"


@app.get("/")
def read_root():
    return {"message": "Medisense Backend is Running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/analyze")
async def analyze_report(file: UploadFile = File(...)):
    contents = await file.read()
    extracted_text = ""

    if file.filename.endswith(".pdf"):
        try:
            with pdfplumber.open(BytesIO(contents)) as pdf:
                for page in pdf.pages:
                    text = page.extract_text()
                    if text:
                        extracted_text += text + "\n"
        except Exception as e:
            return {"error": f"Failed to extract PDF text: {str(e)}"}
    else:
        return {"error": "Only PDF files are supported for now."}

    if not extracted_text.strip():
        return {"error": "No readable text found in the PDF."}

    return {
        "filename": file.filename,
        "total_characters": len(extracted_text),
        "extracted_text": extracted_text,
        "ai_summary": extracted_text[:2000],
    }


@app.post("/explain")
async def explain_report(body: ExplainRequest):
    if not GROQ_API_KEY:
        return {"error": "GROQ_API_KEY not set. Run: $env:GROQ_API_KEY='your_key' in PowerShell before starting the backend."}

    level_prompts = {
        "basic": (
            "You are a friendly doctor explaining a medical report to a patient with no medical background. "
            "Use very simple, everyday language. Avoid all jargon. Break the explanation into short sections:\n"
            "1. What this report is about\n2. Key findings in plain English\n"
            "3. What this means for the patient\n4. Simple next steps\nBe warm, reassuring, and concise."
        ),
        "intermediate": (
            "You are a medical professional explaining a report to an educated patient with some health literacy. "
            "Use clear language and briefly explain any medical terms. Structure your response with:\n"
            "1. Report Overview\n2. Key Findings & What They Mean\n"
            "3. Potential Concerns (if any)\n4. Recommended Next Steps"
        ),
        "doctor": (
            "You are a specialist reviewing a medical report for a fellow clinician. "
            "Use precise medical terminology. Structure your response with:\n"
            "1. Clinical Summary\n2. Significant Findings & Values\n"
            "3. Differential Considerations\n4. Recommended Workup / Management"
        ),
    }

    system_prompt = level_prompts.get(body.level, level_prompts["basic"])
    user_message = f"Here is the medical report text:\n\n{body.text[:4000]}\n\nPlease explain this report."

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {GROQ_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "llama-3.3-70b-versatile",
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_message},
                    ],
                    "max_tokens": 1000,
                    "temperature": 0.7,
                },
                timeout=30.0,
            )
        data = response.json()
        if "error" in data:
            return {"error": data["error"].get("message", "Groq API error")}
        explanation = data["choices"][0]["message"]["content"]
        return {"explanation": explanation}
    except Exception as e:
        return {"error": f"Request failed: {str(e)}"}

from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from agent import get_project_analysis_stream

app = FastAPI(title="Project Analyst API")

class ProjectRequest(BaseModel):
    description: str

@app.get("/")
async def root():
    return {"message": "Welcome to the Project Analyst API. Use POST /analyze to stream project data."}

@app.post("/analyze")
async def analyze_project(request: ProjectRequest):
    """
    Streams a Markdown analysis of the project with added metrics.
    """
    return StreamingResponse(
        get_project_analysis_stream(request.description),
        media_type="text/markdown"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

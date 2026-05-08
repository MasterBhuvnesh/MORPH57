import os
import sys
import asyncio
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage

# Load environment variables from .env file
load_dotenv()

# Ensure you have GOOGLE_API_KEY set in your environment
if "GOOGLE_API_KEY" not in os.environ:
    print("Error: GOOGLE_API_KEY environment variable not set.")
    sys.exit(1)

async def get_project_analysis_stream(project_description: str):
    # Initialize Gemini model
    model = ChatGoogleGenerativeAI(
        model="gemini-flash-latest",
        streaming=True,
        temperature=0.7
    )

    # System prompt to enforce constraints
    system_prompt = (
        "You are a project analyst. When the user provides a project description, "
        "expand on it by adding specific numeric data, statistics, or metrics (e.g., projected growth, "
        "user reach, technical benchmarks, or cost estimates). "
        "Format the output strictly in Markdown. "
        "DO NOT include any conversational filler like 'Here is the response' or 'Sure, I can help'. "
        "Start directly with the content."
    )

    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=project_description)
    ]

    # Yield chunks from the stream
    async for chunk in model.astream(messages):
        content = chunk.content
        if not content:
            continue
            
        if isinstance(content, str):
            yield content
        elif isinstance(content, list):
            # Join list elements, ensuring they are strings
            yield "".join([str(item) for item in content])
        else:
            yield str(content)

async def run_cli_agent(project_description: str):
    print("\n--- Project Analysis ---\n")
    async for chunk in get_project_analysis_stream(project_description):
        print(chunk, end="", flush=True)
    print("\n\n--- End of Analysis ---")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        user_input = input("Enter your project description: ")
    else:
        user_input = " ".join(sys.argv[1:])
    
    asyncio.run(run_cli_agent(user_input))

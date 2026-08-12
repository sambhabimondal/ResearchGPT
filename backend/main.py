from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
import io
import os

from dotenv import load_dotenv
from openai import OpenAI

from rag import add_document, search_documents


# Load environment variables
load_dotenv()


# Connect to OpenRouter
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)


# Create FastAPI application
app = FastAPI(title="ResearchGPT API")


# Allow our React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "ResearchGPT backend is running!"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    contents = await file.read()

    reader = PdfReader(
        io.BytesIO(contents)
    )

    text = ""

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    chunk_count = add_document(
        text,
        file.filename
    )

    return {
        "filename": file.filename,
        "pages": len(reader.pages),
        "characters": len(text),
        "chunks": chunk_count,
        "message": "PDF processed and stored in ChromaDB!"
    }


@app.get("/search")
def search(query: str):

    results = search_documents(
        query
    )

    documents = results["documents"][0]

    return {
        "query": query,
        "results": documents
    }


@app.get("/ask")
def ask_question(query: str):

    # Retrieve relevant chunks from ChromaDB
    results = search_documents(
        query,
        n_results=5
    )

    documents = results["documents"][0]

    # Combine retrieved chunks into context
    context = "\n\n".join(documents)

    # Prompt for the LLM
    prompt = f"""
You are ResearchGPT, an AI research assistant.

Answer the user's question using ONLY the information
provided in the research paper context below.

If the answer cannot be found in the context, say:

"I couldn't find that information in the uploaded paper."

Research paper context:

{context}

User question:

{query}

Give a clear, concise answer based on the research paper.
"""


    # Send request to OpenRouter
    response = client.chat.completions.create(
        model="openrouter/free",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )


    # Get the generated answer
    answer = response.choices[0].message.content


    return {
        "question": query,
        "answer": answer,
        "sources": documents
    }
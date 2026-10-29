"""
Campus Interview Simulator - Backend API

A small FastAPI service that reads interview questions from a local CSV
file and exposes them to the existing Next.js frontend as JSON.

No database, no auth, no AI calls yet - just CSV in, JSON out.
"""

from pathlib import Path
from typing import Optional

import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

# backend/app/main.py -> backend/data/questions.csv
CSV_PATH = Path(__file__).resolve().parent.parent / "data" / "questions.csv"

# These must match the frontend's InterviewQuestion type field-for-field.
REQUIRED_COLUMNS = [
    "question_id",
    "company",
    "role",
    "topic",
    "difficulty",
    "question_type",
    "question_text",
    "sample_answer",
    "source_note",
]

FRONTEND_ORIGIN = "http://localhost:3000"

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------

app = FastAPI(
    title="Campus Interview Simulator API",
    description="Serves interview questions from a CSV file to the frontend.",
    version="0.1.0",
)

# Allow the Next.js dev server to call this API from the browser.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# CSV loading + validation
# ---------------------------------------------------------------------------

def load_questions() -> pd.DataFrame:
    """
    Read the CSV from disk and validate it.

    Re-reads the file on every call instead of caching in memory. That
    keeps this beginner-friendly (edit the CSV, refresh, see changes)
    since there's no database yet. If the dataset grows large, swap this
    for a cached/startup load.
    """
    if not CSV_PATH.exists():
        raise HTTPException(
            status_code=500,
            detail=(
                f"CSV file not found at '{CSV_PATH}'. "
                "Place your 100-row questions.csv at backend/data/questions.csv."
            ),
        )

    try:
        df = pd.read_csv(CSV_PATH)
    except Exception as exc:  # pragma: no cover - defensive
        raise HTTPException(
            status_code=500, detail=f"Failed to read CSV file: {exc}"
        )

    missing_columns = [col for col in REQUIRED_COLUMNS if col not in df.columns]
    if missing_columns:
        raise HTTPException(
            status_code=500,
            detail=(
                "CSV is missing required column(s): "
                f"{', '.join(missing_columns)}. "
                f"Expected columns: {', '.join(REQUIRED_COLUMNS)}"
            ),
        )

    # Keep only the expected columns, in a consistent order, and make sure
    # every value is a plain string (avoids NaN/float leaking into JSON).
    df = df[REQUIRED_COLUMNS].fillna("")
    df = df.astype(str)

    return df


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def apply_filters(
    df: pd.DataFrame,
    company: Optional[str],
    role: Optional[str],
    topic: Optional[str],
    difficulty: Optional[str],
    question_type: Optional[str],
    search: Optional[str],
) -> pd.DataFrame:
    """Apply optional query-param filters to the questions DataFrame."""

    if company:
        df = df[df["company"].str.lower() == company.lower()]
    if role:
        df = df[df["role"].str.lower() == role.lower()]
    if topic:
        df = df[df["topic"].str.lower() == topic.lower()]
    if difficulty:
        df = df[df["difficulty"].str.lower() == difficulty.lower()]
    if question_type:
        df = df[df["question_type"].str.lower() == question_type.lower()]

    if search:
        query = search.lower()
        haystack = (
            df["question_text"].str.lower()
            + " "
            + df["company"].str.lower()
            + " "
            + df["role"].str.lower()
            + " "
            + df["topic"].str.lower()
        )
        df = df[haystack.str.contains(query, na=False)]

    return df


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/")
def read_root():
    """Simple health check / welcome route."""
    return {
        "message": "Campus Interview Simulator API is running.",
        "endpoints": ["/questions", "/questions/{question_id}", "/filters"],
    }


@app.get("/questions")
def get_questions(
    company: Optional[str] = None,
    role: Optional[str] = None,
    topic: Optional[str] = None,
    difficulty: Optional[str] = None,
    question_type: Optional[str] = None,
    search: Optional[str] = None,
):
    """
    Return interview questions, optionally filtered.

    All query params are optional and combine with AND logic, matching
    the filter behaviour already built into the frontend dashboard.
    """
    df = load_questions()
    df = apply_filters(df, company, role, topic, difficulty, question_type, search)

    questions = df.to_dict(orient="records")
    return {"count": len(questions), "questions": questions}


@app.get("/questions/{question_id}")
def get_question_by_id(question_id: str):
    """Return a single question by its question_id, or 404 if not found."""
    df = load_questions()
    match = df[df["question_id"].str.lower() == question_id.lower()]

    if match.empty:
        raise HTTPException(
            status_code=404,
            detail=f"No question found with question_id '{question_id}'.",
        )

    return match.to_dict(orient="records")[0]


@app.get("/filters")
def get_filters():
    """
    Return the distinct values available for each filterable field.

    Mirrors the company/role/topic/difficulty/questionTypes lists the
    frontend currently derives from its mock data, so the dashboard's
    filter dropdowns can be powered by the real dataset instead.
    """
    df = load_questions()

    return {
        "company": sorted(df["company"].unique().tolist()),
        "role": sorted(df["role"].unique().tolist()),
        "topic": sorted(df["topic"].unique().tolist()),
        "difficulty": sorted(df["difficulty"].unique().tolist()),
        "question_type": sorted(df["question_type"].unique().tolist()),
    }

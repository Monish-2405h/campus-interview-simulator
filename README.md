# Campus Interview Simulator (Frontend MVP)

A frontend-only Next.js app for browsing campus interview questions,
practicing an answer, and comparing it to a sample answer. No backend,
auth, database, or real AI calls yet — everything runs on local mock data.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
app/
  page.tsx                 landing page
  questions/page.tsx        question dashboard (search + filters)
  questions/[id]/page.tsx   question detail / practice page
  layout.tsx, globals.css   root layout, fonts, base styles
components/                 all reusable UI components
data/mockQuestions.ts       local mock dataset (stand-in for the CSV)
types/question.ts           TypeScript schema for the dataset
lib/utils.ts                filtering, badge styling, mock feedback logic
```

## Data model

`types/question.ts` defines `InterviewQuestion`, matching the CSV schema
field-for-field:

```
question_id, company, role, topic, difficulty, question_type,
question_text, sample_answer, source_note
```

## Swapping in the real 100-row CSV

1. Convert the CSV to JSON (or a `.ts` array) with the exact same field
   names — no renaming needed.
2. Replace the contents of `data/mockQuestions.ts` with the generated
   data, keeping the exported `mockQuestions` array plus the derived
   `companies` / `roles` / `topics` / `questionTypes` lists (these are
   computed automatically from the array, so they update on their own).
3. Everything else — filters, cards, table, detail page — reads from
   this file and needs no changes.

## Backend (FastAPI)

A separate FastAPI backend lives in `backend/`. It reads the same
100-row CSV schema from `backend/data/questions.csv` and serves it as
JSON. It is **not yet wired into the frontend** — the dashboard still
reads from `data/mockQuestions.ts`. The two run side by side until
they're connected.

### Run the backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Then open http://localhost:8000/docs for the interactive API explorer.

### Endpoints

| Method | Path | Notes |
|---|---|---|
| GET | `/` | health check |
| GET | `/questions` | optional query params: `company`, `role`, `topic`, `difficulty`, `question_type`, `search` |
| GET | `/questions/{question_id}` | 404 if not found |
| GET | `/filters` | distinct values for each filterable field |

### Run both at once

Terminal 1:
```bash
cd backend && uvicorn app.main:app --reload --port 8000
```
Terminal 2 (project root):
```bash
npm run dev
```

### Known data mismatch to resolve before connecting them

The real CSV in `backend/data/questions.csv` uses different casing and
categories than the frontend currently assumes:

| Field | Frontend (`types/question.ts`, mock data) | Real CSV |
|---|---|---|
| `difficulty` | `Easy` / `Medium` / `Hard` | `easy` / `medium` / `hard` |
| `question_type` | `Technical`, `Behavioral`, `System Design`, `HR`, `Aptitude`, `Case Study` | `technical`, `behavioral`, `coding`, `resume`, `HR` |

`lib/utils.ts` (badge colors) and `types/question.ts` (the `Difficulty`
/ `QuestionType` unions) key off the capitalized frontend values, so
they'll need a small update before the dashboard is pointed at the
live API — otherwise some badges fall back to a default gray color and
case-sensitive comparisons may miss matches.

## Where the AI integration would plug in later

- `lib/utils.ts` → `generateMockFeedback()` is where a real Claude API
  scoring call would replace the current mock scoring logic.
- Answer text captured in `components/QuestionPracticeClient.tsx` is
  currently kept in local React state only; this is the natural place
  to POST it to the FastAPI backend once the two are connected.
- No persistence exists yet (refreshing a practice page clears the
  answer) — intentional for this MVP stage.

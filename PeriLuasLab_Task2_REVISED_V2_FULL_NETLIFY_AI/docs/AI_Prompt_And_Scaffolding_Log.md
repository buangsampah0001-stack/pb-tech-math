# PeriLuas Lab — AI Prompt and Scaffolding Log

**Purpose:** document transparent, academically responsible AI-assisted generation of misconception-specific learning aids for Year 4 pupils. This file documents the **pre-written, offline hints** and the **optional server-side Live AI Tutor** introduced in version 2.0. The live feature uses the Gemini API via Netlify Functions only after configuration; it is not a direct browser API-key implementation.

## Development master prompt

> Act as a Malaysian Year 4 mathematics teacher and a learning support designer. Prepare three levels of hints for a pupil who has a specified misconception about the perimeter and area of squares and rectangles. Level 1 asks a guiding question without revealing the answer. Level 2 directs the pupil to manipulate a visual representation or count unit squares. Level 3 contains a short fully checked numerical example. Use clear English appropriate for ages 10–11, preserve distinct length and square units, and ask a follow-up reflection question. Do not treat a single wrong answer as proof of a diagnosed misconception. Align to KSSR Year 4 Content Standard 6.3, with focus on Learning Standards 6.3.1 and 6.3.2.

## Misconception 1 — perimeter confused with area

**Scenario:** pupil answers 24 for the perimeter of a 6 × 4 rectangle.

- Level 1: Follow the complete outline with your finger. What are you measuring?
- Level 2: Highlight the four boundary edges. The shaded unit squares measure something else.
- Level 3: Perimeter = 6 + 4 + 6 + 4 = 20 length units; area = 6 × 4 = 24 square units.
- Reflection: What information tells you whether the task asks about a boundary or a surface?
- Verification: 20 and 24 have been checked with the formulas P = 2(p + q) and A = pq.

## Misconception 2 — same perimeter implies same area

**Scenario:** pupil concludes equal perimeter always gives equal area.

- Level 1: If two gardens have the same fencing length, must they have the same number of tiles inside?
- Level 2: Compare 2 × 8 and 5 × 5 with the dynamic rectangle.
- Level 3: P(2,8)=20, A(2,8)=16; P(5,5)=20, A(5,5)=25. The general claim is false.
- Reflection: Can one counterexample disprove a statement that claims something is always true?
- Verification: both perimeters are 20 and the areas differ by 9 square units.

## Misconception 3 — same area implies same perimeter

**Scenario:** pupil believes that rearranging 24 square tiles cannot change the perimeter.

- Level 1: Can the same number of square tiles be arranged to form different boundary lengths?
- Level 2: Construct a 3 × 8 rectangle and a 4 × 6 rectangle.
- Level 3: A(3,8)=24 and P(3,8)=22, while A(4,6)=24 and P(4,6)=20.
- Reflection: Which measure stayed the same, and which changed?
- Verification: 3 × 8 = 4 × 6 = 24; 2(3+8) = 22; 2(4+6) = 20.

## Misconception 4 — units versus square units

**Scenario:** pupil writes 24 m for a 6 m × 4 m garden surface.

- Level 1: Is the answer a distance or a covered surface?
- Level 2: Imagine covering the garden with 1 m² tiles, rather than wrapping it in a string.
- Level 3: P = 20 m, but A = 24 m². Length and area must not use the same unit.
- Reflection: Why does a square unit represent a different quantity from a length unit?
- Verification: the numerical results and units are dimensionally consistent.

## Transparent implementation notes

- The original three-level hint buttons remain pre-written and work offline. The separate **Ask live AI Tutor** button makes a real model request to the Gemini Developer API through a Netlify Function, but only after learner consent and deployment.
- Immediate assessment still uses deterministic programmed rules, not a generative AI endpoint. The AI is used for differentiated supporting explanations, not automated assessment.
- A submitting teacher/student should review wording, accessibility and appropriateness before classroom use.
- No pupil-identifying information should be entered into third-party AI tools without proper safeguards.
- The underlying site and resource development received AI assistance; this is disclosed in the integrity manual.


## Live AI Tutor: server-side prompting and privacy (version 2.0)

**Code location:** `netlify/functions/ai-tutor.mjs`. The Netlify Function includes a mathematical role instruction, restricted topic names, numeric dimensions, preverified formula results, three hint levels, and controls against personal data submission.

**Prompt structure:** System instruction (Year 4 mathematics tutor; non-disclosure of answers at levels 1–2; correct units; plain English; no personally identifying information) + generated context containing selected misconception, selected rectangle dimensions, preverified perimeter/area, support level, and two counterexample pairs. The source code itself is the complete reproducible system prompt evidence.

**Model selection:** Default `gemini-2.5-flash-lite` on Google Gemini's eligible free tier, with availability, quotas and model status subject to change. Neither unmetered access nor permanent free access is promised.

**Actual input example:** `{"topic":"samep","level":2,"p":6,"q":4}`. The endpoint validates the payload, computes P=20 and A=24 on the server, then builds the restricted teaching prompt; arbitrary pupil questions are not accepted.

**Actual output:** A fresh external-model hint is displayed as plain text. The app alerts learners that AI responses can be incorrect, and instructs them to verify examples with the dynamic rectangle.

**Integrity and student privacy:** Browser API keys are prohibited; the function uses `GEMINI_API_KEY` in Netlify's Functions environment variables. No student names, text reflections or chat history are transmitted by the app. Teacher consent and school rules still apply.

**Verification status:** The serverless function and browser calling logic have been locally tested with mocked Gemini API responses. **Real Gemini requests need the student's own key, eligible account, and deployed Netlify Function; not yet verified.**

See `AI_Integration_And_Privacy_Guide.md` for step-by-step setup and service limitations.

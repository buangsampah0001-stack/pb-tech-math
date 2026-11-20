# PeriLuas Lab — Live AI Tutor Integration and Privacy Guide

**Course:** MTES6032, Task 2 (Digital Resources, 60%)  
**Resource language:** English  
**AI provider:** Google Gemini Developer API  
**Default model:** `gemini-2.5-flash-lite`  
**Hosting:** Netlify static site + Netlify Functions

## Purpose and relation to PLO6 Criterion 6

The resource already contains AI-assisted, prewritten guidance cards at three scaffold levels. The revised version adds an **optional live AI Tutor**, which uses a real AI model to generate an explanation tailored to the **selected misconception**, **support level**, and **current length and width**. Pupils do not need to type identifying information or paste answers. The backend operates on Netlify so the Gemini API key never appears in the HTML source or URL.

The tutor's purpose is not to replace the pupil's reasoning. Levels 1–2 provide questions and visual prompts before the worked example at Level 3. Pupils verify the output against the deterministic dynamic rectangle and mathematical formulae.

## How the files communicate

`index.html` (browser) → `POST /.netlify/functions/ai-tutor` (Netlify Function) → Gemini API → plain-text guidance returned to the page.

JSON example (not a secret):

```json
{"topic":"samep","level":2,"p":6,"q":4}
```

Allowed topics: `boundary`, `samep`, `samea`, `units`; hint levels 1, 2 or 3; rectangle dimensions 1–12 integer units. No free-text pupil questions are sent; the endpoint rejects unrelated requests and oversized payloads.

## IMPORTANT: Google Gemini is free-tier eligible, NOT guaranteed free for life

The official Gemini pricing page lists free-tier availability for eligible models, but **rates, quotas and access can change**. Check your own project dashboard and billing status. Creating an API key should not require adding a paid billing account for eligible free-tier access. Do not activate billing merely for this school project unless you understand the charges. Keep a low quota and monitor its usage; users may encounter HTTP 429 when it is exhausted.

Official pricing: https://ai.google.dev/gemini-api/docs/pricing

Google indicates that **free-tier content may be used to improve its products**. Therefore this product only submits non-identifying mathematics context. The user must tick the consent checkbox before each AI request (until the current tab remains open). Pupils may choose the offline hints instead. In a school setting, follow local parental consent, data protection, and school IT requirements.

## Deploy through Git-connected Netlify (RECOMMENDED)

**Important:** Netlify drag-and-drop of the `site/` folder can publish the static website but should not be assumed to deploy the serverless `netlify/functions` backend. To enable real AI integration, deploy the full project through Git integration or Netlify CLI.

1. Create a private repository on GitHub; place all contents of the **full revised project** in the repository root. Include: `index.html`, `assets/`, `docs/`, `netlify.toml`, `package.json`, `scripts/`, `netlify/functions/`.
2. Sign in to Netlify. Select **Add new project → Import an existing project → GitHub**. Authorise the repository.
3. Netlify should detect `netlify.toml`: build command `node scripts/build.mjs`, publish directory `site`, functions directory `netlify/functions`.
4. Go to the Netlify project's **Project configuration → Environment variables** and add a variable with **key name** `GEMINI_API_KEY`. Paste your API key **in Netlify's secret value field**, never in HTML, a GitHub repository, this chat, a screenshot or a document.
5. Obtain the key from https://aistudio.google.com/apikey . Make sure the API key is authorised for the Gemini Developer API and is a free-tier-eligible project.
6. Optional: set `GEMINI_MODEL=gemini-2.5-flash-lite` if the default model is unavailable; only choose a model your project supports.
7. Ensure the variable's scope includes **Functions**. Deploy or trigger a redeploy after editing environment variables.
8. Visit the public Netlify URL. The **Explore** mathematics page works immediately. Then open **Discover → Live AI Tutor**, tick consent, choose a level and press **Ask live AI Tutor**.
9. A working request returns a new, generated tutoring response. If the key is missing, quota exhausted, or model unavailable, the page displays an error and the offline hints remain available.
10. Verify that requests to `/.netlify/functions/ai-tutor` return `405` for GET, not a 404 page. When submitting a valid POST without a key, the function returns a clear 503 configuration error.
11. Once Netlify is working, copy its HTTPS URL and embed it into **Google Sites → Insert → Embed → By URL**. Use the published Netlify URL as the embed source. Then test in a published Google Sites page.

### Alternative: deploy through Netlify CLI

Install Node.js 20+ and run from the full project folder:

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

Netlify will run the project build and include `netlify/functions` when configured. Add `GEMINI_API_KEY` through the Netlify dashboard, then redeploy. CLI options and UI labels may change; consult the official Netlify guide.

## What the AI does NOT do

- Does not automatically mark written reflections or assign grades.
- Does not receive pupil names, photos, emails, chat history or custom free-text questions from this site.
- Does not store AI conversations in a database.
- Does not guarantee mathematical accuracy or 24/7 availability.
- Does not provide unlimited free requests or lifetime pricing guarantees.
- Does not offer durable bot-abuse prevention; the backend includes only basic best-effort rate limiting. Monitor free-tier quota and disable the function if abused.

## Troubleshooting

| Symptom | Probable cause | Action |
|---|---|---|
| AI says backend not deployed | Static-only Netlify deployment or local `file://` | Deploy entire project via Git or CLI |
| AI says not configured | Netlify `GEMINI_API_KEY` missing | Set key in Netlify Environment variables → Functions; redeploy |
| AI says quota exceeded | Free-tier rate limit (429) | Use offline hints; review AI Studio rate limits |
| Model unavailable | Model not enabled or model name changed | Check AI Studio supported models; set `GEMINI_MODEL` to an eligible name |
| GeoGebra unavailable locally | External script not loaded or local-file restrictions | Test from published HTTPS Netlify URL |
| Saved GeoGebra `.ggb` ignored | Wrong filename or folder | Use exact path `assets/PeriLuasLab.ggb` before deploying |

## Rubric and integrity evidence

Provide (a) the original prompting strategy, (b) the revised server-side system prompt and structured request design, (c) the teacher's mathematical verification, (d) a screenshot of a successfully generated answer, (e) a 429/unconfigured fallback demonstration, and (f) explicit attribution for Gemini and GeoGebra.

### Sources

- Google AI for Developers: https://ai.google.dev/gemini-api/docs/pricing
- Google AI API reference: https://ai.google.dev/gemini-api/docs
- Netlify Functions: https://docs.netlify.com/build/functions/get-started/
- Netlify environment variables: https://docs.netlify.com/build/functions/environment-variables/

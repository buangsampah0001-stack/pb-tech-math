# MTES6032 Task 2 — Phase 6 Final Excellent/A+ Audit

**Product:** PeriLuas Lab — Dynamic Perimeter & Area Discovery  
**Curriculum:** KSSR Mathematics Year 4, Geometry, Content Standard 6.3  
**Delivery:** https://pb-tech-tnl-math-task2.netlify.app/  
**Audit date:** 20 November 2026  
**Assessment weight:** 60 marks (PLO2: 20; PLO6: 35; VBE Integrity: 5)  
**Product language:** English  
**Evidence bases:** Task 2 instructions and marking rubric; project source HTML, JavaScript, manual, assets and automated test outputs; student's 20 November screenshots of the published Netlify site, GeoGebra window and a successful Gemini Level 1 response.

## A. Evidence Reliability and Overall Conclusion

**Overall judgement: Strong functional prototype and plausible Excellent candidate, but full Excellent is not yet evidenced for every criterion.** The student's screenshots establish that the Netlify site opened, the GeoGebra interface was displayed and Gemini generated at least one context-sensitive Level 1 tutor response after `GEMINI_MODEL=gemini-3.1-flash-lite` was configured. The source code and local functional tests independently verify the mathematical model, checkpoint feedback, student learning flow and front-end responsiveness.

**Independent limitations:** The external live Netlify URL could not be opened by the audit environment, so deployment results are corroborated by student screenshots rather than independent network inspection. Live Levels 2 and 3, all misconception scenarios, re-opening the native `.ggb` export, and a published Google Sites embedding remain unverified. No classroom trial has been conducted. Do not label planned student outcomes as measured achievement.

**Conditional planning-only score estimate:** approximately **49–55 / 60**, with **low-to-moderate confidence** and considerable lecturer discretion. A score of **54+ / 60** would correspond to averaging at least 4.5 across 12 five-mark criteria, but the evidence currently does not justify claiming that level on all criteria. Completion of the listed high-priority verification actions could make a higher result plausible; no A+ grade is promised.

## B. Complete 12-Criterion Rubric Audit

Status terms: **Excellent evidenced**, **Partially evidenced**, **Not met**, or **Not yet verifiable**. Only the lecturer awards actual marks.

| # | Criterion (maximum) | Verifiable evidence | Status | Weakness / next correction |
|---|---|---|---|---|
| 1 | Topic Selection & Alignment (5) | Geometry, Year 4; CS 6.3; LS 6.3.1/6.3.2, limited to squares/rectangles; precisely identified errors | **Excellent evidenced** | State clearly that triangles and all other polygon cases are outside the package scope; preserve source DSKP citation. |
| 2 | Dynamic Math Tools (5) | Programmatically dependent GeoGebra model, uploaded `.ggb` in GitHub, HTML dimension sliders, student's screenshot of GeoGebra loading | **Partially evidenced** | Record the model responding to p/q changes within GeoGebra; download and independently reopen `.ggb` after deployment. |
| 3 | Visualisation & Transformation (5) | SVG unit-square model, outline/highlight, formulas, 144 combinations tested; corrected equal-perimeter homepage illustration | **Excellent evidenced** | Confirm exported GeoGebra version mirrors correct visual values; explain units verbally. |
| 4 | Interactivity & Discovery (5) | Prediction, observation log, fixed-perimeter and fixed-area missions, counterexamples, garden application | **Partially evidenced** | Support more genuinely learner-created combinations and ensure explanation follows exploration, not simple option selection. |
| 5 | Digital Platform Integration (5) | Public Netlify site shown; five structured sections; relative assets, responsive UI and optional embedding | **Not yet verifiable** for Google Sites | Publish and open the Google Sites page as a visitor; test embedded GeoGebra, AI, PDFs and mobile layouts. |
| 6 | AI-Generated & Prompt Engineering (5) | Differentiated prewritten hints and backend system prompts; Gemini 3.1 Flash-Lite real Level 1 response shown | **Partially evidenced** | Test 4 misconceptions × 3 support levels; save anonymised evidence for Level 1/2/3 and verify mathematics manually. |
| 7 | Misconception Support (5) | Distinct errors: two sides only, P/A confusion, equal P implies equal A, equal A implies equal P, units | **Partially evidenced** | Explain that wrong-answer patterns suggest possible causes; verify live AI response relevance for each misconception. |
| 8 | Interactive Activity Sheet & Infographic (5) | Web exploration table, two discovery tables, offline printable worksheet, custom 1920×1080 mathematical infographic, prewritten AI support | **Partially evidenced** | Test applet–worksheet flow in published embed; ensure learners record reasons, not only select responses. |
| 9 | Real-Time Digital Assessment (5) | CP1 diagnostic, CP2 calculation, CP3 design, CP4 application, CP5 reflection (ungraded); four automatic progress groups | **Excellent evidenced** for on-page validation | Clarify that CP5 is not auto-graded and progress is local, not a teacher dashboard. |
| 10 | Deep Learning & 6Cs (5) | Conjecture, counterexamples, reflection, garden design, teacher guide; optional pair discussion | **Partially evidenced** | Collaboration is planned rather than implemented digitally; add teacher-facilitated pair task and explain which 6Cs are actually evidenced. |
| 11 | Innovation, Usability & Future-Oriented Pedagogy (5) | Responsive, real-time SVG + GeoGebra, context-limited live AI, differentiated scaffolds, independent navigation | **Partially evidenced** | Conduct 3-minute usability walkthrough on a student device and document observed errors and corrections (not claimed yet). |
| 12 | Academic & Digital Integrity (5) | Nine-page integrity manual, APA sources, AI prompt log, server-only API key, explicit Gemini/GeoGebra attribution | **Partially evidenced** | Update manual to match actual deployed AI model, retain prompt/output evidence, add official cover and exact live URLs. |

**No explicit core component is entirely absent**, but the Google Sites integration still needs external verification and some 'Excellent' descriptors require stronger pedagogical evidence rather than more decorative features.

## C. Functional and Mathematical Audit

Formulae validated: `P=2(length+width)` for length units, `A=length×width` for square units. All **144 integer dimension pairs (1–12 × 1–12)** passed the front-end calculations in Chromium. Tested examples:

| Dimensions | P | A | Learning purpose |
|---|---:|---:|---|
| 6×4 | 20 | 24 | Boundary versus inside area |
| 2×8 | 20 | 16 | Same perimeter, different area |
| 5×5 | 20 | 25 | Same perimeter, greater area |
| 3×8 | 22 | 24 | Same area, different perimeter |
| 4×6 | 20 | 24 | Same area, lower perimeter |
| 12×12 | 48 | 144 | Maximum size, label collision regression |

**Defect found and corrected in reviewed source:** Originally, the Home page displayed Garden A as 6×8 and Garden B as 6×6, even while suggesting identical fence lengths. It now displays **4×8 (P=24, A=32)** versus **6×6 (P=24, A=36)**, a genuine mathematical counterexample. The associated SVG squares and accessible description were updated. This fix has been rendered and checked locally but **is not yet deployed to Halim's Netlify site**.

**Automated checks:** 23 revised local UI and calculation checks passed, including 144-dimensional grid calculations, the corrected homepage, wrong-answer feedback, mission conclusions, immediate checkpoints, local reflection/log export, mobile widths 390/768/1280 and the AI consent gate. The AI test uses a mock response with a test-only bypass for the local `file://` restriction; it does not make a real Gemini API call. Earlier backend tests used mocked API responses to verify security validation and handling of configuration/quota failures. The user screenshot separately establishes one live AI response.

**Critical external checks remaining:** verify saved GeoGebra model and file, live Levels 2 and 3, published Google Sites embed, privacy/consent in actual school context and public file links.

## D. Ten-Dimension Academic Quality Audit

| Dimension | Finding | Action |
|---|---|---|
| 1. Assignment requirement compliance | Dynamic software, AI, interactive activities, infographic, checkpoints and integrity document are present. | Confirm Google Sites delivery and official cover sheet. |
| 2. Every rubric descriptor | 3 criteria have strong Excellent evidence; 8 partial; 1 external integration not verified. | Target remaining evidence rather than new superficial features. |
| 3. Mathematical accuracy | All programmed examples and integer grid calculations checked; homepage geometry corrected. | Review teacher-made `.ggb` independently. |
| 4. Critical-thinking pedagogy | Counterexample investigation is genuinely linked to claims and numerical evidence. | Require verbal or written mathematical justifications. |
| 5. Structure and coherence | Five structured pages and coherent learner journey. | Verify published Google Sites embed size and navigation. |
| 6. Evidence, sources and justification | DSKP, research rationale, prompt log and functional evidence exist. | Add genuine deployment screenshots and AI level samples. |
| 7. APA references and attribution | Six or more cited sources; explicit GeoGebra and AI attribution. | Recheck exact bibliographic entries and links. |
| 8. Date, format and scope | 20 November deadline observed; English product; no prescribed file extension beyond softcopy. | Add official cover, website link, optional native `.ggb` to submission. |
| 9. English and academic communication | English UI, age-oriented hints, academic manual. | Proofread grammar and Level 1/2 AI for premature answers. |
| 10. Risk management | Main remaining risk is external publication/verification, not mathematics engine. | Complete critical deployment checks immediately. |

## E. Prioritised Remediation

**CRITICAL — before submission:**
1. Deploy the reviewed homepage correction and test the public Netlify URL without changing the established backend secret.
2. Publish and test the final Google Sites embed as a visitor, on desktop and a phone.
3. Verify GeoGebra responds to changing `p` and `q`, then export/open the native `.ggb` worksheet. The ZIP update does **not** contain Halim's own `.ggb`; preserve it in existing `assets/`.
4. Use the lecturer's proper cover-page template and include the *actual* site and evidence link. Do not assume the ZIP alone satisfies the intended platform requirement.

**HIGH PRIORITY:**
5. Capture one real Gemini response each at Levels 1, 2 and 3 for different misconceptions; verify numerical claims independently.
6. Save an anonymised live website/GeoGebra screenshot and update the Integrity Manual to reflect the `GEMINI_MODEL` setting without sharing the key.
7. Demonstrate the prediction → manipulate → record → explain sequence end-to-end.

**MEDIUM PRIORITY:**
8. Consider allowing students to construct additional rectangle pairs beyond preset buttons.
9. Add a short teacher-facilitated pair comparison to demonstrate collaboration rather than claim live multi-user functionality.
10. Record a short pupil-independent usability walkthrough; do not fabricate a classroom trial.

**OPTIONAL:** Login system, leaderboards, more games, AI chat-history and teacher dashboards. These are not necessary for the core assignment and would increase deadline risk.

## F. Deployment and Privacy Notes

- GitHub repository: `buangsampah0001-stack/pb-tech-math`, branch `main`, application subfolder `PeriLuasLab_Task2_REVISED_V2_FULL_NETLIFY_AI/`.
- Netlify base directory must match that application subfolder. Build command: `node scripts/build.mjs`; publish directory: `site`; Functions directory: `netlify/functions`.
- Required secure environment key: `GEMINI_API_KEY`; configured model: `GEMINI_MODEL=gemini-3.1-flash-lite`. No secrets should be committed to GitHub.
- The server receives structured numeric dimensions, misconception choice and hint level, not typed pupil reflections. Although the pupil-facing consent box is implemented, school or parental authorisation requirements must also be considered before classroom deployment.
- The Netlify Function uses an in-memory, best-effort rate limit, not a robust per-student quota. The owner should monitor API quotas and disable billing if an unanticipated charge would be unacceptable.

## G. Final Academic Verdict

PeriLuas Lab is **ready for final publication verification**, not yet a fully confirmed 60/60 Excellent submission. The strongest evidence is the mathematical exploration, checkpoint feedback, misconception-specific design and functioning AI integration shown by the student. The main obstacles to a defensible A+ submission are the unverified Google Sites embedding, native GeoGebra export/reopen, insufficient real AI examples beyond Level 1, and documentation/evidence alignment. The accompanying Phase 6 correction package fixes the discovered mathematical illustration defect and aligns the manual and default model with deployment evidence. It does not change the live Netlify site automatically.

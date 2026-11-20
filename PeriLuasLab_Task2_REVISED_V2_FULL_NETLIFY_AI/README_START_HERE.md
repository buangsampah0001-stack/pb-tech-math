# PeriLuas Lab — English Task 2 Delivery Package

**Course:** MTES6032 — Technologies in Teaching and Learning Mathematics  
**Assessment:** Task 2 — Digital Resources (60%)  
**Topic:** KSSR Mathematics Year 4, Geometry, Content Standard 6.3 (Perimeter and Area)  
**Student:** Halim  
**Submission target:** 20 November 2026

## Open the learning resource

1. Keep all files and subfolders together after extracting the ZIP.
2. Open **index.html** in Chrome, Edge or another modern browser.
3. Explore the five sections: Home, Explore, Discover, Apply & Reflect, Teacher Hub.
4. The custom HTML/SVG learning model, missions and automatic checking run locally without a login or server.
5. The **official GeoGebra component requires internet access**. On the Explore page, click **Launch GeoGebra model**. When the mathematical construction loads, move the Length and Width sliders and verify that the polygon updates. Then click **Download .ggb** to export the constructed GeoGebra worksheet. This external engine and export have **not** been tested in the current restricted environment.

## Files supplied

- `index.html` — full English student learning website with HTML/SVG dynamic model, activity sheet, hints, checkpoints, local reflection and Teacher Hub.
- `assets/PeriLuasLab_Infographic.png` — 1920×1080 classroom mathematical visual aid.
- `docs/PeriLuasLab_Integrity_Manual.docx` — editable 9-page English academic, pedagogical and integrity manual.
- `docs/PeriLuasLab_Integrity_Manual.pdf` — fixed-layout version of the manual.
- `docs/Student_Investigation_Sheet.pdf` — supporting printable worksheet; digital activities remain in the website.
- `GeoGebra_Construction_Guide.txt` — GeoGebra applet setup and export guidance.
- `evidence/functional_test_results.txt` — tests completed and remaining external verification tasks.
- `evidence/desktop_test.png`, `mobile_test.png`, etc. — development testing screenshots.

## Publish for Google Sites

**Recommended route: host on Netlify and embed by URL.**

1. Upload the **contents** of the extracted folder to a new Netlify site (the directory containing `index.html`).
2. Check that the public link opens from a private/incognito browser session.
3. Verify all navigation, live maths, downloadable manual/infographic and GeoGebra engine online.
4. Open Google Sites → Insert → Embed → **By URL** and paste the publicly accessible Netlify URL.
5. Resize the embed to allow an appropriate scrolling area; test the published Google Sites page as a visitor.
6. Provide the actual Google Sites link as your submission link. **No public URL has been fabricated or deployed by this package.**

Google Sites may restrict some HTML code pasted directly into its Code embed. URL embedding the hosted resource is the preferred practical choice here. Actual embed compatibility must be verified on the published page.

## Targeted learning outcomes

Pupils calculate perimeter and area, manipulate rectangular dimensions, disprove universal misconceptions using counterexamples, and solve a fixed-fence garden design problem. Activities cover **squares and rectangles only**, not the full list of polygon/triangle cases in the DSKP.

## Key remaining tasks before final submission

- [ ] Publish and verify the website over HTTPS on a real URL.
- [ ] Load the official GeoGebra engine and verify live polygon/number synchronisation.
- [ ] Export and **reopen the native `.ggb` file**; add it to the package if your lecturer expects a standalone GeoGebra artefact.
- [ ] Verify embeds and links in published Google Sites on both desktop and phone.
- [ ] Review all AI-assisted text, mathematical examples and reference details as the submitting student.
- [ ] Add the official cover template and the genuine public website link as requested by the lecturer.

## Integrity statement

The site, infographic and manual were produced as new materials with ChatGPT assistance, mathematical validation and scripted browser checks. The GeoGebra software engine is third party and subject to its own licence. This package does not claim a real classroom trial, teacher verification, or guaranteed academic marks.


## Version 2.0 — GeoGebra and Live AI upgrade

- Fixed the SVG **Width** label when the rectangle length is 12 by moving the label to the left and rotating it vertically.
- Added a standalone **GeoGebra_ONE_COMMAND.txt** containing one `Execute({...})` expression for a blank GeoGebra Classic worksheet. Save the exported worksheet as `assets/PeriLuasLab.ggb`; the revised website will look for that filename on a published HTTP(S) site. It otherwise builds a GeoGebra rectangle from the API.
- Changed GeoGebra display to a cleaner graphics-centred view; the user-provided screenshot shows the external engine had successfully loaded in their local browser, although the save/export flow remains unverified.
- Added a real optional **Live AI Tutor**. This feature is unavailable in local `file://` preview and requires the whole source project to be deployed via Git-connected Netlify or Netlify CLI, plus a server-side `GEMINI_API_KEY`. No API key belongs in `index.html`.
- The existing prewritten scaffolding buttons and deterministic assessments remain available offline.
- `docs/AI_Prompt_And_Scaffolding_Log.md` is *evidence of prompt engineering*, not a program. The new live AI prompt and server code provide additional PLO6 6 evidence.
- Read `docs/AI_Integration_And_Privacy_Guide.md` carefully before enabling external AI in a student-facing lesson. Free-tier allowances are conditional, not guaranteed forever; free-tier inputs may be used by Google for product improvement.

**Deploy this FULL PROJECT via Git/CLI, not only the static upload, if you need live AI.** The build publishes the `site/` folder and deploys Netlify Functions.

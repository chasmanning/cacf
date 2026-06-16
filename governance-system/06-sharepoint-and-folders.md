# 06 · SharePoint & Folder Structure

Site: **`cacfonlineorg.sharepoint.com/sites/FoundationServer`** · Library: **Shared Documents**

This standardizes the folder package that already exists on your site so every meeting looks
the same and can be **provisioned automatically** (Flow 1, `08`).

## A. The live structure today (confirmed)
```
Shared Documents/
└── Governing Board/
    ├── Templates/                              ← keep the folder template here (see C)
    ├── 2026 Documents/
    │   └── BOD 06.23.2026/                     ← one folder per board meeting
    │       ├── Consent Agenda/
    │       │   ├── Community Impact/
    │       │   │   ├── Working Docs/
    │       │   │   └── Loaded to Portal/        ← staging → WordPress publish gate
    │       │   └── Work Plans & Charges/
    │       │       ├── Working Docs/
    │       │       └── Loaded to Portal/
    │       └── <Fund-specific folders>/         ← e.g., "Orange County Humane Society Fund"
    ├── 2025 Documents/
    │   └── 12.11.25/                            ← NOTE: older naming differs (see B)
    │       ├── Print Final/ └── Consent Agenda/
    │       └── Working Docs/ └── Finance Reports/
    └── Committees/
        ├── Finance & Audit Committee/   → F&A 2021 … F&A 2026/
        ├── Executive Committee/         → EC 2020 … EC 2026/
        ├── Board Development Committee/  → BDC 2021 … BDC 2026/
        ├── Community Advisory Committee/ → (E-Votes, …)
        ├── Local Impact Investing Committee/
        │   ├── Meeting Minutes & Agendas/ → "2025-11-05 LIIC Meeting"/   ← ISO date prefix
        │   └── Committee Recruitment and Governance/
        └── Investment Committee/        → 2026/   ← year-only subfolders (confirm naming)
```

## B. Naming conventions (standardize going forward)
The site has **two competing patterns** — board uses `BOD MM.DD.YYYY` / `12.11.25`; LIIC uses
`2025-11-05 LIIC Meeting`. Recommendation (confirm with liaisons):

| Item | Standard | Example | Why |
|------|----------|---------|-----|
| Board meeting folder | `BOD MM.DD.YYYY` | `BOD 06.23.2026` | Already entrenched; keep it. |
| Committee year folder | `<ABBR> YYYY` | `F&A 2026` | Matches existing. |
| **Committee meeting folder** | **`YYYY-MM-DD <ABBR> Meeting`** | `2026-09-15 F&A Meeting` | ISO prefix **sorts chronologically** (LIIC already does this). |
| Year container | `YYYY Documents` | `2026 Documents` | Matches existing. |

Approved committee abbreviations: **F&A, EC, BDC, CAC, LIIC, IC**. Investment Committee files under `Committees/Investment Committee/YYYY` — note its **year-only** subfolders, unlike the `<ABBR> YYYY` pattern (decide whether to standardize).
*Retire* the `MM.DD.YY` style used in `2025 Documents/12.11.25`.

## C. The folder template (the standardized package)
Keep a master template folder under `Governing Board/Templates/` that Flow 1 **copies** for each
new meeting, then renames per the Meetings list. Two templates:

**`_TEMPLATE Board Meeting/`**
```
_TEMPLATE Board Meeting/
├── 00 Agenda/                       (agenda v1 dropped here at provision)
├── Consent Agenda/
│   ├── _Section/
│   │   ├── Working Docs/
│   │   └── Loaded to Portal/
├── Reports/                         (F&A, IC, CAC, LIIC, BDC, staff)
├── Board Book/                      (compiled book + prior minutes)
├── Minutes/
└── Action Items/
```
*Coordinator adds the meeting's actual consent sections (e.g., "Community Impact," "Work Plans &
Charges") and any **fund-specific** folders, which vary per meeting and aren't templated.*

**`_TEMPLATE Committee Meeting/`**
```
_TEMPLATE Committee Meeting/
├── Agenda/
├── Materials/
│   ├── Working Docs/
│   └── Loaded to Portal/
├── Minutes/
└── Action Items/
```

## D. The publish gate (`Working Docs` → `Loaded to Portal` → WordPress)
This is the existing, working pattern — formalize it:
1. Drafts live in **`Working Docs/`**.
2. When a document is final, it's **moved** (not copied) to **`Loaded to Portal/`**.
3. The **portal admin** publishes everything in `Loaded to Portal/` to the WordPress board portal,
   then checks off the "Posted to portal" Planner task.
4. (Optional automation) A flow can watch `Loaded to Portal/` and notify the portal admin / flip
   the Planner task when new files land (`08`, Flow 4 — phase 2).

## E. How provisioning works (summary; full spec in `08`)
- The **Governance Meetings** SharePoint list holds one row per meeting with the fields that build
  the destination path: `Committee`, `MeetingDate`, `BoardFolderName` / `CommitteeYearFolder`,
  `MeetingFolderName`.
- At **B − 25 business days**, Flow 1 copies the right `_TEMPLATE …` folder into the destination,
  renames it, drops the agenda template into `Agenda/`, and writes the new folder's URL back to
  the list (so Teams/Planner/reminders can link to it).
- Year-end: completed meeting folders already sit under `YYYY Documents` / `<ABBR> YYYY`, so
  archiving is just leaving them in place and starting the next year's container.

## F. Permissions (with IT)
- Keep document-level permissions as they are on `FoundationServer`.
- The **flow runs as a service account** that has contribute rights to `Governing Board/`.
- Board/committee *members* never need SharePoint access — they consume materials via the
  **WordPress portal**. SharePoint/Teams is staff-and-liaison-facing only (matches today).

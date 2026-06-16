# CACF Governance Administration System

A standardized system for running the **Governing Board** and every **committee** at the
Charlottesville Area Community Foundation: one repeatable package of folder structure,
prep, task tracking, reminders, and follow-up for every meeting — built on the Microsoft
365 tools CACF already uses (SharePoint/OneDrive, Teams, Planner, Power Automate, Outlook)
plus the WordPress board portal.

> ### Guiding principle: cadences are set *with* liaisons, not assumed
> This kit deliberately does **not** invent meeting dates or committee cadences by
> extrapolating from the current calendar. The 2026 dates already scheduled are documented
> as-is. Everything forward-looking — 2027 dates, each committee's frequency, and the exact
> lead-time/dependency rules — is captured through a **collaborative process with the
> committee liaisons** (see `10-rollout-and-liaison-process.md` and the
> `templates/committee-liaison-intake-worksheet.md`). Where this kit proposes a number
> (e.g. "post the board book 7 business days out"), it is labeled **PROPOSED DEFAULT —
> confirm with liaison**.

## What's in here

| File | What it covers |
|------|----------------|
| `01-system-design.md` | The architecture: how SharePoint, Teams, Planner, Power Automate, Outlook, and the WordPress portal fit together; roles; design principles. |
| `02-governance-map-and-dependencies.md` | The board + committees, an acronym legend, and the **dependency map** (which meeting feeds which). Dependencies are marked *evidenced* vs *proposed — to validate*. |
| `03-meeting-lifecycle-playbook.md` | The standardized **package, prep, and follow-up** for any meeting: the T-minus timeline, prep invitations, the publish gate, and post-meeting actions. |
| `04-cadence-2026.md` | The **actual, already-scheduled** 2026 governance meetings, plus worked prep dates for the remaining cycles (Jun 23, Sep 22, Dec 15) using the draft default timeline. |
| `05-cadence-2027-worksheet.md` | A **blank collaborative planning worksheet** for 2027 — constraints and TBD slots, no assumed dates. |
| `06-sharepoint-and-folders.md` | The exact folder map (matching your live `FoundationServer` site) and the naming convention, plus how folders get provisioned. |
| `07-planner-task-board.md` | The Planner plan/bucket/label design and the standard task set generated for each meeting. |
| `08-power-automate-flows.md` | Specs for the flows we automate now (hybrid): folder provisioning, reminders, follow-up. Includes the holiday/business-day approach. |
| `09-teams-collaboration.md` | How to move prep collaboration into **Teams** (channels per committee) over the existing SharePoint library. |
| `10-rollout-and-liaison-process.md` | The **collaborative build plan**: roles, the cadence-setting working session, and the per-committee intake workflow. Start here for "how do we actually stand this up." |
| `templates/` | Ready-to-use agenda, consent-agenda cover, minutes, meeting-package checklist, email templates, and the **committee liaison intake worksheet**. |
| `data/` | Machine-readable inputs: the master **Meetings list** schema, the actual 2026 meetings, the 2027 worksheet rows, and the **non-working-days** calendar that the automation references. |

## The one-paragraph version

Every meeting — board or committee — runs through the same lifecycle: a **Meetings list**
in SharePoint is the single source of truth; when a meeting is ~5 weeks out, a Power Automate
flow provisions its **folder set** (from the live template), spins up the standard **Planner
tasks** with due dates computed in *business days* (skipping CACF closures), and posts a
kickoff in the committee's **Teams** channel. Staff collaborate on materials in Teams/SharePoint
during the prep window; finalized documents move to the **"Loaded to Portal"** folder and get
published to the **WordPress board portal**. Automated **reminders** fire at set milestones, and
the day after the meeting a **follow-up** flow creates minutes/action tasks. The *dates and
cadences that drive all of this are owned by the committee liaisons* and captured in the intake
worksheet — the system just executes them reliably.

## Status / open items to resolve with liaisons
- Confirm the **lead-time defaults** in `03` (board-book posting, materials-due, provisioning lead).
- Confirm whether the observed **F&A = Board − 7 calendar days** pattern is intentional policy.
- Confirm the **dependency links** marked *proposed* in `02`.
- Identify the **liaison** for each committee and have them complete the intake worksheet.
- Confirm acronyms/owners flagged **TBD** (e.g., "MIB," scholarship committees, BAMA Works cycle).
- Decide Power Automate licensing/service-account details with IT (`08`).

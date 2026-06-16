# 03 · Meeting Lifecycle Playbook

The single repeatable lifecycle every board and committee meeting runs through. The **package**
(what gets produced) is standardized; the **timeline** below is a **PROPOSED DEFAULT** — each
liaison confirms the numbers for their committee in the intake worksheet, after which the
automation computes exact dates.

> All offsets are **business days** unless marked "cal." Business-day math skips the
> *Non-Working Days* list (CACF closures) and avoids landing meetings/external sends inside a
> **Deep Work Week**. "B" = the meeting date.

## A. The standardized meeting package
Produced for *every* meeting, stored in the meeting's folder set (`06`):

1. **Agenda** (from `templates/agenda-template.md`) — v1 draft → chair-approved final.
2. **Consent agenda** + cover (board only / where used) — `templates/consent-agenda-cover.md`.
3. **Prior minutes** for approval.
4. **Reports & recommendations** from feeder committees / staff leads (financials, investment
   report, program/impact recs, slate).
5. **Board/committee book** — the compiled PDF posted to the portal.
6. **Minutes** (drafted after) — `templates/minutes-template.md`.
7. **Action item log** — carried into Planner as tasks.
8. **Meeting-package checklist** — `templates/meeting-package-checklist.md`, the gate that says
   "this package is complete."

## B. The T-minus timeline (PROPOSED DEFAULTS — confirm per committee)

| Milestone | Default timing | What happens | Automated? |
|-----------|---------------|--------------|------------|
| **Provision** | **B − 25 biz (~5 wks)** | Meetings list triggers: folder set created, Planner tasks generated with computed due dates, Teams kickoff posted. | ✅ Flow 1 |
| **Agenda v1** | B − 25 biz | Coordinator drops the agenda template into the folder as v1; liaison starts shaping it. | Manual (folder seeded by flow) |
| **Agenda-setting** | committee-specific (e.g., EC for the Board) | The agenda-setting body meets/confirms the draft agenda. | Manual |
| **Prep invitations** | B − 20 biz | Calendar holds for prep/working sessions; meeting invite confirmed. | ◑ Flow 3 (optional) |
| **Prep window** | B − 20 → B − 6 | Materials drafted collaboratively in Teams/SharePoint; tracked in Planner. | Manual |
| **Materials due to coordinator** | **B − 10 biz** | Feeder reports & recommendations final enough to compile. Nudge to owners. | ✅ Flow 2 |
| **Feeder meetings complete** | **by B − 10 biz** | Any committee feeding this meeting has met and produced its output. *(See F&A note below.)* | n/a (liaison-set) |
| **Book compiled** | B − 8 biz | Coordinator compiles the book; chair review. | Manual |
| **Publish gate** | **B − 7 biz** | Final docs moved `Working Docs → Loaded to Portal`; portal admin publishes to WordPress. Reminder to members that materials are posted. | ◑ Flow 2 (reminder) + manual publish |
| **Final reminder** | B − 2 biz | Reminder + logistics to attendees; confirm quorum/RSVPs. | ✅ Flow 2 |
| **Day-before** | B − 1 biz | Day-before nudge; room/links/tech check. | ✅ Flow 2 |
| **Meeting day** | B | Meeting runs from the posted book. | — |
| **Follow-up created** | **B + 1 biz** | Flow creates "draft minutes" + per-decision action tasks in Planner; posts the follow-up checklist in Teams. | ✅ Flow 5 |
| **Minutes drafted** | B + 5 biz | Draft minutes in folder; routed to chair. | Manual |
| **Minutes approved** | B + 10 biz | Chair-approved minutes filed; queued as a consent item for the next applicable meeting. | Manual |
| **Action items** | ongoing | Tracked to closure in Planner; reviewed at the next meeting. | ◑ Flow 2 (open-item nudges) |

✅ = automate now · ◑ = optional/phase-2 · Manual = human judgment step

## C. The board-book posting model (PROPOSED — resolves the F&A tension)

The data shows **F&A meets 7 calendar days before the Board**, but board members should get the
book ~**7 business days** out. Those two facts collide (in June they're essentially the same day,
worsened by the Juneteenth closure). Proposed resolution — a **two-wave post**, to confirm with
the F&A liaison and the chair:

- **Wave 1 — Board Book (B − 7 biz):** agenda, prior minutes, consent items ready, and all
  feeder reports *except* the latest F&A output. Gives members the bulk of the book a week out.
- **Wave 2 — F&A packet (F&A meeting + 1 biz):** F&A's report/recommended consent items posted as
  a clearly labeled supplement the day after F&A meets.

Alternatives to weigh with the liaison: (a) move F&A earlier (B − 12 to B − 14) so it lands in
Wave 1; (b) accept a shorter, single-wave post (~B − 4/5 biz). Pick one *policy* and encode it.

## D. Prep invitations (getting the team engaged early)
- At provision, the flow posts a **kickoff** in the committee's Teams channel: meeting date,
  link to the new folder, link to the Planner board, and the materials-due date.
- A recurring **prep/working-session** hold (e.g., weekly during the prep window) is placed on
  owners' calendars so drafting happens *with* time to spare, not the night before.
- Owners get a personal nudge at **materials-due − 3 biz** if their Planner task is still open.

## E. Follow-up & closure (the part that usually slips)
Triggered automatically at **B + 1 biz**:
- Create Planner tasks: *Draft minutes* (owner: liaison, due B + 5), *Approve minutes* (owner:
  chair, due B + 10), and one *Action item* task per decision logged.
- Post the **post-meeting checklist** in Teams.
- When minutes are approved, they're queued as a **consent item** for the next applicable meeting,
  and the meeting folder is marked complete (archived under its year at year-end).

## F. How a liaison adapts this for their committee
Most committees won't need all of it. In the intake worksheet the liaison sets: the offsets
above (or accepts defaults), whether a consent agenda applies, who the report owners are, and
what the standard package contains. The system then runs *their* version of this same lifecycle.

# 07 · Planner Task Board

Goal: make Planner the place the work actually lives, by **auto-generating a consistent task set
for every meeting** so the team never starts from a blank board.

## A. Structure: one plan per committee, surfaced in Teams
- Create **one Planner plan per committee** (Board, F&A, EC, BDC, CAC, LIIC, IC), each pinned as a
  **Planner tab** in that committee's Teams channel (`09`). Per-committee plans keep membership and
  notifications scoped to the right people.
- Phase 2 (optional): a leadership roll-up across plans using **Planner (premium) / Project for
  the web** or a Power BI view — not needed to start.

## B. Buckets = workflow stage (so the board shows the pipeline)
Every plan uses the same buckets, left→right matching the lifecycle (`03`):

1. **Standing / Backlog** — recurring duties, parking lot.
2. **Prep – Folders & Logistics** — provisioning, invites, room/links.
3. **Materials & Drafting** — agenda, reports, recommendations, book.
4. **Review & Approve** — chair review, consent finalization.
5. **Posted to Portal** — publish gate items.
6. **Meeting Day** — run-of-show, attendance/quorum.
7. **Follow-up & Actions** — minutes, decisions, action items to closure.

## C. Labels (Planner allows up to 25 — use a tight set)
| Label | Use |
|-------|-----|
| 🟦 Consent item | Goes on the consent agenda |
| 🟥 Action item | A decision's follow-up task |
| 🟨 Chair approval | Needs chair sign-off |
| ⬛ Blocked – waiting on input | Stuck on an upstream input (e.g., FEG data) |
| 🟧 External (FEG / portal) | Depends on / sends to an outside party |
| 🟩 Recurring | Generated every cycle by the flow |

## D. The standard task set (generated per meeting by Flow 1)
Due dates are **business-day offsets** from the meeting date `B`, using the confirmed timeline
(`03`). Assignees are roles (mapped to people in the Meetings list).

| # | Task | Bucket | Default due | Owner | Labels |
|---|------|--------|-------------|-------|--------|
| 1 | Provision folder set & confirm links | Prep | B−25 | Coordinator | Recurring |
| 2 | Draft agenda v1 | Materials | B−20 | Liaison | Recurring |
| 3 | Send prep / working-session invites | Prep | B−20 | Coordinator | Recurring |
| 4 | Agenda-setting (owner TBD — not EC) | Review | committee-specific | Liaison | Chair approval |
| 5 | Collect feeder reports & recommendations | Materials | B−10 | Liaison | ⬛ if waiting |
| 6 | **Materials due** (all inputs in) | Materials | B−10 | Report owners | Recurring |
| 7 | Compile book *(checklist below)* | Materials | B−8 | Coordinator | Recurring |
| 8 | Chair review of agenda & book | Review | B−8 | Chair | Chair approval |
| 9 | Move finals to `Loaded to Portal` | Posted | B−7 | Coordinator | Consent item |
| 10 | Publish to WordPress portal | Posted | B−7 | Portal admin | External |
| 11 | Notify members: materials posted | Posted | B−7 | Coordinator | Recurring |
| 12 | F&A Wave-2 supplement *(board only)* | Posted | F&A+1 | Coordinator | Consent item |
| 13 | Final reminder + quorum/RSVP | Meeting Day | B−2 | Coordinator | Recurring |
| 14 | Run-of-show / tech check | Meeting Day | B−1 | Coordinator | Recurring |
| 15 | Draft minutes | Follow-up | B+5 | Liaison | Recurring |
| 16 | Chair approval of minutes | Follow-up | B+10 | Chair | Chair approval |
| 17 | Log decisions & create action items | Follow-up | B+1 | Liaison | Action item |

**Checklist inside task 7 "Compile book":** agenda final · prior minutes · consent items ·
F&A report · IC report · CAC/LIIC recommendations · BDC items (if any) · fund actions · book
paginated/bookmarked · PDF generated.

## E. How tasks get created
- **Flow 1** creates tasks 1–14 + 17 at provisioning, with due dates computed by the business-day
  engine (skips closures; see `08`).
- **Flow 5** creates tasks 15–16 (and one task #17 per logged decision) the day after the meeting.
- Tasks that depend on an upstream input carry the ⬛ label until the input lands; the materials
  reminder (Flow 2) nudges owners of open Materials-bucket tasks at B−10 and B−13.

## F. Adoption (the "get the team using Planner" part)
- **Single source for work:** if it's a meeting task, it lives in Planner — not email, not a side
  list. The flow seeding the board removes the "blank page" friction.
- **Weekly 15-min Planner stand-up** per active committee in its Teams channel (review Materials &
  Review buckets, clear blockers).
- **"My Tasks"** gives every staff member one cross-committee to-do view automatically.
- **Charts tab** in each plan shows by-bucket / by-assignee progress for the liaison at a glance.
- Keep labels few and meaningful so the board stays readable.

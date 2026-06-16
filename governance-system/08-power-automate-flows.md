# 08 · Power Automate Flows (hybrid)

Per the chosen **hybrid** approach: automate the repetitive, high-value steps; leave judgment and
low-frequency steps manual. The flows below need only **standard connectors** (SharePoint,
Planner, Outlook, Teams, Office 365 Users) — **no premium connectors required** to start.

> **Run as a service account** (e.g., `governance-bot@cacfonline.org`) with contribute rights to
> `Governing Board/` and membership in the Governance team, so flows don't depend on one person's
> login. Add a **"notify Coordinator on failure"** step to every flow.

## Prereqs: two SharePoint lists (the system's data spine)

### 1. `Governance Meetings` (one row per meeting) — see `data/meetings-list-schema.md`
Key columns: `Title`, `Committee`, `MeetingDate`, `MeetingType` (Board/Committee),
`FeedsMeetingID` (lookup to the downstream meeting), `Liaison`, `Chair`, `ReportOwners`,
`BoardFolderName`/`CommitteeYearFolder`, `MeetingFolderName`, `FolderURL`, `PlannerPlanID`,
`TeamsChannel`, `PortalPostDate`, `Status`, plus confirmed offsets
(`ProvisionLeadBiz`, `MaterialsDueLeadBiz`, `BookPostLeadBiz`, etc.) defaulted from `03`.

### 2. `Non-Working Days` — see `data/non-working-days-2026.csv`
Columns: `Date`, `Type` (`Office Closed` / `Reduced` / `Deep Work Week`), `Name`. Flows treat
`Office Closed` as non-business days; **Deep Work Week** days are business days for math but the
flows **don't send external reminders or schedule meetings** on them.

## Helper: `AddBusinessDays` (child flow)
Input: `startDate`, `offset` (negative = before). Logic: step one calendar day at a time toward
the target; skip Saturdays/Sundays and any `Non-Working Days` row of type `Office Closed`;
decrement the counter only on a working day; return when the counter hits zero. Every other flow
calls this so "B − 7 business days" is computed identically everywhere.

---

## Flow 1 — Meeting Provisioner  ✅ automate now
**Trigger:** Scheduled, daily 6:00 AM.
**For each** `Governance Meetings` row where `Status = Scheduled` and
`today == AddBusinessDays(MeetingDate, -ProvisionLeadBiz)`:
1. **Copy** the right `_TEMPLATE …` folder (`06`) into the destination; **rename** to
   `MeetingFolderName`.
2. **Move/seed** the agenda template into `…/Agenda/` (or `00 Agenda/`).
3. **Create Planner tasks** 1–14 + 17 (`07`); for each, set due =
   `AddBusinessDays(MeetingDate, offset)` and assign by role.
4. **Patch** the row: `FolderURL`, `PlannerPlanID`, `Status = Provisioned`.
5. **Post** a Teams kickoff in `TeamsChannel`: meeting date, folder link, Planner link,
   materials-due date.

## Flow 2 — Reminder & nudge engine  ✅ automate now
**Trigger:** Scheduled, daily 7:00 AM. Skip if today is `Office Closed` or `Deep Work Week`.
**For each** upcoming meeting, compute milestone dates via `AddBusinessDays` and act when today matches:
| Milestone | Action |
|-----------|--------|
| Materials-due − 3 biz | DM/email owners of **open** Materials-bucket Planner tasks |
| Materials-due (B−10) | Email liaison + report owners: "materials due today" |
| Book post (B−7) | Email members (or trigger portal-admin task) + Teams "materials posted" |
| B−2 | Final reminder + logistics to attendees; flag if RSVPs < quorum |
| B−1 | Day-before nudge |
Also: weekly digest to each liaison of open tasks in their plan.

## Flow 3 — Prep invitations  ◑ optional / phase 2
**Trigger:** after Flow 1 (or B−20). Create the Outlook **meeting invite** (if not already set)
and recurring **prep/working-session holds** for the prep window on owners' calendars. Left
optional because many liaisons prefer to send invites by hand.

## Flow 4 — Portal publish watcher  ◑ phase 2
**Trigger:** When a file is created in any `…/Loaded to Portal/` folder. Action: notify the portal
admin and complete the "Move finals to Loaded to Portal" Planner task. (Final WordPress publish
stays manual unless/until a WordPress connector is added — that would be premium/custom.)

## Flow 5 — Follow-up creator  ✅ automate now
**Trigger:** Scheduled, daily. **For each** meeting where `today == AddBusinessDays(MeetingDate, +1)`:
1. Create Planner tasks **15** (Draft minutes, due B+5) and **16** (Approve minutes, due B+10).
2. Post the **post-meeting checklist** in the Teams channel (`templates/meeting-package-checklist.md`).
3. Optionally read decisions from a quick "Decisions" form/list and create one **Action item**
   task per decision.
4. Set `Status = Follow-up`.

## What stays manual (by design, hybrid)
- Writing agenda/report/minutes content and deciding consent vs. action.
- The actual **WordPress portal publish** (until a connector is justified).
- Adding meeting-specific consent sections and **fund-specific** folders.
- Setting/locking dates — that's the liaison conversation, entered into the Meetings list.

## Build order
1. Lists (`Governance Meetings`, `Non-Working Days`) + `AddBusinessDays` child flow.
2. Flow 1 (provisioner) → pilot on **one** committee.
3. Flow 2 (reminders).
4. Flow 5 (follow-up).
5. Flows 3 & 4 once the core is trusted.

## Resilience
- Every flow: `Configure run after` → on failure, post to Coordinator + a `Flow Errors` channel.
- Idempotency: before creating folders/tasks, check existence (so a re-run doesn't duplicate).
- Keep the timeline numbers in the **list**, not hard-coded in flows, so liaisons can tune cadence
  without editing automation.

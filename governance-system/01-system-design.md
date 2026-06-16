# 01 · System Design

## Goals
1. **One standardized package** for every board and committee meeting — folders, agenda,
   consent items, tasks, reminders, minutes, and follow-up — so nothing depends on any one
   person remembering the steps.
2. **Respect the real calendar**: business days, CACF office closures, and Deep Work Weeks
   are first-class inputs, not afterthoughts.
3. **Make dependencies explicit** so committees that feed the board (or each other) meet with
   enough lead time to hit agenda deadlines.
4. **Move day-to-day prep into Teams** to get the team collaborating earlier and more often
   than SharePoint alone encourages — while keeping SharePoint as the document system of record.
5. **Get the team using Planner** by auto-generating the task board for every meeting, so
   Planner becomes the place work actually lives, not an extra chore.
6. **Automate the high-value, repetitive steps** (folder creation, reminders, follow-up task
   creation) and leave judgment steps to people.

## The platform stack and who owns what

| Layer | Tool | Role in the system |
|------|------|--------------------|
| **System of record (data)** | SharePoint **list**: *Governance Meetings* | The single source of truth: every meeting, its date, what it feeds, its folder/Planner links, and its portal-post date. Everything else reads from this. |
| **Document collaboration & storage** | SharePoint library `FoundationServer` → *Shared Documents* | Where working documents live (unchanged from today). The folder template is the standardized package. |
| **Engagement / prep front-end** | **Microsoft Teams** | A *CACF Governance* team with one channel per committee. The channel's Files tab points at the same SharePoint folders; a Planner tab shows the task board; prep chat and working sessions happen here. |
| **Task tracking** | **Microsoft Planner** | One plan per committee channel; standardized buckets and a task set generated per meeting from a template. |
| **Automation** | **Power Automate** (hybrid) | Provisions folders + tasks, computes business-day reminder dates, sends reminders, and creates follow-up tasks. See `08`. |
| **Scheduling & reminders to people** | **Outlook** (calendar + mail) | Meeting invites, prep-session holds, and reminder emails. |
| **External publishing** | **WordPress board portal** | Where final materials are shared with board/committee members. The SharePoint `Loaded to Portal` folder is the staging→publish gate. |
| **At-a-glance calendar** | Existing **calendar app** (this repo) | Optional: surface the governance cadence visually (it already renders CACF's annual calendar). Can read the same Meetings list. |

### Why Teams over "SharePoint only"
Teams sits *on top of* the SharePoint library you already use — a Teams channel's **Files** tab
is literally a folder in SharePoint. So adopting Teams does not migrate or duplicate documents;
it gives staff a faster, more social front door (chat, @mentions, a Planner tab, and a "Meet now"
button) to the exact same files. This is the lowest-risk way to "engage team members better than
SharePoint" without re-platforming. Details in `09`.

## Design principles
- **The Meetings list is the spine.** No date or dependency lives only in someone's head or only
  in a flow. If it isn't in the list, the automation can't act on it.
- **Cadence is owned by liaisons, executed by the system.** The system never decides *when* a
  committee meets; it reliably executes the dates liaisons set. (See `10`.)
- **Business days, not calendar days.** Reminder and deadline math counts working days and skips
  the *Non-Working Days* list (`data/non-working-days-2026.csv`). Deep Work Weeks are handled
  explicitly (no meetings/external sends; ideal for board-book drafting).
- **Templated, not bespoke.** Every meeting gets the same folder set, the same task set, and the
  same package checklist, so the board portal and the team see consistent structure every time.
- **Automate the boring, keep the judgment.** Folder creation, due-date math, reminders, and
  follow-up task creation are automated. Agenda content, what goes on consent vs. action,
  recommendations, and minutes remain human work.
- **Hybrid by choice.** We automate where a flow clearly saves repeated effort and is robust;
  we leave manual the steps that are infrequent, high-touch, or risky to automate.

## Roles
| Role | Responsibility in the system |
|------|------------------------------|
| **Governance Coordinator** (system owner) | Owns the Meetings list, the folder template, the Planner template, and the flows. First responder when something doesn't fire. |
| **Committee Liaison** (one per committee) | Owns that committee's cadence, dependencies, agenda, materials, and follow-up. Completes the intake worksheet; sets dates. |
| **Committee Chair** | Approves agenda and minutes; the system routes drafts to them at defined points. |
| **Staff leads / report owners** | Produce the inputs (financials, investment report, recommendations) by the materials-due milestone. |
| **Portal admin** | Publishes finalized materials from `Loaded to Portal` to the WordPress portal. |
| **IT / M365 admin** | Owns licensing, the service account for flows, and Teams/SharePoint permissions. |

## What "done" looks like for a single meeting
1. Meeting exists in the Meetings list with its date and dependencies (set by liaison).
2. ~5 weeks out: folder set + Planner tasks provisioned; Teams kickoff posted; prep invites sent.
3. Prep window: materials drafted in Teams/SharePoint; tasks tracked in Planner.
4. Publish gate: finalized docs moved to `Loaded to Portal`; board portal updated.
5. Reminders fire automatically at each milestone (business-day aware).
6. Meeting happens.
7. Day after: follow-up tasks (minutes, action items) auto-created; decisions logged.
8. Minutes approved; action items tracked to closure in Planner; folder archived by year.

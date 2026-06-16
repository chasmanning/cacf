# `Governance Meetings` — SharePoint list schema

The single source of truth. One item per meeting. The flows (`08`) read/write these columns.
Create as a SharePoint list on `FoundationServer` (or a dedicated Governance site).

| Column | Type | Notes |
|--------|------|-------|
| `Title` | Single line | e.g., `F&A 2026-09-15` |
| `MeetingID` | Number/auto | Stable key for `FeedsMeetingID` lookups |
| `Committee` | Choice | Board, F&A, EC, BDC, CAC, LIIC, IC, Tier-2… |
| `Abbr` | Single line | F&A, EC, … |
| `MeetingDate` | Date | The meeting date `B` |
| `MeetingTime` | Single line | start–end |
| `MeetingType` | Choice | `Board` / `Committee` |
| `Status` | Choice | Scheduled → Provisioned → Follow-up → Complete (+ Tentative) |
| `Liaison` | Person | Owns cadence/agenda/minutes |
| `Chair` | Person | Approves agenda/minutes |
| `ReportOwners` | Person (multi) | Materials-due reminders target these |
| `FeedsMeetingID` | Lookup → MeetingID | The downstream meeting this one feeds (dependency) |
| `RequiredLeadBiz` | Number | Business days this must precede the downstream meeting |
| `BoardFolderName` | Single line | e.g., `BOD 09.22.2026` (board) |
| `CommitteeYearFolder` | Single line | e.g., `F&A 2026` (committee) |
| `MeetingFolderName` | Single line | e.g., `2026-09-15 F&A Meeting` |
| `FolderURL` | Hyperlink | Written back by Flow 1 |
| `PlannerPlanID` / `PlannerURL` | Single line / Hyperlink | The committee's plan |
| `TeamsChannel` | Single line | Channel to post into |
| `PortalPostDate` | Date | When materials went to WordPress |
| `ConsentAgenda` | Yes/No | Does this meeting use a consent agenda |
| **Lead-time offsets** (defaults from `03`, override per committee): | | |
| `ProvisionLeadBiz` | Number | default 25 |
| `AgendaV1LeadBiz` | Number | default 20 |
| `MaterialsDueLeadBiz` | Number | default 10 |
| `BookPostLeadBiz` | Number | default 7 |
| `FinalReminderLeadBiz` | Number | default 2 |
| `MinutesDraftLagBiz` | Number | default 5 |
| `MinutesApproveLagBiz` | Number | default 10 |

**Why offsets live here, not in flows:** liaisons can tune a committee's cadence by editing the
list — no flow edits, no developer. The flows compute every milestone as
`AddBusinessDays(MeetingDate, ±offset)` against the `Non-Working Days` list.

> Companion list **`Non-Working Days`** (`data/non-working-days-2026.csv`): columns
> `StartDate, EndDate, Type, Name, CountsAsBusinessDay, BlocksMeetings`.

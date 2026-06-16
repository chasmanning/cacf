# Email & Teams Message Templates

Short, reusable copy for the reminder/follow-up flows (`08`) and for manual sends. Tokens in
`{{ }}` are filled from the `Governance Meetings` list. Keep them brief.

---

## 1. Kickoff (Teams channel post — Flow 1, at provision)
**{{Committee}} — {{MeetingDate}} prep is open**
The folder and task board for our {{MeetingDate}} meeting are ready.
📁 Folder: {{FolderURL}} · ✅ Planner: {{PlannerURL}}
**Materials due: {{MaterialsDueDate}}.** Owners, your tasks are assigned in Planner. Questions → reply here.

## 2. Prep / working-session invite (Outlook — Flow 3 / manual)
**Subject:** {{Committee}} {{MeetingDate}} — prep working session
Holding {{PrepSessionTime}} to draft the agenda and materials together (in the {{Committee}} Teams
channel). Agenda doc: {{AgendaLink}}. Bring updates on your assigned items.

## 3. Materials-due nudge (to report owners — Flow 2, materials-due − 3 biz)
**Subject:** Reminder: {{Committee}} materials due {{MaterialsDueDate}}
Your item for the {{MeetingDate}} meeting is due **{{MaterialsDueDate}}**. Open task: {{TaskLink}}.
Drop drafts in {{WorkingDocsURL}}. Reply if you're blocked.

## 4. Materials posted (to members — Flow 2, at book post B−7)
**Subject:** {{Committee}} {{MeetingDate}} — materials posted to the portal
The {{Body}} book for **{{MeetingDate}}** is posted to the board portal: {{PortalLink}}.
Please review before the meeting. {{#Board}}An F&A supplement will follow after F&A meets on
{{FA_Date}}.{{/Board}} Agenda highlights: {{AgendaHighlights}}.

## 5. Final reminder (to attendees — Flow 2, B−2 biz)
**Subject:** {{Committee}} meeting {{MeetingDate}} — final details
Meeting **{{MeetingDate}} {{Time}}**, {{Location}}. Materials: {{PortalLink}}.
Please confirm attendance (quorum check). Consent agenda: {{ConsentSummary}}.

## 6. Day-before (Teams + email — Flow 2, B−1 biz)
**Tomorrow: {{Committee}} {{Time}}.** Join/room: {{Location}}. Book: {{PortalLink}}.
Run-of-show: {{AgendaLink}}.

## 7. Post-meeting follow-up (Teams channel — Flow 5, B+1 biz)
**{{Committee}} {{MeetingDate}} — follow-up**
Thanks all. Tasks created in Planner: **Draft minutes** (due {{MinutesDraftDate}}), **Approve
minutes** (due {{MinutesApproveDate}}), and one task per decision. Action owners, see {{PlannerURL}}.

## 8. Minutes for approval (to chair — manual / Flow)
**Subject:** {{Committee}} {{MeetingDate}} minutes — your review
Draft minutes attached/here: {{MinutesLink}}. Please review by {{MinutesApproveDate}}. Once
approved, they're queued for the next meeting's consent agenda.

---
> Tone: warm, concise, action-first. Always include the date, the link, and the one thing the
> reader must do. Reminders also post to the committee's Teams channel so they're not email-only.

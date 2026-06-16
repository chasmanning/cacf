# 09 · Teams Collaboration Layer

The aim: move pre-meeting collaboration into **Teams** so staff engage earlier and more often
than SharePoint alone invites — **without migrating or duplicating documents.**

## The key principle: Teams *surfaces* the existing library, it doesn't replace it
A Teams team comes with its *own* SharePoint site, but CACF's documents live in the established
**`FoundationServer`** site. **Do not move files into the Teams group site** — that fragments the
record. Instead, in each committee channel, **pin the existing FoundationServer folder as a
SharePoint/Document-Library tab** (and/or "Add shortcut to OneDrive"). Staff get a Teams front
door; the system of record stays exactly where it is.

## Structure: one team, a channel per committee
**Team:** `CACF Governance` (private; members = staff + committee liaisons, **not** board members).

| Channel | Type | Pinned tabs |
|---------|------|-------------|
| General / Announcements | Standard | — |
| Governing Board | Standard | Files→`Governing Board/20XX Documents`; Planner (Board plan); Agenda (Loop/OneNote) |
| Finance & Audit | Standard | Files→`Committees/Finance & Audit Committee`; Planner; Agenda |
| Investment | Standard | Files→IC folder (confirm); Planner; Agenda |
| Local Impact Investing | Standard | Files→`…/Local Impact Investing Committee`; Planner; Agenda |
| Community Advisory | Standard | Files→`…/Community Advisory Committee`; Planner; Agenda |
| **Executive** | **Private** | sensitive (personnel/strategy) — restrict membership |
| **Board Development** | **Private** | sensitive (candidate slates) — restrict membership |
| Flow Errors | Standard | automation failure notices (`08`) |

> Use **Private channels** for EC and BDC because their materials (personnel, strategy, candidate
> slates) shouldn't be visible to the whole governance team.

## Per-channel tabs (the standard set)
1. **Files** → shortcut/library pointing at that committee's **FoundationServer** folder.
2. **Planner** → that committee's plan (`07`).
3. **Agenda / Notes** → a **Loop component** or OneNote page for live, co-authored agenda drafting
   (everyone edits the same agenda in real time instead of emailing versions).

## How prep actually runs in Teams
- **Kickoff:** Flow 1 posts the meeting kickoff in the channel at provisioning.
- **Working sessions:** start a **channel meeting** ("Meet") for prep; recording, chat, and notes
  stay attached to the channel in context.
- **Drafting:** co-author the agenda in the Loop/OneNote tab; draft documents in the Files tab
  (which is the SharePoint `Working Docs` folder).
- **Decisions & tasks live in Planner**, not buried in chat. Use chat for discussion, Planner for
  commitments — so nothing important is lost in scrollback.
- **Reminders** from Flow 2 post into the channel as well as email.

## Rollout (pilot first)
1. Stand up the team + two pilot channels — suggest **Finance & Audit** (clear cadence/dependency)
   plus one lighter committee.
2. Pin tabs to the existing FoundationServer folders; confirm staff can edit through Teams.
3. Run one full meeting cycle in Teams with Flows 1–2.
4. Debrief with the liaisons, adjust, then add the remaining channels.

## Etiquette / governance
- Members = staff + liaisons; **board/committee members stay on the WordPress portal** (no Teams
  access needed — matches today's SharePoint-internal model).
- One channel per committee; keep threads on-topic by replying within a post.
- Sensitive committees on Private channels (above).
- The Files tab is a **window into SharePoint**, so existing permissions and retention still apply.

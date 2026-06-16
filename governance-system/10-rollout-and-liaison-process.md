# 10 · Rollout & Collaborative Liaison Process

**Start here for "how do we actually stand this up."** The system executes the cadence; the
**liaisons own the cadence**. This file is the process for building it together.

## The non-negotiable: cadence is set with liaisons
We do **not** lock dates or lead times by extrapolating from the current calendar. For every
committee, the liaison confirms (a) the meeting dates, (b) what their committee feeds and the
required lead time, and (c) their package contents — using the intake worksheet
(`templates/committee-liaison-intake-worksheet.md`). Only then does it enter the Meetings list.

## Roles to assign (fill in)
| Role | Person | Notes |
|------|--------|-------|
| Governance Coordinator (system owner) | _____ | Owns lists, templates, flows |
| Portal admin | _____ | WordPress publishing |
| IT / M365 admin | _____ | Service account, licensing, permissions |
| Liaison — Governing Board | _____ | |
| Liaison — Finance & Audit | _____ | |
| Liaison — Executive | _____ | |
| Liaison — Board Development | _____ | |
| Liaison — Community Advisory | _____ | |
| Liaison — Local Impact Investing | _____ | |
| Liaison — Investment | _____ | confirmed standing committee (`Committees/Investment Committee`) |
| Liaison(s) — Tier 2 (BAMA GC, MIB, scholarship) | _____ | opt-in |

## Per-committee intake workflow
1. **Liaison completes the intake worksheet** for their committee.
2. **Coordinator reviews** with the liaison; resolves dependencies that touch other committees.
3. **Coordinator enters** the confirmed dates/offsets into the `Governance Meetings` list.
4. **System provisions** automatically from there (`08`).
5. **Debrief after the first cycle**; tune offsets in the list (not the flows).

## The cadence-setting working session (validates dependencies + sets 2027)
Run this once with **all Tier-1 liaisons together** (dependencies cross committees, so set them
in one room, not in isolation).

- **Inputs:** the dependency map (`02`), the lifecycle defaults (`03`), the 2027 constraint
  calendar (`05`), and CACF's officially adopted 2027 holiday schedule + chosen Deep Work Weeks.
- **Agenda:**
  1. Validate each dependency link in `02` (evidenced + proposed) — confirm or correct.
  2. Confirm the lead-time defaults in `03` (board-book post, materials-due, provisioning) or set
     CACF's own numbers. Resolve the **F&A two-wave vs. move-earlier** question.
  3. Set **2027 Board dates first**, then each feeder committee's date against its confirmed lead
     time, checking the 2027 constraint calendar.
  4. Decide whether to **align 2027 Deep Work Weeks to the board-book build windows**.
  5. Confirm Tier-2 opt-ins.
- **Outputs:** a completed `05` worksheet + intake worksheets → rows in the Meetings list.

## Phased rollout (sequence, not assumed dates)
Uses CACF's **already-scheduled** real cycles as natural pilots — no new dates invented.

| Phase | What | Natural milestone |
|-------|------|-------------------|
| **0 · Foundations** | Build the two lists, `AddBusinessDays`, the folder templates, and one Planner plan. Set up the Governance team + pilot channels. Create the service account with IT. | before the next cycle you choose to pilot |
| **1 · Pilot one committee** | Run Flows 1–2 for a single committee through one full cycle; co-author the agenda in Teams; track in Planner. Suggest **Finance & Audit** (clear dependency) — e.g., the **Sep 22** board cycle's F&A run. | an upcoming real cycle |
| **2 · Expand Tier 1** | Add remaining committee channels/plans; onboard each liaison via intake worksheet; provision all Tier-1 meetings. | after a clean pilot |
| **3 · Follow-up + planning** | Turn on Flow 5 (follow-up) and the weekly Planner stand-ups; run the **cadence-setting working session** to lock **2027** and validate dependencies. | before year-end (mind the **Dec 15 → Winter Reset** crunch) |
| **4 · Phase-2 automation** | Add Flows 3 (invites) and 4 (portal watcher); optional leadership roll-up; optional sync to the calendar app. | when the core is trusted |

## RACI (summary)
| Activity | Liaison | Coordinator | Chair | Portal admin | IT |
|----------|:------:|:-----------:|:-----:|:------------:|:--:|
| Set dates / cadence | **A/R** | C | C | I | I |
| Maintain Meetings list | C | **A/R** | I | I | I |
| Agenda & report content | **A/R** | C | A | I | — |
| Build/own flows | I | **A/R** | — | I | C |
| Publish to portal | I | C | I | **A/R** | — |
| Minutes | **A/R** | C | **A** | I | — |
| Service account / permissions | I | C | — | I | **A/R** |

## Open items to close (carried from README)
- [ ] Confirm lead-time defaults (`03`) / the F&A two-wave question.
- [ ] Confirm/correct each **proposed** dependency in `02`.
- [x] Investment Committee confirmed as a standing committee (`Committees/Investment Committee/YYYY`).
- [x] Acronyms resolved: MIB = Mothers in Bloom; CSP = Charlottesville Scholarship Program.
- [x] "Bama" confirmed as an internal grant workflow (not a committee) — out of scope.
- [ ] Confirm **who sets the board agenda** (per liaison, not EC) and its lead time.
- [ ] Tier-2 (Mothers in Bloom, Charlottesville Scholarship Program, award panels) deferred to a later phase; onboard when liaisons opt in.
- [ ] Assign every role above; have each liaison complete the intake worksheet.
- [ ] IT: Power Automate licensing + service account.
- [ ] Run the cadence-setting working session → 2027 locked.

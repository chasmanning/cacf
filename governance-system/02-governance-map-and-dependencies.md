# 02 · Governance Map & Dependencies

> **Read this as a draft to validate, not a finding.** Committee identities and the
> SharePoint structure are confirmed from the live `FoundationServer` site. The *dependency
> links* and *lead times* are marked **EVIDENCED** (visible in the data) or **PROPOSED**
> (a reasonable starting point to confirm with the liaison). Nothing here sets a cadence.

## The bodies

### Tier 1 — Governing Board and standing committees
Confirmed from `Governing Board/Committees/` on SharePoint unless noted.

| Body | Acronym | SharePoint folder | Notes |
|------|---------|-------------------|-------|
| Governing Board | BOD / "Gov Brd" | `Governing Board/20XX Documents/BOD MM.DD.YYYY` | Quarterly + a retreat (2026: retreat Feb 13; meetings Mar 24, Jun 23, Sep 22, Dec 15). |
| Finance & Audit Committee | F&A | `Committees/Finance & Audit Committee/F&A 20XX` | 2026: Mar 17, Jun 16, Sep 15, Dec 8. |
| Executive Committee | EC | `Committees/Executive Committee/EC 20XX` | 2026: Feb 24, May 28, Aug 25, Dec 3. |
| Board Development Committee | BDC | `Committees/Board Development Committee/BDC 20XX` | Recruitment/nominations; "Open Call," "Candidate Slates." Dates not in current calendar — **TBD with liaison.** |
| Community Advisory Committee | CAC | `Committees/Community Advisory Committee` | 2026: Feb 24 (w/ EC); May, Aug (retreat), Nov are **tentative** on the calendar. |
| Local Impact Investing Committee | LIIC | `Committees/Local Impact Investing Committee` | 2026: May 13 confirmed; Aug, Nov tentative. |
| Investment Committee | IC | `Committees/Investment Committee/YYYY` | **Confirmed** distinct standing committee (year-only subfolders, e.g. `2026`). 2026: Mar 6, Jun 4, Aug 13, Dec 3. |

### Tier 2 — Program, fund & scholarship committees
These also deserve a standardized package; cadence and ownership **TBD with liaison.**

| Body | Acronym | Evidence | Open question |
|------|---------|----------|---------------|
| "Bama" (grant committee?) | — | Calendar: GC mtg Mar 27 & Oct 2 (tentative); site visits Feb/Mar/Aug/Sep; checks May 11, Nov 16. | **No SharePoint folder named "Bama" found — confirm what this is, where its docs live, and the *site-visit → GC meeting → check-run* flow.** |
| Mothers in Bloom | MIB | `Grantmaking Programs/Community Impact Advised Programs/Mothers in Bloom`. Calendar: MIB Mtg Mar, Jun, Sep. | A Community-Impact **advised grant program** (not a board committee). Confirm liaison & whether it wants the standardized package. |
| Charlottesville Scholarship Program + scholarship panels | CSP | Calendar: CSP (Mar), All Scholarship (Apr), award events Apr–May (Allen, Bragg, Nelson, Buckingham/Fluvanna, Couric). | Confirm SharePoint home (not under "Scholarship") and which are standing committees vs. one-time award panels; who liaises. |

## Acronym legend (with confidence)
| Acronym | Expansion | Confidence |
|---------|-----------|-----------|
| BOD | Board of Directors / Governing Board | High |
| F&A | Finance & Audit Committee | High (folder) |
| EC | Executive Committee | High (folder) |
| BDC | Board Development Committee | High (folder) |
| CAC | Community Advisory Committee | High (folder) |
| LIIC | Local Impact Investing Committee | High (folder) |
| IC | Investment Committee | **Confirmed** (own folder) |
| MIB | Mothers in Bloom | **Confirmed** |
| CSP | Charlottesville Scholarship Program | **Confirmed** |
| "Bama" | *calendar category — identity to confirm* | **To confirm** (no folder by that name) |

## Dependency map (PROPOSED — validate with each liaison)

The questions the system needs answered for each committee:
1. **Frequency & dates** — when does it meet? (liaison-owned)
2. **Feeds** — which downstream meeting(s) consume its output (report, recommendation, minutes, slate)?
3. **Required gap** — how many *business days* before that downstream meeting must this one happen?
4. **Inputs it waits on** — what upstream data/decision must arrive first (e.g., FEG quarterly performance)?
5. **Materials-due lead** — how long before its *own* meeting must materials be final?

```mermaid
flowchart LR
    FEG[FEG quarterly\ninvestment data\n(external, lags qtr-end)] --> IC[Investment Committee]
    IC -- investment performance report --> FA[Finance & Audit]
    IC -- investment report --> CONSENT
    FA -- financials / audit / budget --> CONSENT[Board Consent Agenda]
    EC[Executive Committee] -- sets / approves agenda --> BOOK[Board Book]
    CAC[Community Advisory] -- community input / recs --> CONSENT
    LIIC[Local Impact Investing] -- impact-investment recs --> CONSENT
    BDC[Board Development] -- slate / governance --> BOARD
    CONSENT --> BOOK
    BOOK -- post to WordPress portal --> BOARD[Governing Board meeting]
    classDef ext fill:#f6e9dd,stroke:#b5642a;
    class FEG ext;
```

### Link-by-link

| Dependency | Status | Basis / what to confirm |
|------------|--------|-------------------------|
| **F&A → Board** | **EVIDENCED** | In all four 2026 quarters F&A sits exactly **7 calendar days** before the Board (Mar 17→24, Jun 16→23, Sep 15→22, Dec 8→15). Confirm with F&A liaison whether 7 days is *intentional policy* before encoding it. **Tension:** 7 calendar days collides with a 7-*business*-day board-book post (see `03`). |
| **IC → F&A / Board** | **PROPOSED** | IC precedes F&A/Board each quarter (e.g., Mar 6 → F&A Mar 17). Likely supplies investment performance for the finance review and board consent. Confirm with IC liaison; confirm FEG data-availability lag. |
| **EC → Board (agenda-setting)** | **PROPOSED** | EC precedes each Board by ~3–4 weeks (Feb 24→Mar 24; Aug 25→Sep 22), the classic agenda-setting role; Dec 3→Dec 15 is tighter (~12 days). Confirm EC's role in finalizing the agenda. |
| **CAC → Board** | **PROPOSED** | Community input/recommendations to the board. Several 2026 CAC dates are *tentative* — liaison to set. |
| **LIIC → Board / F&A** | **PROPOSED** | Impact-investment recommendations likely need F&A/Board approval. Confirm the approval path. |
| **BDC → Board (annual meeting/slate)** | **PROPOSED** | Recruitment → "Open Call" → "Candidate Slates" → board vote (likely the annual/December meeting). Confirm timing. |
| **Working Docs → `Loaded to Portal` → WordPress** | **EVIDENCED** | The `Consent Agenda/.../Working Docs` and `.../Loaded to Portal` folders already exist on the Jun & Mar 2026 board folders — this is the staging→publish gate. |
| **BAMA: site visits → GC meeting → check run** | **PROPOSED** | Calendar shows site visits, then GC meetings, then "checks." Confirm with fund liaison. |

## Calendar constraints every dependency must respect
The cadence-setting conversation (`05`, `10`) is bounded by these CACF realities (2026):

- **Office closed (no work):** MLK Jan 19 · Memorial Day May 25 · Juneteenth Jun 19 ·
  Independence (obs) Jul 3 · Labor Day Sep 7 · Election Day Nov 3 · Thanksgiving Nov 25–27 ·
  Winter Reset **Dec 21 – Jan 3**.
- **School closed / office open (reduced capacity):** Spring Break Apr 6–10 · Indigenous
  Peoples Day Oct 12 · Veterans Day Nov 11 · scattered teacher workdays.
- **Deep Work Weeks (heads-down; no meetings/external sends):** Mar 17–19 · **Jun 8–11** ·
  **Sep 8–10**. *Observation:* the Jun and Sep Deep Work Weeks fall exactly where the board
  book must be built (7 business days before the Jun 23 / Sep 22 board). Treat them as
  **board-book build sprints**. (Mar 17–19 overlaps F&A Mar 17 — confirm that's intentional.)

These three categories live in `data/non-working-days-2026.csv` and are what the automation
counts against when it computes reminder/deadline dates (`08`).

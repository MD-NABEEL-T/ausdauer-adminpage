# Attendance Dashboard — Notes

Plain-language summary of what this project does and what's been done to it.
Written so I can explain it to my team/interviewer without re-reading code.

## What it is
A dashboard to check people in at an event. You search for someone, open
their card, and mark them Present or Absent. Built with React + Vite +
Tailwind. No backend yet — all data lives in a JS file and resets if you
refresh the page.

## Where things live
- `src/pages/Dashboard.jsx` — the main page. Owns all the state (the list
  of people, what's typed in search, which filter is active, who's
  selected). Everything else just displays what this file tells it to.
- `src/components/` — each piece of UI (search bar, one person's card,
  the stat boxes, the "add person" popup, the side panel that opens when
  you click someone).
- `src/data/users.real.js` — the actual data. 28 real event registrations,
  converted from an Excel sheet a teammate sent me.

## How the real data got in here
Someone sent me `mockdata.xlsx` with real sign-ups (name, email, phone,
college/company, age, etc.) and said "change the data" — meaning: stop
using fake placeholder people, use the real ones.

Problem: the dummy data I started with was shaped like *employee* data
(ID number + department). The real sheet is *event registration* data —
totally different fields (booking ID, college, company, ticket count).
So I couldn't just paste it in — I had to:

1. Write a script that reads the Excel file and reshapes each row into
   the format my components expect.
2. Update the 4 components that were hardcoded to expect the old field
   names (`UserCard`, `AttendanceDrawer`, `AddRegistrationModal`,
   `Dashboard`) so they use the real field names instead.
3. Clean up junk — some people typed "NA" or "-" into fields instead of
   leaving them blank. Those now count as empty instead of literally
   showing "NA" on screen.

If a new version of the sheet ever comes in, I re-run the script — it's
not a live connection to Excel.

## Small things I noticed and made a judgment call on
- The Excel sheet has some rows colored green/orange/yellow. I don't
  know what the colors mean and neither did the person who sent it —
  so instead of guessing, I kept the color as extra data (`sheetHighlight`)
  and show it as a small dot, without saying what it means. Need to ask
  whoever colored the sheet before this goes live for real.
- One row (Ashwatthama) is missing a booking ID and a few other fields —
  looks like an incomplete/abandoned form submission on their end, not
  something I broke.
- "New today" used to be a fake hardcoded number. Now it's calculated
  for real from each person's actual registration timestamp.

## What I added on top of the raw data swap
- **Status filter** — All / Present / Absent buttons next to search, so
  you can quickly see just who hasn't checked in yet.
- **Detail view** — clicking someone now shows age, college, startup
  status, ticket count, etc. in the side panel (kept off the main list
  so the list stays easy to scan).

## Known limitation
Nothing is saved anywhere permanent yet. Marking someone Present and
refreshing the page will undo it. That's the next real problem to solve
if this needs to survive the actual event (needs a backend or at least
localStorage).
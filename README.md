# Investor Marketing Dashboard

This repository now includes a lightweight marketing dashboard that organizes the
current investor pipeline for the **Email Intro A107** program. The dashboard is
backed by a curated data set and offers drop-down style chips so you can mix and
match filters across approval status, stage, and investment focus areas.

## Getting started

1. Open `dashboard.html` in any modern browser.
2. Use the status/stage/focus chips to narrow down the investor cards. Each chip
   behaves like a dropdown toggle—activate multiple chips to stack filters and
   click them again to clear.
3. The **Email Intro Cohort A107** list auto-populates with every investor whose
   status is set to `Approved`, making it easy to build your next outreach
   sequence.

The underlying data lives in [`data/investors.json`](data/investors.json) so you
can refresh contact information or add new investors without touching the UI.

# Matchbook

Matchbook is a lightweight MLBB tournament stat book. The public site is served at `/`, and its restricted stats-entry workspace is at `/admin/`.

## Pages

- `/` — read-only tournament results, player leaderboard, and hero trends.
- `/admin/` — game entry, archive, and backup tools. It currently accepts `admin` as both the username and password.

## Important limitation

This repository is a static prototype. The `/admin/` login is a **temporary visual gate only**: its check runs in the visitor's browser, so it must not be considered secure on a public GitHub Pages site. It is suitable only for a private demo.

Before recording real tournament results publicly, move the data and authentication to a hosted backend. That will enable secure admin-only entry and let all viewers see the same shared statistics.

## GitHub Pages

Publish this folder as the GitHub Pages source. GitHub Pages will serve `index.html` at the site root and `admin/index.html` at `/admin/`.

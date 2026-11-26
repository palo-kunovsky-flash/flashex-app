# Flashex Data Handling and Security Statement

Last updated: 26 November 2026 · Applies to Flashex 0.7 and later

This statement is for organisations that assess Flashex before their people
use it, for example where work involves financial, customer or
licensed third-party data. It describes what Flashex does with data, where
data is kept and every network connection Flashex makes. The full,
feature-by-feature list is on the
[privacy page](https://palo-kunovsky-flash.github.io/flashex-app/privacy.html).

## 1. Summary

- **Flashex is a desktop application that runs entirely on the user's
  computer.** It is not a cloud service. There is no Flashex account, no
  Flashex server that receives user data, and no sign-up.
- **Flashex has no telemetry, no analytics and no crash reporting.** It sends
  nothing about the user, their work, their files or their terminals to the
  provider or to anyone else.
- **The provider never has access to user data.** The provider (see
  section 9) runs no infrastructure that user data passes through. Releases
  are downloaded from GitHub.
- **Flashex does not process data on anyone's behalf.** Data shown in or
  produced by its terminals stays on the user's computer, unless the user or
  a program the user runs sends it elsewhere, or the user turns on one of the
  optional features in section 4.
- **Every optional connection that can carry user content is off by default**
  and can be turned off in `config.toml` (section 7).

## 2. What Flashex is

Flashex is a terminal application for macOS, Windows and Linux, built for
running AI coding agents (such as Claude Code, Codex or Gemini CLI). It
shows terminals, an editor, a browser panel and dashboards. It is
distributed in binary form only.

AI agents are **separate programs** that the user installs and signs in to
on their own, under that provider's own terms. Flashex starts them in its
terminals but does not route, proxy or inspect their network traffic. What
an agent sends to its provider (code, files, command output) is decided by
that agent, its settings and its provider's terms, not by Flashex.

## 3. Data kept on the computer

Flashex stores its files in the user's own folders, readable only by that
user. On macOS:

| Data | Where | Notes |
|---|---|---|
| Settings | `~/.config/flashex/config.toml` | Plain text |
| Session layout, unsaved editor text, command history, todos, notes | `~/Library/Application Support/flashex/` | Plain files, user-only permissions |
| Terminal output | Memory of the Flashex keeper process | Kept while the terminal is open so it survives a restart of the app; not written to disk |
| Local copies of artifacts (pages an agent published or showed) | `~/Library/Application Support/flashex/` | Can be turned off (section 7) |
| Vault (secrets) | `~/Library/Application Support/flashex/vault/vault.fxv` | Encrypted with XChaCha20-Poly1305, key from the vault password through Argon2id; never in the cloud |
| Logs | `~/Library/Logs/flashex/` | Warnings and errors only; no terminal content |

Flashex reads AI agents' own local transcript files (for example
`~/.claude/projects`) to show dashboards and a chat view. For the Usage
dashboard it keeps only timestamps, model names, token counts and session
ids, never message text.

Command lines that look like they contain a secret are never saved in the
session or history.

## 4. Network connections

These are all the connections Flashex makes. None of them goes to a server
of the provider.

**On by default, carrying no user content:**

| Connection | Purpose | How to turn off |
|---|---|---|
| `api.github.com` and GitHub release files | Check for and download updates, at most once a day | `[updates] check = false` |

**Only when the user starts them:**

| Connection | Purpose | How to turn off |
|---|---|---|
| Web pages in the browser panel; DuckDuckGo for typed searches | Pages the user opens | `[browser] search_url = ""` for searches |
| Git fetch, pull and push | With the user's own git and credentials | Not started by Flashex unless `[git] autofetch_minutes` is set |
| Language servers | Programs already on the computer, run locally | `[lsp] enabled = false` |
| ssh to remote hosts | Remote terminals the user opens, with the user's own ssh | `[remote] enabled = false` |

**Optional features, off by default, that can carry user content:**

| Feature | What leaves the computer, and to where | How to turn off |
|---|---|---|
| AI help (`#` prompts, Explain, Fix) | The typed text, or one command block's output (trimmed, with passwords, tokens and keys masked), to the AI provider the user chose | `[ai] enabled = false` |
| Remote Access › Phones | Terminals, agent chats and notifications, to the user's own paired phones, only inside the user's private Tailscale network; nothing is open to the internet | `[remote_access] enabled = false` |
| Phone notifications | The notification text, end-to-end encrypted, through Apple's or Google's push service (the service sees when, not what) | `[remote_access] push = "off"` |
| Remote Access › Computers (Sync) | Todo lists, to the user's own paired computers in their Tailscale network, encrypted in transit and each computer proved by its own key | `[remote_access] computers = false`, `[sync] todos = false` |
| Duplicate cleanup of synced todos | The todo items, to Claude Code (`claude -p`) under the user's own login, or to the user's own command | `[sync] dedupe = "off"` (the default) |
| Live note sharing | One note, to the people the user lets in, only inside the user's Tailscale network | Revoke the link; nothing listens without one |
| Games with others | Game moves only, inside the user's Tailscale network (or the local network, only if turned on for one game) | Do not open a game lobby |
| Artifacts on claude.ai | Pages published to the user's own claude.ai account, with that account's login: on Refresh copy, or (from Flashex 0.7.6) when a collecting account is set | `[agents] artifacts = "local"`, `[agents] local_artifacts = false` |
| Claude usage and status | Requests to `api.anthropic.com` (usage only) and `status.claude.com`; no user content | `[agents] usage_api = false`, `claude_switcher = false`, `claude_status = false` |
| Public IP on the System dashboard | A request to `api.ipify.org`; no user content | `[dashboards] public_ip = false` |

## 5. Security measures

- The `flashex` command talks to the app over a local socket only the user can
  open. `[api] enabled = false` turns it off.
- Programs in a terminal can write to the clipboard but can never read it.
- The Vault's values are never reachable from a phone, and an agent gets a
  secret only inside the command it runs, never as text it can read.
- Remote Access pairs each phone and computer with its own key; only devices
  in the user's Tailscale network can reach it.
- Updates are checked against Flashex's own signature, their exact size and
  SHA-256, and the new app's code signature before anything is replaced.

## 6. What Flashex does not do

- It does not send terminal content, files, source code or agent
  conversations to the provider, ever.
- It does not upload anything to a cloud service of its own (there is none).
- It does not read or change data in the user's financial, banking or other
  business systems. Any such access is made by the programs and agents the
  user runs, with the user's own credentials.
- It does not sell, share or use any data for advertising or training.

## 7. Recommended settings for regulated data

Where an organisation's obligations (for example to data providers or
financial-data aggregators) require that data stays on the computer, this
in `config.toml` turns off every optional feature that can send content
elsewhere:

```toml
[ai]
enabled = false

[remote_access]
enabled = false
computers = false
push = "off"

[sync]
todos = false
dedupe = "off"

[agents]
artifacts = "local"
local_artifacts = false
usage_api = false
claude_switcher = false
claude_status = false

[dashboards]
public_ip = false

[browser]
search_url = ""
```

The organisation remains responsible for how its people configure and use
the AI agents they run in Flashex, which is governed by each agent
provider's terms and settings.

## 8. Changes

Each release lists its changes in [CHANGELOG.md](CHANGELOG.md). A change to
what Flashex sends or keeps is described there and on the privacy page.

## 9. Provider and contact

Flashex is made and provided by Palo Kunovský, an individual in the Slovak
Republic, free of charge.

Questions about this statement: palo.kunovsky@gmail.com, or an issue at
<https://github.com/palo-kunovsky-flash/flashex-app/issues>.

This statement describes how Flashex works. It is not a contract for data
processing, and the provider does not act as a data processor for any
user or organisation.

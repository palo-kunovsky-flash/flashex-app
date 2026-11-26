# Flashex Data Handling and Security Statement

Last updated: 26 November 2026 · Applies to Flashex 0.7.5 for macOS; items
marked 0.7.6 apply from that version. Windows and Linux builds may differ.

This statement is for organisations that assess Flashex before their people
use it, for example where work involves financial, customer or licensed
third-party data. It describes what Flashex does with data, where it keeps
data and the network connections it makes. It is a description made with
care, not a warranty (see the [Terms of Use](TERMS.md)). The
feature-by-feature details are on the
[privacy page](https://palo-kunovsky-flash.github.io/flashex-app/privacy.html).

## 1. Summary

- **Flashex is a desktop application that runs on the user's computer.** It
  is not a cloud service. There is no Flashex account, no Flashex server that
  receives user data, and no sign-up.
- **No telemetry, no analytics, no crash reporting.** Flashex sends nothing
  about the user, their work, their files or their terminals to the
  provider. The update check gives GitHub the computer's IP address and the
  Flashex version, as any download does.
- **The provider has no access to user data**, unless a user sends something
  themselves, for example in a bug report. The provider runs no
  infrastructure that user data passes through, uses no sub-processors and
  transfers no user data anywhere.
- **By default Flashex makes one connection on its own: the update check to
  GitHub**, which carries no user content. It also asks the `gh` or `glab`
  tool for the current branch's pull request, if that tool is installed and
  signed in (section 4.2). Everything else that can carry user content
  happens only when the user asks for it (AI help, the browser panel, ssh)
  or after the user turns a feature on (Remote Access, Sync, artifacts,
  usage). Section 7 lists the settings that turn these off.
- **The AI agents are the main way data can leave the computer**, and they
  are separate programs under their providers' terms (section 2).

## 2. What Flashex is

Flashex is a terminal application built for running AI coding agents (such
as Claude Code, Codex or Gemini CLI). It shows terminals, an editor, a
browser panel and dashboards. It is distributed in binary form only.

AI agents are **separate programs** that the user installs and signs in to
on their own, under that provider's terms. Flashex starts them in its
terminals but does not route, proxy or inspect their network traffic. What
an agent sends to its provider (code, files, command output) is decided by
that agent, its settings and its provider's terms, not by Flashex.

## 3. Data kept on the computer

Flashex keeps its files in the user's own folders. Its data folder is open
to the user only (permissions 0700). `config.toml` is an ordinary text file
and holds no secrets. On macOS:

| Data | Where | Notes |
|---|---|---|
| Settings | `~/.config/flashex/config.toml` | Plain text |
| Session layout, unsaved editor text, command history, todos, notes, paired devices' public keys | `~/Library/Application Support/flashex/` | Plain files in the user-only data folder |
| Search index of past agent conversations | Same folder | Words and their places, not whole conversations; on by default, `[sessions] search_index = false` turns it off |
| Local copies of artifacts (pages an agent published or showed) | Same folder | `[agents] local_artifacts = false` stops copies of local pages |
| Terminal output | Memory of the Flashex keeper process | Kept while the terminal is open so it survives a restart of the app; not saved by Flashex to its data folder |
| Vault (secrets) | `~/Library/Application Support/flashex/vault/vault.fxv` | Encrypted with XChaCha20-Poly1305, key from the vault password through Argon2id; never in the cloud |
| Claude Code logins (only with the account switcher on) | macOS keychain; e-mail, organisation and plan in `claude-accounts.json` | Off by default |
| Logs | `~/Library/Logs/flashex/flashex.log`, `keeper.log` in the data folder | Warnings and errors by default: file paths, host names and error messages. Flashex does not log terminal output or message text |
| Cache | `~/Library/Caches/flashex/` | Rate limits read by the status line, temporary files |

Flashex reads AI agents' own local transcript files (for example
`~/.claude/projects`) to show dashboards and a chat view. For the Usage
dashboard it keeps only timestamps, model names, token counts, the length
of visible text, session ids and the folder's last name, never message
text.

When the user installs Flashex's Claude Code hooks or status line, Flashex
changes Claude Code's `settings.json` (keeping a backup) and, from 0.7.6,
installs a skill in `~/.claude/skills/flashex`. The hooks only tell the app
on the same computer what the agent does; they send nothing anywhere.

Command lines that look like they contain a secret are never saved in the
session or history.

**Removing Flashex:** quit Flashex and close its terminals (its background
keeper then ends; it registers no permanent login item), delete the app and
the folders above and, if installed, remove the Flashex hooks from Claude
Code's `settings.json`.

## 4. Network connections

All HTTP requests Flashex makes go through the system's `curl`. None of the
connections below goes to a server of the provider.

### 4.1 On by default, with no user content

| Connection | Purpose | How to turn off |
|---|---|---|
| `api.github.com`, GitHub release files and their download hosts | Check for updates (release builds only, at most once a day) and download one the user accepts | `[updates] check = false` |
| `raw.githubusercontent.com` | The release notes, when the user opens an offered update's notes | Do not open them |

### 4.2 On by default, through the user's own tools

| Connection | What is sent, and to where | How to turn off |
|---|---|---|
| Pull or merge request status | Flashex runs `gh pr view <branch>` or `glab mr list --source-branch <branch>` for the active project, about once a minute, if that tool is installed and signed in. It goes to the repository's own forge (github.com, gitlab.com or a self-hosted one) with the user's credentials and sends the branch name. To recognise the forge it reads host aliases from `~/.ssh/config`. | Sign out of `gh` / `glab` or do not install them (there is no setting yet) |

### 4.3 Available by default, sent only when the user asks

| Feature | What leaves the computer, and to where | How to turn off |
|---|---|---|
| AI help (`#` prompts, Explain, Fix, Send to AI) | On a `#` line: the typed text, the OS, the shell's name and the current folder. On Explain or Fix: one command block's command, folder, exit code and output, trimmed, with passwords, tokens and keys masked. It goes to the AI provider the user chose, or else the first of `claude`, `codex`, `gemini` found on the computer, under the user's own login | `[ai] enabled = false` |
| Browser panel | The pages the user opens; text typed in the address bar that is not an address goes to DuckDuckGo. Kept artifact pages may load scripts from public CDNs (cdnjs, jsDelivr, unpkg) when viewed | `[browser] search_url = ""` for searches |
| Git fetch, pull and push | With the user's own git and credentials, when the user starts them | Background fetch only if `[git] autofetch_minutes` is set |
| Language servers | Programs already on the computer, run locally; Flashex downloads none | `[lsp] enabled = false` |
| Remote terminals and projects | The user's own ssh to the hosts the user names; Flashex copies its small `flashex-keeper` helper to that host over the same ssh | `[remote] enabled = false` |
| Install Agent CLI | Types the agent vendor's official install command (for example from claude.ai or chatgpt.com) into a terminal for the user to run | Do not use it |

### 4.4 Off until the user turns them on

| Feature | What leaves the computer, and to where | How to turn off |
|---|---|---|
| Remote Access › Phones | Terminals, agent chats, files, notes, todos, artifacts and dashboards, to the user's own paired phones (a phone with read-only access gets less), only inside the user's private Tailscale network. Nothing is open to the internet. Tailscale is a third party: traffic is encrypted and may pass its relay servers, and Tailscale Serve's HTTPS certificate puts the computer's tailnet name in public certificate logs | `[remote_access] enabled = false` |
| Phone notifications | The notification text, end-to-end encrypted, through the phone's push service (Apple, Google, Mozilla or Microsoft); the service sees when, not what | `[remote_access] push = "off"` (from 0.7.6 a Vault request is pushed whenever Phones is on) |
| Dev server preview on phones | A local development server, to the user's own phones in their Tailscale network | `[remote_access] preview = false` (the default) |
| Remote Access › Computers (Sync) | Todo lists and, if turned on, notes, to the user's own paired computers in their Tailscale network, encrypted in transit and each computer proved by its own key (sealed end to end from 0.7.6) | `[remote_access] computers = false`, `[sync] todos = false`, `[sync] notes = false` |
| Duplicate cleanup of synced todos | The todo items, to Claude Code (`claude -p`) under the user's own login, or to the user's own command | `[sync] dedupe = "off"` (the default) |
| Live note sharing | One note, to the people the user lets in, only inside the user's Tailscale network | Revoke the link; nothing listens without one |
| Games with others | Game moves, inside the user's Tailscale network; on the local network (announced with Bonjour) only if turned on for one game | Do not open a game lobby |
| Artifacts on claude.ai | Pages published to the user's own claude.ai account with that account's login: on Refresh copy (needs a login kept by the account switcher), or (0.7.6) when a collecting account is set | `[agents] claude_switcher = false` with no kept accounts; `[agents] artifacts = "local"` with Flashex's hooks installed stops agents publishing |
| Claude usage, accounts and status | Requests to `api.anthropic.com` (usage and profile) with the user's own login, and to `status.claude.com`; no user content | `[agents] usage_api = false`, `claude_switcher = false`, `claude_status = false` |
| Public IP on the System dashboard | A request to `api.ipify.org`; no user content | `[dashboards] public_ip = false` |

The chat's microphone and read-aloud use the operating system's own
dictation and voices.

## 5. Security measures

- The `flashex` command talks to the app over a local socket only the user can
  open. `[api] enabled = false` turns it off.
- Programs in a terminal can write to the clipboard but can never read it.
- The Vault's values are never reachable from a phone, and an agent gets a
  secret only inside the command it runs, never as text it can read.
- Remote Access pairs each phone and computer with its own key; only devices
  in the user's Tailscale network can reach it.
- Releases are code-signed with Flashex's own signing identity (not an Apple
  Developer ID, and not notarised by Apple), and each release lists its
  SHA-256. Updates are checked against Flashex's own signature, their exact
  size and SHA-256, and the new app's code signature before anything is
  replaced.

## 6. What Flashex does not do

- It does not send terminal content, files, source code or agent
  conversations to the provider.
- It does not upload anything to a cloud service of its own (there is none).
- It does not connect to the user's financial, banking or other business
  systems. Any such access is made by the programs and agents the user runs,
  with the user's own credentials.
- It does not sell, share or use any data for advertising or model training.

## 7. Recommended settings for regulated data

Where an organisation's obligations (for example to data providers or
financial-data aggregators) require that data stays on the computer, this
in `config.toml` turns off the optional features that have a setting:

```toml
[ai]
enabled = false

[remote_access]
enabled = false
computers = false
push = "off"
preview = false

[sync]
todos = false
notes = false
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

Without a setting: the pull request lookup through `gh` / `glab` (sign out
of them to stop it), and live note sharing and game lobbies, which happen
only when the user starts them. `artifacts = "local"` works through
Flashex's Claude Code hooks; without the hooks installed, Claude Code
publishes artifacts by itself.

These are the user's own settings. Flashex has no managed or locked policy
mode, so the organisation relies on its people keeping them. The
organisation also remains responsible for how its people configure and use
the AI agents they run in Flashex, which is governed by each agent
provider's terms and settings.

## 8. Changes

Each release lists its changes in [CHANGELOG.md](CHANGELOG.md). A change to
what Flashex sends or keeps is described there and on the privacy page,
and this statement is updated.

## 9. Provider and contact

Flashex is made and provided free of charge by Palo Kunovský, an individual
in the Slovak Republic.

- Questions about this statement: palo.kunovsky@gmail.com, or an issue at
  <https://github.com/palo-kunovsky-flash/flashex-app/issues>.
- Security reports: palo.kunovsky@gmail.com, privately; please do not open a
  public issue.

This statement describes how Flashex works. It is not a contract for data
processing, and the provider does not act as a data processor for any user
or organisation.

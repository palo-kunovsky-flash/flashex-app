# Changelog

All notable changes to Flashex are listed here, newest first.
Each version links to its release, where the dmg, its SHA-256 and the signed update manifest are attached.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/): **Added** for new features, **Changed** for changes to existing behaviour, **Fixed** for bug fixes, **Removed** for features that are gone, and **Security** for anything that affects your safety.
Versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

Nothing yet.

## [0.1.3] - 2026-10-10

macOS only. The Linux beta stays at 0.1.2 for now.

### Added
- **Keep Mac Awake.** A built-in `caffeinate` in the command palette (Cmd+K › Keep Mac Awake…): keep the display and your Mac awake, with no screen saver and no idle screen lock, **for 1, 2 or 4 hours**, **until you turn it off**, or **while agents are running** (on while any Claude Code session is running or waiting for you, off three minutes after the last one goes idle). A cup in the status bar shows the time left; click it to extend by an hour, change the mode or stop. It turns off by itself when the time is up, when you choose Stop Keeping Mac Awake, and when Flashex quits; if Flashex ever crashes, macOS drops it with the app. Closing the lid on battery still puts the Mac to sleep, as macOS requires. The mode picked by default is in Settings › General, and it never turns on by itself. Bind `keep_mac_awake`, `stop_keeping_mac_awake` or `toggle_keep_mac_awake` in `keybindings.toml` for a shortcut. macOS only.
- **System Dashboard.** A new pane (Cmd+K › System Dashboard) shows what this Mac is doing, a native port of flash-top: **CPU** (total, user and system, every core in its efficiency and performance cluster, load average), **Memory** (used, app, wired, compressed, cached, memory pressure, swap), **GPU** (load, renderer and tiler, memory), **Disk** (space on the data volume, reads and writes, and when it fills up if it keeps filling), **Network** (the link and its addresses, download and upload, each interface with its totals, and the processes using the network most), **Temperatures** (CPU and GPU, SSD, battery, the hottest sensor), the **battery** (charge, time left or to full, power, health, cycles) and the **top processes** by CPU and by memory. Charts show a fixed window of the last five minutes ("-5m … now"), new samples coming in on the right; right after you open the dashboard the part not collected yet is shaded and marked "collecting…". Each chart says what it plots ("CPU %", "Memory used") and its scale uses round steps (25, 50 or 100 %, "5 MB/s"); point at one to read a value. The cards line up in rows of equal height, in as many columns as the pane is wide. `r` reads everything now, `h` explains every number and where it comes from. Nothing needs administrator rights and nothing leaves your Mac: the dashboard reads only while it is on screen. **Public IP** in its header (off by default) shows the address the internet sees, asking api.ipify.org every five minutes while it is on. On Linux CPU, memory, disk, network and processes come from `/proc`; GPU, temperatures and battery say "macOS only".
- **Usage Dashboard.** A new pane (Cmd+K › Usage Dashboard) shows your Claude Code usage across every session on this Mac. **Rate limits:** the 5-hour and weekly limits, how much is used and when each resets, how fast you are using them against the pace that would last until the reset, and a forecast ("On track", "Tight", or when it runs out); once a limit is spent, when it was hit. **Throughput:** tokens per second, latency and output tokens as charts over 1 to 24 hours, with the value under the pointer. **Today:** requests, tokens and how much input came from the prompt cache. **Breakdown:** output and speed per model and per project, and the open sessions with their prompt cache (warm or expired). A **Help** card (or `h`) explains every number; `w` changes the window, `r` reads the transcripts again. Rate limits come from Claude Code's status line: the dashboard shows the few lines to add to your status-line script and a **Copy** button (Flashex never edits it), and a status line set up for cc-meter works as it is. Optional, all off by default: **Show Claude status** (status.claude.com's incidents and components), the 5-hour limit in the status bar ("5h 62%", Settings › AI agents), a notice when a limit reaches 90 %, and asking Anthropic's usage API when no status line has reported the limits (Settings › AI agents; it uses Claude Code's login from the Keychain only when on). Everything else stays on your Mac; the dashboard reads only while it is on screen and keeps a small summary so it opens fast next time.
- **Agents Dashboard.** A new pane, opened from the command palette (Cmd+K › Agents Dashboard), shows every Claude Code session in the window: its project, folder and terminal, whether it is waiting for you, running, idle or ended, what it is doing right now ("Bash cargo test", "Edit src/parser.rs", "waiting: needs permission: Bash"), for how long, its model and how full its context is. Each session's subagents are listed under it with their task, their current tool and their own model and context. Sessions waiting for you come first. Filter by All, Running or Waiting, or just type to filter; ↑/↓ and Enter jump to a session's terminal (a click does too), Space folds its subagents. The selected session offers **Reload**, **Interrupt** (sends Esc to its terminal after asking) and **Transcript** (opens the conversation log read-only). The dashboard opens as a tab of the current pane, can be split, moved and closed like any pane, and comes back after a restart. Everything stays on your Mac: it reads only Claude Code's hook events and, while the dashboard is on screen, the model and token counts from the session transcripts. If Claude Code's hooks are not installed, the dashboard offers to install them.
- **Add a project straight to a group.** The New project dialog has a **Group** field under the folder search: Tab and Shift+Tab (or a click) step through your groups and "No group". It starts on the group you opened it from, otherwise on the current project's group. The project goes at the end of that group, and a folded group opens to show it. A group's header has a **+** (on hover, always for an empty group) that opens the dialog with that group chosen, an empty group shows an **Add a project…** row, and a group's right-click menu has **Add Project…**.
- **Keep notifications on screen.** How long a banner stays is set by macOS, not by the app: Settings › Notifications now has **Keep notifications on screen** with an **Open** button that takes you to System Settings › Notifications › Flashex, where **Alerts** keeps them until you dismiss them.
- **Reload Claude Session.** A new command palette entry (Cmd+K) restarts Claude Code in the focused terminal and resumes the same conversation, with the options it was started with, whether or not a newer version is installed. Handy after changing Claude Code's settings, plugins or MCP servers. If Claude is working, you choose **Restart when idle**, **Restart now** (which interrupts the running task) or **Cancel**, as with the update icon. **Reload All Idle Claude Sessions** does the same for every idle session and leaves busy ones alone. Both appear only where Claude Code runs and have no shortcut by default; bind `reload_claude_session` or `reload_idle_claude_sessions` in `keybindings.toml`.

### Changed
- **Terminal colors.** Settings › Appearance › Terminal colors picks Flashex's own colour schemes: Flashex, Graphite, Harbor or Ember, each with a dark and a light variant that follows the Theme row. A theme file you named in `config.toml` keeps working and shows as Custom.
- **One look for every button.** Buttons across the app share one design: the main action of a place is filled with the accent and has white text, actions that lose something (Move to Trash, Discard, Close, Interrupt, Remove key) are red with white text, the rest are quiet. The accent is darkened just enough under white text to stay readable with every accent colour in the light and the dark theme.
- **`[notifications] system = false`** turns off system banners; the dot, the bell and the Dock still show new notifications.
- **The System Dashboard fills wide windows.** It now lays its cards out in 1 to 8 columns depending on how wide its pane is (a card is at least 400 points wide), from one column in a narrow pane to all eight cards side by side on an ultra-wide display. Cards of about the same height share a row, every row stays even, Network puts its tables beside its charts when it spans two or three columns, and the processes become two cards (by CPU and by memory) when that fits better. Resizing near a breakpoint does not flip back and forth, a tick never reshuffles the cards, and when the column count changes the cards slide to their new places (instantly with Reduce Motion or animations off).
- **System notifications say what the agent is doing and where.** The title says "Claude Code is waiting for you" or "Claude Code finished", the line under it names the project and the terminal, and Notification Center groups each project's notifications together. A notification that an agent is waiting asks to be time-sensitive (macOS honours that only for apps signed with that entitlement; otherwise it is a normal one).
- **Notifications are read when you look at them.** A terminal's unread dot, its project's count, the bell and the Dock number clear once that terminal has been in front of you (visible, focused, the window in front) for a second, or as soon as you type into it; no click needed. A terminal in a background tab or behind another window stays unread. Opening one entry in the notification center reads the rest of that terminal's entries too.

### Fixed
- **Notifications name the terminal, not its title.** The "project · terminal" line of a notification names the terminal by its program ("Claude Code"), the name you gave its tab or its folder, never by the title a program set; two Claude Code sessions in a project read "Claude Code (tab 1)" and "Claude Code (tab 2)".
- **The Agents dashboard says "idle" after a reload.** A resumed session no longer shows "starting" until its next prompt, and the dashboard follows the same state as the sidebar.
- **Esc in Settings cancels only the question.** After clicking Install for the Claude Code hooks, Esc cancels the question instead of closing Settings.
- **Picking a folder that is already open no longer looks like nothing happened.** The project with that folder comes forward as before, and a notice says so. If you chose a group, the project moves into it.
- **Dropping a terminal on a group explains why it stays put.** Terminals belong to projects, so the notice tells you to drop it on a project or add a project to the group first.
- **A finished Claude Code is no longer "waiting for you".** When Claude finishes its turn the terminal shows it as done. The reminder Claude Code sends after a minute at its prompt no longer turns that into "waiting" or adds a second notification; only a permission prompt or a question from Claude does. A slow hook can no longer undo a later state.
- **Notifications show the Flashex icon.** Development builds of Flashex now use their own identity, so macOS no longer confuses them with the installed app and shows a blank icon in its notifications. The app icon now also comes as an asset catalog, the form macOS 26 looks up first, next to the classic icon file. If your notifications still show a blank white icon, macOS is holding an old copy in its icon cache, which no update can replace: run `sudo rm -rf /Library/Caches/com.apple.iconservices.store` in Terminal and restart your Mac.
- **The clipboard notice names the program that copied.** When a program in a terminal puts text on the clipboard, the notice now says who did it, for example "Claude Code copied 1266 characters to the clipboard", or "A program in <project> copied …" when Flashex cannot tell. It used to show the terminal's title, which any program can set to any text, so a Claude Code conversation summary could read like a message from Flashex. A terminal's own notifications are now attributed the same way, and names in notices are stripped of control characters and shortened.

## [0.1.2] - 2026-10-09

### Added
- **AI help, with the AI you already have.** Type `# find files bigger than 100 MB` at an empty prompt and press Enter: the command is put into the line for you to check, never run by itself, and the `#` line never reaches your shell or its history (Esc cancels). A failed command's block offers **Explain** and **Fix**; **Insert fix into prompt** puts a suggested command into the line. It uses Claude Code, Codex or Gemini CLI if one is installed (your own login, no API key), your own command, or any OpenAI-compatible server, local models included (Ollama, LM Studio, llama.cpp). Settings › AI chooses the provider, server and model, keeps an optional API key in the Keychain and has **Test connection**, which lists the server's models. Nothing is sent until you press Enter on a `#` line or click; the README's Privacy section lists exactly what is sent where (your last command only if you turn that on). `[ai] enabled = false` turns it all off.
- **Send to Claude, Codex, Gemini…** A block's "Send to" now names the agent running in your project (Claude Code, Codex, Gemini CLI, Aider and others) and types the command, its folder, exit code and output (only the start and end of a long one) into it. With several running you pick one; with none, **Send to AI…** shows your provider's answer next to the block.
- **Suggestions from your history as you type.** The grey suggestion after the cursor is now the best match for where you are: a command you ran in this folder first, then in this project, then anywhere, weighing how often and how recently. ⌥→ takes one word of it. Commands that look like they contain a password or a token are never suggested. It also works with the prompt editor turned off, unless your shell suggests on its own (zsh-autosuggestions, fish). `[ai] ghost_text = false` turns it off.
- **Claude Code updates while you work.** When a newer Claude Code is installed while a session runs in a terminal, a refresh icon appears after that terminal's tab title and in the sidebar. Click it to restart the session on the new version; the conversation continues, with the options you started it with. If Claude Code is busy, choose **Restart when idle** and it restarts on its own once the task is done. The palette's "Restart Idle Claude Sessions on the New Version" does it for all idle sessions, and Settings › AI agents turns the icon off. The hook this needs is added on its own when Flashex starts (see Changed).

### Changed
- **Claude Code hooks update themselves.** When Flashex's Claude Code hooks are installed but come from an older Flashex, the app updates them in place at start and says so once; Claude sessions already running pick them up on their next start. Only commands exactly as Flashex wrote them are touched (your other hooks, even ones that mention Flashex, your keys and formatting stay; a read-only file is left alone), backups are kept as `settings.json.flashex-backup` and, the first time, `settings.json.flashex-backup.orig`, and nothing is installed unless you ask. Settings › AI agents shows whether the hooks are installed, outdated, incomplete or customised, with an Install / Update button that asks before it writes, and `flashex setup claude` can be run again safely.
- **Progress notices turn into their result.** "Looking for updates…", "Fetching…" and similar notices now stay until the work is done and are then replaced in place by the result or the error, with a short crossfade, instead of a second notice stacking above them. When a new version is found, the update card takes the place of "Looking for updates…". Results of repeated git operations, Claude Code restart notices and clipboard notices also replace each other.

### Fixed
- **Settings rows fit the sheet.** A long value no longer runs past the right edge or into its label. Values end in "…" between their arrows when there is no room, labels wrap to two lines, and hovering a shortened row shows it in full. The prompt setting now reads simply **Auto**, with a short explanation under its name.
- **Check for Updates no longer leaves "Looking for updates…" on screen** next to the answer, and asking twice shows it once. Asking while the daily check is already running now answers too, instead of doing nothing.
- **The settings list follows the arrow keys.** With ↑/↓ or Tab, the list scrolls to keep the selected row in view, with a short glide. The glide is skipped when animations are off or Reduce Motion is on.

## [0.1.1] - 2026-10-08

### Added
- **Linux (beta)** for x86_64 and arm64: an AppImage that updates itself, a `.deb` for Debian and Ubuntu, and a `.tar.gz`. The restart keeper, shell integration and signed updates work as on macOS. See the README for the current gaps.

### Fixed
- **Block characters and Powerline symbols are drawn exactly to the cell.** Characters such as `▛▜▝▘`, Powerline arrows and round caps, sextants and braille no longer leave gaps or sit off the baseline. Claude Code's logo is now solid, and rounded statusline "pills" are smooth capsules that meet their background with no seam. Screens full of block characters also draw about four times faster.
- **The block menu (`⋯`) can be used again.** It used to be cut off by the pane and to close while you moved the mouse into it. It now opens above all panes, flips up or left near the edges, stays open on the way in, and works with the arrow keys.

## [0.1.0] - 2026-10-08

The first public release, for Apple Silicon Macs with macOS 13 or later.

### Added

**Terminal**
- `flashex-vt`, Flashex's own terminal core written in Rust. It passes 450 of 567 esctest2 tests, and has run for hours of fuzzing without a failure.
- Inline images: the kitty graphics protocol, sixel and iTerm2 images, which scroll with the text.
- The kitty keyboard protocol, SGR-pixel mouse reports, XTGETTCAP and the window-title stack.
- Command blocks: each command shows with its folder, duration and exit code. You can jump between blocks, select, fold, copy or rerun a block, or save it as a workflow.
- Shell integration for zsh, bash and fish, set up automatically. Its marks are signed so programs can't fake them.
- A compact prompt with a clickable path. Click the path to open the folder or to switch to a nearby one.
- Find in the terminal, including the scrollback.
- Splits, zoom, tabs inside a pane, layout presets and a quick layout switcher. New splits start in the focused terminal's folder.

**AI agents**
- Claude Code hooks (`flashex setup claude`) report when an agent is running, waiting for you or done.
- The sidebar shows each agent's state as a dot. Notifications point at the exact terminal, and the notification center lists what happened.
- A finished Claude Code session can be resumed from its command block.

**Editor**
- Tree-sitter highlighting.
- Multi-cursor editing in the style of Sublime Text and VS Code.
- Language-server features from the servers you have installed: go to definition, references, hover, completion, rename and diagnostics.
- Markdown preview.
- Hot exit: unsaved and untitled files survive a quit, a crash or a restart.

**Projects and Source Control**
- Projects and groups in the sidebar, with the branch and git state shown as `↑` ahead, `↓` behind and `±` changed files. Hover the marks to see what they mean.
- Source Control: stage, unstage, discard, commit, pull, push and switch branches, with side-by-side diffs against HEAD.
- A file tree, a palette (`⌘K`) and a keyboard shortcuts sheet (`⌘?`). Shortcut labels follow your keyboard layout.
- A browser panel for local pages.

**App**
- A restart keeper. A tiny helper process holds your terminals while Flashex restarts after an update or a crash, so shells, agents and running jobs carry on. Quitting with `⌘Q` still ends everything, and the keeper stops on its own after a grace period.
- In-app updates. Flashex checks for a new version at start and once a day, and shows a quiet card in the corner of the window. Nothing is installed until you click Update and then Restart Now. Updates are signed with Flashex's own key and checked before they are installed. You can also check by hand from the `?` menu, the app menu or the palette.
- Animations for splits, zoom, tabs, the sidebar and popups. Turn them off in Settings; they also follow macOS Reduce motion.
- Light and dark themes with a choice of accent colour.

[Unreleased]: https://github.com/palo-kunovsky-flash/flashex-app/compare/v0.1.3...HEAD
[0.1.3]: https://github.com/palo-kunovsky-flash/flashex-app/releases/tag/v0.1.3
[0.1.2]: https://github.com/palo-kunovsky-flash/flashex-app/releases/tag/v0.1.2
[0.1.1]: https://github.com/palo-kunovsky-flash/flashex-app/releases/tag/v0.1.1
[0.1.0]: https://github.com/palo-kunovsky-flash/flashex-app/releases/tag/v0.1.0

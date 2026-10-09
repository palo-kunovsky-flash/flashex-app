# Changelog

All notable changes to Flashex are listed here, newest first.
Each version links to its release, where the dmg, its SHA-256 and the signed update manifest are attached.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/): **Added** for new features, **Changed** for changes to existing behaviour, **Fixed** for bug fixes, **Removed** for features that are gone, and **Security** for anything that affects your safety.
Versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

Nothing yet.

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

[Unreleased]: https://github.com/palo-kunovsky-flash/flashex-app/compare/v0.1.2...HEAD
[0.1.2]: https://github.com/palo-kunovsky-flash/flashex-app/releases/tag/v0.1.2
[0.1.1]: https://github.com/palo-kunovsky-flash/flashex-app/releases/tag/v0.1.1
[0.1.0]: https://github.com/palo-kunovsky-flash/flashex-app/releases/tag/v0.1.0

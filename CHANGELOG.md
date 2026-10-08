# Changelog

All notable changes to Flashex are listed here, newest first.
Each version links to its release, where the dmg, its SHA-256 and the signed update manifest are attached.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/): **Added** for new features, **Changed** for changes to existing behaviour, **Fixed** for bug fixes, **Removed** for features that are gone, and **Security** for anything that affects your safety.
Versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

Nothing yet.

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

[Unreleased]: https://github.com/palo-kunovsky-flash/flashex-app/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/palo-kunovsky-flash/flashex-app/releases/tag/v0.1.0

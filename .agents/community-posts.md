# Community Launch Posts — Wrangle

---

## 1. Reddit Posts

---

### Post 1: r/ClaudeAI

**Title:** I got tired of editing CLAUDE.md in VS Code, so I built a dedicated editor for it

**Body:**

I spend most of my day working with Claude Code. That means I'm constantly editing CLAUDE.md files, system prompts, SKILL.md files — all markdown with XML blocks mixed in.

VS Code is a great code editor, but it's a terrible markdown editor. My CLAUDE.md files look like raw markup soup. The markdown preview is in a separate pane that's always out of sync. XML blocks like `<tools>` and `<instructions>` get zero syntax highlighting. And there's no token counting, so I never know how much context I'm actually feeding the model until I hit the limit.

So I built Wrangle — a native macOS markdown editor specifically for this workflow.

Here's what it does differently:

**Rendered markdown by default.** Like Typora, you edit in a rendered view. Headings look like headings, lists look like lists, code blocks are highlighted. But it's built for AI config files, not blog posts.

**XML-in-markdown actually works.** `<tools>`, `<instructions>`, `<system>` blocks get proper syntax highlighting and are collapsible. If you've ever tried to read a 500-line system prompt with nested XML in VS Code's markdown preview, you know why this matters.

**Token counting in the status bar.** Always visible. You know exactly how many tokens your CLAUDE.md or system prompt is consuming before your agent even reads it.

**Embedded terminals with notifications.** This is the feature I use most. I run Claude Code sessions in tabbed terminals inside Wrangle. When an agent needs input, finishes a task, or asks for permission — I get a native macOS notification that pulls me right to the correct terminal tab. No more checking 6 different terminal windows wondering "which one beeped?"

**Session context.** Each terminal shows the linked CLAUDE.md file, active skills, and connected MCP servers. At a glance, I know exactly what each agent session is working with.

**File awareness.** The sidebar gives distinct icons and treatment to CLAUDE.md, SKILL.md, AGENTS.md, system-prompt.md — the files that actually matter in this workflow.

It's $19, one-time purchase. No subscription. macOS only (Apple Silicon, Sequoia+). 30-day money-back guarantee.

I'm a solo developer — this is a niche tool for a niche audience. If you're editing CLAUDE.md files daily and running multiple agent sessions, it might save you a lot of friction. If you're happy in VS Code, no hard feelings.

Site: https://wrangleapp.dev
Feedback/bugs: https://github.com/J-Krush/wrangle-feedback

Happy to answer any questions.

**Screenshots to include (in order):**
1. shot-1.png — Rendered CLAUDE.md in the editor (the hero shot, shows what editing actually looks like)
2. shot-3.png — System prompt with XML tool blocks rendered and collapsible
3. shot-4.png — Terminal view with session context showing linked CLAUDE.md, skills, and MCP servers
4. shot-5.png — Editor showing skills-lock.json with notification toast ("Ready for input")

**Best time to post:** Tuesday or Wednesday, 9-11am EST (peak r/ClaudeAI activity, US work hours starting)

**Comment strategy:**
- Reply to every comment within the first 2 hours — Reddit algorithm rewards engagement
- If someone asks about Windows/Linux: "macOS only for now. It's built with Swift/SwiftUI so a port isn't straightforward, but I'm tracking demand."
- If someone asks about Cursor/Windsurf: "Those are AI code editors. Wrangle is a markdown editor — it's for the config files and prompts that drive those tools, not for writing code."
- If someone asks about free/open source: "It's $19 one-time, 30-day money-back. I'm a solo dev and this took months to build. I think that's fair for a tool you'd use daily."
- If someone reports a bug: Thank them, ask for details, point to the GitHub feedback repo.

---

### Post 2: r/MacApps

**Title:** Wrangle — a native Swift/SwiftUI markdown editor built for AI developers (no Electron)

**Body:**

Hey r/MacApps. I want to share an app I've been building as a solo developer: Wrangle.

It's a native macOS markdown editor purpose-built for developers who work with AI agents (Claude Code, Gemini CLI, etc.). Built entirely in Swift and SwiftUI, targeting Apple Silicon and macOS 15+.

I know "markdown editor" sounds like a solved problem. But if you work with AI agents, you're constantly editing a specific kind of markdown file — CLAUDE.md, system prompts, skill definitions — that have XML blocks mixed in, need token counting, and are paired with terminal sessions where the agents actually run. None of the existing editors handle this well.

**Why native matters here:**

- The editor is built on NSTextView via NSViewRepresentable. It renders markdown inline (like Typora) with full attributed string styling. No web view, no embedded browser.
- Terminals are embedded via SwiftTerm — real terminal emulation, not a web-based terminal.
- Notifications use native macOS notifications. When an AI agent needs your input or finishes a task, you get a real notification that clicks through to the right terminal tab.
- File system access uses native Foundation APIs — SecurityScopedBookmarks, NSOpenPanel, FileManager. Your files stay on your disk, no sync service, no cloud.
- SwiftData for persistence (bookmarks, preferences, recent files).

The whole app is MVVM with @Observable and @MainActor. Modern Swift concurrency throughout — async/await, no GCD.

**What it does:**

- Inline-rendered markdown editor with XML block highlighting and collapsing
- Token counting always visible in the status bar
- Embedded tabbed terminals for running agent sessions
- Smart notifications when agents need attention
- Session context showing linked config files, skills, and MCP servers per terminal
- Fuzzy finder (Cmd+P) across all bookmarked projects
- Distinct file tree icons for AI-specific files (CLAUDE.md, SKILL.md, AGENTS.md)

**Pricing:** $19 one-time purchase. No subscription. Sold direct (DMG download via LemonSqueezy). 30-day money-back guarantee.

It's definitely a niche tool — you need to be working with AI coding agents to get value from it. But if that's your workflow, I think you'll appreciate that it's built like a proper Mac app, not another Electron wrapper.

https://wrangleapp.dev

**Screenshots to include (in order):**
1. shot-1.png — Main editor view showing rendered CLAUDE.md (shows the native macOS chrome, dark theme)
2. shot-4.png — Terminal with session context and skills popover (shows SwiftTerm integration)
3. shot-5.png — JSON file view with notification toast and token count in status bar

**Best time to post:** Saturday or Sunday morning, 10am-12pm EST (r/MacApps has more weekend browsing)

**Comment strategy:**
- This sub loves native apps — lean into the technical choices. If someone asks about architecture, go deep on NSTextView, SwiftTerm, SwiftData.
- If someone compares to Typora: "Typora is great for general markdown. Wrangle adds terminals, notifications, token counting, and XML handling — things you need if you're working with AI agents specifically."
- If someone asks about the icon/design: Be receptive to feedback, this sub cares a lot about polish.
- If someone asks about Setapp: "Not on Setapp currently, just direct purchase for now."

---

### Post 3: r/LocalLLaMA

**Title:** Built a macOS workspace for managing multiple AI agent sessions — embedded terminals, notifications, session context

**Body:**

If you're running multiple AI agent sessions throughout the day — Claude Code, Gemini CLI, aider, or anything terminal-based — you probably know the pain of context-switching between terminal windows, trying to remember which session is working on what, and missing the moment an agent finishes or needs input.

I built Wrangle to solve this. It's a native macOS app that combines a markdown editor with embedded terminals and smart notifications, designed specifically for multi-agent workflows.

**The core workflow:**

You open a project. The sidebar shows your file tree with first-class awareness of AI config files — CLAUDE.md, SKILL.md, AGENTS.md, system prompts. You edit these in a rendered markdown view (not raw markup) with XML block highlighting, collapsible sections, and token counting in the status bar.

Then you spin up agent sessions in embedded terminals (tabbed, inside the same window). Each terminal tab shows its "session context" — the linked CLAUDE.md file the agent is reading, which skills are active, and which MCP servers are connected. At a glance, across all your tabs, you know exactly what each agent is working with.

**The notification system is the key feature.** Wrangle watches your terminal sessions and sends native macOS notifications when:
- An agent needs your input (waiting for a response)
- An agent finishes its task
- An agent needs permission (e.g., Claude asking to run bash)

The notification clicks through directly to the correct terminal tab. So you can context-switch away — work on something else, check another session, edit a file — and trust that you'll get pulled back at the right moment.

**Other details:**
- Multiple projects with separate terminal sessions, no cross-contamination
- Fuzzy finder (Cmd+P) across all bookmarked projects
- XML-in-markdown rendering — `<tools>`, `<instructions>`, `<system>` blocks get proper treatment
- Token counting for every file (useful for prompt engineering)
- Built with Swift/SwiftUI, Apple Silicon native

**Limitations I'll be upfront about:**
- macOS only (Apple Silicon, macOS 15+). No Windows or Linux — it's built with native Apple frameworks.
- It's a markdown editor + terminal, not an IDE. You still write code in your code editor.
- $19 one-time purchase. Not free, not open source. Solo dev, sustainable pricing.

If you're running 3+ agent sessions daily and losing track of which one needs attention, this might help.

https://wrangleapp.dev
Feedback: https://github.com/J-Krush/wrangle-feedback

**Screenshots to include (in order):**
1. shot-4.png — Terminal view with session context (skills, MCP servers, linked CLAUDE.md)
2. notification-1.png — macOS notification: "Permission needed: Claude needs your permission to use Bash"
3. shot-1.png — Rendered CLAUDE.md showing the editor experience
4. shot-3.png — System prompt with XML tool blocks

**Best time to post:** Tuesday or Wednesday, 10am-12pm EST

**Comment strategy:**
- This sub is technical. Be ready to discuss: how terminal monitoring works, what "smart notifications" actually detect, how session context is determined.
- If someone asks about Linux: "No plans right now — it's built on SwiftUI and NSTextView. Would need a ground-up rewrite for Linux."
- If someone asks about local model support: "The terminals work with any CLI tool. If your agent runs in a terminal, it works in Wrangle. Not model-specific."
- If someone says "just use tmux": "Tmux is great. Wrangle adds the notification layer on top — knowing which session needs you without checking each one — plus the markdown editor for config files. Different tools for different levels of the workflow."

---

## 2. Hacker News — Show HN

**Title:** Show HN: Wrangle -- Native macOS markdown editor for AI agent workflows

**Body:**

I've been working with Claude Code and other AI agents daily for a while now. The workflow involves constantly editing markdown files (CLAUDE.md, system prompts, skill definitions) and running multiple terminal sessions where agents do their work.

I got frustrated with the gap between my code editor and my terminal. VS Code renders markdown poorly for this use case — XML blocks get no special treatment, there's no token counting, and there's no awareness of AI-specific file types. Meanwhile, I'm juggling 4-5 terminal windows and missing agent prompts.

Wrangle is a native macOS app that puts these two things together: a Typora-style inline-rendered markdown editor and embedded terminals with smart notifications.

Key decisions:

- **Native Swift/SwiftUI**, not Electron. Editor is NSTextView-based with NSAttributedString rendering. Terminals via SwiftTerm.
- **Inline rendering** -- you edit rendered markdown, not raw markup with a side preview. XML blocks (`<tools>`, `<instructions>`) get syntax highlighting and are collapsible.
- **Terminal notifications** -- the app watches terminal output and sends native macOS notifications when an agent needs input, finishes, or requests permission. Clicking the notification takes you to the right tab.
- **Session context** -- each terminal shows its linked config file, active skills, and MCP servers.
- **Token counting** in the status bar for every file.
- **File-first** -- just .md files on disk. No proprietary format, no import/export.

$19 one-time purchase, 30-day money-back. macOS 15+, Apple Silicon.

Solo dev project. This is a niche tool — maybe 10K people in the world need it — but if you're one of them, I think the workflow improvement is significant.

https://wrangleapp.dev

Source for feedback/issues: https://github.com/J-Krush/wrangle-feedback

---

**What HN values and how this aligns:**
- Solo dev building an opinionated tool: yes
- Native app, not Electron: HN loves this
- Solving a real problem you personally have: yes
- Honest about niche/limitations: yes
- Technical depth available: Swift, SwiftUI, NSTextView, SwiftTerm, SwiftData
- Not a SaaS, not a subscription: one-time purchase, files on disk

**Anticipated HN comments and talking points:**

| Likely comment | Response |
|---|---|
| "Why not just use Obsidian + a terminal?" | Obsidian is a knowledge base. It doesn't have embedded terminals, agent notifications, session context, or XML-in-markdown handling. Different tools for different workflows. |
| "Why macOS only?" | Built with Swift/SwiftUI and NSTextView. Native frameworks are why the editor feels right on macOS. Cross-platform would mean Electron or a compromise on the editing experience. I chose depth over breadth. |
| "$19 for a markdown editor?" | It's a markdown editor + terminal multiplexer + notification system purpose-built for a specific workflow. $19 one-time for a daily-use tool felt fair. 30-day money-back if it's not. |
| "Why not open source?" | Solo dev, this is my livelihood. Happy to discuss the architecture and technical decisions openly. Feedback repo is public. |
| "Just use tmux + vim" | If that works for you, genuinely, keep doing it. Wrangle is for people who want rendered markdown editing (not raw markup) and native macOS notifications without configuring a custom tmux/terminal setup. |
| "What about Cursor?" | Cursor is a code editor with AI features. Wrangle is a markdown editor with terminal features. They're complementary — you write code in Cursor, you manage your agent configs and sessions in Wrangle. |
| "How do the notifications work technically?" | The app monitors terminal output for patterns that indicate the agent is waiting for input, has finished, or needs permission. Native macOS notification APIs (UNUserNotificationCenter). Clicking a notification activates the app and switches to the correct terminal tab. |

**Best time to post:** Tuesday-Thursday, 8-9am EST (HN front page competition is lower early morning, gives time to accumulate upvotes before the US west coast wakes up)

---

## 3. X (Twitter) Launch Thread

**Tweet 1 (Hook):**
I edit CLAUDE.md files all day. VS Code is a terrible markdown editor for this.

So I built my own.

Wrangle — a native macOS editor for AI agent workflows.

Here's what it does:

**Tweet 2 (Editor):**
The editor renders markdown inline. No split preview, no raw markup.

XML blocks like <tools> and <instructions> get syntax highlighting and collapse. Token count is always in the status bar.

It actually understands what a CLAUDE.md file is.

[screenshot: shot-1.png — rendered CLAUDE.md]

**Tweet 3 (Terminals):**
Embedded terminals. Run Claude Code, Gemini, whatever — in tabbed terminals inside the editor.

Each tab shows session context: the linked CLAUDE.md, active skills, connected MCP servers.

[screenshot: shot-4.png — terminal with session context]

**Tweet 4 (Notifications):**
The killer feature: smart notifications.

Agent needs input? You get a notification. Agent finished? Notification. Permission needed? Notification.

Click it, you're in the right terminal tab. No more checking 5 windows.

[screenshot: shot-5.png — notification toast visible]

**Tweet 5 (Native):**
Built with Swift and SwiftUI. Not Electron.

NSTextView editor, SwiftTerm terminals, native macOS notifications, SwiftData persistence.

Apple Silicon, macOS 15+. Feels like a Mac app because it is one.

**Tweet 6 (Honest pitch):**
$19. One-time. No subscription.

macOS only. Niche audience. ~10K people probably need this.

If you edit CLAUDE.md files and run multiple agent sessions daily, this saves real friction. If not, you don't need it.

30-day money-back, no questions.

**Tweet 7 (CTA):**
wrangleapp.dev

Solo dev project. Built it because I needed it. Shipping it because others might too.

Feedback and bugs: github.com/J-Krush/wrangle-feedback

Would love to hear from anyone in this workflow.

---

**Thread notes:**
- Post the thread Tuesday-Thursday around 10am-12pm EST
- Pin the thread to your profile
- Quote-tweet the first tweet later in the day with a single screenshot (shot-1.png) for people who missed the thread
- Reply to every comment in the first hour
- Consider a follow-up tweet a day or two later with a specific use case or workflow tip, not just a repost

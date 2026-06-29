# Hack The Flag — Design Guidelines
### By COD3RS

---

## 1. Purpose of This Document

This document defines the visual and editorial direction for the Hack The Flag website. The goal is a single landing page that makes a visitor immediately understand what HTF is, feel the energy of the event, and take one clear action: **join**.

The site should feel unmistakably like a COD3RS event — the same organization that runs Hack Esbjerg — while carrying its own CTF identity. If someone has seen hackesbjerg.dk and lands here, they should recognize the family instantly.

---

## 2. Brand Context

**Hack The Flag** is a cryptography and cipher-solving competition organized by **COD3RS**.

- COD3RS runs multiple events. Hack Esbjerg is the hackathon. HTF is the CTF.
- They share a design system. They do not share a color scheme.
- COD3RS attribution must appear clearly on the HTF page. Not buried — visible.

**Hierarchy on the page:**
```
HACK THE FLAG          ← event identity, primary
by COD3RS              ← org attribution, secondary but present
```

---

## 3. Personality

| Trait | What it means in practice |
|---|---|
| **Bold** | Big type. Confident numbers. No hedging. "Solve ciphers." not "Try solving some ciphers." |
| **Direct** | One CTA. One message per section. No walls of text. |
| **Technical** | Monospace for code, commands, flags. `<HTF-this_is_flag/>` should look like a real flag. |
| **Human** | Real photos of real people at the event. Not stock. Not illustrations. |
| **Grounded** | COD3RS is a real student club doing real events. The site should feel earned, not overdesigned. |

---

## 4. What to Remove from the Current Site

These elements are working against the goal and should be cut when the redesign is built:

- The PGP signed message block — meaningful only to people already in the community, not newcomers
- The Storyset illustrations (Team goals, App development, Security On, Future city) — generic, not HTF
- The alternating left/right content sections (Our Mission, Competitions, Skills, Community) — too much reading, too little energy
- The wave divider between dark/light sections — the two-tone layout it creates feels unresolved
- The light-colored (`#161b22`) middle section — the site should stay dark throughout
- Footer `Browse more:` column with just "Blog" — replace with a proper footer

---

## 5. Colors

### Primary Palette

| Name | Hex | Use |
|---|---|---|
| **Black** | `#000000` | Page background |
| **Surface** | `#0d0d0d` | Cards, code blocks, SSH box |
| **Border** | `#1a1a1a` | Subtle dividers |
| **White** | `#ffffff` | Primary text, headings |
| **Muted** | `#555555` | Secondary text, hints, labels |

### Accent — HTF Red
The red is HTF's own color. It distinguishes HTF from Hack Esbjerg (purple).

| Name | Hex | Use |
|---|---|---|
| **Red** | `#dc3545` | Primary accent — CTAs, highlights, active states |
| **Red dim** | `#79282c` | Borders, hover states, subtle glows |
| **Red faint** | `rgba(220,53,69,0.08)` | Background tints on cards/mentions |

### Never
- Do not use purple on HTF. Purple is Hack Esbjerg's color. HTF is red. Full stop.
- Do not introduce green, teal, or orange as new accent colors
- Do not use white backgrounds or light sections on this page
- Do not use multiple accent colors in the same viewport at once

---

## 6. Typography

### Display — HackTheFlag
The custom `HackTheFlag-Regular.otf` font is the **sole display font** for HTF. This is what differentiates HTF visually from Hack Esbjerg (which uses a condensed grotesque). Use it for:
- The event name / hero title
- Section headings
- Stats and statement copy ("100 HACKERS", dates, taglines)
- Navigation items
- Button labels

The HackTheFlag font plays the same role that the heavy condensed font plays on hackesbjerg.dk — big, bold, ownable. Lean into it at large sizes. It should feel like a poster, not a brochure.

Pair with `'Share Tech Mono', monospace` for subheadings, labels, hints, and body copy where a technical/terminal feel is needed.

### Body — Share Tech Mono
All body copy uses `'Share Tech Mono', monospace`. This keeps every line of text feeling like a terminal output — intentional, not accidental.

### Scale (desktop)

| Role | Size | Weight | Font |
|---|---|---|---|
| Hero title | `clamp(4rem, 10vw, 9rem)` | Regular | HackTheFlag |
| Section heading | `clamp(2.5rem, 5vw, 5rem)` | Regular | HackTheFlag |
| Subheading / label | `0.65em` + wide letter-spacing | — | Share Tech Mono |
| Body | `1rem` | — | Share Tech Mono |
| Code / flags | `0.9rem` | — | Share Tech Mono |
| Hint / fine print | `0.62em` | — | Share Tech Mono |

### Type rules
- **Headings are not sentence case.** Use the title as-is: `Hack The Flag`, not `Hack the flag`.
- **Labels and eyebrows are ALLCAPS** with `letter-spacing: 0.2em+`.
- **No bold body text** except inside code blocks or flag examples.
- **Line length** for readable paragraphs: max `65ch`. If you have a paragraph, cap it there.

---

## 7. Layout & Spacing

### Grid
Use a centered column that is `min(1200px, 90vw)` wide. No Bootstrap grid in the hero — use flex or CSS grid directly for full-bleed control.

### Spacing unit
Base unit is `8px`. All spacing should be multiples: `8 / 16 / 24 / 32 / 48 / 64 / 96 / 128px`.

### Section rhythm
Each section should occupy roughly one viewport height on desktop. Visitors scroll once per section, not three times to read a wall of text.

### Hero section (above the fold)
This is the only section that matters for conversion. It must contain:
1. The event name (HackTheFlag font, large)
2. **One sharp sentence** — what this is and why it's worth a person's time
3. The date and location (or "online")
4. **The CTA button** — one, clearly primary
5. Attribution — "by COD3RS" visible but not competing with the headline

Optionally: a real photo of a previous event as background or side panel (see hackesbjerg.dk hero). Real people > abstract imagery every time.

### Below the fold — keep it to 3 sections maximum
Suggested structure:
```
Hero          ← convert immediately
What is HTF   ← 3–4 sentences + maybe a stat ("100+ participants")
How it works  ← numbered steps or a simple challenge example  
(Footer)
```

---

## 8. Interactive Elements & Components

### Buttons
Two variants only:

**Primary (CTA)**
```css
background: #dc3545;
color: #ffffff;
border: none;
padding: 14px 32px;
font-family: 'Share Tech Mono', monospace;
font-size: 1rem;
letter-spacing: 0.12em;
text-transform: uppercase;
cursor: pointer;
transition: background 0.15s, box-shadow 0.15s;
```
Hover: `background: #79282c` + `box-shadow: 0 0 24px rgba(220,53,69,0.35)`

**Secondary (ghost)**
```css
background: transparent;
color: #ffffff;
border: 1px solid #333;
/* same padding/font/etc */
```
Hover: `border-color: #dc3545; color: #dc3545`

### [ ] Bracket convention
Interactive elements and navigation items use `[ text ]` bracket decoration.
- Brackets: `::before`/`::after` pseudo-elements, color `#333` at rest, `#dc3545` on hover
- Apply to: nav links, scroll hints, copy buttons, inline text CTAs
- Do **not** apply to primary CTA buttons — they stand on their own

### SSH / Code blocks
```css
background: #0b0b0b;
border: 1px solid #79282c;
border-radius: 4px;
padding: 14px 18px;
font-family: 'Share Tech Mono', monospace;
box-shadow: 0 0 30px rgba(220,53,69,0.10);
```

### Flag format
Always display the flag format as a real code element:
```
<HTF-this_is_a_flag/>
```
Use `<code>` tags. Never render it as plain text in prose.

### Navigation (if added)
- Minimal: 4–5 items max
- ALLCAPS, small (`0.75rem`), wide letter-spacing
- No background — transparent, sits over the hero
- Active state: `color: #dc3545`
- Use `[ item ]` bracket decoration

---

## 9. Imagery

### Photography
HTF is an online competition — no event photos exist yet. When they do (future in-person events, or Hack Esbjerg crossover), add a real photo to the hero immediately. Until then, the design must stand without imagery and it can.

Never use stock photography or AI-generated imagery as a placeholder. An honest absence is better than a fake presence.

### Visual alternatives (current)
Since there are no photos, the visual punch comes from:
- **The decode animation** — this IS the hero visual. Let it breathe. Make it enormous.
- **Bold stats** as graphic elements: number of editions, participants, ciphers, hours. These work like hackesbjerg's "100 HACKERS" headline.
- **The `circle.svg` geometric backdrop** (`/img/circle.svg`) — keep it, it works
- **A cipher/flag example** rendered in a code block — shows visitors exactly what they're solving
- **Red color bar accents** — a full-width red line or left-border block reads as structure and energy

### When photos arrive
Drop them into the hero as a background or right-panel image. Use `filter: brightness(0.65) contrast(1.1)` to keep them cohesive with the dark page. No layout changes needed if the structure is built correctly from the start.

---

## 10. Motion & Animation

### The decode animation (keep)
The letter-by-letter decode effect on the title is the strongest piece of personality on the current site. Keep it. It is HTF.

### Rules for new animations
- **Duration**: 150–300ms for micro-interactions (hover, focus). 600–2000ms for entrance animations.
- **Easing**: `ease-out` for entrances, `ease-in-out` for loops.
- **No animation without purpose.** If removing the animation doesn't make the element confusing, remove it.
- **Respect `prefers-reduced-motion`**: all animations should be wrapped:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
  }
  ```

### Current animations to keep
| Element | Animation | Note |
|---|---|---|
| Title letters | Decode effect (state-1/2/3) | Core identity, keep as-is |
| Scroll arrow | Bob up/down (`htf-bob`) | Subtle, purposeful |
| Copy button | Color flash on copy | Good UX feedback |
| SSH connect box | Glow intensifies on hover | Subtle, keep |

---

## 11. Voice & Tone

Write like the event is already worth attending — because it is.

**Do:**
- "Solve ciphers. Capture flags. Prove yourself." — short, punchy, parallel
- "Crack the next cipher." — imperative, direct
- "Organized by COD3RS" — factual, grounded

**Don't:**
- "We are a premier platform for..." — corporate fluff
- "Whether you're a beginner or an expert..." — hedging
- "Join our growing community of..." — vague filler

### Naming conventions
| Correct | Avoid |
|---|---|
| Hack The Flag | HackTheFlag, hacktheflag, HTF (in copy) |
| COD3RS | Cod3rs, coders, Coders |
| flag | Flag (it's a technical noun, lowercase) |
| `<HTF-flag_here/>` | "HTF-flag_here" in prose |

---

## 12. The One Page Structure (Recommended)

```
┌────────────────────────────────────────────────┐
│  [nav: HACK THE FLAG  ·  DISCORD  ·  BLOG]     │
│                                                 │
│  HACK THE FLAG                                  │  ← HackTheFlag font, huge
│  Solve ciphers. Capture flags. Prove yourself. │  ← tagline
│                                                 │
│  06 DEC 2024  ·  ONLINE                        │  ← event details
│                                                 │
│  [ APPLY NOW ]       [ DISCORD ]               │  ← CTAs
│                                                 │
│  by COD3RS                                      │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│  WHAT IS HTF?                                   │
│                                                 │
│  3–4 sharp sentences. No bullet lists.         │
│  One supporting visual or stat.                │
│  "100+ participants · 24 hours · 40+ ciphers"  │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│  HOW IT WORKS                                   │
│                                                 │
│  01 → Connect via SSH                          │
│  02 → Solve a cipher, get a flag               │
│  03 → Submit: <HTF-your_flag/>                 │
│  04 → Climb the leaderboard                    │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│  GitHub · LinkedIn · Instagram                 │
│  Organized by COD3RS · hacktheflag.net         │
└────────────────────────────────────────────────┘
```

---

## 13. What hackesbjerg.dk Gets Right (Reference Points)

From the reference screenshot, these specific decisions are worth learning from:

| Decision | Why it works | Apply to HTF |
|---|---|---|
| Real event photo as hero background | Answers "is this real?" immediately | Use a past HTF / COD3RS photo |
| Giant stat in the hero ("100 HACKERS") | Gives scale and credibility | Use a number: participants, ciphers, editions |
| "ORGANIZED BY COD3RS" in the footer bar | Attribution is clear without competing with the event name | Match this pattern exactly |
| Two buttons side-by-side: primary + Discord | Primary CTA + community entry point | Apply Now / Discord or SSH / Discord |
| Vertical rotated text ("HACK · BUILD · WIN") | Uses negative space, adds energy | Could use "SOLVE · DECODE · CAPTURE" |
| Condensed nav at the bottom of the hero | Doesn't compete with headline | Consider bottom-anchored nav |
| Color blocks as design element, not filler | Visual structure without imagery | Could use red color blocks with HTF phrases |

---

## 14. Quick Reference Checklist

Before shipping any new page or section, check:

- [ ] Is the page background dark (`#000` or `#0d0d0d`)?
- [ ] Does the hero contain: event name, one sentence, date, one primary CTA, COD3RS attribution?
- [ ] Is there a real photo (not illustration, not stock)?
- [ ] Is there exactly one primary CTA button (red, solid)?
- [ ] Are all interactive elements using `[ ]` bracket decoration?
- [ ] Is all type set in HackTheFlag or Share Tech Mono only?
- [ ] Is `prefers-reduced-motion` respected?
- [ ] Does "by COD3RS" appear visibly somewhere on the page?
- [ ] Is the flag format shown as `<code>` when referenced?
- [ ] Has all Storyset illustration content been removed?

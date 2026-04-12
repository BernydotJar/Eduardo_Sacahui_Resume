# Apple UI/UX Engineer Review — Eduardo Sacahui Resume Portfolio

> **Reviewer perspective:** Senior UI/UX Engineer, Apple Human Interface Guidelines orientation
> **Review date:** 2026-02-24
> **Method:** Full source read of all components, CSS, and config files

---

## Preface

Good bones. The periodic table metaphor is distinctive, the multilingual support is real (not a stub), reduced-motion is partially handled, and the data model is clean. This review holds the execution against the same bar Apple applies internally: every pixel earns its place, every animation has physical weight, every interaction has a single, clear purpose. Below is what I would push back on in a design review.

---

## 1. Motion & Animation

> *"Animation should feel like it obeys the laws of physics — not timers."*

### 1.1 Spring physics are missing

**File:** [src/components/ui/SkillTile.tsx](src/components/ui/SkillTile.tsx) — lines 58–59

```tsx
// Current — linear easing, abrupt
whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
```

`scale: 1.05` on hover and `scale: 0.95` on tap creates a mechanical 0.10 delta snap. A finger pressing a physical key doesn't snap — it compresses and rebounds. Replace with spring physics:

```tsx
// Proposed
whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
whileTap={{ scale: 0.97, transition: { type: 'spring', stiffness: 600, damping: 15 } }}
```

The stiffness/damping ratio governs feel. 400/20 = a snappy, confident hover. 600/15 = a tight, crisp press. No `duration` needed — springs self-resolve.

### 1.2 Staggered animations use `Math.random()` — this is wrong

**File:** [src/components/ui/SkillTile.tsx](src/components/ui/SkillTile.tsx) — line 64

```tsx
style={{ animationDelay: `${Math.random() * 0.5}s` }}
```

`Math.random()` is evaluated on every render. React will recalculate a new delay every time the component re-renders, causing tiles to flash at different speeds. This also makes the animation non-deterministic — you cannot test it, you cannot reproduce it, you cannot control it. Use a stable seed (the skill's `id` or its grid position) converted to a deterministic offset.

### 1.3 The tour uses direct DOM style mutation for highlight

**File:** [src/components/Tour.tsx](src/components/Tour.tsx) — lines 44–47

```tsx
targetElement.style.transition = 'box-shadow 0.3s ease-in-out';
targetElement.style.boxShadow = '0 0 0 4px hsl(var(--primary))';
targetElement.style.borderRadius = '8px';
```

Directly mutating DOM styles in a React tree is a design smell and an animation architecture problem. It bypasses React's reconciliation — if the component re-renders, these styles can be silently overwritten or left orphaned. Apple engineers would use a CSS class toggle (add a `.tour-highlighted` class, define the ring in CSS) or a portal-based spotlight overlay — never inline `style` mutation on foreign elements.

### 1.4 `scroll-behavior: smooth` is not gated on reduced motion

**File:** [src/app/globals.css](src/app/globals.css) — line 84

```css
body {
  scroll-behavior: smooth;
}
```

This fires for every user, including those with vestibular disorders who have enabled "Reduce Motion" in their OS. Wrap it:

```css
@media (prefers-reduced-motion: no-preference) {
  body { scroll-behavior: smooth; }
}
```

The existing reduced-motion guard at line 96 only covers `animate-pulse-emerald`. It does not cover `scroll-behavior`, Framer Motion `layout` animations (which are opt-in per `shouldReduceMotion` — correctly done), or the tour's `scrollIntoView({ behavior: 'smooth' })` at Tour.tsx line 43.

---

## 2. Typography

> *"Type hierarchy is the user's GPS — get it wrong and they're lost before they start reading."*

### 2.1 The level label at 10px is below Apple's floor

**File:** [src/components/ui/SkillTile.tsx](src/components/ui/SkillTile.tsx) — line 68

```tsx
<div className="text-[10px] text-muted-foreground capitalize">{displayLevel}</div>
```

Apple's Human Interface Guidelines set **11pt** as the minimum legible size for body content. 10px is below that threshold. At any DPR below 2x (common on Android, Windows, budget displays), this text renders as 10 physical pixels and becomes illegible. At 10px on a muted color on a dark background, you are almost certainly below 4.5:1 contrast. Change to `text-[11px]` at minimum, `text-xs` (12px) preferred.

### 2.2 The type scale has four responsive steps but no fluid interpolation

**File:** [src/components/sections/Hero.tsx](src/components/sections/Hero.tsx) — line 34

```tsx
className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
```

`text-4xl` = 36px → `text-5xl` = 48px → `text-6xl` = 60px. These are hard breakpoint jumps. On a 769px screen (just past `sm`) the headline is 48px; on a 768px screen it's 36px. A 12px jump at a single pixel of viewport width is jarring. Apple uses `clamp()` for fluid type:

```css
font-size: clamp(2.25rem, 5vw + 1rem, 3.75rem);
```

This would give a smooth scale from 36px to 60px across the full viewport range with no sudden step.

### 2.3 Inconsistent vertical rhythm throughout Hero

**File:** [src/components/sections/Hero.tsx](src/components/sections/Hero.tsx) — lines 37–79

The spacings are: `mt-6`, `mt-8`, `mt-8`, `mt-10`, `mt-4`, `mt-10`, `mt-8`. That is seven different top-margin values in one section with no discernible rule. Apple spacing follows a base-8 grid. Every spacing token should be a multiple of 8px (or 4px for tight contexts). Map each gap to its semantic purpose (section → subsection → related element → decorative) and assign consistent values.

### 2.4 Nav link opacity is too low at rest

**File:** [src/components/layout/Header.tsx](src/components/layout/Header.tsx) — line 53

```tsx
className="transition-colors hover:text-foreground/80 text-foreground/60"
```

`text-foreground/60` on a `bg-background/95` backdrop means primary navigation items sit at 60% opacity at rest. These are the only links guiding users through the entire portfolio. Apple uses full-weight text for primary navigation — the dimming metaphor is for secondary or supplementary items. The contrast between resting (60%) and hovered (80%) states is also too narrow to feel responsive. Try `text-foreground/80` at rest and `text-foreground` (100%) on hover.

---

## 3. Color & Elevation

> *"Color is not decoration. Color is communication."*

### 3.1 Cards have zero elevation — they're invisible

**File:** [src/app/globals.css](src/app/globals.css) — lines 9 and 7

```css
--background: 222 47% 11%;
--card: 222 47% 11%;
```

`--card` and `--background` are identical. Every card, popover, and panel shares the same background color as the page itself. There is no visual separation between surface levels — cards literally don't exist as surfaces. Apple's design system uses micro-elevation: a card is typically 3-5% lighter than the page background in dark mode. Change `--card` to something like `222 47% 14%` to give cards a perceptible but not harsh lift.

### 3.2 Three semantic tokens share one value

**File:** [src/app/globals.css](src/app/globals.css) — lines 17, 23, 24

```css
--muted:   217 33% 17%;
--border:  217 33% 17%;
--input:   217 33% 17%;
```

`--muted`, `--border`, and `--input` are identical. One value serving three semantic roles destroys the token system's purpose. If you later need to adjust just border thickness or input background independently, you have no lever to pull. Separate these: let `--border` be slightly lighter (add 5% lightness), `--input` match the card background, and `--muted` stay as the darkest of the three.

### 3.3 The `:root` block is a complete duplicate of `.dark`

**File:** [src/app/globals.css](src/app/globals.css) — lines 5–75

Since `<html className="dark">` is hardcoded in `layout.tsx`, the entire `:root { ... }` block at lines 6–40 is dead CSS — it never applies. It adds ~2KB of parsed CSS with zero effect. It also creates a false affordance: a future developer might try to add light-mode colors to `:root`, not realizing dark mode is mandatory. Delete the `:root` block entirely and only keep `.dark`. If light mode is ever added, add `:root` back at that time.

### 3.4 Primary cyan on dark background — borderline contrast

The primary color is `hsl(172, 63%, 46%)` — a mid-lightness cyan. Against the background `hsl(222, 47%, 11%)`, the contrast ratio is approximately **4.3:1** — which passes WCAG AA for large text (≥18pt bold or ≥14pt normal) but fails for normal body text at smaller sizes. The `text-[10px]` level label in SkillTile, if ever using `text-primary` color, would fail decisively. Bump primary to `hsl(172, 63%, 52%)` to clear 4.5:1 comfortably at all sizes.

---

## 4. Layout & Spacing

> *"Whitespace is not empty space. It is a design decision."*

### 4.1 The `section` rule has a CSS specificity conflict

**File:** [src/app/globals.css](src/app/globals.css) — lines 89–93

```css
section {
  @apply py-16 sm:py-20;   /* bottom = 64px, then 80px at sm */
  scroll-margin-top: 5rem;
  padding-bottom: 5rem;    /* = 80px — always overrides py-16's 64px */
}
```

`padding-bottom: 5rem` (plain CSS, non-responsive) overrides `@apply py-16` (64px) because it appears later in the cascade. At mobile widths you intended `py-16` (64px bottom padding) but you always get `5rem` (80px). This is a subtle cascade bug. Remove the raw `padding-bottom: 5rem` and instead use `@apply pb-20` as the responsive value, or make it explicit: `padding-bottom: clamp(4rem, 5vw, 5rem)`.

### 4.2 The periodic table grid gap is a touch-target problem

**File:** [src/components/sections/Skills.tsx](src/components/sections/Skills.tsx) — line 96

```tsx
className={cn("relative grid gap-1", ...)}
```

`gap-1` = 4px between tiles. Apple's HIG minimum touch target is 44×44pt. The tiles are `min-h-[100px]` which satisfies height, but 4px between adjacent tiles means a finger press near a tile edge easily lands on the wrong target. At 44pt minimum width, tiles are borderline — particularly on the 18-column grid where tiles can be quite narrow on smaller screens. Increase to `gap-1.5` (6px) or `gap-2` (8px).

### 4.3 The hero button pair isn't balanced

**File:** [src/components/sections/Hero.tsx](src/components/sections/Hero.tsx) — lines 61–70

```tsx
<Button size="lg" asChild>  {/* filled, primary */}
  <a href="..."> <Download className="mr-2 h-4 w-4" /> Download CV </a>
</Button>
<Button size="lg" variant="outline" asChild>
  <a href="#contact">Contact Me</a>
</Button>
```

The primary CTA has a `h-4 w-4` (16px) icon alongside `size="lg"` text. Apple scales icons to match the cap-height of the adjacent text — for `size="lg"` buttons (typically 18–20px text), the icon should be `h-5 w-5` (20px). The current 16px icon sits visually low relative to the text baseline.

The secondary CTA "Contact Me" has no icon, while the primary does. This creates an asymmetry in the button pair. Either add a `Mail` icon to the secondary (consistent) or remove the `Download` icon from the primary (minimal). Both buttons compete for attention when one should clearly be subordinate.

---

## 5. Interaction Design

> *"Every interactive element makes a promise. The response fulfills it."*

### 5.1 The contact form submission is silent on mobile

**File:** [src/components/sections/Contact.tsx](src/components/sections/Contact.tsx) — lines 37, 66–70

```tsx
window.location.href = `mailto:${contactRecipient}?subject=...&body=...`;
// then immediately:
toast({ title: dict.contact.toastSuccessTitle, ... });
form.reset();
```

The `mailto:` redirect fires, then the code immediately shows a success toast and resets the form. On mobile Safari, `window.location.href = 'mailto:...'` may open the Mail app, leave the page momentarily, or be silently blocked by the browser. When control returns to the page, the success toast may already be gone (toasts have a timeout). The user sees a cleared form and no indication of what happened.

The `staticSiteNote` disclaimer in the card header is a good disclosure, but the success toast fires before the user has confirmed anything. A more honest UX: show the toast with the message "Your email client should open shortly" and keep the form populated until the user explicitly dismisses it.

### 5.2 Tag filter chips use a raw `<button>` instead of the design system

**File:** [src/components/sections/Skills.tsx](src/components/sections/Skills.tsx) — lines 59–71

```tsx
<button
  type="button"
  className={`px-3 py-1 text-sm rounded-full border transition-colors ${...}`}
>
```

This raw `<button>` carries hand-rolled styles that diverge from the design system. The hover state is `hover:bg-muted` — which is the same color as the resting state of the active chip. The focus ring is missing entirely (no `focus-visible:` class). The `transition-colors` duration defaults to 150ms — the rest of the app's interactive elements use 300ms (`duration-300`). Three inconsistencies in eight lines. Use the design system's `Button` component with a custom `variant`, or extract a `FilterChip` component that lives in the design system and is consistent everywhere.

### 5.3 The Tour popover has no backdrop — attention is unfocused

**File:** [src/components/Tour.tsx](src/components/Tour.tsx) — entire component

The tour highlights a target element with a `box-shadow` ring, but the rest of the page remains fully visible and interactive. On a busy page with 50+ skill tiles, the highlighted element competes with everything around it. Apple's onboarding overlays (e.g., Spotlight in iOS, feature callouts in macOS) dim the surrounding content so the highlighted element is the only thing that draws the eye.

Additionally, when the tour advances from one step to the next, the popover teleports — it closes on step N's position and opens on step N+1's position with no transition. The `triggerRef` repositioning is synchronous. The user's eye has no visual thread to follow. Apple would animate the popover between positions using a shared-element-style transition.

### 5.4 Empty state in Skills is a plain text string

**File:** [src/components/sections/Skills.tsx](src/components/sections/Skills.tsx) — lines 121–123

```tsx
{filteredSkills.length === 0 && (
  <p className="text-center text-muted-foreground mt-8">{dict.skills.noSkillsFound}</p>
)}
```

A muted text string in the middle of where 50 tiles used to be is an anti-pattern Apple specifically calls out: empty states must communicate three things — *what* is empty, *why* it's empty, and *what the user can do about it*. Add a clear action: "Clear filters" or "Reset search" as a button directly in the empty state.

---

## 6. Accessibility

> *"Accessibility is not a feature. It is a quality attribute."*

### 6.1 `focus:outline-none` on the SheetTitle is an a11y regression

**File:** [src/components/DetailDrawer.tsx](src/components/DetailDrawer.tsx) — line 74

```tsx
<SheetTitle ref={titleRef} className="text-2xl text-primary focus:outline-none" tabIndex={-1}>
```

`tabIndex={-1}` is correct — it enables programmatic focus without adding the element to the tab order. But `focus:outline-none` removes the visual focus indicator even for programmatic focus. If the system's focus ring (from `globals.css` line 86–88) is supposed to apply here, `focus:outline-none` overrides it. Remove `focus:outline-none` — the `tabIndex={-1}` alone prevents unwanted tab stops, and the CSS ring only shows on `:focus-visible`, which programmatic focus does not trigger. This is a net-zero change that removes a line of harmful code.

### 6.2 The MapPin and Mail icons in Hero are purely decorative but lack `aria-hidden`

**File:** [src/components/sections/Hero.tsx](src/components/sections/Hero.tsx) — lines 48, 52

```tsx
<MapPin className="h-4 w-4" />
<Mail className="h-4 w-4" />
```

These icons are decorative — the adjacent `<span>` and `<a>` text fully describes them. Without `aria-hidden="true"`, screen readers will attempt to announce "map pin" or "mail" before the text, creating redundant announcements. Add `aria-hidden="true"` to every purely decorative icon.

### 6.3 The `<a href="#">` logo link has no accessible label

**File:** [src/components/layout/Header.tsx](src/components/layout/Header.tsx) — line 47

```tsx
<a href="#" className="mr-6 flex items-center space-x-2">
  <Code className="h-6 w-6 text-primary" />
  <span className="hidden font-bold sm:inline-block">Eduardo Sacahui</span>
</a>
```

On mobile, the `<span>` is `hidden`. The `Code` icon has no `aria-hidden` and no `aria-label` on the anchor. A screen reader announces this as "link, Code" — not informative. Add `aria-label="Go to top"` on the `<a>` and `aria-hidden="true"` on the `Code` icon. The visible text on desktop is fine; mobile needs the explicit label.

### 6.4 Language selector has no visible label for screen readers

**File:** [src/components/layout/Header.tsx](src/components/layout/Header.tsx) — lines 58–67

The `<Select>` component uses `<SelectValue placeholder={dict.app.language} />` as a trigger label, but `placeholder` only renders when no value is selected. Once a locale is chosen (immediately, since `value={locale}` is always set), the placeholder disappears and only the selected language name shows. There is no persistent label. Add a visually hidden `<label>` or an `aria-label="Language selector"` on the `<SelectTrigger>`.

---

## 7. Information Architecture

> *"If you have to explain it, you haven't designed it yet."*

### 7.1 The badge wall communicates nothing

**File:** [src/components/sections/Hero.tsx](src/components/sections/Hero.tsx) — lines 72–79

```tsx
<div className="flex flex-wrap justify-center gap-2">
  {heroInfo.badges.map((badge, index) => (
    <Badge key={index} variant="outline" className="text-xs">{badge}</Badge>
  ))}
</div>
```

Seven or more `variant="outline"` badges in a row at `text-xs` on a dark background read as a visual blur. There is no hierarchy — "UiPath RPA Solution Architect" and "Harvard ManageMentor — Coaching" have identical visual weight. A recruiter scanning this section cannot extract signal from noise in under 3 seconds.

Apple's approach: don't list credentials — feature them. Surface the two or three most differentiating certifications in-line with the hero text. Put the rest behind a "View all" disclosure. Alternatively, fold them into the Skills section where they're contextually relevant.

### 7.2 Two section heading groups use identical styling

**File:** [src/components/sections/Experience.tsx](src/components/sections/Experience.tsx) — lines 24, 32

```tsx
<h3 className="text-2xl font-semibold mb-6 text-center text-primary">{dict.experience.recentHeading}</h3>
...
<h3 className="text-2xl font-semibold mb-6 text-center text-primary">{dict.experience.earlyHeading}</h3>
```

"Recent Experience" and "Early Career" are both `text-2xl text-primary` — the same weight, color, and size as each other. There is no visual difference between the two groups' headings, which means there's no visual cue that these are *different categories* of timeline. The subsection headings should be visually subordinate to the section heading (`<h2>`) and visually distinct from each other (e.g., using `text-muted-foreground` for "Early Career" to signal lower recency).

### 7.3 The `CaseStudies` section uses `bg-secondary` as background while all other sections use `bg-background`

**File:** [src/components/sections/CaseStudies.tsx](src/components/sections/CaseStudies.tsx) — line 25

```tsx
<section id="casestudies" className="bg-secondary">
```

Every other section sits on `bg-background`. CaseStudies uses `bg-secondary` to create a banded alternating layout — a common technique. But because `--card` == `--background`, and `--background` is used for most sections, the band effect is very subtle and inconsistent. The cards *inside* `bg-secondary` use `bg-card` which equals `bg-background`, so the cards appear *lighter* than their container — a reversed elevation hierarchy. Cards should always sit *on* a surface, not below it.

---

## 8. Code Architecture Concerns (with UI impact)

### 8.1 The `:root` and `.dark` CSS blocks are identical — dead code

**File:** [src/app/globals.css](src/app/globals.css) — lines 6–40

Since `<html className="dark">` is hardcoded, the `:root` block never applies. It is 35 lines of dead CSS that ships to every user. Delete it. This is not a cosmetic issue — it creates a false impression of light mode support for contributors and inflates the CSS bundle.

### 8.2 `section` sets both `@apply py-16 sm:py-20` and `padding-bottom: 5rem` — one always wins

See section 4.1 above. The raw `padding-bottom: 5rem` always overrides `py-16`'s bottom value at mobile. The effective styles are `pt-16 pb-20` at mobile (not symmetric), then `pt-20 pb-20` at sm. The intended `py-16` at mobile is never realized.

---

## 9. Summary: Priority Matrix

| # | Finding | File | Impact |
|---|---------|------|--------|
| 1 | Spring physics missing on SkillTile hover/tap | [SkillTile.tsx:58](src/components/ui/SkillTile.tsx#L58) | Motion feels mechanical |
| 2 | `Math.random()` animation delay is non-deterministic | [SkillTile.tsx:64](src/components/ui/SkillTile.tsx#L64) | Unpredictable re-render behavior |
| 3 | `scroll-behavior: smooth` not gated on reduced-motion | [globals.css:84](src/app/globals.css#L84) | A11y regression |
| 4 | `--card` == `--background` — no surface elevation | [globals.css:9](src/app/globals.css#L9) | Cards are invisible as surfaces |
| 5 | `text-[10px]` level label below minimum legible size | [SkillTile.tsx:68](src/components/ui/SkillTile.tsx#L68) | Illegible at low DPR |
| 6 | Nav links at 60% opacity — too dim for primary navigation | [Header.tsx:53](src/components/layout/Header.tsx#L53) | Discoverability risk |
| 7 | Tour DOM mutation bypasses React reconciliation | [Tour.tsx:44](src/components/Tour.tsx#L44) | Architecture / style leak |
| 8 | Tour has no spotlight/backdrop — no focused attention | [Tour.tsx](src/components/Tour.tsx) | Onboarding clarity |
| 9 | `focus:outline-none` on focused SheetTitle | [DetailDrawer.tsx:74](src/components/DetailDrawer.tsx#L74) | A11y regression |
| 10 | `<a href="#">` logo has no a11y label on mobile | [Header.tsx:47](src/components/layout/Header.tsx#L47) | Screen reader announces "link, Code" |
| 11 | Empty state in Skills has no action | [Skills.tsx:121](src/components/sections/Skills.tsx#L121) | Dead end interaction |
| 12 | Badge wall has no hierarchy — signal buried in noise | [Hero.tsx:72](src/components/sections/Hero.tsx#L72) | Recruiters can't parse it in <3s |
| 13 | Dead `:root` CSS block — never applies | [globals.css:6](src/app/globals.css#L6) | Dead code + false light-mode affordance |
| 14 | `section` padding-bottom conflict | [globals.css:89](src/app/globals.css#L89) | `py-16` mobile value never realized |
| 15 | Tag filter chips bypass the design system | [Skills.tsx:59](src/components/sections/Skills.tsx#L59) | Inconsistent hover/focus behavior |
| 16 | Decorative icons missing `aria-hidden` in Hero | [Hero.tsx:48](src/components/sections/Hero.tsx#L48) | Redundant screen reader announcements |
| 17 | Language selector has no persistent a11y label | [Header.tsx:58](src/components/layout/Header.tsx#L58) | Screen reader context loss |
| 18 | Type scale uses hard breakpoint jumps, not fluid clamp | [Hero.tsx:34](src/components/sections/Hero.tsx#L34) | Jarring headline resize at breakpoints |
| 19 | CaseStudies `bg-secondary` reverses card elevation | [CaseStudies.tsx:25](src/components/sections/CaseStudies.tsx#L25) | Cards appear below their container |
| 20 | Contact form success toast fires before `mailto:` confirms | [Contact.tsx:66](src/components/sections/Contact.tsx#L66) | Misleading success state on mobile |

---

## Closing Note

The strongest signal this portfolio sends is that Eduardo thinks in systems — the periodic table grid, the JSON-driven data model, the i18n architecture. The weakest signal is surface polish: the details that separate "it works" from "it feels right." The gap between those two is what this review targets. None of these findings are architectural rewrites — they are the kind of corrections that take 30 minutes each and collectively transform the tactile feel of the product from "developer built this" to "a designer who codes built this."

That is the standard this portfolio is reaching for. It is close.

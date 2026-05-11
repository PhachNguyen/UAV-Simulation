# SkyLink Design System

## Color Palette

### Primary Colors (OKLCH)
- **Brand Blue**: oklab(0.54 0.13 250) → `#0084ff` - Main call-to-action and brand accent
- **Deep Navy**: oklab(0.28 0.04 260) → `#0f172a` - Headers, text hierarchy, depth
- **Sky**: oklab(0.72 0.12 230) → `#87ceeb` - Secondary accent, lighter interactions

### Semantic Colors
- **Success**: oklab(0.64 0.12 142) → `#22c55e` - Completion, validation
- **Warning**: oklab(0.70 0.14 60) → `#f97316` - Caution, pending states
- **Error**: oklab(0.58 0.13 10) → `#ef4444` - Errors, critical alerts
- **Info**: oklab(0.65 0.11 230) → `#06b6d4` - Information, secondary actions

### Neutral Scale (Tinted toward brand blue)
- **Canvas**: `#ffffff` - Primary background
- **Surface**: `#f8fafc` - Secondary background, subtle contrast
- **Border**: `#cbd5e1` - Dividers and borders
- **Text Muted**: `#64748b` - Secondary text, captions
- **Text Default**: `#1e293b` - Primary text
- **Text Inverse**: `#ffffff` - Text on dark backgrounds

## Typography

### Font Stack
- **Display/Headlines**: Inter 700–800, 3.5rem–5rem, leading-tight
- **Body**: Inter 400–600, 1rem–1.125rem, leading-relaxed
- **Mono**: JetBrains Mono 400–500, 0.875rem–1rem (code examples)

### Hierarchy Rules
- H1: 3.5rem / 700 weight / letter-spacing -0.02em
- H2: 2.25rem / 700 weight
- H3: 1.5rem / 700 weight
- Body Large: 1.125rem / 400 weight
- Body: 1rem / 400 weight
- Body Small: 0.875rem / 400 weight
- Caption: 0.75rem / 500 weight (all-caps or tracking)

### Line Length
- Max 75 characters for body text (readability)
- Paragraphs: max 2–3 sentences before visual break

## Spacing Scale
- XS: 0.25rem (4px)
- SM: 0.5rem (8px)
- MD: 1rem (16px)
- LG: 1.5rem (24px)
- XL: 2rem (32px)
- 2XL: 3rem (48px)
- 3XL: 4rem (64px)

Use varied spacing for rhythm. Avoid uniform padding.

## Component Tokens

### Buttons
- **Primary**: Dark Navy bg + White text, rounded-lg, padding 0.75rem 1.5rem, 600 weight
- **Secondary**: Blue border + Blue text + transparent bg, same sizing
- **Ghost**: No visible state, hover underline
- **Sizing**: SM (0.875rem), MD (1rem), LG (1.125rem)

### Cards
- Background: White with 1px border #cbd5e1
- Border radius: 1.5rem
- Padding: 1.5rem–2rem (vary for rhythm)
- Shadow: subtle `0 1px 3px rgba(0,0,0,0.1)` on hover only
- No nested cards

### Forms
- Input height: 2.75rem
- Border: 1px #cbd5e1, focus: 2px #0084ff
- Placeholder: #94a3b8
- Radius: 0.75rem

## Elevation & Depth
- No glass morphism (too trendy, unclear on all backgrounds)
- Shadows used sparingly: hover states, modals, floating elements
- Elevation through color (tint variation) not shadow alone

## Motion
- Standard easing: cubic-bezier(0.4, 0, 0.2, 1) (ease-out)
- Duration: 200ms for micro-interactions, 300–400ms for section transitions
- No layout shift animations (causes jank)
- Hover states: subtle scale (1.02–1.05) or color shift

## Responsive Breakpoints
- Mobile: 320px–767px (1 column, stacked)
- Tablet: 768px–1023px (2 columns)
- Desktop: 1024px–1440px (3–4 columns, max-w-7xl containers)
- Wide: 1441px+ (same as desktop, centered with margins)

## Anti-patterns to Avoid
1. No gradient text (`background-clip: text`)
2. No side-stripe colored borders
3. No repeated identical card grids
4. No hero-metric templates (big number + label)
5. No modals as first solution
6. No em dashes (use commas, colons, periods)
7. No all-caps body text (only in captions/labels)

## Accessibility Minimums
- Contrast ratio ≥ 4.5:1 for text on backgrounds
- Focus states visible (blue outline + scale)
- All interactive elements keyboard accessible
- Icons paired with text labels or aria-labels
- Alt text on all meaningful images
- Form labels explicitly associated with inputs

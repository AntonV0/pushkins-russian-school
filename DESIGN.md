# Design Governance

Last audited: 6 August 2026

## 1. Purpose and scope

This document is the primary design-governance reference for Pushkin's School. It records the current design language, project-specific design principles, implementation workflow, experiment rules, and a proposed improvement backlog.

`DESIGN.md` guides future UI and content-design work. A future agent should inspect the current implementation and follow the workflow in [Design workflow](#8-design-workflow) before editing a production component, route, layout, stylesheet, token, font, content registry, dependency, or asset.

This audit describes the working tree as rendered locally on 6 August 2026, including the owner's existing staged and unstaged homepage work. It is a description of that baseline, not approval to retain, revise, stage, or publish it.

### Evidence labels

- **Observed** means directly supported by the current source or local browser inspection.
- **Inferred** means a reasonable interpretation that still needs owner or business confirmation.
- **Proposed** means a recommendation for a future, separately approved task.
- **Unresolved** means a subjective or business choice that this document deliberately does not make.

## 2. Brand and audience

### Observed

- Pushkin's School presents itself as a weekend supplementary school for Russian language, literature, and culture for children aged 3–18 in England. Sources: `README.md`, `src/data/public/site.ts`, and the public route copy.
- The primary conversion is a parent or carer asking about joining, with routes to current in-person locations, register-interest locations, and related online learning. Source: `PROJECT-DECISIONS.md`.
- The public site also serves existing families, prospective adult or exam-route learners indirectly, school staff, and—because this is a public portfolio repository—recruiters and technical reviewers.
- Trust currently comes from school history, curriculum relationships, location and timetable transparency, authentic classroom imagery, clear admissions guidance, public policies, and visible contact routes.
- The identity is anchored by the Pushkin portrait mark, a script wordmark, deep blue, red, pale blue-grey surfaces, and documentary school photography.

### Inferred; confirmation required

- The primary decision-maker is likely a parent or carer comparing credibility, fit, travel, timetable, language level, and whether a child will feel welcome.
- The desired tone is likely knowledgeable, calm, warm, culturally literate, and direct rather than playful or sales-led.
- The school needs to appeal to families with different relationships to Russian: fluent or heritage-speaking households, bilingual families, and newcomers. That suggests plain English explanations with culturally meaningful Russian context, but the owner has not approved an English-only or bilingual content policy.
- Cultural character should come from language, literature, real school activity, and the Pushkin identity—not generic national motifs.

### Brand qualities to protect

- Educational credibility without institutional coldness.
- Warmth without looking childish or nursery-led.
- Cultural expression without stereotypes or decorative clichés.
- Confidence without unsupported claims.
- A clear parent decision path without reducing the school to a sales funnel.

## 3. Current design-language inventory

### Typography

**Observed**

- `src/app/layout.tsx` loads Geist, Geist Mono, and Great Vibes through `next/font/google`.
- Geist is the interface and body face. Geist Mono is used sparingly for sequence numbers and development markers. Great Vibes is confined to the logo wordmark through `font-logo-display` in `src/components/site/brand-mark.tsx`.
- `PageHero` provides the principal `h1` scale; `SectionIntro` normally provides `h2` at `text-3xl sm:text-4xl`; cards usually use `text-xl` or `text-2xl` headings.
- Eyebrows use small, semibold uppercase text with wide tracking and `brand-red`.
- Body copy is normally `text-sm` or `text-base` with generous `leading-6` or `leading-7`. The homepage hero uses larger supporting copy.
- Headings use `text-wrap: balance`; paragraphs and list content use `text-wrap: pretty`; key text elements allow long words to wrap in `src/app/globals.css`.

**Observed inconsistency**

- Heading composition is broadly consistent, but many route-local `h2` elements recreate hierarchy instead of using `SectionIntro`. Some pages therefore vary in size, margins, and eyebrow treatment.
- Great Vibes supports the established logo, but it is not part of the editorial type hierarchy. Using it elsewhere would weaken the distinction between brand mark and content.

### Colour

**Observed**

The source of truth is `:root` plus Tailwind's inline theme in `src/app/globals.css`:

| Token | Current value | Current role |
| --- | --- | --- |
| `--background` | `#f7fafc` | Pale page and alternating section ground |
| `--foreground` | `#172033` | Default text |
| `--surface` | `#ffffff` | Cards and white sections |
| `--surface-muted` | `#eef3f7` | Media fallbacks and quiet panels |
| `--surface-blue` | `#eaf3fa` | Selected and supporting UI |
| `--brand-blue` | `#082850` | Primary actions and brand elements |
| `--brand-blue-strong` | `#002048` | Headings, dark panels, footer |
| `--brand-red` | `#d01010` | Eyebrows, focus ring, active accents |
| `--brand-accent` | `#7b5f7d` | Secondary accent and fine dividers |
| `--border-soft` | `#d7e0ea` | Dividers and card borders |
| `--muted` | `#5b6778` | Secondary text |

- White and pale blue-grey sections alternate through the site. Deep blue anchors high-trust or conversion areas. Red is used as an accent rather than a large background.
- The current mauve `brand-accent` appears in dividers, location labels, icons, and decorative rules.

**Observed inconsistency**

- Several components use literal colours and arbitrary rgba shadows in JSX alongside tokens. The viewport `themeColor` in `src/app/layout.tsx` is `#fbfaf7`, which does not match the current `--background`.
- Status cards add emerald, sky, zinc, and amber in `SchoolCard`, creating a functional status palette outside the core brand palette.

### Spacing, containers, and layout

**Observed**

- The dominant content container is `max-w-7xl` with `px-6 lg:px-8`, used by the header, footer, page heroes, and most sections.
- The homepage final media CTA expands to `max-w-[80rem]`; some form and utility surfaces use narrower containers.
- Global vertical rhythm is set by `--section-y: clamp(3.5rem, 7vw, 5.5rem)` and `--section-y-compact: clamp(2.75rem, 5.5vw, 4.25rem)` through `.site-section` and `.site-section-compact`.
- Common desktop splits are editorial two-column grids around `0.72fr/1.28fr`, `0.78fr/1.22fr`, or similar. Repeated groups become two or three columns at `md` or `lg`.
- Mobile layouts stack in document order. At the audited 390×844 viewport the homepage had no horizontal overflow (`scrollWidth` equalled `clientWidth`).
- The audited homepage section heights at 1440×1000 were substantial but coherent; at mobile, sections 5–7 became long stacked narratives, approximately 1174px, 1375px, and 1107px respectively.

**Observed inconsistency**

- Numerous near-identical grid ratios, padding sets, and card gaps are authored route-by-route. They produce a family resemblance but not a small explicit layout system.
- Adjacent homepage sections 6 and 7 both use `border-y bg-surface`, so their boundary does not create the same tonal alternation seen elsewhere.

### Borders, radii, and shadows

**Observed**

- `border-border-soft` and `border-y` dividers are the most common structural device.
- Buttons generally use `rounded-md`; shared panels and cards commonly use `rounded-lg`; the homepage trust panel uses `rounded-2xl`; one literary feature uses `rounded-[2rem]`.
- `.premium-panel` supplies a restrained inset highlight and soft shadow. Primary/header CTAs and some homepage cards use stronger custom shadows.
- Some editorial lists deliberately use hard edges and border-only separation instead of cards.

**Observed inconsistency**

- The mix of hard-edged lists, `rounded-md`, `rounded-lg`, `rounded-2xl`, and `2rem` feature radii is not yet tied to explicit component roles.
- Similar content cards sometimes use `.premium-panel`, sometimes an arbitrary shadow, and sometimes no shadow.

### Components and repeated patterns

**Observed**

- Global chrome: `Header`, `BrandMark`, `Footer`, and mobile `FooterAccordion` are mounted by `src/app/layout.tsx`.
- Shared hierarchy: `PageHero`, `SectionIntro`, and `PageCta`.
- Shared actions: `ButtonLink` and `CtaGroup`, plus route-local text-link treatments.
- Repeated decision and evidence UI includes `SchoolCard`, `SchoolComparisonTable`, `LearningOptions`, `SchoolEvidencePanel`, `DecisionPanel`, `TrustSignals`, `FaqList`, media showcases, and status/icon badges.
- Most components use semantic `section`, `article`, lists, headings, links, and `details` rather than generic click targets.
- The sticky header has full, compact-desktop, tablet, and mobile modes. The footer switches from accordions on mobile to columns from `md` upward.

**Observed inconsistency**

- Route-local action links frequently duplicate a shared visual treatment.
- Homepage sections 5–7 are not standalone components. They are inline structures inside `Home`, even though they represent distinct content modules.
- Repeated cards do not always use the shared `SchoolCard` or other reusable primitives because their information density and narrative roles differ.

### Buttons and calls to action

**Observed**

- `ButtonLink` provides primary, secondary, light, quiet, and header variants with a minimum 44px height in its base class.
- Primary actions are deep blue with white text. Secondary actions are white/translucent with a blue border. Quiet actions are underlined text links with red decoration.
- Mobile action groups generally become full-width stacked buttons; from `sm`, they become inline and wrapping.
- The primary recurring label is “Join Pushkin's School” or “Ask about joining,” with location, curriculum, admissions, and online-route actions as secondary paths.
- Hover treatments use colour, subtle translation, scale, underline, and shadow; active buttons translate by one pixel.

**Observed inconsistency / risk**

- Some page-local links imitate button variants, which can drift in target size and focus treatment.
- `ButtonLink` uses `whitespace-nowrap`; this is safe for current short labels at the audited width but could constrain longer translated or revised labels.

### Imagery and illustration

**Observed**

- Current public imagery is predominantly authentic classroom, learning-material, performance, and community photography. Images use Next `Image`, typed media registries, approved public paths, and explicit alt metadata.
- Typical treatments are `object-cover`, 4:3 or 16:9 frames, soft borders, and occasional captions/overlays. The homepage combines one lead classroom photograph with supporting images, a proof image, a video poster, and a community image.
- Decorative illustration is limited. The portrait logo and a few code-built editorial/fallback compositions provide character without competing with photography.
- `ASSET-WORKFLOW.md` requires review, consent/privacy consideration, public-safe filenames, alt text, crop notes, and source retention outside public assets.

### Interaction and motion

**Observed**

- The site uses a sticky, blurred header; a stateful mobile menu; native `details` FAQ disclosure; a video poster/player; and link/button hover and focus transitions.
- Motion is generally short and restrained. The video play ring has an explicit `prefers-reduced-motion` override.
- The mobile menu declares `aria-expanded` and `aria-controls`, closes on Escape and outside pointer input, and closes when a navigation item is chosen.

**Observed accessibility follow-up**

- Focus is globally visible and the layout includes a skip link and `lang="en"`.
- Semantic ordered lists in homepage sections 5 and 7 preserve sequence; icons used decoratively are generally `aria-hidden`.
- Current imagery has alt text or deliberately empty alt text when the enclosing link supplies the accessible name.
- A future QA pass should verify mobile-menu focus movement/return, complete keyboard order, disclosure announcements, focus visibility against every surface, and contrast for alpha colours. Those behaviours were not exhaustively certified by this visual audit.
- Motion reduction is explicit for the video pulse and some transforms, but not consistently attached to every hover/transition utility. Hover-only polish must never carry essential meaning.

### Technical constraints

**Observed**

- The app uses Next.js App Router, React 19, TypeScript, Tailwind CSS v4, and `next/font`; there is no separate Tailwind configuration file.
- Design tokens and a small set of global utilities live in `src/app/globals.css`; most component styling is expressed as Tailwind classes inline in TSX.
- Public business content is split between route-local constants and typed registries under `src/data/public/`. Exact branch status, fees, timetables, policies, claims, and media approval remain business-sensitive.
- Homepage development builds add visible numeric section markers through the local `HomepageSectionMarker`; these wrappers are removed in production.
- The sticky header and `scroll-margin-top` affect anchor and section QA.

## 4. Proposed design principles

These are recommendations for owner approval, not settled brand decisions.

1. **Make the next decision obvious.** Each section should help a parent understand fit, evidence, location, or next action without presenting several equal-priority routes at once.
2. **Lead with educational credibility, then warmth.** Use clear hierarchy, curriculum evidence, teacher/school context, and precise language; let authentic photography and humane copy create warmth.
3. **Be culturally expressive through substance.** Prefer literature, language, real traditions, student work, and the established Pushkin identity over flags, folk-pattern decoration, or generic “Russian” motifs.
4. **Design for mixed familiarity.** Explain school and learning terms so heritage-speaking families, bilingual households, and newcomers can all scan confidently.
5. **Keep claims verifiable.** Separate historical evidence, current operating facts, and future ambitions. Never turn pending information into marketing certainty.
6. **Use a calm editorial system.** Reuse the existing container, section rhythm, hierarchy, border, and action patterns; reserve stronger colour, radius, or shadow for genuine emphasis.
7. **Make mobile a first-class reading experience.** Preserve sequence, keep actions reachable, prevent long card stacks from feeling repetitive, and test copy wrapping at narrow and intermediate widths.
8. **Accessibility is part of the visual system.** Focus, contrast, target size, reduced motion, semantic order, and useful alternative text are acceptance criteria, not a later pass.

## 5. Copy guidance

### Existing conventions

- Headlines are sentence case, parent-facing, and usually describe an outcome or decision.
- Eyebrows name the topic (“Learning approach,” “School locations,” “Joining”).
- Supporting copy typically explains context in one short paragraph.
- CTAs use direct verbs: ask, see, view, explore, compare, tell.

### Proposed future rules

- Use one concrete idea per headline. Prefer a parent question, learner outcome, or next decision over an abstract slogan.
- Keep an eyebrow to two to four words where possible; do not use it to repeat the headline.
- Aim for 45–80 words of supporting copy per major section unless the content genuinely needs a structured list. On mobile, prefer short paragraphs and labelled facts over dense prose.
- Use one primary CTA per decision point and at most one or two clearly subordinate alternatives.
- Button labels should name the destination or result. Avoid “Learn more” when “View Bracknell school” or “Compare online learning” is available.
- Maintain a calm, welcoming, specific voice. Avoid urgency, exaggerated superlatives, childish phrasing, and jargon that assumes knowledge of the UK or Russian education systems.
- Do not invent pupil outcomes, accreditation, partner relationships, availability, fees, dates, locations, safeguarding claims, or quantities. Check `CONTENT-VERIFICATION.md`, `PROJECT-DECISIONS.md`, and the relevant `src/data/public/` registry.
- Preserve factual business information exactly unless the owner approves a content decision. Copy editing does not authorize changing a fact.
- Explain Russian terms when they materially help comprehension. Do not add decorative Cyrillic or bilingual copy without a language-policy decision and review by a fluent owner-approved reviewer.
- Write alt text for the image's purpose in context, not a keyword list. Use empty alt text only when an image is decorative or the same accessible information is already supplied by its enclosing control.

## 6. Layout and component guidance

### Existing conventions to reuse

- Default container: `max-w-7xl px-6 lg:px-8`.
- Default major spacing: `.site-section`; compact narrative spacing: `.site-section-compact`.
- Default page hierarchy: `PageHero` → content sections using `SectionIntro` → `PageCta` where needed.
- Default card surface: `surface` or `background`, `border-border-soft`, normally `rounded-lg`, with `.premium-panel` only when elevation helps hierarchy.
- Default actions: `ButtonLink` inside `CtaGroup`; use quiet links for subordinate navigation.
- Default responsive behaviour: stack first; introduce columns only when the content relationship remains readable and equal-height cards are useful.

### Proposed conventions requiring approval

- Treat `max-w-7xl` as the primary alignment rail. Depart from it only for a deliberately immersive media section and align inner text back to a known rail.
- Limit each section to one dominant layout idea: split editorial, comparison grid, step sequence, evidence band, or media feature.
- Use the existing section spacing tokens before adding route-local padding values. Section boundaries should alternate by tone, divider, or composition—not all three at once.
- Use `rounded-md` for controls and small utility elements, `rounded-lg` for standard cards/panels, and a larger radius only for a single featured object. Avoid mixing several radius scales in one section.
- Prefer borders and surface contrast to heavy shadows. Reserve elevated shadows for primary CTAs, overlays, or one featured panel.
- Cards should group facts that a reader compares. Narrative copy should not be forced into cards solely for decoration.
- Preserve a single primary action style per section. Reuse shared variants instead of recreating them in route files when a future shared-component change has been separately approved.
- Place images next to the claim or story they evidence. Do not use school photography as an unrelated background texture.
- At mobile widths, put the explanatory heading before its dependent grid/list, make key actions full-width when useful, and avoid side-by-side content below its comfortable reading width.
- Use motion for feedback and spatial continuity only. Keep durations short, provide a reduced-motion equivalent, and do not animate long reading sections on entry by default.
- New components must preserve semantic heading order, keyboard use, visible focus, 44px target intent where practical, alt text, contrast, and zoom/reflow to 200%.

## 7. Imagery strategy

### Suitable categories

- Real lessons showing attentive teaching and participation.
- Age-appropriate reading, writing, literature, and learning materials.
- Performances, cultural activities, student work, and community events where publication is approved.
- Welcoming venue/context images that help families recognise a location.
- Teacher or staff imagery only when current, approved, and accompanied by an owner-approved representation policy.

### Treatment

- Preserve natural colour and believable school environments. Avoid filters that make documentary images feel like stock advertising.
- Choose a crop around the learning interaction, not merely faces. Check focal points at desktop, mobile, and social-preview aspect ratios.
- Maintain predictable aspect ratios within a repeated grid. Do not stretch images; use `object-cover` only after checking that the crop retains important context.
- Captions should add useful context or provenance, not repeat alt text.
- Illustration may be suitable for abstract learning pathways, empty states, or culturally meaningful editorial moments when no approved photograph exists. It should match the restrained line, colour, and editorial character of the site.

### Authenticity and cultural sensitivity

- Prefer reviewed school-owned imagery to generic stock. Avoid stock images that imply a false location, staff member, learner cohort, or activity.
- Do not use flags, onion domes, matryoshka, military imagery, or folk patterns as automatic shorthand for Russian culture. Any cultural reference should support the school's educational story and be owner approved.
- Treat all images of children, staff, venues, documents, and student work as privacy and permission decisions. Follow `ASSET-WORKFLOW.md`; keep raw sources out of the public repository.
- Alt text must communicate the relevant activity/context without naming unidentified children, inferring sensitive traits, or exposing private information.

## 8. Design workflow

Use this sequence for future design work:

**Audit the current implementation**
→ **Identify the intended user outcome and affected surfaces**
→ **Implement the requested design or content change**
→ **Capture screenshots and test responsive behaviour**
→ **Review the diff for regressions and unrelated changes**
→ **Owner accepts, requests revisions or asks to revert**

Keep implementation boundaries deliberate. Changes should remain aligned with the user-requested outcome, and adjacent pages, shared components, global tokens, content registries, dependencies, and assets should only change when they are relevant to that outcome.

Before implementation, establish:

- the current source state;
- the visible section or component identity and functional requirements;
- whether copy, data, shared UI, global styling, imagery, or behaviour is affected;
- desktop, mobile, and intermediate QA viewports;
- a clear revert boundary.

## 9. Homepage sections 5, 6, and 7

### Exact identification

All three sections currently live inline in `src/app/page.tsx` inside `Home`; none is exported as a standalone component. In development, `HomepageSectionMarker` adds an `aria-hidden` visual number around each section. In production, that helper returns the child directly. The number is therefore a QA aid, not the only identity.

| Section | Visible identity | Component-tree position | Source and dependencies |
| --- | --- | --- | --- |
| 5 | Eyebrow “Learning approach”; heading “What children learn at Pushkin's School”; opens “The curriculum is built for children growing up in the UK…” | `Home` → `main` → fifth `HomepageSectionMarker` (`number={5}`) → inline `section` → split container → `SectionIntro` + ordered curriculum list | `src/app/page.tsx` around lines 328–366. Uses `SectionIntro` from `src/components/site/section-intro.tsx`; maps `curriculumPillars` from `src/data/public/curriculum.ts`; depends on global tokens and `.site-section-compact` in `src/app/globals.css` and fonts from `src/app/layout.tsx`. |
| 6 | Eyebrow “School locations”; heading “Start with the option that fits your family”; opens “Choose current in-person classes in Bracknell or Exeter…” | `Home` → `main` → sixth `HomepageSectionMarker` (`number={6}`) → inline `section` → `SectionIntro` + current-school card grid + “Looking for another area?” link band | `src/app/page.tsx` around lines 368–451. Uses `SectionIntro`, `ButtonLink`, Next `Link`, and `ArrowRight`; filters `schools` from `src/data/public/schools.ts` using `status === "open"`; uses route-local `homepageSchoolSummaries`; depends on `src/app/globals.css` and `src/app/layout.tsx`. |
| 7 | Eyebrow “Joining”; heading “How we find the right starting point”; opens “Every child arrives with a different relationship to Russian.” | `Home` → `main` → seventh `HomepageSectionMarker` (`number={7}`) → inline `section` → split container → `SectionIntro` + admissions `ButtonLink` + ordered three-step list | `src/app/page.tsx` around lines 453–507. Uses route-local `joiningSteps`, `SectionIntro`, `ButtonLink`, `ClipboardCheck`, and `ArrowRight`; depends on `src/app/globals.css` and `src/app/layout.tsx`. |

Do not identify these sections only by number: the development wrappers disappear in production, and the ordering could change.

### Current observations

- Section 5 uses an effective editorial split at desktop and a clear ordered stack on mobile. Its right-hand cards contain long paragraph copy and can become visually repetitive on a narrow screen.
- Section 6 gives the strongest commercial emphasis of the three through red top rules, elevated cards, schedules, and primary buttons. It is also the longest of the three on mobile and includes two levels of alternative route links after the active-school cards.
- Section 7 returns to a three-step ordered structure very similar to section 5. Desktop scanning is clear; on mobile the sequence is understandable but creates another long bordered stack immediately after section 6.
- Sections 6 and 7 both use `border-y border-border-soft bg-surface`, reducing distinction at their shared boundary.
- Across all three, the hierarchy, ordered semantics, action targets, and 390px reflow are sound. No horizontal overflow was observed at 390×844.

### Fair comparison procedure

For the planned standard-Codex versus GPT-Taste experiment:

1. Both versions must begin from the same source baseline.
2. Both receive the same functional requirements and section scope.
3. Neither version may change other homepage sections.
4. Neither may change global tokens or shared components unless the owner separately approves it.
5. Each version must be evaluated at the same desktop and mobile viewport sizes. Use 1440×1000 and 390×844 for continuity with this audit; also spot-check 768×1024 and 1024×768 before acceptance.
6. Record which files each version changes.
7. Compare copy quality, visual hierarchy, layout, responsiveness, accessibility, brand fit, and implementation complexity using the same checklist and baseline screenshots.
8. GPT Taste must only be used when the owner explicitly invokes it.
9. Do not install, enable, or invoke GPT Taste automatically.

Keep each version isolated so accepting, rejecting, or reverting one does not alter the other's baseline. Do not compare one version against source already modified by the other.

## 10. Visual QA checklist

### Scope and baseline

- [ ] Confirm the approved files and visible component/section identity before editing.
- [ ] Capture or record the common baseline and current route state.
- [ ] Confirm no unapproved copy, business data, shared UI, token, dependency, or asset changed.

### Desktop

- [ ] Review at 1440×1000 and at a wider desktop if the composition uses large empty areas.
- [ ] Check alignment to the `max-w-7xl` rails, section boundaries, column balance, card heights, and CTA priority.
- [ ] Check the sticky header does not cover anchors or headings.

### Mobile

- [ ] Review at 390×844 and at 320px CSS width or the narrowest supported device width.
- [ ] Check reading order, full-width actions, long labels, card-stack repetition, touch targets, and sticky-header obstruction.
- [ ] Confirm there is no horizontal overflow and no clipped focus ring.

### Intermediate widths

- [ ] Review at 768×1024, 1024×768, and immediately on both sides of any breakpoint changed.
- [ ] Check grids do not switch before their content fits and header modes do not collide.

### Text and content

- [ ] Test longest current headings, location names, schedule text, and CTA labels.
- [ ] Check wrapping at 200% zoom and with browser text enlargement.
- [ ] Confirm no widows, isolated arrows/icons, overlapped development marker, or illegible overlay copy.

### Keyboard and focus

- [ ] Traverse the page in source order using keyboard only.
- [ ] Verify every interactive element has a visible focus state on its actual surface.
- [ ] Verify menus and disclosures expose correct expanded state, Escape behaviour, focus movement, and focus return.
- [ ] Confirm the skip link works and anchors clear the sticky header.

### Contrast and meaning

- [ ] Check text, icons, borders, focus rings, and disabled states with a contrast tool rather than visual judgement alone.
- [ ] Confirm state and hierarchy are not conveyed by colour alone.

### Images and media

- [ ] Check crop and focal point at all four QA viewports.
- [ ] Confirm intrinsic sizing prevents layout shift and no image is stretched or unexpectedly pixelated.
- [ ] Review alt text in context and verify decorative images are ignored appropriately.
- [ ] Check video controls, poster state, captions/labels, and keyboard behaviour where applicable.

### Motion

- [ ] Test with `prefers-reduced-motion: reduce`.
- [ ] Confirm motion is optional, restrained, and never the only sign of state change.

### Regression boundary

- [ ] Compare all content immediately before and after the approved scope.
- [ ] Spot-check header, footer, shared actions, and every route that consumes an approved shared component.
- [ ] Review the final diff and confirm there are no visual regressions outside the approved scope.

## 11. Prioritised improvement backlog — proposals only

Nothing in this backlog is approved for implementation.

| Priority | Page / component | Problem observed | Proposed direction | Expected benefit | Risk / trade-off | Estimated scope | Shared/global UI? | Business/content decision? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P0 | Homepage sections 5–7 experiment scope | Three consecutive information-heavy sections reuse split layouts, bordered lists, and long mobile stacks; sections 6 and 7 share the same surface/border treatment. | Test one coherent local composition for the curriculum, location decision, and joining sequence while preserving facts, actions, semantic order, and all other homepage sections. | Clearer progression from learning → location → joining; less mobile repetition; fair experiment target. | Changing all three at once makes attribution harder; an over-styled version could weaken educational calm. | Medium, one tightly bounded homepage cluster. | No by default; keep to `src/app/page.tsx`. | No copy/fact changes by default; any rewrite needs separate approval. |
| P0 | Public business data (`schools`, admissions, trust, policies) | Current branch status, schedules, fees, policy readiness, and some trust language remain pending or recently changed. | Complete owner verification before design gives uncertain facts stronger prominence. | Prevents polished UI from amplifying stale or unsupported information. | May delay visual decisions or require conservative placeholders. | Medium content review across registries. | Data is shared across routes. | Yes—owner/business confirmation required. |
| P1 | Shared action system (`ButtonLink` and route-local links) | Similar quiet, secondary, and inline action styles are recreated in route files; target size and motion can drift. | Inventory usages, then consolidate only the genuinely equivalent patterns after approving all consumers. | More consistent hierarchy, focus, motion, and mobile wrapping. | A shared edit has a wide regression surface and could erase intentional local differences. | Medium. | Yes, shared component and many routes. | Owner approval of action hierarchy; usually no factual decision. |
| P1 | Homepage sections 1–4 | Strong authentic imagery and trust content compete with several large early compositions before the learning/location decision. | Evaluate above-the-fold hierarchy and the handoff from proof to classroom/curriculum, without adding new claims or media. | Faster orientation and reduced time to a relevant route. | Removing visual breathing room could make the site feel commercial or dense. | Medium, homepage only unless shared components are approved. | Potentially, if `PageHero` changes. | Owner preference on hero emphasis; content verification for proof claims. |
| P1 | Header / `BrandMark` / mobile menu | Header adapts across custom widths and has good explicit state, but the navigation, wordmark, and CTA compete for limited intermediate width; focus management needs dedicated verification. | Test key breakpoints, review CTA priority, and certify menu focus movement/return before visual refinement. | More robust navigation and accessibility across devices. | Header changes affect every public route. | Medium. | Yes, global. | Owner decision on persistent join CTA prominence. |
| P1 | Schools overview and `SchoolCard` / comparison table | Location status is critical but represented through several card/table/band patterns and an auxiliary status palette. | Establish one approved status language and a consistent comparison hierarchy across overview and detail routes. | Faster location decisions and fewer contradictory cues. | Simplification could hide necessary nuance about online-only or register-interest branches. | Large, multi-route. | Yes, shared components and data. | Yes—branch statuses, labels, schedules, and route relationships. |
| P1 | Admissions and contact journey | Helpful detail is spread between homepage section 7, `/admissions`, `/contact`, and branch CTAs. | Map one parent journey and remove only proven duplication; keep enquiry questions proportional to placement needs. | Clearer conversion path and fewer competing next steps. | Too little explanation can reduce trust; form changes affect behaviour and privacy. | Medium to large. | Shared CTA/form/data implications. | Yes—required enquiry fields, fees, response process. |
| P2 | `PageHero`, `SectionIntro`, and route-local headings | Shared hierarchy exists, but many local headings recreate sizes and spacing. | Audit exceptions, define documented variants, then migrate one route at a time if approved. | Stronger rhythm and easier maintenance. | Premature standardisation could flatten editorial variety. | Medium to large. | Yes, shared. | Owner approval of hierarchy; no factual decision. |
| P2 | Curriculum page and curriculum summaries | Curriculum content is credible but text-dense across pathway, progression, placement, and route-choice modules. | Use progressive disclosure or sharper information grouping after copy verification; keep educational substance primary. | Better scanning for families with different goals. | Oversimplification may misrepresent pedagogy or exam routes. | Medium. | Possibly `DecisionPanel` / evidence components. | Yes—curriculum wording and external route relationships. |
| P2 | Gallery and media showcases | Authentic archive breadth supports trust, but variable source age, quality, consent, and cropping constrain visual consistency. | Continue the approval-led curation workflow; distinguish current evidence from historical archive and standardise crops per collection. | More credible imagery and clearer historical context. | Fewer usable images; permission and source work can be slow. | Large editorial/media review. | Shared media components possible. | Yes—consent, dates, captions, featured selections. |
| P2 | FAQ and policies | Structured disclosure is accessible and useful, but readiness notes and long policy shells can feel operational rather than parent-centred. | Separate verified public guidance, pending publication status, and contact escalation with clearer hierarchy. | Better trust and easier scanning without implying unavailable documents are complete. | Legal/policy presentation is high-stakes; design must not imply currency or compliance. | Medium to large. | Shared FAQ/policy components. | Yes—policy approval and legal/business review. |
| P3 | Footer | Footer is functional and responsive but contains a large location/site inventory and repeats global messaging. | Review information priority and keep only useful reassurance, navigation, and contact routes. | Cleaner end-of-page orientation. | Reducing links may hurt discoverability; global regression scope. | Small to medium. | Yes, global. | Owner decision on social/contact prominence. |
| P3 | Tokens, radii, shadows, and literal colours | A clear core palette exists, but literal colours, arbitrary shadows, and several radius scales remain. | After component-level experiments, propose a token consolidation with a full consumer inventory. | More coherent UI and lower maintenance cost. | A global token edit has the widest visual blast radius and would invalidate fair local experiments. | Large. | Yes, global. | Owner approval of brand direction. |

## 12. Unresolved design choices

The owner should choose—or ask for prototypes of—these directions before broad implementation.

### Overall visual emphasis

1. **Institutional editorial:** retain the current blue/red, airy rails, fine rules, and disciplined typography; refine hierarchy and consistency. Advantage: credible and lowest-risk. Risk: can feel reserved or generic if photography and cultural content are weak.
2. **Cultural editorial:** add a restrained literary layer through quotation, archival context, typographic details, or commissioned illustration. Advantage: more distinctive and relevant to the Pushkin identity. Risk: can become decorative, nostalgic, or clichéd without careful art direction.
3. **Documentary community:** let approved classroom and event photography lead more sections, with simpler supporting UI. Advantage: immediate warmth and authenticity. Risk: depends on a deep, current, consent-cleared image set and consistent crop quality.

### Component shape and elevation

1. **Rule-led editorial:** favour border bands and mostly square/`rounded-lg` surfaces. Advantage: calm, mature, efficient. Risk: long pages can feel austere or repetitive.
2. **Soft cards:** use consistent `rounded-lg` cards with modest elevation. Advantage: approachable and easy to group responsively. Risk: card saturation can fragment the story.
3. **Hybrid emphasis:** use rules for narrative and one elevated feature per section. Advantage: preserves calm while creating focal points. Risk: requires disciplined exceptions.

### Language presentation

1. **English-first with explained Russian terms:** clearest for the broadest UK parent audience. Risk: may understate cultural immersion.
2. **Selective bilingual cues:** Russian appears only where meaningful and reviewed. Advantage: cultural confidence and recognition. Risk: translation governance, longer layouts, and possible inconsistency.
3. **Fully bilingual interface/content:** broadest explicit language support. Risk: substantially larger content, accessibility, QA, SEO, and maintenance scope; not justified without a confirmed audience and operating model.

### Accent colour

1. **Retain the current mauve accent:** preserves the present implementation and offers a softer bridge between navy and red. Risk: its brand meaning is not documented and it can appear muted in small details.
2. **Reduce to navy/red plus neutrals:** strongest tie to the mark and simplest system. Risk: may feel severe and removes a useful secondary hierarchy colour.
3. **Commission a revised supporting accent:** could create a more distinctive education/culture palette. Risk: subjective, global, and unsuitable for the sections 5–7 comparison unless separately approved after the experiment.

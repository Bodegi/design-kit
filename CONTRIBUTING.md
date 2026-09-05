# Contributing to design-kit

How work lands in this repo. `CLAUDE.md` holds the architecture and the rules; this file holds the
procedure. Both describe the repo as it is, so when either disagrees with the code, the code is
right and the doc gets fixed in the same change.

## Ground truth

The code is the source of truth. Comments, `CLAUDE.md`, the README, and GitHub issues each drift
from it independently: a comment outlives the rule it described, an issue closes with its boxes
unticked, a doc names a mechanism that was later replaced. A claim in any of them is verified
against the repo before it is acted on. A stale claim is corrected in the same change that finds
it, by replacing the wrong fact with the current one. Git holds the history, so the doc never
narrates what it used to say.

### What earns a comment

A comment states something the code cannot: why a rule exists, an engine quirk it works around, a
contract the markup has to follow, or a measured constraint that forced a choice (a contrast ratio
that ruled out the obvious token). A comment that restates the selector or the property is deleted.
So is narrative: what was tried, what came before, what is worth doing later.

Each component file opens with a header of one to three short paragraphs: what the component is,
its anatomy and state hooks, and the mechanisms a reader cannot infer from the rules. Engine
support facts and every `@supports` rationale live there.

### References that can rot

A comment that points at another place is checked whenever either end changes. The forms that hold
up:

- Naming a selector, a token, or a file (`.ui-skeleton`, `--shadow-current-bar`, `form.css`).
  These are greppable, so a rename surfaces every reference.
- Describing the mechanism instead of pointing at it. "The shell clears the input's own ring so one
  ring is drawn" survives a refactor that a line number does not.

Line numbers and commit hashes in comments do not hold up and are not used. When two files must
change together (the `.ui-image` shimmer mirrors `.ui-skeleton`), both say so by name.

## Adding a component

1. **Look up the Open UI entry** at open-ui.org. Its part names and states are the anatomy. Where
   Open UI has no entry, the same `.ui-<component>` / `.ui-<component>-<part>` / `data-*` shape
   extends to cover it.
2. **Prefer the native element.** `<table>`, `<details>`, `<input type="range">`,
   `<select>`, `[popover]` and their vendor pseudo-elements come before an ARIA reconstruction.
   Where an engine ships a new stylable part behind a feature query, the classic styling is the
   baseline and the enhancement sits inside `@supports`.
3. **Tokens first.** A color the component needs that Tier 2 lacks is added to
   `src/tokens/semantic.css` with a comment, and to each theme whose surfaces the baseline value
   would misread against. Components read Tier 2 only: `--color-*`, the `--radius-*` roles,
   `--shadow-*`, `--focus-ring`. Spacing, type, and motion primitives from Tier 1 are fine.
4. **Write `src/components/<name>.css`** with the header described above. State keys off native or
   ARIA attributes. Private custom properties are component-scoped: `--_<component>-<name>`.
   Any part that sets `display` also carries `[hidden] { display: none }`. Any motion is stilled
   under `prefers-reduced-motion: reduce`. The focus ring stays whole and unclipped.
5. **Import it** in `src/index.css` in the components block, next to its relatives.
6. **Add the workshop section**: one module in `workshop/src/sections/<name>.ts` exporting a
   `Section` (`html`, optional `wire`), listed in `sections/index.ts` in display order. The demo
   shows every variant, size, and state. Behavior the demo needs lives in `wire`; the shipped CSS
   never has any.
7. **Measure contrast** for every new text and UI pairing against all seven themes. The gate in
   `workshop/src/contrast.ts` covers the shared pairings; a component that introduces a new pairing
   family (a new ground, a new text-on-tint case) adds it there so the build measures it from then
   on. A pairing that fails changes the token choice, never the threshold.
8. **Record a new mechanism** in `CLAUDE.md` with one factual sentence, only when the component
   introduces one: a new Tier-2 token family, a new native part restyled, a new convention. A
   component list is not kept; the workshop is the catalog.
9. **Verify**: `npm run build` passes, the section renders in at least two themes with no console
   errors, and the focus ring is visible when tabbing through the demo.

## Tokens and themes

- A new theme scopes to both `[data-theme="x"]` and `:root[data-theme="x"]` and defines the full
  intent set (`success`/`warning`/`danger`/`info` with `-hover`, `-contrast`, `-subtle`) so it
  reads against its own surfaces instead of the dark baseline.
- Themes set color tokens only. Radius, blur, and shadow are system constants.
- A theme color that fails the gate is derived to pass. The direction depends on the pairing:
  a dark-theme intent used as text on its own tint gains lightness while its `-subtle` tint loses
  alpha; a `-contrast` label that white can no longer carry becomes a deep ink in the intent's own
  hue.

## Verification

`npm run build` is the gate. It runs, in order, `typecheck` (strict `tsc` over the workshop),
`check:contrast` (every pairing over every theme, exit 1 on a failure), then the icon, CSS, and
workshop builds. CI runs the same command on every push to `main` and publishes the workshop only
when it passes.

Contrast is measured on composited colors: an alpha foreground over its resolved ground, an alpha
ground over the ground beneath it. The workshop's Token panel shows the same rows for the active
theme, so a theme can be tuned live and confirmed from the command line.

Chromium is the verified engine. Firefox and Safari paths are written per the specs and their
vendor pseudo-elements, and are checked when a consuming app runs there.

## Commits

One concern per commit, in the form `type(scope): summary` with a body of one or two paragraphs
saying what changed and why. Types in use: `feat`, `fix`, `refactor`, `docs`, `build`, `chore`. A
token addition a component needs is its own commit ahead of the component. A comment-only sweep is
its own commit, so `git diff --stat` shows no declaration changed.

Semantic versioning applies from v1.0.0. The public contract is the Tier-2 token names and the
`.ui-*` anatomy: renaming either is a major bump, a new component or token is a minor, a visual fix
inside the contract is a patch. Releases are annotated tags.

## Working in parallel

Several changes land at once by running each in its own git worktree, branched from current
`main`, and merging when done. What keeps the merges clean:

- Each worktree runs `git merge main` first, so it starts from the tip rather than a stale
  snapshot.
- Shared files are touched at distinct places. After the workshop split, the only shared
  touchpoints for a new component are one line in `src/index.css` and one line in
  `workshop/src/sections/index.ts`; everything else is a new file.
- Scratch scripts live inside the worktree and are deleted before the commit. A shared temp
  directory gets overwritten mid-run.
- Dev servers use distinct ports (`npx vite workshop --port <n> --strictPort`).
- A `.claude/launch.json` entry added for verification is reverted before committing.

A batch built in parallel gets one integration review on the merged tree before it ships. The
review checks for the ways independent authors diverge: the same visual idea drawn twice with
different numbers, the same state expressed through different attributes, private property names
that collide when components nest, a convention followed in the files that knew about it and missed
in the ones that did not. The treatment-sharing rule in `CLAUDE.md` says which mechanism a
repetition gets: a Tier-2 token, one rule with a selector list, matching private properties, or a
named canonical definition.

## Where each fact lives

- `CLAUDE.md`: architecture, the token tiers, and the conventions with the reason for each.
- `CONTRIBUTING.md`: the procedure, this file.
- `README.md`: how a consumer installs and drives the kit.
- Each component file's header: that component's anatomy, state hooks, and mechanisms.
- The workshop: the component catalog, every variant and state, with copyable markup.
- GitHub issues: open work. An issue's checkboxes are ticked as the work lands, and an issue closes
  when its boxes are all ticked or its remaining items are recorded elsewhere.

Reference text in any of these states present-tense fact. Recommendations, history, and reasoning
about alternatives belong in a commit body, a pull request, or an issue, which are built to carry
them.

# sky-keeper

A radar-scope air-defense game built with React + TypeScript + Vite+. You are
**Sky-Keeper**, the AWACS controlling the airspace. From the back seat you watch the
scope, classify unknown contacts, and run the intercept, protecting the escort flight
"Rex" and the VIP ("Package") as they cross the radar before the bogeys can take the
package out.

Inspired by [**Ace Combat 8: Wings of Theve**](https://acecombat.com/) — a love letter
to the Strangereal setting, its nations, and its aircraft roster.

## Why this exists

This is a **vibecoded** project — built largely by an AI coding agent as a hands-on
experiment with the [Vite+](https://viteplus.dev/) toolchain (Oxlint, Oxfmt, Vitest,
and the rest of the unified `vp` CLI). The point was to feel out the workflow end to
end rather than to ship a polished game, so treat the code as a playground.

## Gameplay mechanics

- **Contact classification** — every bogey carries a hidden true role. You mark it
  BANDIT, NEUTRAL, or FRIENDLY, and only your call lets Rex engage it.
- **Weapons release discipline** — Rex fires only on tracks you have classified as
  bandits, inside nose-arc and range, at the mercy of a per-shooter cooldown.
- **Escort flight AI** — Rex autonomously intercepts classified bandits, then falls
  back into trail formation on the package when the scope is clear.
- **Bandit AI** — bandits hunt the closest of the VIP or Rex; neutrals and friendlies
  transit the scope; unknown bandits will not fire until you leave them unclassified,
  so ignoring a track is a real risk.
- **Missiles & damage** — guided missiles chase their target and can be steered into
  the wrong flight; VIP, Rex, and bogeys all track health independently.
- **Friendly fire** — killing a neutral or friendly, or hitting the package with your
  own missile, tanks your score.
- **Win / fail conditions** — deliver the package off-scope to win; lose the package
  ("PACKAGE LOST") or the escort ("ESCORT DOWN") to fail.
- **Scoring** — points for validated splashes and completed deliveries, penalties for
  blue-on-blue, friendly kills, and package hits.
- **Sustained pressure** — shot-down and departing bogeys are replaced, keeping the
  scope populated for the whole sortie.
- **Time control** — pause and four simulation speeds (0.5x / 1x / 2x / 4x) to play
  the engagement at your pace.

## Controls

- Click a contact on the scope to select it.
- Choose BANDIT / NEUTRAL / FRIENDLY in the telemetry panel to classify.
- Use the HUD buttons to pause and change simulation speed.
- Reset from the end-of-mission overlay.

## Tech

- React 19 + TypeScript, rendered entirely as SVG + Tailwind-style utility classes.
- Pure, testable game core under `src/game` (reducer, spawn, tick, selectors).
- [Vite+](https://viteplus.dev/) toolchain — unified dev/build/lint/format.

```sh
vp install
vp dev        # run the dev server
vp build      # type-check + production build
vp check      # format + lint + type-check
vp test       # run tests
```

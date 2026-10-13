# sky-keeper

A radar-scope air-defense game built with React + TypeScript + Vite+. You fly "Rex", an
escort flight, guiding a VIP ("Package") across the scope while classifying and
engaging unknown contacts before they can take the package out.

Inspired by [**Ace Combat 8: Wings of Theve**](https://acecombat.com/) — a love letter
to the Strangereal setting, its nations, and its aircraft roster.

## Why this exists

This is a **vibecoded** project — built largely by an AI coding agent as a hands-on
experiment with the [Vite+](https://viteplus.dev/) toolchain (Oxlint, Oxfmt, Vitest,
and the rest of the unified `vp` CLI). The point was to feel out the workflow end to
end rather than to ship a polished game, so treat the code as a playground.

## Features

- **Live radar scope** — sweeping scope renders the VIP, Rex, unknown bogeys, and
  inbound missiles with heading arrows and radar-range gating.
- **Contact classification** — select any track and classify it as BANDIT, NEUTRAL,
  or FRIENDLY before weapons release. Correct calls win the engagement; wrong ones
  cost you.
- **Escort flight AI** — Rex automatically runs interdiction against tracks you mark
  as bandits, then falls back into trail formation on the VIP.
- **Bandit AI** — bandits intercept the VIP or Rex, neutrals/friendlies transit the
  scope, and unknowns launch first only when you leave them unclassified.
- **Missiles & damage** — nose-arc/range launch envelopes, cooldowns, guided flight,
  health tracking for the VIP and escort, plus friendly-fire penalties.
- **Win / fail states** — deliver the package off-scope to win; lose the package
  ("PACKAGE LOST") or the escort ("ESCORT DOWN") to fail, with full-mission overlays.
- **Score & flavor log** — points for splashes and deliveries, dedications for
  blue-on-blue and package hits, and a running radio-flavor log.
- **Telemetry panel** — bearing, range, and altitude readouts for the selected track.
- **Time control** — pause and four simulation speeds (0.5x / 1x / 2x / 4x).
- **Ace Combat roster** — contacts draw names and signatures from a roster of fictional
  aircraft drawn from the *Ace Combat 8: Wings of Theve* / Strangereal world
  (Belka, Osea, Yuktobania, Erusea, ...).

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

# Forge

A frontend system for designing, building, and maintaining consistent interfaces — see
[`requirement/forge-requirements.md`](./requirement/forge-requirements.md) for full rationale
and [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) / [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md)
for the concrete structure.

## Status

This is a hand-written scaffold (no `yarn install` has run yet in this environment — see note
below). It covers Build Order steps 1-7 of the requirements doc: project init, repo
conventions, Tailwind + token architecture, app shell/navigation, Foundations stub, and a first
component (`Button`, with a colocated test).

## Getting started

```bash
yarn install
yarn dev
```

Then validate:

```bash
yarn lint
yarn type-check
yarn test
yarn build
```

`yarn test:e2e` requires `npx playwright install` once, the first time, to fetch browser
binaries.

## Note on this scaffold

The dependency versions in `package.json` are the versions confirmed in the requirements doc
(Next.js 16.x, React 19.x, Tailwind 4.x, TypeScript 5.x) with reasonable minor/patch pins for
everything else — they were **not** resolved against the real npm registry (this environment's
network policy blocked npm registry access while scaffolding). Run `yarn install` here first;
if a version conflict comes up, bump the offending package and re-run — then commit the
generated `yarn.lock` as the real pinned baseline (see AGENTS.md's Version Pinning Policy).

## Next steps

See `requirement/forge-requirements.md` §11 Build Order, from step 8 (Dialog and Toast) onward.

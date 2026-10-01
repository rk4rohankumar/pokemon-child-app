# Pokémon · Micro Frontend remote

A searchable, paginated Pokédex built with React 19, Tailwind 3, axios and
framer-motion. It runs standalone and is also exposed as a webpack Module
Federation remote for [micro-frontend-host](https://github.com/rk4rohankumar/micro-frontend-host).

## Data

[PokeAPI](https://pokeapi.co/api/v2/pokemon), no key required. The list
endpoint is paged 20 at a time; each Pokémon's detail payload is fetched once
and cached in memory by id, so paging back and forth and repeated searches do
not refetch.

## Run / build

```bash
npm install
npm start                 # dev server on http://localhost:3000
CI=true npx craco build   # production build to build/, remoteEntry.js included
```

CRA 5 + CRACO 7 (`craco.config.js`). In production `output.publicPath` is
`'auto'`, so the chunks resolve relative to wherever `remoteEntry.js` was
loaded from; dev keeps `/`.

## How the host consumes it

- Scope name: `PokemonApp`
- Exposed module: `./PokemonApp` → `src/App` (the default export is the page)
- Remote entry: `https://pokemon-child-app.vercel.app/remoteEntry.js`

The host injects `remoteEntry.js` at runtime, calls `container.init(__webpack_share_scopes__.default)`,
then `container.get('./PokemonApp')`. `src/index.js` is an async boundary
(`import('./bootstrap')`) so shared modules are negotiated before the app code
evaluates.

### Shared singletons

`react`, `react-dom`, `framer-motion` and `axios` are declared
`singleton: true` with `requiredVersion` from `package.json`. The host provides
the instance; standalone the app falls back to its own copy. Nothing is
`eager`, and Tailwind is not shared (its compiled CSS is bundled with the
exposed module).

# Explorbot Example

Example project for [Explorbot](https://github.com/testomatio/explorbot) — Testomat.io's AI-powered web exploration agent. Explorbot autonomously clicks around a web app, fills forms, and discovers test scenarios without any test scripts.

This example points Explorbot at the public [SauceDemo](https://www.saucedemo.com) sandbox so you can try it out without needing your own running app.

## Setup

```bash
npm install
cp .env.example .env
# then edit .env and set OPENROUTER_API_KEY (get one at https://openrouter.ai/keys)
```

## Run

Interactive TUI mode — explore manually with `/explore`, `/research`, `/plan`, `/test`:

```bash
npm run start
```

Autonomous mode — Explorbot runs a full research → plan → test cycle and exits:

```bash
npm run explore
```

Freesail mode — Explorbot keeps navigating to new pages and testing them until you stop it:

```bash
npm run freesail
```

Show the browser instead of running headless:

```bash
npx explorbot start / --show
```

## What's in this example

| File | Purpose |
|---|---|
| `explorbot.config.js` | Points Explorbot at SauceDemo and configures the AI models via OpenRouter |
| `.env.example` | Template for required env vars (copy to `.env`) |
| `knowledge/general.md` | App-wide knowledge: URL map, structure, conventions |
| `knowledge/login.md` | Login credentials and form selectors |
| `knowledge/checkout.md` | Sample checkout form values |

The `knowledge/` files teach Explorbot how to interact with the app — credentials, form rules, navigation quirks. See [docs/knowledge.md](https://github.com/testomatio/explorbot/blob/main/docs/knowledge.md) for the full format.

## Outputs

After a run, Explorbot writes:

| Directory | Contents |
|---|---|
| `output/tests/` | CodeceptJS test files generated from successful explorations |
| `output/plans/` | Markdown test plans |
| `experience/` | What Explorbot learned about each page (reused on next runs) |

## Switching AI providers

The default uses OpenRouter. To use a different provider, edit `explorbot.config.js` — any [Vercel AI SDK](https://sdk.vercel.ai/providers) provider works. See [docs/providers.md](https://github.com/testomatio/explorbot/blob/main/docs/providers.md).

## Try it against your own app

1. Change `web.url` in `explorbot.config.js` to your app's URL.
2. Replace the `knowledge/` files with credentials and notes for your app.
3. Run `npm run start`.

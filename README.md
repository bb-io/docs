# Blackbird documentation

Build with Astro starlight. [Read the reference documentation](https://starlight.astro.build/). Check out its documentation.

## Installation

1. Run `npm install`
2. Add a `.env` file in the top level of the repository
3. Get a [Github personal access token](https://github.com/settings/tokens?type=beta) [(See docs here)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
4. Add the access token to the `.env` file.

```
GITHUB_ACCESS_TOKEN=<token here>
```

## Project Structure

```
.
├── public/
├── scripts/ (This has the script to generate the apps)
├── src/
│   ├── assets/
│   ├── content/
│   │   ├── docs/
│   │   │   ├── apps/ (All generated apps appear here)
│   │   │   ├── ... (other top categories)
│   │   └── config.ts
│   └── env.d.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
└── .env (This file needs to be added by you)
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command            | Action                                         |
| :----------------- | :--------------------------------------------- |
| `npm install`      | Installs dependencies                          |
| `npm run dev`      | Starts local dev server at `localhost:4321`    |
| `npm run generate` | Generates all apps from the bb-io repositories |

## Generating apps

To generate apps run `npm run generate`

The script goes through all repositories in our organization and looks for readme files with `<!-- begin docs -->` and `<!-- end docs -->` comments. All content within these comments is copied into a markdown file in `/src/content/docs/apps`

In [`scripts/generate.mjs`](scripts/generate.mjs), add a repository name to `skip_repos` to exclude it from generation, or map it to a display name in `altered_names` to customize its title.

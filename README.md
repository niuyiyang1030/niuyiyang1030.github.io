# Yiyang Niu — Academic Homepage

This repository contains the source for Yiyang Niu's personal academic
homepage:

<https://niuyiyang1030.github.io/>

The site is based on the current MIT-licensed
[zhengzangw/nextjs-portfolio-blog-research](https://github.com/zhengzangw/nextjs-portfolio-blog-research)
template, migrated from upstream commit
1ffd759023156c50db6f1dc83dc61e0445eb1059. The original MIT license,
copyright notice, and THIRD_PARTY_NOTICES.md are retained.

## Local development

Requirements: Node.js 22 and pnpm 10.17.1.

    pnpm install
    pnpm dev

Open <http://localhost:3000>. Before committing changes, run:

    pnpm lint
    pnpm build

The build uses Next.js static export and writes the deployable site to out/.

## Content

Personal data is stored in:

- src/data.tsx
- src/data/site.ts
- src/i18n/messages/en/
- src/i18n/messages/zh/
- content/blog/en/
- content/blog/zh/

Unverified academic information is intentionally left empty. See
CONTENT_TODO.md for the fields that still need owner-provided content.

## GitHub Pages deployment

Pushing to main runs .github/workflows/deploy-pages.yml. The workflow installs
dependencies with pnpm, runs lint, builds the static export, uploads out/, and
deploys it with GitHub's official Pages actions.

This is a GitHub User Pages repository, so the site is exported with an empty
base path and is served directly from /.

## License and attribution

The template remains licensed under the MIT License. See [LICENSE](LICENSE)
and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

---
title: Strategies
description: Define how Blacklake should leverage content during preparation
sidebar:
  label: Strategies
  order: 5
  hidden: false
---
> 💡 You can try Blacklake today. Contact us if you want to participate.

This guide assumes you understand the Blacklake [Key Features](../key-features), especially the `Prepare Content` action. Strategies define how Blacklake should search the lake and which units are allowed to be reused when content is being prepared for downstream processing.

### What is a strategy?

A strategy is a reusable leveraging policy.

Instead of treating every match in the lake as equally valid, a strategy lets you define which content is trustworthy enough to reuse in a specific workflow. This adds a governance layer on top of Blacklake's matching logic.

That means different workflows can use different reuse rules. A high-precision publishing flow can require reviewed human translations, while a faster cost-sensitive flow can allow AI-assisted content above a certain threshold.

> 💡 Applying strategies is the solution to the "dirty TM" problem.

### Why strategies matter

Traditional TM logic usually asks a simple question: "Is there a match?" Blacklake can ask a more useful question: "Is this the right match for this workflow?"

Strategies are what make that possible. They let you explicitly control:

- Which units in the lake are eligible for reuse
- Whether only human-translated or human-reviewed content should match
- Whether older or inactive content should be considered
- Which systems, tools, and translators are trusted or excluded
- How quality scores, timestamps, and metadata affect leverage

This is especially useful when one lake contains content from multiple systems, vendors, workflows, or quality levels.

### Where strategies are used

Strategies are used during `Prepare Content`.

When Blacklake prepares content, it can:

1. Diff the incoming content against what is already stored.
2. Finalize unchanged parts immediately.
3. Search the rest of the lake for eligible matches.
4. Apply the chosen strategy to decide which units are allowed to participate in that search.

So a strategy does not just filter results after the fact. It determines the candidate pool that Blacklake is allowed to leverage from.

![Strategies editor](~/assets/blacklake/1775124318002.png)

### Core settings

Every strategy starts with a name and optional description. Use the description to document the intended workflow, for example `Use for reviewed marketing content` or `Use for low-cost AI-assisted support content`.

Below that, the interface exposes two core controls:

#### Diff before leveraging

When enabled, Blacklake first compares the incoming content with the latest version already stored in the lake. This is the default behavior that is applied when no strategy is selected.

This finalizes unchanged content up front so that only new or modified units need further processing. In most workflows this should be enabled because it reduces unnecessary translation work and keeps the handoff focused on actual changes.

#### Leveraging enabled

When enabled, Blacklake searches the lake for matching units that are eligible under the strategy.

If you disable this, Blacklake can still diff content first, but it will not attempt to reuse other units from the lake. This can be useful if you want a workflow that only identifies changes and passes them downstream without any leverage step.

### Leverage filters

The rest of the strategy determines which units may participate in leverage matching.

#### Match inactive content

By default, Blacklake can focus on content that is still active in connected platforms. Enable this option when older or currently unpublished content should still be considered reusable.

This is useful for migrations, relaunches, and rollback-style workflows where older content may still be valuable.

#### Human translated

Enable this to only match units that were translated by a human.

Use this when you want to exclude machine-translated or automatically generated content from reuse entirely.

#### Human reviewed

Enable this to only match units that have been reviewed by a human.

This is often the right choice for high-visibility content such as marketing pages, legal material, or app store copy where quality governance matters more than raw speed.

#### Minimum quality score

If your workflows attach quality scores to stored content, this field lets you require a minimum score before a unit can be reused.

This is useful for AI-assisted workflows where machine output may be acceptable above a threshold but not below it.

### Time-based controls

Strategies can also limit which content is considered based on creation date.

#### Created after

Only include units created on or after the specified date.

This is useful when you want to avoid leveraging outdated terminology, older product messaging, or legacy content that no longer reflects the current brand.

#### Created before

Only include units created on or before the specified date.

This is useful when you want to recreate the state of the lake before a given change window, or deliberately reuse content from an earlier period. Combined with `Match inactive content`, it can support controlled rollback or historical leverage scenarios.

### Trust controls for systems, tools, and translators

One of the most powerful parts of Strategies is that Blacklake can distinguish not just between texts, but between how those texts came into being.

#### Allowed content systems and excluded content systems

Use these fields to restrict leverage to content coming from specific connected systems, or to explicitly exclude systems you do not trust for a given workflow.

Example use cases:

- Only leverage from production CMS content
- Exclude staging systems
- Prioritize one repository or CMS over another by narrowing the allowed pool
- Don't mix product and marketing content

#### Allowed tools and excluded tools

Use these fields when you trust some tools or engines but not others.

For example, you may want to allow content created through a preferred MT engine or CAT workflow while excluding output created by an experimental toolchain.

#### Translated by persons and excluded translators

These fields let you include or exclude specific translators, reviewers, vendors, contractors, or user identifiers.

This is useful when some people or partners are approved for a workflow and others should be kept out of the leverage pool.

### Metadata filters

Strategies can also filter on Blacklake metadata.

This is where leveraging becomes programmable rather than generic. Instead of saying "reuse everything that matches," you can say:

- Reuse only content from high-performing pages
- Exclude content marked as deprecated
- Prefer units tagged to a certain product line
- Limit reuse to a market, audience, or campaign

Because metadata in Blacklake is customizable, the exact filters depend on the fields your team has defined and populated through Blackbird workflows. Metadata filters truly combine your content KPIs with your language operations.

### Example strategy patterns

The same lake can support very different strategies. A few common patterns:

#### Human-first strategy

Use this when quality and predictability matter most.

- `Human translated` enabled
- `Human reviewed` enabled
- no inactive content
- only trusted systems and translators

#### AI-first strategy

Use this when speed and reuse volume matter, but you still want some guardrails.

- Machine-generated content allowed
- Minimum quality score required
- Exclude low-trust tools
- Optionally limit to recent content only

#### Cost-optimized strategy

Use this when the main goal is reducing downstream translation volume.

- `Diff before leveraging` enabled
- Leveraging enabled
- Broad allowed systems
- Optional metadata filters to keep leverage relevant

#### Rollback or legacy recovery strategy

Use this when you want to leverage older content deliberately.

- `Match inactive content` enabled
- `Created before` set
- Optionally restrict to a known trusted system or translator set

### Practical guidance

Strategies should reflect governance decisions, not just technical filters.

If you are designing strategies for a real workflow, start by answering these questions:

- Which content is trusted enough to reuse automatically?
- Should AI-generated content be allowed at all, and if so under what conditions?
- Do recent translations matter more than older ones?
- Are there vendors, tools, or user groups that should be excluded?
- Should different content types use different leverage rules?

In practice, most teams end up with a small set of reusable strategies rather than one universal strategy for everything.

### Suggested starting set

If you are just getting started, a simple baseline set is often enough:

1. A strict production strategy for reviewed, trusted content.
2. A broader operational strategy for general reuse and cost reduction.
3. An experimental strategy for AI-heavy or pilot workflows.

That gives you clear separation between safe production leverage and more flexible experimentation without needing separate lakes.

### Strategies and Blackbird

Blacklake requires Blackbird for orchestration, so the value of Strategies becomes even stronger in Birds.

Different Birds can call `Prepare Content` with different strategy choices depending on:

- The content source
- The target market
- The workflow stage
- The approval path
- The desired quality and cost profile

That is what turns Blacklake from passive storage into an actively governed linguistic data platform.

> Continue with the [FAQ](../faq) for common operational questions about sync behavior, environments, approvals, and deployment.

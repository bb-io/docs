---
title: Key Blacklake Features
description: In-depth explanation of Blacklake
sidebar:
  label: Key Features
  order: 2
  hidden: false
---
> 💡 You can try Blacklake today. Contact us if you want to participate.

### 1. Content is the source of truth

In modern workflows, content is dynamic, updated frequently based on product releases, SEO, KPIs, analytics, and reader behavior. Blacklake continuously synchronizes this reality across all languages.

Instead of relying on a TM as a static memory of how content used to be, Blacklake reflects how content is right now. Any change in a connected system can be aligned, diffed, and updated automatically in the Lake.

### 2. Two fundamental actions: Prepare Content and Store Content

Blacklake intentionally keeps interaction simple. Everything revolves around two core actions.

#### Prepare Content

When you trigger the Prepare Content Action, Blacklake:

1. Diffs the content first.
   Because most content already exists in the lake, Blacklake compares what you are sending with what it already knows and pre-fills the parts that have not changed. Only new or updated units require further processing.
2. Queries the lake using a user-defined [Strategy](../strategies).
   Blacklake can search across all content stored in the Lake, but it does not need to treat every stored unit as equally eligible for reuse. A Strategy lets users predefine which units may participate in leverage matching based on governance rules such as review status, quality thresholds, timestamps, systems, tools, translators, and metadata filters.
   This makes it possible to tailor leveraging per workflow, for example:
   - "Prioritize content with the highest page views."
   - "Use only human-reviewed translations for production content."
   - "Exclude machine-generated content from suggestions."
   - "Only reuse recent content from trusted systems and tools."
3. Adds relevant linguistic assets.

The result is context-aware leveraging far more powerful than classical fuzzy matching and more relevant than vector-based matching.

#### Store Content

Unlike TMs, which only update during translation, Blacklake allows you to store bilingual or monolingual content anytime. When you store content:

- Blacklake aligns updates using context IDs if they exist
- Detects changes
- Places translations or modifications in the correct location in the lake
- Updates relevant metadata

This supports true in-context editing, where changes made in the "real" content, such as a CMS or code repository, flow automatically back into Blacklake.

### 3. Customizable metadata

Every organization cares about different metrics, KPIs, or attributes. Blacklake lets teams define and update metadata without touching the content itself.

This metadata can then be used to:

- Improve leverage quality
- Categorize content
- Inform AI models
- Build custom ranking, filtering, or context rules
- Answer relevant business queries

It is a flexible data model built for the reality of modern localization.

### 4. Linguistic asset storage and tracking

The linguistic assets that define your content, such as style guides, terminology, keywords, intent, and knowledge, can be stored and managed in Blacklake. Whenever you use the `Prepare Content` action, Blacklake also populates your context with relevant assets.

### 5. Self-hosted or cloud native

Because Blacklake stores real linguistic data, some organizations need strict data control. Blacklake supports both self-hosted deployment and fully managed cloud deployment.

Either way, it integrates seamlessly with Blackbird for workflow orchestration.

> If you want to start building, consider reading the [Blacklake App docs](../../apps/blacklake). Otherwise continue with the [Interface Walkthrough](../interface).

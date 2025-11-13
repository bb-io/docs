---
title: Key Blacklake Features
description: In-depth explanation of Blacklake
sidebar:
  label: Key Features
  order: 2
  hidden: false
---
> 💡 Blacklake is live in early access today for select Blackbird customers. If you're interested in participating in the next round of users then shoot us a message!

### 1. Content is the source of truth
In modern workflows, content is dynamic—updated frequently based on product releases, SEO, KPIs, analytics, and reader behavior. Blacklake continuously synchronizes this reality across all languages.

Instead of relying on a TM as a static memory of how content used to be, Blacklake reflects how content is right now. Any change in a connected system can be aligned, diffed, and updated automatically in the Lake.

### 2. Two fundamental actions: Apply and Add to Lake
Blacklake intentionally keeps interaction simple. Everything revolves around two core actions.

#### Apply Lake (Leverage)
When you trigger the Apply Lake action, Blacklake:
1. Diffs the content first.
  Because most content already exists in the lake, Blacklake compares what you’re sending with what it already knows and pre-fills the parts that haven’t changed. Only new or updated units require further processing.
2. Queries the entire lake for the most relevant linguistic data.
  Blacklake can query across all content stored in the Lake. Because metadata is fully customizable, queries can be highly specific—for example:
    - “Prioritize content with the highest page views.”
    - “Use translations from legacy product docs, but only for this product line.”
    - “Exclude machine-generated content from suggestions.”

The result is context-aware leveraging far more powerful than classical fuzzy matching and more relevant than vector-based matching.

#### Add to Lake (Commit)
Unlike TMs—which only update during translation, Blacklake allows you to commit bilingual or monolingual content anytime. When you Commit:
- Blacklake aligns updates using context IDs if they exist
- Detects changes
- Places translations or modifications in the correct location in the lake
- Updates relevant metadata

This supports true in-context editing, where changes made in the “real” content (e.g., CMS or code) flow automatically back into Blacklake.

### 3. Customizable metadata
Every organization cares about different metrics, KPIs, or attributes. Blacklake lets teams define and update metadata without touching the content itself.
This metadata can then be used to:
- Improve leverage quality
- Categorize content
- Inform AI models
- Build custom ranking, filtering, or context rules
- Answer relevant business queries

It’s a flexible data model built for the reality of modern localization.

### 4. Linguistic asset storage and tracking
The linguistic assets that define your content: style guides, terminology, keywords, intent, knowledge can be stored and managed in Blacklake. Whenever you use the "Apply Lake" action, Blacklake will also populate your context with relevant assets.

### 5. Self-Hosted or Cloud Native
Because Blacklake stores real linguistic data, some organizations need strict data control. Blacklake supports both a self-hosted deployment or a fully managed cloud deployment

Either way, it integrates seamlessly with Blackbird for workflow orchestration.

> If you want to start building consider reading the [Blacklake App docs](../../apps/blacklake). Otherwise continue with the [Interface Walkthrough](../interface)
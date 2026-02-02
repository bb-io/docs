---
title: Importing existing Translations
description: Filling a Lake with existing content
sidebar:
  label: Importing existing Translations
  order: 4
  hidden: false
---
> 💡 Blacklake is live in early access today for select Blackbird customers. If you're interested in participating in the next round of users then shoot us a message!

Blacklake can be introduced into your translation stack incrementally, or you can choose to import all existing translations from your CMS immediatly getting all the benefit of Blacklake. In technical terms, this is done through a process called 'Alignment'. You can use Blackbird to dictate what content can and should be imported.

Rather than forcing content into rigid sentence-based segmentation, Blacklake aligns content the way it exists in modern systems—structurally, contextually, and reliably.
Once imported, aligned content immediately becomes usable for translation and pre-translation, in-context editing, and metadata-driven querying.

### How Blacklake aligns existing translations

When importing existing multilingual content into Blacklake, one of the most important challenges is alignment: determining which source and target text units belong together.

Unlike traditional Translation Memories, Blacklake does not assume static documents or perfect segmentation. Instead, it aligns content based on context, structure, and position, allowing it to handle real-world content that has evolved over time.

#### Primary alignment: context-aware matching

Blacklake first attempts to align content using explicit context identifiers provided by the source system. Depending on the integration, these identifiers may include:

- CMS field paths (e.g. HTML or JSON paths)
- Content keys from code repositories
- Stable IDs provided by the source platform

If both source and target units share the same context reference, Blacklake treats them as the same unit—even if:

- The surrounding structure has changed
- Wrapper elements were added or removed
- The content was edited in-context after translation

This allows Blacklake to reliably align content even when systems like CMSs or page builders introduce structural changes over time.

#### Fallback alignment: content and reference similarity

If a direct reference match is not possible, Blacklake applies a secondary matching strategy using:

- Normalized text comparison
- Partial reference similarity
- Change detection against existing lake content

This ensures that small edits, punctuation changes, or formatting differences do not break alignment.

Only when Blacklake is confident that a source unit should map to a single target unit will it be aligned. A source unit is never matched more than once. However:

> **Always be sure that content is actually a translation before trying to align it**

#### Gap alignment: positional consistency

In some cases, content structure changes result in gaps: units that cannot be matched directly, even though the surrounding content aligns correctly. When this happens, Blacklake applies a final alignment pass based on positional consistency: Blacklake looks at the surrounding aligned units. If a consecutive sequence of unaligned units exists and the source content contains an equal number of unused units at the corresponding positions then Blacklake aligns these units in order, preserving content flow and intent.

This strategy is particularly effective for:

- Key heavy integrations (product localization)
- CMS migrations
- HTML structure changes (e.g. added wrapper elements)
- Editor-driven layout changes that don’t alter the actual text

If the gap cannot be resolved unambiguously, Blacklake leaves the units unaligned rather than risking incorrect matches.

### A content importing Bird

The following Bird demonstrates an example for a common use case: take existing site pages that have been translated in Hubspot and align the translations in Blacklake.

Note that the source document should always be stored in Blacklake first. Then, iterating over its translations, we store the translations and add the variant to align with as an advanced input.

![1770046747226](~/assets/blacklake/1770046747226.png)
---
title: Blacklake FAQ
description: Frequently asked questions regarding Blacklake
sidebar:
  label: FAQ
  order: 8
  hidden: false
---
> 💡 You can try Blacklake today. Contact us if you want to participate.

### What's the benefit of Blacklake compared to a normal TM in a TMS?

The short answer is that Blacklake stores more than translation pairs. It keeps content connected to real systems, preserves context, tracks changes over time, accepts metadata, and can absorb target-side edits so the lake reflects what is actually live.

A traditional Translation Memory is only a memory of how a segment was translated at some point in the past. Blacklake is designed for continuous content operations where source and target content keep changing across CMSs, codebases, and localization systems. Instead of asking what was translated before, Blacklake helps you work from what is true now.

### How do you deal with segmentation?

Blacklake uses segmentation boundaries that are meaningful for the connected system rather than forcing everything into sentence-level units.

For example, for code repositories Blacklake typically treats each key as a separate unit. For CMS content, it uses the boundaries the CMS provides such as fields, and may segment further when the content contains meaningful structural boundaries. For long-form field content, Blacklake does not segment below the paragraph level.

This improves both context preservation and change detection. It is more reliable to detect and align changes at field or paragraph level than at sentence level.

### Does Blacklake automatically detect content changes?

Yes. Blacklake and Blackbird can automatically detect changes in source-language content as well as changes made directly in target languages.

Continuous sync relies on Blackbird events. In other words, the detection is automatic once the relevant Birds and event triggers are in place.

### If someone edits a translation directly in a CMS, will Blacklake preserve that edit?

Yes. Blacklake is designed to support in-context editing. If someone (or something) edits target-language content directly in the CMS, that edit can be synced back into the lake through a Bird and preserved as part of the current reality of the content.

If the source changes again later, Blacklake does not have to overwrite that target-side edit blindly. The lake can be updated with both the source-side and target-side changes.

### How does Blacklake identify diffs?

Diffing depends on the connected system and its structure. For a CMS like Contentful, Blacklake identifies diffs at field level. If a field contains long text with multiple paragraphs, Blacklake can work at paragraph level inside that field. For product localization (Github/Gitlab) Blacklake identifies diffs at the key level.

This allows downstream workflows to send only the changed content instead of resubmitting full articles.

### Can I use Blacklake for monolingual workflows?

Yes. Blacklake can look at monolingual changes, or even simply leverage the language assets in order to provide more context to a processing tool.

### My TMs get dirty all the time. Does Blacklake get dirty?

Blacklake does not get dirty. In fact, it was designed from the ground up to *not be just another TM*. The key difference between Blacklake and a TM (besides the ability to stream in context edits back), is that Blacklake truly understand where content is coming from, going to, how it lives and what value you attribute to it. 

Using strategies, you can leverage the lake in numerous ways to get exactly the relevant matches you need.

### Can we send only changed content to a TMS?

Yes. A Bird can be configured so that only the changed units are sent downstream to a TMS.

Blacklake can also filter out unchanged or duplicate content before handoff, which makes it useful for diff-only translation workflows.

### Does Blacklake work with an existing CMS-TMS stack?

Yes. Blacklake is designed to work with Blackbird orchestration and can be gradually introduced into an existing CMS and TMS workflow.

It can also run in parallel with an existing workflow during a pilot so you can validate the setup before changing production behavior.

### Can Blacklake store and query custom metadata?

Yes. Blacklake can store custom metadata alongside translations, such as page views, conversion metrics, product or market labels, or workflow-specific attributes.

That metadata can also be used for querying and leverage decisions. For example, you can prefer content from high-performing pages or exclude content that does not meet certain criteria.

### How much time does Blacklake setup usually take?

A typical CMS-based setup is approximately 8 to 12 hours.

That setup often starts with retroactively filling Blacklake with existing content through [alignment](../alignment). Blackbird can also deliver this as a professional service, including use of available solution architecture hours from a support plan where applicable.

### How much engineering effort is required from the client team?

If the CMS is already in place, the main work is usually building the required Birds and event-driven workflows.

In practice, that means the engineering effort is typically moderate rather than a large standalone implementation project.

### Can Blacklake roll back content to a previous version?

Blacklake is not intended to be the primary rollback mechanism for published CMS content. If content in Blacklake is wrong, the preferred fix is to correct it in the source system and let that update flow back into the lake.

That said, Blacklake can help identify what changed and can be leveraged against previous versions to help restore or correct problematic content.

### Can Blacklake be used without Blackbird?

No. Blacklake requires Blackbird for orchestration.

Blackbird events, actions, and workflow logic are what make continuous sync, approvals, and downstream integrations work in practice.

### Can we require approval before publishing to production?

Yes. Approval workflows such as "do not auto-publish to production" can be handled through Birds.

This makes it possible to combine automated sync and preparation with manual control where needed.

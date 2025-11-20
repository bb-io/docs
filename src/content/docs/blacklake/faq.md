---
title: Blacklake FAQ
description: Frequently asked questions regarding Blacklake
sidebar:
  label: FAQ
  order: 4
  hidden: false
---
> 💡 Blacklake is live in early access today for select Blackbird customers. If you're interested in participating in the next round of users then shoot us a message!

This guide assumes you understand the Blacklake [Key Features](../key-features). See the [Blacklake App](../../apps/blacklake) on how Blacklake can be put to work in Birds.

### What's the benefit of Blacklake compared to a normal TM in a TMS?

The short answer? The content in Blacklake can be enhanced with extra metadata, it provides a history of changes, and you can send it target language edits so that the lake always represents reality, a TM doesn't do this.

The slightly more elaborate answer is that Translation Memory is exactly that: a memory of the past. The only thing it is able to give you is that at some point in time someone translated a sentence in a particular way. This approach is not of this time anymore since content changes constantly. Translation Memories are prone to becoming “dirty,” siloed, and outdated. They are locked in single systems and disconnected from real-time content use. Blacklake replaces the need for a static TM by serving as a living, synchronized language data lake connected to both source and target content. It's not about what was translated in the past but how content is presented to your users today.

It enables in-context (post-)editing, instantly updating the memory when translations are corrected anywhere. Even outside the translation process such as for SEO optimization. New translations can be generated using dynamic queries, e.g. “pre-translate this document using units within context X, translated via method Y, and with a conversion rate ≥ Z”. This architecture ensures every term and unit is locatable, measurable, and performance-tracked, with terminology changes instantly propagated across systems. The result is faster, higher-quality multilingual content creation powered by context, metadata, smarter automation, and continuous, KPI-driven improvement.

### How do you deal with segmentation?

This is a very interesting question, how amazing of you to ask! Did you know that most CAT tools segment down to a sentence level because the first CAT tools were running on extremely memory restricted hardware? Yes segmentation is that old! Unfortunately nobody considered changing this and it became the expected way CAT tools behaved even though it has significant drawbacks namely: fuzzy boundaries (and therefore segmentation differences between different technologies) and a severe loss of context (a sentence can be translated differently depending on the sentences around it). The former makes it so your TM is not actually portable to other technologies, and the latter impacts the linguistic quality of matches.

So what does Blacklake\* do? One of Blacklake's core strengths is that it cares about the context and metadata of content. We know where content comes from and therefore we understand what *meaningful segmentation boundaries are*. 

For example, if you are translating product strings with Blackbird connected to a code repository like Github, Blacklake will treat each key separately. Each key is the segmentation boundary. If you are translating CMS content, we look at what boundaries the CMS gives us: are the title, description, fields and footer separate? Then they appear in Blacklake a separate units. However, if all or one of these fields have other distinctive content boundaries, those are used as well\*\*. Either way, if we are talking about raw content Blacklake will never segment further down than the paragraph level.

Besides the improved linguistic qualities this entails, Blacklake also uses this strategy in order to more accurately perform change detection when content gets updated. It's more accurate to detect changes made to paragraphs and correlate them with existing paragraphs than it is to do this with sentences.

> *\* The file parsing and segmentation is actually shared between Blackbird and Blacklake.*

> *\*\* In technical terms, if we are talking about plain HTML content then Blacklake considers block level elements (\<h1\> \<p\>, \<li\>, etc.) as separate units. Inline tags and elements are preserved within a single unit.*
---
title: The Blacklake Interface
description: In-depth walkthrough of the Blacklake UI
sidebar:
  label: Interface Walkthrough
  order: 3
  hidden: false
---
> 💡 Blacklake is live in early access today for select Blackbird customers. If you're interested in participating in the next round of users then shoot us a message!

This guide assumes you understand the Blacklake [Key Features](../key-features). See the [Blacklake App](../../apps/blacklake) on how Blacklake can be put to work in Birds.

### Signing in and managing Lakes

The Blacklake UI can be accessed at [blacklake.blackbird.io](https://blacklake.blackbird.io/). To connect to your Blacklake server, use the same URL and Key that were used to connect the Blacklake App.

After connecting, you will be presented a panel to manage Lakes. Here you can create new Lakes and delete Lakes (right click delete).

Every Lake in Blacklake is a separate database. You can think of a Lake as a complete brand identity across multiple languages. Most enterprise customers that are managing a single brand will only need one Lake while Language Service Integrators or other companies managing different brands will want to create a Lake for each.

![1763045159092](~/assets/blacklake/1763045159092.png)

You can open a Lake by clicking on it. By clicking on your Lake in the top left corner you can switch Lakes.

### Managing Variants

Content stored in Blacklake is assigned a Variant. A Variant could be as simple as a different language, but it can be much more than that! It could be a locale (language + country) or an even more specific target audience or vertial (Think English for iPhone users). How granular you can go with Variants mostly depends on the CMS or platform your content is hosted on. Just know that Blacklake is very flexible in this regard!

You can create new Variants by clicking "New Variant". If content is sent to Blacklake with (language) codes that it hasn't seen yet a new Variant will automatically be created.
Clicking on a Variant allows you to inspect the Content of this particular Variant. You also have additional settings under "Settings & style guide"

![1763045810414](~/assets/blacklake/1763045810414.png)

You edit the name and description of a Variant. You can also add additional codes, this is useful if your Variants are hosted accross different source systems that use different codes.
You can also add Style guide rules here that will be added any time you use the "Apply Lake" Action in Blackbird.

![1763045913976](~/assets/blacklake/1763045913976.png)

> While we are still rapidly adding new features to Blacklake, some of these sections may be moved to a different place in the future

### Viewing Content

![1763046160704](~/assets/blacklake/1763046160704.png)

When navigating to a particular piece of Content, Blacklake (but mostly made possible by Blackbird) will try its best displaying the content to you as if viewed by an end-user. In the top bar you will see some navigational options. Here you can switch between different Variants of the same content, view the metadata that has been attached, a link to the content "in the real world" (if applicable) and a link to where the content can actually be edited in-context.

![1763046122825](~/assets/blacklake/1763046122825.png)

When hovering over the text you will be able to inspect the distinct textual units. If Blackbird was used to create the bilingual files then this *segmentation* will take place on a paragraph level or otherwise clearly distinguishable unit level.

Clicking on a text unit will open more information about this unit. Here you can inspect the original source text and the history of this unit. E.g. how did this unit change over time?

![1763046358905](~/assets/blacklake/1763046358905.png)

In this example we can see how a unit was first created by a certain tool without any review or quality attached. Later someone made an edit to this particular unit *in-context*, meaning in the actual tool this content is stored!

### Managing Metadata

![1763046644857](~/assets/blacklake/1763046644857.png)

In the Metadata menu you can add Metadata fields. Currently supported metadata types are booleans, numbers and text. When defined in this interface, these metadata fields can be populated through Blackbird Actions. See the [Blacklake App](../../apps/blacklake) on how these Actions can be used.

### Global search

You can use the Global Search feature to search text across all the content in your Lake.
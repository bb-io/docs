---
title: What Is a Loop and How to Use It?
description: In this guide, we'll show you how to proceed when an action's output is a list of items but the next action only takes one of those items - a.k.a. Looping.
sidebar:
  label: Loops
  order: 5
  hidden: false
---

Welcome to the Looping 101 - your guide to mastering Blackbird's Loops without getting tangled in technical jargon!

## Understanding the basics
In Blackbird, actions in a workflow can sometimes produce outputs that come in groups, like sets of items. These groups are known as arrays or lists. But, when the next action expects just one item, not a whole group, that's where the Loop comes into play.

Take this "Get message" action from Slack. As a message can contain multiple attachments, Blackbird returns a "group" of attachments (even if in a particular message there is just one attachment). Checking the Flights tab, we can see the square brackets "[]" around the "list" of attachments. This is key to identifying arrays.

![Slack output](~/assets/guides/loops/Loop_SS1.png)

## What does the Loop do?
Think of the Loop like a helpful assistant that takes each item in the group, one by one, and carries it through the next action. It's like going through a checklist item by item, making sure everything gets done.

Let's say, going back to our example, that we want to translate those attached files through DeepL. So we look up DeepL's "Translate Document" action. We can see that this action is expecting a File as one of its inputs. However, when we try the _Magic Wand_ to list the outputs of our previous actions, we don't see our attached files listed. This is because the new action is expecting a single file, not many, not a group. Time to add a Loop.

![DeepL empty input](~/assets/guides/loops/Loop_SS2.png)

## How to add a Loop?
Same way as a new action would be added, clicking the plus sign. But instead of choosing Actions, Operators or Decisions, we select `Loop`. After this, the "group of items" we want to iterate through needs to be selected.

![Plus Sign Options](~/assets/guides/loops/Loop_SS3.png)

![Choosing our array](~/assets/guides/loops/Loop_SS4.png)

##  Which actions to place inside?
Actions that need to happen repeatedly, or per each item in my group/array, are placed inside the Loop using the plus sign again and selecting said action(s). Check the flow lines going back to the Loop's start point, as if repeating over itself (until we run out of items in the group, that is).
 
![New DeepL input and highlighted flow line](~/assets/guides/loops/Loop_SS5.png)

## Keeping actions outside the Loop
But what about actions that don't need to happen for each individual item? Those can stay outside the Loop. These are tasks that only need to be done once, regardless of the number of items in the group.

Let's say that we want to place our attached files within a memoQ project and use them as source files. If we wanted to create one project per attached file, all we would have to do would be to place a "Create Project" action within the Loop going through each file. Nevertheless, we actually want one project to contain all our files. Therefore, the "Create project" action needs to happen outside my Loop, and only include "Import Document" within the Loop taking as input each single file and iterating through them until all are imported; then the flow will continue with single actions again, maybe getting information from my newly created project _overall and once_.

![memoq steps](~/assets/guides/loops/Loop_SS6.png)

> For ease of use, we suggest renaming your Loop to something that makes it absolutely clear to you what items you are running through. To do this, use the pencil icon next to your action title in the right pane, while said action is select.

## Putting it all together
Congratulations, my feathered friends! You've successfully completed your crash course in Looping with Blackbird. Now that you've mastered the art of Looping, let's spread our wings and put it into practice!
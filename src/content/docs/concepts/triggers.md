---
title: Understanding Triggers - Initiating Processes and Workflows
description: Learn what trigges are.
sidebar:
  label: Triggers
  order: 4
---

All processes must begin at some point: a **trigger** is what defines when a workflow should start, ensuring that tasks are executed at the right time and under the right conditions. Within Blackbird, there are four types of triggers: manual, scheduled, event-based and polling. Each type serves a unique purpose and is suited to different scenarios.

## Manual Triggers

Manual triggers (also referred to as [Manual push](https://docs.blackbird.io/guides/manual-triggers/)) are activated by human intervention. These workflows start as soon as someone clicks the `Fly` button. This type of trigger is ideal for testing and debugging, or when processes need to be started based on specific, often unpredictable, conditions that require human judgment. This is the recommended trigger type while you are in the process of building your Birds.

![Fly button](~/assets/docs/triggers/Fly.gif)

**Key Features**:

**Human Initiation**: Requires a person to start the process.
**Flexibility**: Allows for discretion and judgment in starting processes.
**Use Cases**: Testing workflows, ad-hoc task initiation.

## Scheduled Triggers

Scheduled triggers are time-based and initiate processes at predefined intervals. These triggers are perfect for tasks that need to be performed regularly and consistently, such as daily data backups or monthly financial reports. By automating the initiation of these tasks, scheduled triggers ensure that processes are executed punctually without requiring manual intervention.

In Blackbird, you can choose an interval—from the moment the Bird is published, every X amount of hours or minutes the Bird will be triggered. Another option is to start the process daily at a specific time, or always on a set day of the week/month. Additionally, you can specify a timezone to avoid any confusion.

![Scheduled](~/assets/docs/triggers/Scheduled.gif)

**Key Features**:

**Time-Based**: Initiates processes at specific times or intervals.
**Consistency**: Ensures regular and timely execution of tasks without human intevention.
**Use Cases**: Periodic reporting, routine data processing, pulling content out of my CMS every Monday at the agreed cutoff time to send it for translation.

## Event Triggers

Event-based triggers respond to specific changes in an app by using webhooks or callbacks. These triggers are highly dynamic and are activated by defined conditions such as the arrival of a new email, the completion of a task, or changes in data. Event-based triggers are essential for real-time processing and responsive workflows, where the initiation of processes needs to be immediate and contingent on specific events.

Once you select the Event type, move to the Connection tab or click Continue, choose the app you want to react to, and the specific type of event (e.g., a task being completed in my TMS, a new email in Outlook, a new order created in Plunet). After publishing the Bird, once the selected action occurs, your workflow will react to the action and start executing.

In the image below, we can choose to react to a number of different events happening in Zendesk, for instance, a new article being published. 

![Event](~/assets/docs/triggers/Event.png)

In case any extra setting is needed (some apps require this), you may see an URL that needs to be copy-pasted somewhere. In such scenarios, details will be specified in the app's section within Blackbird documentation. 

**Key Features**:

**Event-Driven**: Activated by specific system events or changes.
**Responsiveness**: Enables real-time reaction to events.
**Use Cases**: Real-time data updates, automated notifications, conditional task execution.

## Bucketing

Sometimes, reacting every single time something happens can create clutter as these actions occur too frequently. This is where Bucketing comes into play. You can adjust your Bird so that Blackbird collects these events and only starts after either X amount of actions have taken place or a set time has elapsed. Add your settings to the Bucketing tab for this.

In the image below, following the previous example, we don't want to create a new TMS project each time an article is published in Zendesk. Instead, we wait until at least five articles are published or two hours have passed, whichever happens first. If after two hours only three articles were published, the Bird will execute anyway and create a new TMS project for those three articles. This adjustment ensures that processes are responsive enough without creating excessive noise.

![Bucketing](~/assets/docs/triggers/Bucketing.png)

## Polling

Since some systems don't have webhooks or callbacks, but we would still like to be diligent and reactive, Blackbird has launched Polling events. For the regular user, this trigger looks exactly like an event-based one, while, under the hood, Blackbird is checking for changes at specified intervals. This type of scheduled trigger looks for updates in an app's data to decide whether to start a workflow, bridging the gap for apps that don't provide webhooks by allowing our Birds to react in _real time_.

![Polling](~/assets/docs/triggers/Polling.gif)

## Checkpoints

This innovative feature enables in-Bird triggers, allowing your Bird to wait for a specific event to occur before moving on to the subsequent steps. Find more information about Checkpoints in a dedicated entry [here](https://docs.blackbird.io/concepts/checkpoints/).


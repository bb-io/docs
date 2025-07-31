---
title: Flights
description: Learn what Flights are
sidebar:
  label: Flights
  order: 3
---

The Flights tab gives you an overview about how your Birds perform. The list displays the latest 500 flights from the last thirty days. You can use the search bar to narrow down the results by typing in the Bird's name or the Flight ID, or even check flights from an specific date range. You can also filter the list by flights' state: completed, stopped, failed, flying or waiting.

## Checking the details of a flight

To check your flights, navigate to the _Flights_ tab and click on a Flight in the list to check its details. In this overview you can check each individual action, their inputs and their outputs. 

![flight overview](~/assets/docs/flight-details.png)

When a flight fails, a message containing the error details is displayed:

![error details](~/assets/docs/error-details.gif)

By clicking _Edit Bird_ you can open the editor page of the current Bird, where you can make the necessary changes.

## Live flights

You can watch a flight in real time as a _bird flies_ through the steps of your workflow. A flapping bird animation guides you along the path, moving from one step to the next as they execute. Once the flight completes successfully, a burst of confetti gives you a visual high five.

![live bird](~/assets/docs/live-bird.gif)

## Parallel Action limit

While you can have an unlimited number of Flights flying, we’ve introduced a limit on how many Actions execute in parallel across all your Birds. This does not affect the total number of executions or the amount of data processed, neither does it cap the amount of Flights. If you trigger more Flights than Actions your subscription allows to run concurrently, Blackbird will schedule your Actions in a random order. That's why if you have a lot of Flights with heavy actions (f.e. LLM file processing) other Flights may take longer as the scheduler could be working on the heavy Actions. The parallel execution limits depend on your subscription: the Business plan and above allows for more concurrent Actions, and the Enterprise plan supports unlimited parallel executions if on a dedicated environment.

> Flights awaiting a checkpoint don't count towards the parallel Actions quota.

Filter flights by status
![live bird](~/assets/docs/waiting-filter.png)

## Stop a flight

To end a Flight that hasn’t completed yet, use the `Stop Flight` button next to the Bird’s name when viewing that specific flight under the _Flights_ tab.

![stop a flight](~/assets/docs/stop-flight.png)
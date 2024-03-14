---
title: Plunet & Hubspot CRM
description: Our first introduction to solution architecting with Blackbird - let's synchronize Plunet customer/order data with Hubspot CRM!
sidebar:
  label: SA 101 - Plunet & Hubspot
  order: 2
  hidden: false
---

This guide is our first introduction to business process management and solution architecting. Now that you know how to use the basic functionality (birds, flights and apps) it is time to learn the soft skills that will help you get the most out of Blackbird!

Data synchronization between two systems is a typical Blackbird use case. Usually the requirements would be in the shape of: "When a new _x_ is created in system _y_ synchronize it to system _z_".
Today we are taking Plunet and Hubspot as example systems for this case, but of course the same methodology can be applied to any two other systems.

> Note: Throughout this article, wherever we refer to Plunet order it can be substituted by Plunet quote or Plunet request, equially you can choose to link with Hubspot Quotes instead.

## 1. Requirements

As any experienced software developer will tell you: getting accurate requirements is hard. This is because in software land, everything can be precisely defined but in human language land, we tend to be a lot _"freer"_ in our descriptions of what we want to achieve. Let's take a look at a real-life example of a Blackbird user's requirement:

> "We want to synchronize Plunet orders with Hubspot deals"

This requirement is still a long way from an actual bird. So the first step is to get more details. Assuming we already know what Plunet orders and Hubspot deals are, we need to find an answer to the two most relevant questions: **What** data needs to be synchronized and **When** should this synchronization take place?

> "We want to create a deal in Hubspot when an order is created in Plunet. The deal amount, name, customer, contact person and project manager should be synchronized"

That's more like it. Whether you are implementing your own workflows in Blackbird, or you are working with someone else's requirements, you need to be able to articulate **What** needs to happen **When**. If this business process is actually already being executed "manually" on a periodic basis, then it can be extremely valuable to (digitally) sit next to this person as they do their actions. It can help finding hidden requirements, but also already give you a head start on the steps we need to take next. In all cases it is recommended that a requirement can at least be executed manually, even if it is not part of any business process today.

## 2. Relationship mapping

Now that we have a better grasp of what we need to build, we need to get some bearings on how these systems work. What is a customer in Plunet? What is an order? And most importantly: **what are the equivalent representations in Hubspot?**

Let's start with Plunet, but let's be brief:

- There are multiple customers.
- Each customer can have multiple contact persons.
- Plunet has 'internal resources' which represent people in your organization.
- There can be multiple orders, each representing business negotiated with a customer.
- A Plunet order is linked to an 'internal resource' as project manager, a customer and a contact person of that customer.

![Plunet diagram](../../../assets/guides/hubspot-plunet/plunet-diagram.png)

In Hubspot, things look similar but with a significant difference:

- There are multiple companies
- There are multiple contacts
- There are multiple deals. A deal has a 'deal owner' who is a Hubspot user
- Between these three entities, many-to-many relationships exist. And Hubspot uses 'associations' to keep track of these relationships.

![Hubspot diagram](../../../assets/guides/hubspot-plunet/hubspot-diagram.png)

These structures are similar enough to create a mapping between the two. However, in some cases these similarities don't exist. In those cases it is prudent to investigate how people have mapped these relationships in their organization.

Let's draw the semantic relationship map:

![Hubspot Plunet](../../../assets/guides/hubspot-plunet/hubspot-plunet.png)

## 3. Implementating the relationships

Whenever we are dealing with semantic relationships, we also need to make them explicit. We are doing this so later down the line we can easily have answers to questions of the form **"I have entity _x_, how do I now get entity _y_?"**. For example, we know that we will have actions within one system to get certain relationships. Given a Plunet order I can easily get the project manager. Given a Hubspot company I can easily get the contacts. These relationships and actions come out of the box! But how should we map the implicit relationships we just defined? Given that I have a Plunet order, how do I get the equivalent company _in Hubspot_?

Somewhere, references to the other equivalent entity need to be stored. Luckily, both Plunet and Hubspot allow us to create and set custom fields for each of these entities.

For Plunet, we create a _text module_ and apply it to Customers, internal resources, and orders. The name of the text module will be _Hubspot ID_ so that we can save the Hubspot IDs of equivalent entities. For more information on text modules, see the [Plunet documentation](https://kb.plunet.com/display/KB/Text+modules).

![Plunet text module](../../../assets/guides/hubspot-plunet/plunet-text-module.png)

In Hubspot, every entity can also have _Custom properties_ (Settings -> Data Management -> Properties). We can create a new property on each of our relevant entities. For more information on custom properties, see the [Hubspot documentation](https://knowledge.hubspot.com/properties/create-and-edit-properties)

![Plunet properties](../../../assets/guides/hubspot-plunet/hubspot-properties.png)

We have not created the infrastructure required to semantically link the entities in our two separate systems and we're ready to move on to the next step!

## 4. Planning the bird

Let's remind ourselves of the workflow we are trying to automate:

> "We want to create a deal in Hubspot when an order is created in Plunet. The deal amount, name, customer, contact person and project manager should be synchronized"

We have arrived at the most important step that you take before building the bird: breaking a problem down into small steps. The strategy that can most often be applied for typical Blackbird workflows is _what steps would a person take in order to execute this workflow manually?_ - while already assuming the previous 'infrastructure' that we created. If there is no way that one can envision a workflow being executed manually, then there is no way that we can instruct Blackbird to do it either. Therefore the manual steps are the basis of our automation.

Let's write down the manual steps that one needs to perform in order to synchronize their Plunet order to a Hubspot deal. We assume that the order has already been created.

1. Create a new deal in Hubspot and add the price, name and date from our Plunet order.
2. Set the Plunet order ID custom property in Hubspot with the ID of the Plunet order we created
3. After creating the deal, get the Deal ID from Hubspot and add it to the Hubspot ID text module in Plunet
4. Go to the customer of the order in Plunet and find its Hubspot ID from the text module
5. Create a new association between this Hubspot customer and the Hubspot deal
6. Go to the contact of the order in Plunet and find its Hubspot ID
7. Create a new association between the Hubspot contact and the Hubspot deal

> You may wonder why we are filling the custom properties and text modules while they are not necessarily required for this bird. We recommend that it as good practise to create these associations for future workflows and scenarios.

So it seems that our bird is going to be pretty straightforward! We perform about 6 actions when manually synchrnozing Plunet to Hubspot, we can thus expect a bird of about equal size.

## 5. Building the bird

Finally, we're ready to build the bird! If you have planned your actions correctly then the actions in your bird should basically correspond with the manual steps you would have to perform.

![Simple bird](../../../assets/guides/hubspot-plunet/bird-simple.png)

As you can see, the numbered actions correspond to the steps we planned above!

When you have tested this flow in itself (we recommend doing so with a manual trigger initially and just grabbing a 'hardcoded' Plunet order) you can start thinking about the trigger: when did this bird need to fly again?

The bird should trigger _when a new order is created in Plunet_. It seems that there is an event in Plunet called _On order created_. Unfortunatly, this is the moment where we would need some deeper system knowledge of Plunet. Namely, this event is not triggered when a new order is saved the first time, but triggered in Plunet the moment you click on the _new order_ button. This is extremely unuseful as at that moment, the entire order will still be empty.

> We encourage you to experiment with events (and actions) in isolation birds, simply to get familiar with their behaviour, before using them in bigger bird scenarios.

No fear, there is another event we can use: _On order status changed_. It is common for project managers to create a new order, and finishing up the initialization phase by changing the order status. This should be our trigger instead!

A problem that arises now is that this status change can be applied multiple times. Imagine a project manager changing to our status, triggering the bird, changing the status back and forth and triggering it again. Now we have duplicate Hubspot deals!

The best way to circumvent this new problem we created for ourselves, is to simply check in the beginning if we have already set the Hubspot deal ID in our Plunet text module. If not, then we can safely execute the rest of the bird.

With those details added, our complete bird looks like this:

![Complete bird](../../../assets/guides/hubspot-plunet/complete-bird.png)

Congratulations! You have taken all the solution architect's steps in order to create a production ready bird!

## 6. Additional birds

But wait! In order for this bird to actually be effective in production, I need to have created the relationship (filled in text modules) between Hubspot companies and Plunet customers already. Likewise, we rely on the relationship between Plunet contact and Hubspot contact.

Sharp observation.

We could ask our project managers to create a Plunet customer each time a Hubspot company is created and associate the two by filling in the text modules and custom properties...

We could ask our project managers to create a Plunet contact each time a Hubspot contact is created and associate the two by filling in the text modules and custom properties...

...or we can just create two more birds and automate this process.

For the sake of not repeating the last two sections, let's keep it simple and be brief. The bird for contacts is very similar to that of customers so we will only show the customer workflow.

> In this example we assume that companies and contacts primarily live in Hubspot, as that is where the sales department creates them on first contact.

Requirement: _We want to create a customer in Plunet, when a company is created in Hubspot_

Manual steps (after a company is created in Hubspot):

1. Get the company's information from Hubspot
2. Create a new customer in Plunet
3. Set the Hubspot ID text module of the Plunet customer
4. Set the Plunet ID custom property in Hubspot

Bird:

![Complete bird](../../../assets/guides/hubspot-plunet/company-sync.png)

> The biggest difference between customers and contacts in Plunet is that contacts don't have text modules. Luckily they instead have an "external ID" property that we can use.

Congratulations for reading all the way to the end! Hopefully we have shown that setting up a Blackbird workflow goes a lot deeper than just playing in Blackbird exclusively. Sometimes you have to dive a little deeper in how these systems are intended to be used, how your team uses them and how an optimal workflow can be found. And then we haven't even discussed the human aspects of implementing a workflow like this, e.g. change management. Nevertheless, we hope that you can see that Blackbird itself makes the technical aspect of building these workflows completely trivial so that you can focus on people!

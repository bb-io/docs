---
title: App Conventions
description: Use the knowledge that we aquired with building over a 100 apps and integrations.
sidebar:
  label: App Conventions
  order: 9
  hidden: false
---

As you know, Blackbird apps can be viewed as mini products where each event, action and dropdown delivers a deliberate user experience with the goal of building workflows in the easiest way possible. We have been building more than a 100 apps and integrations and during this time we have learned what standards and conventions should be adhered to to deliver an easy and consistent user experience. The conventions you will find below are applied to all Blackbird public apps (where possible) and can be an invaluable resource for you when building your own apps.

## 1. Types

In Blackbird, users can encounter the following 5 basic types: text (string), number (any numeric type in .NET), dates [(`DateTime`)](https://learn.microsoft.com/en-us/dotnet/api/system.datetime?view=net-8.0), files [(`FileReference`)](/blackbird-docs/sdk/files) and booleans. Then the user can also find 'multiple' versions of the aforementioned which are denoted as `IEnumerable<string>`, `IEnumerable<FileReference>`, etc. in the SDK.

### 1.1 - ID types

Some apps treat IDs as integers, some as longs, some as strings. **In Blackbird we treat all ID-like variables as strings**. This means that any variable that is an identifier of some sort, should be converted to and from a string. Reason being is that if we have some apps that treat IDs as numbers, and some as strings, we cannot provide interoperability in terms of saving IDs in other places. F.e. if you want to save an ID in a custom field, you generally can only save string types. Therefore, pulling a value from that custom field would not be interoperable with a numeric ID input. Secondly, nobody should be performing arithmetic operations on IDs.

> ⚠️ Be aware - [System.Text.Json (default RestSharp deserializer)](https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/migrate-from-newtonsoft?pivots=dotnet-6-0#non-string-values-for-string-properties) does not deserialize from int, float, etc. to string by default.

### 1.2 - Date types

Dates are used in many applications. However, no application is consistent in the format they use to represent dates. **In Blackbird, everything that represents a date should be converted to [`DateTime`](https://learn.microsoft.com/en-us/dotnet/api/system.datetime?view=net-8.0)**. Whether it's a 'created at' field or a deadline. Make sure that your dates are DateTimes and not strings or longs. It's the only way to make applications interoperable.

### 1.3 - Array types

Also called "multiple" in the Blackbird UI. Arrays of course denote a collection of some of the other primitive types or a complex class object. When returning a class object note that no advanced operations can be performed on this type of structure. For array types the most important rule is that you **never return null, always empty arrays**, even if the underlying API likes to return null. This makes null reference errors less likely in the Blackbird user experience.

## 2. Naming

**All authentication credentials, actions, (webhook) events, input parameters and output parameters should have a user-friendly, descriptive short name.** If the descriptive name is insufficient then a longer description can be added which will appear as a popover in the Blackbird UI.

> **💡 Tip**: You can use the [Display()] attribute on almost anything to give it a name and optional description.

All names that are exposed to users in the UI should be carefully chosen, reflect the action/event/parameter perfectly and could use the description to describe any important additional information. All naming conventions apply to action names, action descriptions, property display names, data sources and connection properties.

### 2.1 - Capitalization

**The first word of every name should be capitalized. No other words should be capitalized**. E.g.

> ❌ Create Draft Message

> ✅ Create draft message

Except for abbreviations. **All abbreviations should be fully uppercase**. So ID and not Id, URI and not uri.

> ❌ Project id

> ✅ Project ID

### 2.2 - IDs

For a period of time we omitted the word "ID" from input/output variables that were actually ID parameters in favor of just calling it what it was: Project, Translation, Task. This was a mistake. It is unclear to the user what parameter represents and was often mistaken for f.e. translation content. **Any variable that is an ID should have the word ID in it**. Also, **never name a parameter just “ID”, always be more explicit** e.g. “Company ID”.

> ❌ ID

> ❌ Translation

> ✅ Translation ID

### 2.3 - Name lengths

Names in the bird editor don’t have too much space to work with. That’s why **property and action names need to be relatively concise**. As a rule of thumb, names should be **no more than ~40 characters**.

> ❌ Add business phone number to contact's business details

> ✅ Update contact

## 3. Errors

We want to **provide descriptive and actionable errors to users at all times**. Our users can be non-technical and we want to assist them the best way we can. Especially when it comes to errors that the user can do something about, f.e. when they are inputting a wrong variable, when their authentication details are incorrect, or when their system is misconfigured.

### 3.1 - Displaying errors

Errors in Blackbird are simply thrown as exceptions, and Blackbird will output the exception message to the users when the flight is inspected. When using `throw new Exception("My error message goes here") ` the error message will be displayed to the user. However, we prefer to always eliminate the regular exceptions that a user sees. Instead the two exception classes `PluginMisconfigurationException` and `PluginApplicationException` should be used. Read the [errors page](/blackbird-docs/sdk/errors) for a detailed description.

In order to provide a good experience, **errors should be caught and whenever there is a detailed description possible, this description should be displayed**. And **A configuration error should always inform the user how they can fix their issue.**

### 3.2 - Rate limits

Almost every API has a rate limit policy setup. This rate limit can often be found in the APIs documentation. It is the duty of the app developer to make sure rate limit errors don't bubble up to the Blackbird user on the action level. This means that **rate limits need to be taken care off** by identifying rate limit error responses (sometimes those are added to response headers) and implementing task sleeps in order to slow down the amount of requests that your code makes.

## 4. Connections

Blackbird connections can be defined with any amount of "connection definition fields". It also has the ability to setup special OAuth2 connections. OAuth2 provides an incredible user experience. Namely, it allows our users to connect to Blackbird with only a single click. **If we can, we will always want to use OAuth2** and avoid our user’s having to input client id’s, client secrets, permissions, etc.

Secondly, take into account that connection fields can also have display names, descriptions and an optional sensitive parameter. **Passwords and API keys should have the flag `Sensitive = true`** which will let them appear as passwords in Blackbird.

Connection field names should be short, descriptive and clear. From the field name the user should be able to figure out what exact data is required from them.

![Connection definition](~/assets/docs/conventions/connection_fields.png)

![Connection details](~/assets/docs/conventions/connection_details.png)

## 5. Data sources

A lot of input parameters for actions only have a certain amount of inputs that are allowed. For the user's convenience, and overall experience we allow you to define data sources that tell Blackbird what values are allowed and the user can select from these values.

### 5.1 - Static data sources

Static data sources are designed for variables that are predefined and finite. This means any form of enumerated types, IDs that represent enumerated types, configured languages etc. Instead of the user having to guess what values the API expects we should **always use static data sources for inputs with a finite number of possible options that can be predetermined in advance**. Examples of static data sources are:

- Statusses, for projects or jobs in a TMS or project management app.
- Languages, when the input parameter is a source/target language and the app doesn't allow you to configure your own languages.

### 5.2 - Dynamic data sources

[Dynamic data sources](https://docs.blackbird.io/sdk/datasources/#dynamic-data-sources), as the word suggests, are used when the data has to be loaded in from the connection. Classic examples of dynamic data sources are:

- Projects, when the input parameter is a Project ID in a TMS app.
- Channels, when the input parameter is a Channel ID for Slack.
- Languages, when the input parameter is a source/target language and the languages are configured in the application.
- Folders, in file management actions when selecting where to update/download files to/from.

**Any input parameter that has a finite number of possible values, but which depend on the connection of the user, should have a dynamic data source defined.**

Sometimes, to load the data of a data source, you need more information from the user. An example of this would be a structure where projects can have multiple jobs. In order to show a dynamic dropdown for all the jobs in the project, the API and underlying code requires the Project ID first. In these cases you should use [dynamic data sources with advanced context](/blackbird-docs/sdk/datasources/#advanced-context). Be very mindful when using advanced contexts though, as there are cases where you think an advanced context would be useful while in actuality it blocks the user from building its workflow. And example of this is a dropdown for adding language information when uploading a file. It would seem that loading the configured files on the project is a good idea, but the user may be building a workflow where the Project ID is coming from a different step. The user thus cannot select a project before selecting a language. Thus the language dropdown should not depend on the project but on all possible languages.

As a rule of thumb, only **add advanced context dropdowns if you are certain that all dependent information is always known at the time of building a bird**.

Finally, dynamic data sources could in theory return hundreds of items when combined with pagination. That is not desirable in Blackbird as the user will be waiting longer to see their suggestions. Instead, **dynamic data sources should only return at most one API pagination size of data**. This is also because the user is encouraged to use the search feature in the dropdown. **The search input to dynamic data sources should trigger a filtering of data in the code**, preferably by using query parameters in API endpoints.

## 6. Actions

Actions are arguably the element people interact most with in the bird editor, and therefore in Blackbird. It's beneficial to a user if our actions across apps follow the same conventions, so that the learning curve of a new app is drastically decreased.

### 6.1 - Philosophy

The philosophy at the heart of Blackbird is that **developers build an app so that users can combine it in the easiest way possible with other apps**. Every app can be considered its own product, and every action its own feature with a very deliberate user experience. This is an area where Blackbird differs from orchestration tools that are mainly targeted towards developers. Where those tools require the users to use more complicated technical concepts and structures in the orchestration part, Blackbird relies on developers delivering actions that don't require extra steps to handle or manipulate data. In essence this means that the inputs and outputs of actions should be in line with the expectation a user has about an action. **Blackbird apps are not mere API wrappers**, and thus you should not build your actions as mere API wrappers. The approach you should take is to **see what the user would want to do, not what the API can do**. Finally, we see that **less actions is better**. It allows the user to have a better oversight about what they can and want to do.

### 6.2 - API calls

To exemplify the aforementioned philosphy, let's look at how our DeepL app works when it comes to transling documents. To familiarize yourself, you can read what the [DeepL API says about translating documents](https://developers.deepl.com/docs/api-reference/document). Here is the TLDR;

- Call the `/document` endpoint to upload the document.
- Repeatedly call the endpoint to check the document status.
- When the status indicates the translation is complete, call another endpoint to download the translated document.

As you can see, we cannot expect a user to know how to orchestrate these actions together if every action was an individual API call. That's why the Blackbird action "Translate document" does all of the above under the hood. The action is written from a user's expectation and perspective, not from how the API expects us to do things.

There are more areas in different apps in Blackbird where you can find similar things. Most often **when an API requires certain calls in a particular order or structure** it is reason enough to **turn those calls into one action**. This also applies to implicit API call orders. F.e. when creating a project in a TMS that expects additional information before any file can be uploaded, then all those configuration endpoints should be called from information of the initial action. **After an action, the connected app should never be in an invalid state**.

### 6.3 - CRUD

There are APIs where CRUD actions are straightforward, and there are API calls where CRUD actions are less straightforward. Then there are apps that have a different API endpoint for every field you may want to update. It goes without saying that we don't want to have different actions for each of those fields in Blackbird. Instead, you should **build normal CRUD actions** that even in these extreme cases are able to use optional input parameters to determine what field needs to be updated and thus what field should be called.

There are also APIs where certain parts of an entity are hidden behind different endpoints. For example, a "contact" can have a `/contact/{id}` endpoint to get its details. But there can be a second endpoint to `/contact/{id}/address` to get its address. This may be very confusing to a Blackbird user if they were to deal with different actions for different contact properties. As a rule of thumb, **if an endpoint returns additional properties then this endpoint should be part of the read action**. Of course, if `/contact/{id}/addresses` (note plural) returned a possible infinite amount of addresses, then this should be a different action.

- A typical **Create** action takes sufficient required parameters to create a new entity, and enough optional parameters to fill in as much of the entity as possible (possibly calling more endpoints).
- A typical **Read** (in Blackbird actions this start with the "Get" verb) action takes an ID of an entity and returns its full information model, including any additional endpoints that return information that can together be viewed as the complete model.
- A typical **Update** action takes an ID of an entity and all the other fields from the create action as optional fields. If any of these optional fields are defined then those should be updated.
- A typical **Delete** action takes an ID of an entity and doesn't return anything.

For most applications, **all main entities should have all CRUD actions defined** (think projects, tasks, users, customers, etc.).

### 6.4 - Search & Find

Besides CRUD actions on single entities, most apps also benefit from having actions that return multiple entities of a certain kind. Think of a `/projects` or `/customers` endpoint. Most APIs also allow for query parameters to filter the results in a specific way. In Blackbird, these **endpoints that allow you to list multiple entities start with the word "Search" by convention**. Examples are: "Search project", "Search customers". Optional parameters to these search endpoints should be values that can narrow down the search results. In scheduled birds that periodically run it's useful to add data ranges to search in. Other examples of optional values are types, languages, or even other entities that can be connected.

Sometimes the user wants to search for one specific entity, as they perhaps know that it matches uniquely with any of the inputed optional parameters. It would be annoying for the user to still receive an array of results back if they can be sure that there will only be one result. That's why **actions that start with "Find" take the same parameters as equivalent search actions, but only return one result instead of an array**.

#### 6.4.1 - Search for previous items

A likely scenario is that a user wants to continuously translate new items (thinkg articles, pages, posts, etc.). However, they may also want to translate all existing items. In order to help with this scenario, when possible **all search actions should contain query parameters 'date from' and 'date to' in order to search for items within a specific range**.

### 6.5 - Pagination

Continuing on actions that can return multiple entities: often APIs implement pagination with these kinds of list or query endpoints. In Blackbird, **pagination should be taken care off by the app developer in the action**, and not delegated to the user. This means that limit or page should not be inputs to search actions. Actions should take care off pagination in the app code.

### 6.6 - Interoperability

Recalling the Blackbird philsoophy: "developers build an app so that users can combine it in the easiest way possible with other apps". This means that sometimes more work needs to be done for certain inputs and outputs to 'play nice' with eachother. To that end we have created certain conventions for some often-used entities to be returned and used in actions.

#### 6.6.1 - HTML

Translation tools, both TMSes and machine translation providers (even LLMs) handle HTML files quite well. However, modern CMS systems tend not to store their content as HTML files. Examples of these include Hubspot, Storyblok, Contentful, Marketo and Contentstack. They store their content in such a structure that when queried, these APIs return content in JSON format along with a lot of non-translatable data.

In Blackbird, we try to **always provide actions to pull content out of CMS systems as HTML files, and equivalent actions to upload translations from HTML files**. The conversion between HTML and the specific JSON structure each of these apps needs should be taken care of in the action code.

#### 6.6.2 - Glossaries

Glossaries (or terminologies) are traditionally maintained inside TMSes or dedicated systems. However, they often need to be used inside MT or LLM apps. Furthermore, sometimes a glossary needs to be transferred between TMSes.

All TMS and MT systems have made their own choices when it comes to accepting file formats for glossaries. Sometimes it's .csv, sometimes .tsv, sometimes .xlsx. We have chosen to make all glossary import/export actions interoperable by always converting to and from [.tbx](https://en.wikipedia.org/wiki/TermBase_eXchange). That's why **any action that deals with glossaries should take or return .tbx files**. We have created a library to do this easily which you can see examples of in many of our apps.

## 7. Events

Events are after actions of course an integral part of any bird. Currently most events are defined by existing webhook and callback functionality in an API. When polling events become available we will define more conventions for them.

### 7.1 - Event names

**Events should follow the "On ..." pattern** and preferably the "On \<noun> \<verb>" pattern to always accuratly and concisely clarify when the event takes place. E.g.

- On project imported
- On team order deleted

### 7.2 - Event output

Events should always output sufficient parameters for the user to continue working with the information. For example, if the event only outputs an ID, then the user would always have to do a "Get entity" step as their first action. This is undesirable since you force the user to always follow the same pattern of actions and clicks. Let's help our user and already perform that get request in our event code and return the full entity instead. **Where possible, events should always return complete entities akin to the implemented Get entity action**.

### 7.3 - Optional inputs

Often, the user will want to respond to an event, but has some additional parameters that determine whether to perform the actual actions in their bird. An example of this is a "On project status changed" event. A common workflow would be that if a project is completed, a certain message should be sent. If the "On project status changed" event was naively implemented then the user would always have to directly perform a decision operation in Blackbird in order to check the new status of the project. Only if this new status is 'completed' then all the actions in one branch of the decision would be performed.

This type of bird could look a lot nicer if the event handling code takes optional inputs to further specify when this event is triggered. An event like "On project status changed" should thus have an optional input to further specify the new status, and only if this status is coming through then a flight would be triggered. Therefore, where possible, **events should take optional input parameters that can narrow down when the event should be triggered**.

### 7.4 Optional inputs for checkpoints

With checkpoints, it has become normal to be able to specify the events with even more optional inputs. F.e. in the previous example "On project status changed" should not only be able to specify the status, but also the *Project ID* itself. It's after all possible to create this event as a checkpoint and in this case the user is only interested in a specific project.

### 7.5 Polling events

Polling events should apply all of the above conventions. As a rule of thumb, **polling events should be implemented for common cases if a webhook alternative does not exist**.

Polling events can be efficient if they only look at one entity. If multiple entities need to be watched (f.e. when looking for newly created entities), then using the some sort of query parameter to filter by date times (since the last polling event) is most efficient. As a last resort, all entities can be stored in memory and compared on every poll.

### 7.6 Polling vs. callbacks

Callbacks are difficult for the user to configure. Additionally, callbacks are harded to use in checkpoints since the bird first needs to be published before the URL becomes available. Therefore, **if no functionality is lost, polling events should be prefered instead of callbacks**.

## 8. Files

Blackbird is a unique orchestrator focussing on content. This also means that we have given extra attention to how files are handled both from a technical perspective as well as user experience. As you may have read at the [files](/blackbird-docs/sdk/files) documentation, there are two ways of handling files in the SDK: URL references and file content. When handling files, **if the API you work with allows it URL references should be used preferably**. Only if the API does not able to handle URL references for files then file content should be used. When using file content be wary of memory limits. Each action only gets access to 100MB, therefore **when handling multiple files make appropriate use of streams to never use more memory than you have to**.

### 8.1 - File action structure

In many apps that Blackbird typically connects with, it's very common that files are handled in batches. Think of files in a folder, attachments on a Slack message, source documents on a project, translated files on a task. Of course, sometimes an entity only has a one-to-one relationship with files. An example would be one HTML document that defines an article, or one glossary that can be uploaded to a TMS.

Because users often think of files as batches, we want to enhance their experience and not force users to have to resort to loops to do very basic operations. If the envisioned bird is to move files from a folder to a project, then no loop should have to be required.

On a very high level, most apps should be able to follow this pattern:
![File actions](~/assets/docs/conventions/file_actions.png)

In order to do this we need to adhere to the following principles:

1. **If an entity has a one-to-many relationship with files, then a dedicated action should be responsible for downloading all the files related to this entity.**

Examples include: "Download project source files", "Download attachments", "Download folder files". Note that if files can somehow be filtered, then those can be useful optional input values to this action!

2. **If an entity has a one-to-many relationship with files, then a dedicated action to upload multiple files should be available.**

Examples include: "Send message" (In Slack this has an optional multiple files input), "Upload source files", "Upload files to folder". It's likely that your API only has an endpoint to upload a single file. In this case you need to call this endpoint multiple times in your action code.

## 9. Documentation

It's important that any app is well documented. This way the user will have a reference to how to connect and use this app.

Any **documentation should at least consist of the following** parts:

- What prerequisits the user needs to fulfill before being able to connect.
- How to connect their app
- What actions the app offers, plus for each a sufficient description on its usage
- What event the app offers, plus for each a sufficient description on its usage
- An example bird that uses this app
- A discussion on what features are not implemented but can be implemented in the future

Any other important information the user would need, for specific actions or for the app in general, including deviations from this standard, should be documented in detail.

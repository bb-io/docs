---
  title: Changelog
  description: A global overview of all changes made to the BlackBird core platform
---
### (10-10-2025) 4.32
Main features: Retrigger Flights, multiple connection types, mass connection updating

##### Bird editor
- When adding an action, event or checkpoint, Blackbird will automatically select a connection and fill it in. If this is the first item for an App in a Bird it will select the first available connection, otherwise it will look at previous items and use the same connection.
- When creating a Bird from a Blueprint, connections are similarly automatically filled in.
- When changing a connection of a particular action or event, the Bird editor will prompt you if you want to change _all_ actions/events that are related to the same app. This significantly speeds up the amount of things one needs to do when creating a new connection or cloning a Bird for a different instance.

##### Flight page
- A new button _Fly again_ has appeared next to a Flight name if the Flight was triggered from an event.
- By clicking the _Fly again_ button, a new Flight will start using the latest published Bird version but replaying the Flight's event. This is excelent for quickly resolving issues in Flights without having to go into other systems to retrigger these Flights.
- The _Fly again_ button will not be available if the trigger has changed in the latest published Bird version.

##### Other
- We gave ourselves the possibility to define different connection types for the same App. Now we will be able to support different connection mechanisms with the same underlying API. You will for example be able to choose whether to use OAuth or a key/token connection method. It also allows us to unify certain LLM Apps as it's often the case that the same model is hosted on different cloud providers (OpenAI native, Azure OpenAI, Amazon Bedrock, etc.).

### (11-09-2025) 4.31
Main features: Bird editor closable panels, improved trigger UX, skip loop iteration

##### Bird editor
- The Bird trigger is now more configurable in the main view, rather than the side panel
- In the trigger configuration, the event is now selectable through the new add item modal
- A manual Bird can be flown from the trigger panel
- All time selections (delay, scheduled, polling) have been revamped.
- Most control flow cards in the Bird will now show inputted values, f.e. loops and decisions.
- The end loop and end Flight cards have changed in appearance. The end Flight is now similar to the bottom "end" of the Bird indicating that this step is not necessary in most cases.
- All item modals are now closable

##### Flight page
- The Flight page header design has been brought in line with the Bird editor, switching between the two is now a more seamless experience.

##### Other
- A loop now has the ability to enable "Skip iteration". When this is enabled, an error in a loop will not stop the entire Bird, but will just skip to the next itteration of the loop.
- An optimistic update has been added when activating/suspending a Bird.
- The scroll position of the Bird list is now saved when navigating back.

### (12-08-2025) 4.30
Main features: New Bird editor add item modal

##### Bird editor
- When adding a new item to a Bird, a new modal appears that provides searchable actions, events and operators. Hotkeys can be used to navigate through and the search field will search through all available actions, checkpoints, etc. Apps that were used in the Bird already will rank higher.

##### Other
- Improvements to the stability of the key vault service were made, this will result in less to no false negative authorization requests.
- The Bird overview page now also loads quickly even if your Birds are very large.

##### Bug fixes
- Nested variables are now also shown in the Bird editor when selecting inputs in arrays or multiple inputs.
- Exceptionally large Birds will not time-out anymore when saving.
- Actions using the large file downloading protocol will now not falsely appear as "Flying" even when they are done.

### (24-07-2025) 4.29
Main features: Bird editor header rework

##### Bird editor
- The header of the Bird editor had its visual appearance changed in preparation for other Bird editor features.

##### Other
- Blueprints are now front-end cached for an optimized UX
- The error messages returned from the Blackbird API (and thus also the Blackbird Services App) have been updated to match the UI.

### (17-07-2025) 4.28
Main features: Bird editor flow design update

##### Bird editor
- The flow items in the Bird editor received a major visual overhaul improving readability.
- Decision items and lines are now indicated in blue, while loop items and lines are indicated in yellow.
- The order of decision items has been changed to True | False instead of False | True
- If a decision has an empty branch, the full branch is centered under the decision instead.

##### Bug fixes
- Blueprints now show the right outputs of the used blueprinted actions in all cases.
- The error message column in the App Connection list is now correctly updated after the user updates a connection.

### (04-07-2025) 4.27
Main features: Blueprints, reworked Bird overview page and reworked App details page

##### Blueprints
You can now browse through Blueprints that the Blackbird team has created for you. You can search for Blueprints by apps and select one. After selecting the Apps you want to use in your Blueprint, a Bird is created for you to get started with.

##### Bird overview page
- Changed Bird overview page to a table layout.
- Added improved search capability, including hotkeys.
- Added a visualization of App icons that are used in each Bird.
- Added the ability to create Collections, groups of Birds within the same nest.

##### App details page
- Added groupings within actions and events for better organization.
- Added Blueprints tab to browse Blueprints related to this app.
- Improved the page layout.

##### Bug fixes
- Emails are now properly delivered to email addresses containing underscores (_).
- Publishing of Birds now does not fail anymore when you change a scheduled trigger to a manual/event trigger.
- "Ghost flights", flights that were started due to older and outdated scheduled triggers do not occur anymore.


### (13-06-2025) 4.26
Main features: Smaller Bird editor quality of life, numerous bug fixes and small patches

##### Bird editor
- When going to the "Create new Bird page". The Manual trigger will always be preselected.
- The default polling interval is now 5 minutes.
- Dropdown items now display a tooltip to help display longer item names.
- The ‘poll now button’ tooltip does not get stuck anymore

##### Flight page
- The word hyphenation in the Flight page was displayed in the middle of the word. This is now fixed.
- Fixed a bug where a Flights was in the “waiting state” too long.
- Fixed a small bug in the Flight list infinite scroll.
- Fixed some bugs where loop iterations were incorrectly displayed on the Flight page in certain nesting cases.

##### Bug fixes
- Fixed a bug where a Flight would sometimes get stuck at a Checkpoint.
- Arrays of objects that contain arrays are now properly handled.
- The loading animation Birds are now properly flying through the air instead of thwarting the laws of physics and hanging still for Safari users.
- Opening a URL without a nest now properly redirects you
- Reloading a page on the organization management menu now doesn’t redirect you to the home page anymore.
- The scrollbar in the Connection menu is behaving as you would expect now.
- A little hole in our bucket - some bucketing events not registering properly in rare cases - has been fixed.

##### Other
- Public apps cannot be removed/edited/added anymore, so this permission was redundant and is now removed.

### (28-05-2025) 4.25
Main features: Flight performance improvement

##### Other
- Due to some engine performance enhancements, actions and events now trigger considerably faster which results in a 3-5x performance improvement on most Flights.

### (27-05-2025) 4.24
Main features: Several bug fixes

##### Bug fixes
- Fixed a bug where Flight information was not synchronized properly when other Flights are in the process of being suspended.
- Fixed a bug where too many scheduled triggered Flights were triggering due to internal service switching.
- Fixed a bug where the organization mangement menu was not visible to admin users in some cases.
- Fixed a bug where a scheduled Flight was stuck in the 'waiting' state when an internal service was temporarily down.
- Fixed a bug where scheduled Flights didn't appear in the UI if they were started before other scheduled Flights were completed.
- Fixed a bug where internal keyvault calls failing caused a Connection to incorrectly appear as disconnected.
- Fixed a bug where a stopped Flight was still shown as 'Flying' in certain cases.

##### Other
- Improved the error message in OAuth Connection failures to be less generic.
- Improved the speed of redirect after connecting with 2FA.

### (13-05-2025) 4.23
Main features: Performance improvement preparation

##### Other
- Prepared for an upcoming release that will improve Flight performance.

### (25-04-2025) 4.22
Main features: Various minor improvements and bug fixes

##### Flights
- If a checkpoint subscription fails it now shows a detailed error message on the Flight page.
- If during a checkpoint invocation we receive a misconfiguration exception it is now displayed on the Flight page.

##### Bird Editor
- Updated the hours/minutes selector in the scheduled trigger to be more in line with other time selectors in the UI.
- Failure of subscription and unsubscripting of events on publish now shows more informative errors messages.

##### SDK
- The invocation context in the SDK now has the updated URL for Flights which includes the Nest.
- The `DefinitionIgnore` attribute now properly works on properties inside a collection.

##### Bug fixes
- Fixed a bug where dropdown values were not properly displayed in rare cases.
- Fixed a bug where the Blackbird icon was displayed in multiple dropdown values on Apps without an icon.
- Fixed a bug where the refresh token expiration retry mechanism showed a 401 page instead of proceeding normally.
- Fixed a bug where a certain Bird configuration didn't allow publishing.
- Fixed a wrong Flight state when a polling Bird is republished and suspended.
- Events are now properly unsubscribed when bucketing is enabled inside checkpoints.
- Fixed various instances where a Bird would get stuck due to niche configurations of loops and checkpoints.

##### Other
- Active polling instances are now canceled if the Bird is republished.

### (20-03-2025) 4.21
Main features: Front-end performance and usability.

##### General
- Updated Angular to version 19.2.0.
- Updated all URL path names to be consistent.
- Added the current nest ID in the URL path.
- Back buttons in the UI now have browser consistent behavior.
- All search filter parameters are now included in URL query parameters.
- Implemented caching for most loaded resources and a consistent loading state.
- Maintained scroll navigation on backward navigation.
- Added browser links to all navigation elements.
- Added UI interaction using keyboard for dropdowns (arrows) and input elements (tab).
- Changing nests does not redirect users to the homepage anymore.
- Fixed various bugs that caused front-end performance issues.
- Implemented optimistic updates for various actions.
- Implemented virtual scroll for apps page.

##### Bird editor
- Increased the timeout for dropdowns with dynamic loading.

### (06-03-2025) 4.20
Main features: Periodic connection verification.

##### Flight page
- Stretched input and output fields on the Chrome browser were fixed.
- The Flight overview sidebar is not overlapping the action input/outputs anymore.
- On Safari the [\>] button is now displayed on the actual row you're hovering on the All Flights page. 

##### Apps
- Connections now automatically verify themselves once a day and the 'connected' status is updated on the UI if it was found that this was changed.
- OAuth connections now also periodically automatically refresh their tokens depending on token lifetime.

##### Other
- Various minor issues and bugs were resolved.
- Phrase webhooks are now properly deleted after a checkpoint.

### (04-02-2025) 4.19
Main features: More Flight page improvements and custom app upload logic

##### Flight page
- Improved the visualization of large Flights (More than 16 mb of data).
- Fixed various small issues on the Flight page.
- Blackbird now automatically redirects to a Flight when clicking the 'Fly' button in the Bird editor.
- An animation is shown when a manual Flight is still queued.
- Various copy standardizations.

##### Custom apps
- Custom apps are now visible to all Nests, no matter in which Nest the user was when uploading the app.

### (07-01-2025) 4.18
Main features: Flight page rework

##### Flight page
- A new status has been added. `Waiting` significies that the Bird is in its queue and will take-off shortly.
- A flying Bird animation has been added to the Flight page that is flying through the process to signify where the Flight is.
- Live updating has been added to the Flight page. The Flight page always represents the current state of the Flight.
- The Flight details section has been updated with various visual enhancements
- Various bugs were fixed that previously lead to an inaccurate depiction of actual Flight data.
- You can now inspect every iteration of a loop seperately.
- The 'Stop Flight' button has been added, when clicked, only this Flight is stopped while others remain flying.
- A Flight list has been added as a collapsable sidebar. It includes all Flights of the same Bird you are viewing for easy navigating between different Flights.

##### Flight overview page
- Live updating has been added to the Flight overview page
- The table and filters have received a visual overhaul.
- An infinite scrolling mechanism has been added to the Flight overview page.

### (17-12-2024) 4.17
Main features: SAML, home page, and many smaller UI updates

##### Bird editor
- You can now select `Month's end` in the scheduled trigger Monthly setting.
- 'Inputs' have been renamed to 'Filters' for all events.
- The order of selectable variables have been reversed. Now, the top most variables in the dropdown will come from actions closer to where you are compared to from the top down.
- Dynamic input values now also have the option to still input a custom value. This is useful if for some reason the dropdown fails to load.

##### Other
- A help icon with links to documentation articles has been added on many pages of the app in the bottom left corner.
- Some buttons, tabs and inputs have gotten an improved hover and interaction state.
- Enterprise users can now request SAML based SSO to be provisioned.
- All users now have a randomly assigned Bird as their avatar.
- Invalid connections will now show a clearer error message.
- The home page has gotten a new look with articles, videos and quick links.

##### Bug fixes
- The 'magic wand' composable input button is now shown in the correct place on the Firefox browser.
- Checkpoint activation now properly succeeds if the Bird has unpublished changes.
- Delayed checkpoints on the same level with the same duration can now be published.

### (22-11-2024) 4.16

Main features: back-end Flight optimizations

##### Other

- Flights are now stored in a different structure which allows us to query them faster.

##### Bug fixes

- Outlook checkpoint events can now properly be activated.
- The after subscription event now works during checkpoint activation.

### (01-11-2024) 4.15

Main features: Friendlier and more informative error messages and SDK improvements

##### Bird editor
- You can now properly update numeric inputs to the number 0.
- Manual Birds are now also validated for completeness and missing inputs.
- The minimum interval for scheduled triggers is now 5 minutes.
- The push button is enabled after republishing a manual Bird.
- The split operator now behaves as it should.
- Keyboard navigation in array inputs now works.
- Convert and entity connection operators can now also be renamed.
- Event activation is now compatible with Outlook.
- If an action with the skip action option is placed within two loops that receive outputs from another action and are Nested inside each other.... the Bird is able to publish again :\).
- Tooltips properly close after moving your mouse very quickly.
- Discarding changes now also discards changes in static dropdowns.

##### Flights
- More friendly error messages are now displayed on the Flight page that indicate where in the system an error occured. This will help the user identify who is responsible.
- Some bucketing edge cases have been resolved.

##### SDK
- Events can now also output files.
- The filemanager upload method now resets the stream position.
- IApplication's name attribute has been deprecated.
- The tenant ID has been added to the invocation context.
- The data handler return type is now extendable for extra information.
- Connection definitions can now have static data source handlers.

##### API
- Suspended Birds can not be triggered through the API anymore.
- The Flight duration retrieved from the API is now more accurate.
- The 'IsPublished' variable retrieved from the API is now always correct.
- A retry policy does not cause the Flight failed webhook to be called multiple times anymore.

##### Other
- The import Bird modal now properly closes after uploading a JSON.
- Some texts that represented errors that were black are now red and properly displayed.
- Library outputs now don't include an extra \ if the library value contained a ".
- Spam clicking the 'add user' does not result in multiple users being added anymore.

### (14-10-2024) 4.14

Main features: Checkpoints 🎉

##### Bird editor
- You can now create _checkpoints_ in the Bird editor. Checkpoints in BlackBird workflows are control steps that enable Birds to pause and wait for different events before continuing their Flights. You can read more about checkpoints [here](/concepts/checkpoints).
- The trigger type selection has received a visual overhaul.
- The delay feature was moved from operators to a trigger type under checkpoint.

##### Other
- The rules and Nests dropdown when adding a user now also works when you were filtering the list.
- Birds containing Google and Microsoft related events can now properly be activated again after suspending.
- The polling information text is now properly aligned again.

### (24-09-2024) 4.13

Main features: Right click options, copy, paste and duplicate items.

##### Bird editor
- You can now right click on items in the Bird editor to show a context menu. You can also left click on the three dots.
- From the context menu you can now rename, cut, copy, duplicate and delete items.
- From the + icon in the Bird editor you can now paste copied items from your clipboard.
- The general Bird options menu has received a different look.
- BlackBird will now inform you to enable the clipboard in your browser if you haven't done so already.

##### Other
- The convert operator now more clearly displays if it's configured incorrectly.

### (18-09-2024) 4.12

Main features: Webhooks can immediatly trigger after subscription.

#### SDK
- A new interface (`IAfterSubscriptionWebhookEventHandler`) with the `OnWebhookSubscribedAsync()` method has been added. This method is called directly after subscription and can be used to start Flights at this point.

##### Bug fixes
- Polled Flights now properly display on the Flight page of new Nests.
- Enabling skip action will not prevent you from saving the Bird in certain cases anymore.
- Actions after a flow operator that is not triggered are now properly executed.

##### Other
- The file handling core has been updated to play more nicely with WorldServer.

### (10-09-2024) 4.11

Main features: Flow operator improvements and new composable input expressions.

##### Bird editor
- The "End Flight" operator is available everywhere in your Bird. The "End Flight" operator will stop the Flight when reached.
- The "End loop" operator will break out of the loop when reached. It is available in loops.
- "End Flight" and "End loop" also have an optional condition input, so that one is not always forced to put them into a decision.
- A user can now compose texts in any textual input that does not have an input handler (dropdown) defined, by pressing the magic wand button above their cursor.
- The modal opened when clicking on the "+" button in the Bird editor is redesigned.
- A friendly message is added to the compose operator to remind people they can now use the new text input expression feature.

##### Bug fixes
- The \ is no longer duplicated as \\ in custom inputs.
- A numeric list in a compose operator does no longer break a Bird.
- Resolved several issues around importing .csv files into custom libraries.
- Flights are now properly removed from our workflow engine on unsubscription even if Flights came in simultantiously.
- Missing Flights on the Flight page are now displayed.
- Resolved an edge case that didn't allow for the saving of Bird modifications.

### (26-08-2024) 4.10 

Main features: Custom connection buttons and organization creation automations.

##### SDK
- Added the ability to customize the HTML of connection modals by supporting HTML templates in the SDK.
- Multiple related dynamic inputs are now available in events.
- App names and descriptions are now also updated when a new app version is pushed.

##### Bug fixes
- Fixed an incorrect error being displayed when a file was too large.
- Nest user added and Nest user created API events are now correctly triggered.
- Creating a new connection now shows a loading icon.
- Retried actions now fail quicker once all retries are completed.

##### Other
- Default Nests are now created when a new organization is created.

### (09-08-2024) 4.9 

Main features: Automatic loop creation.

##### Bird editor
- The list of available values now also shows values that are part of an array. F.e. when you can input a file, but a list of files is outputed by a previous action, you can still select this value.
- When selecting a value that is coming from an array, a loop will automatically be added around the action.

### (07-08-2024) 4.8.1 

Main features: Webhook performance improvements.

##### Flights
- Webhooks now perform better given the recent addition of action limitations in our workflow engine.

### (05-08-2024) 4.8 

Main features: concurrent actions per organization limitations on multi-tenant environments.

##### Flights
- Flights now by default process 6 concurrent actions per organization. This amount can be adjusted for each tenant.
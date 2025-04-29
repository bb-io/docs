---
  title: Changelog
  description: A global overview of all changes made to the BlackBird core platform
---
### (25-04-2025) 4.22
Main features: Various minor improvements and bug fixes

##### Flights
- If a checkpoint subscription fails it now shows a detailed error message on the Flight page.
- If during a checkpoint invocation we receive a misconfiguration exception it is now displayed on the Flight page.

#### Bird Editor
- Updated the hours/minutes selector in the scheduled trigger to be more in line with other time selectors in the UI.
- Failure of subscription and unsubscripting of events on publish now shows more informative errors messages.

#### SDK
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
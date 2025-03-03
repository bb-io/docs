---
title: Errors
description: Learn how and which errors to throw in the SDK
sidebar:
  label: Errors
  order: 8
---

When your code throws an error, this error will stop the action and bird and display it to the user on the flights page.

There are 5 different types of errors that can be displayed on the flights page. 2 types of errors are thrown by the Blackbird core, the other 3 can be thrown by the app code. We will discuss each of these errors here and how to throw them.

## 1. Configuration error

![Configuration exception](~/assets/docs/conventions/configuration_error.png)

The purpose of this error is to notify the user that **they made a mistake** and **only they can resolve**. This typically happens with misconfigured variables, values or environments. Hence this error type is called a *configuration error*. Examples of configuration errors are:

- Sending the wrong file type.
- Sending values that appear wrong when parsing.
- Trying to exceed limits that are imposed by the connected app.
- When the connected app indicates an authentication or authorization issue (401).
- Creating e.g. projects in some type of illegal configuration.

Whenever the configuration error is thrown, the description **must tell the user how to resolve the issue**.

The configuration error can be thrown by throwing an exception of the class `PluginMisconfigurationException`. An example, taken from the memoQ app, is shown below:

```cs
try
{
    var result = projectService.Service.CreateProjectFromTemplate(newProject);
    var response = projectService.Service.GetProject(result.ProjectGuid);

    return new(response);

} catch (System.ServiceModel.FaultException ex)
{
    if (ex.Message == "Message.ResourceNotFound.ProjectTemplate")
        throw new PluginMisconfigurationException("The selected project template does not exist. Please select a different template.");
    else if (ex.Message == "An online project with the same name already exists.")
        throw new PluginMisconfigurationException("An online project with the same name already exists. Please configure a unique name.");
    throw;
}
```

> **Note**: This error is also typicall thrown when you verify if the input parameters are correct.

## 2. App not responding

![app not responding](~/assets/docs/conventions/not_responding_error.png)

The purpose of this error is to notify the user that **the connected app has issues that neither you** (the app developer), **nor the user can do anything about**. This is typically the case when the app throws an unexpected issue (500), or when the API throws an error that is intended for the user, rather than the app developer. Examples are:

- When the error code from an API request is 500 (as stated before).
- When the connected app is down (cannot be reached).
- When a certain rate limit is reached (that cannot be solved with wait and retry logic in the app).

The app not responding error can be thrown with the `PluginApplicationException` class.

> **Note**: This error can typically be handled in a base rest client class that handles most API calls.

## 3. Unexpected app issue

![unexpected_error](~/assets/docs/conventions/unexpected_error.png)

All other errors that are thrown by your app will appear as *unexpected errors*. The goal is to **minimize the amount of unexpected errors**. If an unexpected error is seen, it's the responsibility of the app developer to either handle the error in code, or throw any of the other 2 error types.

In short:

- If the neither the user nor the app developer can do anything -> `PluginApplicationException`.
- If the user needs to do something -> `PluginMisconfigurationException`.
- If the app developer needs to do something -> any other exception.

Some more guidelines:

- Catch standard HTTP errors. E.g. 401 Unauthorized should inform the user that their credentials may be wrong.
- If the endpoints give further information in their bodies (perhaps in some json), then this information should be passed to the user, instead of a plain “400 bad request”.
- Runtime errors should be avoided at any cost. Check for null references, empty arrays, etc. There should not be any warnings in your IDE.
- Don't forget to check if your JSON parsing is working correctly, and inform the user if there is a problem there.
- Check in advance if the input parameter the user is using are correct. If they aren't, inform the user how to correct them.

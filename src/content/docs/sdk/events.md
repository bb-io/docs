---
title: Defining Events
description: Learn how to define webhook and callback events in a Blackbird project.
sidebar:
  label: Events
  order: 5
---

Triggers are an important part of any workflow orchestrator. Blackbird allows custom events to be defined as triggers. These events usually correspond to webhooks in applications but they can also be callback URLs or they work using polling.

## Webhooks

Just like with actions, we use the `WebhookList` attribute to point Blackbirds towards our webhooks. You can split your webhooks into multiple files by providing multiple classes implementing the `WebhookList`. The `Webhook` attribute has to be added to each webhook handling method. Similarly to actions, they also take a name and description.

```cs
[WebhookList]
public class WebhookList : BaseInvocable
{

  // Just like with articles, we can define the display name and the description.
  [Webhook("On article published", typeof(ArticlePublishedHandler), Description = "On article published")]
  public async Task<WebhookResponse<ArticlePublishedResponse>> ArticlePublishedHandler(WebhookRequest webhookRequest,
    [WebhookParameter][Display("New status")][DataSource(typeof(ItemStatusDataHandler))] string? newStatus) // We can give an (optional, dynamic) parameter to webhooks as well
  {
    // Webhook handling methods usually start with deserializing the WebhookRequest
    var data = JsonConvert.DeserializeObject<ArticlePayloadTemplate<PublishEvent>>(webhookRequest.Body.ToString());
    if (data is null) { throw new InvalidCastException(nameof(webhookRequest.Body)); }

    // Return an instance of WebhookResponse
    return new WebhookResponse<ArticlePublishedResponse>
    {
      HttpResponseMessage = null,
      ReceivedWebhookRequestType = WebhookRequestType.Default,
      Result = new ArticlePublishedResponse
      {
        // Implement
      }
    };
  }
}
```

Some external systems can request additional data, for example, credentials, URL to send the event payload, etc., before sending the event payload. Therefore, we allow you to control the response to the system and if a flight needs to be started with specific credentials.

The Blackbird platform transfers all request parameters to the `WebhookRequest` object. This includes the HTTP method, additional headers, etc. You can use this to decide how to handle this request.

In the `WebhookResponse` class that you return, you can signal to Blackbird if this incoming request should trigger a bird or not. If you don't want to trigger a bird set `ReceivedWebhookRequestType` to `WebhookRequestType.Preflight`.

You can also control what message will be send back to the calling service by providing a `HttpResponseMessage`. If `null` is provided then Blackbird sends a `204 no content` response by default.

All the properties passed to the `Result` class implementation will be available in the bird editor. All `Display` attributes are possible here as well.

> **💡 Note**: The name of your webhook method cannot be changed, Blackbird would interpret it as a deleted and newly created event.

### Automatic subscription and unsubscription

To define automatic subscription and unsubscription to webhooks you can implement an instance of `IWebhookEventHandler` and attach it to the webhook as the second argument (see the example above `typeof(ArticlePublishedHandler)`).

The webhook event handler has two methods: `SubscribeAsync` and `UnsubscribeAsync`. There are triggered when a bird is published and unpublished/deleted respectively. Both should implement the API calls that create/delete the webhooks.

An example implementation from the Zendesk app is shown below:

```cs
public class BaseWebhookHandler : BaseInvocable, IWebhookEventHandler
{
  private IEnumerable<AuthenticationCredentialsProvider> Creds => InvocationContext.AuthenticationCredentialsProviders;

  private string SubscriptionEvent;
  private ZendeskClient Client { get; }

  public BaseWebhookHandler(InvocationContext invocationContext, string subEvent) : base(invocationContext)
  {
    SubscriptionEvent = subEvent;
    Client = new ZendeskClient(invocationContext);
  }

  public async Task SubscribeAsync(IEnumerable<AuthenticationCredentialsProvider> authenticationCredentialsProvider, Dictionary<string, string> values)
  {
    var request = new ZendeskRequest($"/api/v2/webhooks", Method.Post, Creds);
    request.AddNewtonJson(new
    {
      webhook = new
      {
        name = SubscriptionEvent,
        description = "",
        // The values["payloadUrl"] contains the URL that the other application can call when the event occurs
        endpoint = values["payloadUrl"],
        status = "active",
        http_method = "POST",
        request_format = "json",
        subscriptions = new[]
        {
            SubscriptionEvent
        }
      }
    });
    await Client.ExecuteAsync(request);
  }

  public async Task UnsubscribeAsync(IEnumerable<AuthenticationCredentialsProvider> authenticationCredentialsProvider, Dictionary<string, string> values)
  {
    // For Zendesk, first we have to fetch the ID of the webhook we created
    var getRequest = new ZendeskRequest($"/api/v2/webhooks?filter[name_contains]={SubscriptionEvent}", Method.Get, Creds);
    var webhooks = await Client.GetAsync<WebhooksListResponse>(getRequest);
    var webhookId = webhooks.Webhooks.First().Id;

    // Then we delete the webhook
    var deleteRequest = new ZendeskRequest($"/api/v2/webhooks/{webhookId}", Method.Delete, Creds);
    await Client.ExecuteAsync(deleteRequest);
  }
}
```

> **💡 Tip**: you can use the Bird ID from the invocation context to generate unique keys for each subscription if required.

### Handling checkpoint edge cases

Events can be created at the top of the bird to act as the trigger. However, they can also be used in the middle of a bird as a checkpoint. A common scenario for a checkpoint would be to _wait for a status to be changed to X_. Therein lies a problem: what if the status was already changed to _X_ before the subscription to the webhook was created?

In order to deal with this edge case we also allow you to implement `IAfterSubscriptionWebhookEventHandler<T>` on a Webhook handler class. This interface wants you to implement the `OnWebhookSubscribedAsync` method. This method is called the moment the subscription is made. You can use this method to already trigger the first event immediatly. In the case of checkpoints, if the event is called the webhook will unsubscribe afterwards, therefore resolving the edge case.

Here is the implementation of this interface taken from the Phrase TMS app:

```cs
public class ProjectStatusChangedHandler(
    InvocationContext invocationContext,
    [WebhookParameter] ProjectStatusChangedRequest projectStatusChangedRequest,
    [WebhookParameter] ProjectOptionalRequest projectOptionalRequest)
    : BaseWebhookHandler(invocationContext, SubscriptionEvent), IAfterSubscriptionWebhookEventHandler<ProjectDto>
{
    const string SubscriptionEvent = "PROJECT_STATUS_CHANGED";

    public async Task<AfterSubscriptionEventResponse<ProjectDto>> OnWebhookSubscribedAsync()
    {
        if (projectOptionalRequest.ProjectUId != null && projectStatusChangedRequest.Status != null)
        {
            var client = new PhraseTmsClient(InvocationContext.AuthenticationCredentialsProviders);
            var request = new PhraseTmsRequest($"/api2/v1/projects/{projectOptionalRequest.ProjectUId}", Method.Get,
                InvocationContext.AuthenticationCredentialsProviders);
            var project = await client.ExecuteWithHandling<ProjectDto>(request);
            
            if(project.Status == projectStatusChangedRequest.Status)
            {
                return new AfterSubscriptionEventResponse<ProjectDto>()
                {
                    Result = project
                };
            }
        }

        return null;
    }
}
``` 
> **💡 Note**: this event will only be triggered on subscription if the EXACT conditions are met: a specific project ID was provided and the status of that project is exactly that of the provided status.

## Additional webhook inputs

You can use the `[WebhookParameter]` attribute to add (optional) input values to your webhook event. F.e. if you want to allow your user to specify their event more narrowly. 

These input parameters may or may not be used in the actual subscription method. This can happen if your endpoint or the body of the subscription request takes certain extra parameters for the input. If an input parameter is actually used to create the subscription we recommend that you use `[WebhookParameter(true)]`. This optional boolean value tells Blackbird that the description depends on this input. If this input value is now changed, the bird will automatically resubscribe.

```cs
[Webhook("On issue status changed", typeof(IssueUpdatedHandler), 
    Description = "This webhook is triggered when issue status is changed.")]
public async Task<WebhookResponse<IssueResponse>> OnIssueStatusChanged(WebhookRequest request,
    [WebhookParameter] ProjectIdentifier project, [WebhookParameter] OptionalStatusInput status, [WebhookParameter] IssueInput issue)
{
    var payload = DeserializePayload(request);
    var statusItem = payload.Changelog.Items.FirstOrDefault(item => item.FieldId == "status");

    if (statusItem is null 
        || (project.ProjectKey is not null && !project.ProjectKey.Equals(payload.Issue.Fields.Project.Key))
        || (status.StatusId is not null && payload.Issue.Fields.Status.Id != status.StatusId)
        || (issue.IssueKey is not null && !issue.IssueKey.Equals(payload.Issue.Key)))
        return new WebhookResponse<IssueResponse>
        {
            HttpResponseMessage = new HttpResponseMessage(HttpStatusCode.OK),
            ReceivedWebhookRequestType = WebhookRequestType.Preflight
        };

    var issueResponse = CreateIssueResponse(payload);
    return issueResponse;
}
```

## Callbacks

Blackbird can also handle applications that work with callbacks instead of webhooks. Typically these URLs have to be manually configured. Implementation of this is quite simple and it works exactly the same as webhooks. The only difference is that if you don't define a `IWebhookEventHandler` in the webhook attribute, Blackbird will consider it a callback. In this case Blackbird will provide the user with a URL in the UI when they publish their bird.

The following method has no webhook handler (compare this to the webhooks defined above!)

```cs
[Webhook("On callback received", Description = "On callback received")]
public Task<WebhookResponse<CallbackPayload>> OnCallbackReceived(WebhookRequest webhookRequest)
    => HandlerWebhook<CallbackPayload>(webhookRequest);
```

This translates to:

![callback](~/assets/docs/callback.png)

> Tip: one can use the callback functionality to create "callable" birds as if Blackbird had its own API.

> **💡 Note**: If you create different birds with the same event and the same connection, then all of these birds will have the same URL. Blackbird has the assumption that it is still the same event that is being triggered and this allows us to optimize internally.

> **💡 Note**: If you suspend a bird, or if you change the event and republish the bird, the URL will change and would have to be reconfigured where the URL is applied.

Because callbacks require quite a bit of developer skill to use, **we recommend that you use polling instead of callbacks whenever you're developing apps that are intended for a broad audience**.

## Polling

Besides webhooks and callbacks, Blackbird's core can also take care of different polling scenarios. Instead of implementing a `WebhookList` with `Webhook` attributed methods, you can implement a `PollingEventList` with `PollingEvent` attributed methods.

```cs
[PollingEvent("On polled event", "This is triggered periodically, depending on the user's prefered input.")]
public async Task<PollingEventResponse<Memory, PollingResponse>> MyPollingEvent(PollingEventRequest<Memory> request, 
    [PollingEventParameter][Display("Some extra input")] string input)
{
  // [... implementation]
}
```

A polling event always takes a `PollingEventRequest<T>` as its first parameter (where `T` is a memory implementation). It can be followed with any number of `PollingEventParameter` attributed arguments that work similar to actions and webhooks. The return type of this method should always be of `PollingEventResponse<T, U>` where `T` is the memory implementation and `U` is the response that will be send as the output of the event in the bird.

A possible implementation of `PollingEventResponse<T, U>` can look like this:

```cs
  return new()
  {
      FlyBird = newBerries.Count() > 0, // if FlyBird is set to true, the polling will trigger an event (a flight is created or a checkpoint is passed)
      Memory = new()
      {
          AllBerries = response.Results // Update the memory
      },
      Result = new()
      {
          NewBerries = newBerries, // The content that will be sent to event when triggered in the bird
      }
  };
```

When a polling event is 'activated' (either by publishing a bird or when a flight arrives at a polling checkpoints) the polling event method will be called. If the returned object indicates that the event should be triggered `FlyBird` should be set to `true`. The `Result` will be the values that are passed to the bird.

While active, the polling event will be periodically called. This period is configurable by the user in the bird editor.

The memory implementation can be any class the user desires. This way, you can store any data into memory by setting it in the return value. When the polling event is called again, the memory can be retrieved from the `PollingEventRequest<T>`. With this mechanism, the developer can choose to implement e.g. a timestamp to indicate when the last poll was in order to filter a query for new items, store existing items in an array and compare it to new items, or store a certain property in a field and compare it to a current property to see if this property has changed.

A full example implementation:

```cs
[PollingEvent("On polled event", "This is triggered periodically, depending on the user's prefered input.")]
public async Task<PollingEventResponse<Memory, PollingResponse>> OnProjectCreated(PollingEventRequest<Memory> request, 
    [PollingEventParameter][Display("Project status")] string status)
{
    var berriesRequest = new AppRestRequest(ApiEndpoints.Berry, Method.Get, Creds);
    var response = await Client.ExecuteWithHandling<ListResponse<Berry>>(berriesRequest);

    // If the memory is null, this means that the bird was only just published. We should therefore establish the base case and not fly the bird.
    if (request.Memory is null)
    {
        return new()
        {
            FlyBird = false,
            Memory = new()
            {
                AllBerries = response.Results
            }
        };
    }
    // Note: if your event has event parameters then you probably want to structure your logic differently in order to handle cases for checkpoints.

    // Check if there are any new berries since the last poll
    var newBerries = response.Results.Where(x => !request.Memory.AllBerries.Select(y => y.Id).Contains(x.Id));

    return new()
    {
        FlyBird = newBerries.Count() > 0, // Only fly the bird if there are new berries
        Memory = new()
        {
            AllBerries = response.Results // Update the memory
        },
        Result = new()
        {
            NewBerries = newBerries, // The content that will be sent to event when triggered in the bird
        }
    };
}
```

> **💡 Note**: you can know if the polling event is on its first call if the memory is null.

> **💡 Note**: polling events are always called immediatly when activated. You can use this fact to create a baseline memory for future comparison, or to immediatly trigger a flight (or checkpoint continuance) if all conditions are already met.
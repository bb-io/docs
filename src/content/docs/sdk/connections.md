---
title: Defining Connections
description: Learn how to define how Blackbird should treat the connections of your app.
sidebar:
  label: Connections
  order: 3
---

> All code snippets on this page can also be viewed in the [Template app](https://github.com/bb-io/TemplateApp).

When a user wants to create a connection with your application, they will be presented a prompt. In this prompt, variable input fields can be given that correspond to values you need to save to establish a connection. Alternatively, you can tell Blackbird to use OAuth instead. In this article we'll explain how to implement the `IConnectionDefinition` interface, the `IConnectionValidator` interface, and how to use connections throughout the rest of your code.

> All credentials are safely stored in a key vault in Blackbird, meaning that all credentials are stored as key/value pairs.

## Connection properties

`IConnectionDefinition` is used to store the definitions of all the different fields that can be defined by the user in the connection interface. The `ConnectionPropertyGroups` property should implement a List of `ConnectionPropertyGroups`. Having credentials separated in different groups allows you to specify different authentication methods for a single app, if it uses different authentication methods for actions and webhooks.

In its most basic form, one group has a List of `ConnectionProperty`. The names of these properties will appear in the Blackbird UI when a new connection is made. You can alternatively use the `DisplayName` property to define a custom display of this input. You can also use the `Sensitive` property to define password inputs.

```cs
public IEnumerable<ConnectionPropertyGroup> ConnectionPropertyGroups => new List<ConnectionPropertyGroup>
{
    // API token auth example
    new()
    {
        Name = "Developer API token",
        AuthenticationType = ConnectionAuthenticationType.Undefined,

        // Specifying properties that we will need for authorization of the app
        ConnectionProperties = new List<ConnectionProperty>
        {
            new(CredsNames.ApiToken)
            {
                // Property user-friendly name that will be displayed on the UI
                DisplayName = "API token",

                // Setting this flag to true hides token input, replacing each its character with •
                Sensitive = true,
                // Description of the connection property,
                // perhaps with some guidelines on how to find it in the service
                Description = "You can create API token in your profile settings, on the API tab"
            }
        }
    }
};
```

Your connection property can also be a dropdown list of finite values. Use the `DataItems` property for this:

```cs
    new(CredsNames.Environment)
    {
        DisplayName = "Environment",
        Description = "Whether to use staging or production",
        DataItems = 
        [
            new (Urls.ProductionApi, "Production"),
            new (Urls.StagingApi, "Staging")
        ]
    }
```

Which will render the dropdown:

![dropdown](~/assets/docs/dropdown.png)

## Transforming connection properties into credentials

Remember that we store all connection properties as key/value pairs in a secure vault? The `CreateAuthorizationCredentialProviders` method converts the list of stored key/value pairs into an accessible list of credentials passed to actions and webhooks. This methods allows you to specify more information here depending on your implementation. In its most basic form this method simply converts key/value pairs into `AuthenticationCredentialsProvider`.

```cs
public IEnumerable<AuthenticationCredentialsProvider> CreateAuthorizationCredentialsProviders(
    Dictionary<string, string> values)
{
    // Processing API key credentials
    var apiKey = values.First(v => v.Key == CredsNames.ApiToken);
    yield return new AuthenticationCredentialsProvider(
        apiKey.Key,
        apiKey.Value
    );
}
```

If you don't need to make any transformations then you can simply implement this shorthand:

```cs
public IEnumerable<AuthenticationCredentialsProvider> CreateAuthorizationCredentialsProviders(
    Dictionary<string, string> values) => values.Select(x => new AuthenticationCredentialsProvider(x.Key, x.Value)).ToList();
```

## OAuth connections

To indicate that OAuth2 should be used in the connection screen, use the `ConnectionAuthenticationType.OAuth2` as the connection type. In this case you can still add additional connection properties if you need them.

When OAuth2 is used, the `CreateAuthorizationCredentialsProviders` method will also receive an extra key/value pair named _access_token_. This can then be converted into a `AuthenticationCredentialsProvider`.

```cs
public class ConnectionDefinition : IConnectionDefinition
{
    public IEnumerable<ConnectionPropertyGroup> ConnectionPropertyGroups => new List<ConnectionPropertyGroup>
    {
        // OAuth example
         new()
         {
             Name = "OAuth2",
             AuthenticationType = ConnectionAuthenticationType.OAuth2,
             ConnectionProperties = new List<ConnectionProperty>()
         },
    };

    public IEnumerable<AuthenticationCredentialsProvider> CreateAuthorizationCredentialsProviders(
        Dictionary<string, string> values)
    {
        // Processing OAuth credentials
        var accessToken = values.First(v => v.Key == CredsNames.AccessToken);
        yield return new AuthenticationCredentialsProvider(
            "Authorization",
            $"Bearer {accessToken.Value}"
        );
    }
}
```

### Defining OAuth2 flows

Blackbird can support apps that require OAuth2 connections. Currently Blackbird supports the following standard flows:

- Authorization code (Section 1.3.1 of [RFC](https://www.ietf.org/rfc/rfc6749.txt) )
- Implicit grant (Section 1.3.2 of [RFC](https://www.ietf.org/rfc/rfc6749.txt) )

To get started, implement interfaces for `IOAuth2AuthorizeService` and `IOAuth2TokenService`.

Then add references to these interfaces in your `IApplication`.

When the OAuth2 flow is started, Blackbird calls instances of the `IOAuth2AuthorizeService` and `IOAuth2TokenService` using the `GetInstance<T>` method of the `IApplication` interface. You should implement logic to return instances of these interfaces.

Let's see a simple implementation example:

```cs
public class SampleApplication : IApplication
{
  private readonly Dictionary<Type, object> _container;

  public SampleApplication()
  {
    _container = LoadTypes();
  }

  public T GetInsance<T>()
  {
    return _container[typeof(T)] as T;
  }

  private Dictionary<Type, object> LoadTypes()
  {
    new Dictionary<Type, object>
    {
      new { IOAuth2AuthorizeService, new OAuth2AuthorizeService() },
      new { IOAuth2TokenService, new OAuth2TokenService() }
    }
  }
}
```

The `IOAuth2AuthorizeService` generates the authentication URL based on the connection and some injected values by Blackbird. The following example uses the implicit grant flow.

```cs
public class OAuth2AuthorizeService : BaseInvocable, IOAuth2AuthorizeService
{
    public OAuth2AuthorizeService(InvocationContext invocationContext) : base(invocationContext)
    {
    }

    public string GetAuthorizationUrl(Dictionary<string, string> values)
    {
        var parameters = new Dictionary<string, string>
        {
            { "client_id",  ApplicationConstants.ClientId},
            { "redirect_uri", InvocationContext.UriInfo.ImplicitGrantRedirectUri.ToString()},
            { "scope", ApplicationConstants.Scope },
            { "state", values["state"] }
        };

        // Creating url with query parameters
        return Urls.Authorize.WithQuery(parameters);
    }
}
```

The `IOAuth2TokenService` interface defines how to interpret the redirect back to Blackbird and how to store/deal with the given tokens. The tokens thare are passed as a dictionary to Blackbird after the `RequestToken` method is invoked are stored in the key/value vault. Later, they can be used by the `CreateAuthorizationCredentialProviders` method. The `IOAuth2TokenService` implements the following actions:

- `IsRefreshToken` should return true if the current token stored in the key/value vault needs to be refreshed.
- `RequestToken` is given the state, code and other values passed to the redirect URL when a user creates their OAuth connection. Use it to retrieve the right token. The returned dictionary is stored in the key/value vault.
- `RefreshToken` is called when `IsRefreshToken` is true.
- `RevokeToken` is called when the user removes their connection.

The complete example can be found [here](https://github.com/bb-io/TemplateApp/blob/master/TemplateApp/Connections/OAuth/OAuth2TokenService.cs).

## Validating connections

We want to validate that the provided credentials are indeed correct, and give direct feedback to the user in the Blackbird UI. Validating the connection is the responsibility of the `IConnectionValidator` interface. `ValidateConnection` method should return an object indicating if the connection is valid and optionally the error message that will be displayed.

```cs
public class ConnectionValidator : IConnectionValidator
{
    private static readonly AppRestClient Client = new();

    public async ValueTask<ConnectionValidationResponse> ValidateConnection(
        IEnumerable<AuthenticationCredentialsProvider> authProviders, CancellationToken cancellationToken)
    {
        var request = new AppRestRequest(ApiEndpoints.Berry, Method.Get, authProviders);

        try
        {
            await Client.ExecuteWithHandling<ListResponse<Berry>>(request);

            // If ExecuteWithHandling did not throw an exception
            // then request was successful and credentials are valid
            return new()
            {
                IsValid = true
            };
        }
        catch (Exception ex)
        {
            // If Exception was thrown, we mark connection credentials as invalid
            // and pass the exception message in the response
            return new()
            {
                IsValid = false,
                Message = ex.Message
            };
        }
    }
}
```

After having all of this setup, Blackbird can now display the connection form to the user.

![connection](~/assets/docs/connection_modal.png)

## Accessing credentials in actions and events

As stated earlier, you have access to the credentials stored in the key/value vault in your actions and events. The credentials are given to the `InvocationContext` object that is injected into any class inheriting from `BaseInocable` among other context variables. Use the `InvocationContext.AuthenticationCredentialsProviders` property to retrieve the key/value pairs as they are returned from the `CreateAuthorizationCredentialsProviders` method in `ConnectionDefinition`.

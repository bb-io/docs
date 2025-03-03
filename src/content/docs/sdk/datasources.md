---
title: Data Sources
description: Learn how to define static dynamic data sources for your action and event inputs.
sidebar:
  label: Data Sources
  order: 6
---

So far we have learned how to define your connections, actions and events. The combination of these can create a full-fletched usable app. However, your users will most likely still have to 'hard-code' a lot of values like language codes, entity IDs, enumerated statusses, etc. That's why we created _Data sources_. Data sources allow you to specify for certain input paremeters (on both actions and events) what data Blackbird can display in a dropdown. This saves the user time copying and pasting! There are two types of data sources: _static data sources_ and _dynamic data sources_. Static data sources allow you to define a finite list of values that never change. An example of this could be different statusses a project can be in. Dynamic data sources allow you to fetch dynamic content based on the connection of the user. An example of this would be a list of existing projects. We're first going to discuss how dynamic data sources work and then we'll look at static data sources.

## Dynamic data sources

Let's take a look at the anatomy of a dynamic data source:

```cs
/// <summary>
/// Data source handler for asynchronous dynamic inputs.
/// It provides static data on the UI, so that user can choose values from the dropdown instead of printing it manually.
/// </summary>
public class AsyncDataSourceHandler : AppInvocable, IAsyncDataSourceItemHandler
{
    public AsyncDataSourceHandler(InvocationContext invocationContext) : base(invocationContext)
    {
    }

    /// <summary>
    /// Fetches data for the dynamic inputs and returns it as a list of options.
    /// </summary>
    public async Task<IEnumerable<DataSourceItem>> GetDataAsync(DataSourceContext context, CancellationToken cancellationToken)
    {
        var request = new AppRestRequest(ApiEndpoints.Berry, Method.Get, Creds);
        var response = await Client.ExecuteWithHandling<ListResponse<Berry>>(request);

        return response.Results
            // We need to pay attention to SearchString in the context
            // So that we return only values that match user search request
            .Where(x => context.SearchString == null ||
                        x.Name.Contains(context.SearchString, StringComparison.OrdinalIgnoreCase))
            .Select(x => new DataSourceItem(x.Id, x.Name));
    }
}
```

We see that the data source 'handler' class can inherit from `BaseInvocable`, meaning that you have complete access to the context (including credentials).

The `DataSourceContext.SearchString` provides the typed in search string by the user. You can use this to filter your result.

You should return a `IEnumerable<DataSourceItem>` where the `value` argument of a `DataSourceItem` represents the value that will be "filled in" e.g. the ID of a certain status or entity. The second argument is the displayed name.

![connection](~/assets/docs/dynamic_input.png)

### Advanced context

You can also get even more context than just the search string. What if you want to know the values of some other fields that were selected in an action? You can pass an `[ActionParameter]` to the constructor in order to see the other fields the user filled in.

```cs
public class DataSourceHandlerWithParameters : AppInvocable, IAsyncDataSourceItemHandler
{
    // Saving input model to use it while fetching data
    private readonly DataSourceWithParametersRequest _request;

    protected DataSourceHandlerWithParameters(InvocationContext invocationContext,
        // Specifying the same model where DataSourceHandlerWithParameters was added
        [ActionParameter] DataSourceWithParametersRequest request) : base(invocationContext)
    {
        _request = request;
    }

    public async Task<IEnumerable<DataSourceItem>> GetDataAsync(DataSourceContext context, CancellationToken cancellationToken)
    {
        // Throwing error if parameters are not specified
        if (string.IsNullOrWhiteSpace(_request.Url))
            throw new("You should input URL first");

        if (string.IsNullOrWhiteSpace(_request.EntityId))
            throw new("You should input Entity ID first");

        // Fetching data based on provided parameters
        var request = new AppRestRequest($"{_request.Url}/{_request.EntityId}", Method.Get, Creds);
        return await Client.ExecuteWithHandling<IEnumerable<DataSourceItem>>(request);
    }
}
```

### Usage

Simply add the `[DataSource]` attribute to any `string` or `IEnumerable<string>` typed input value, and the free typing field will turn into a dropdown!

```cs
public class GetBerryRequest
{
    // Properties must have display attributes which contain user-friendly name of variable
    [Display("Berry name", Description = "The name of the berry")]
    // Applying data source handler to the property
    [DataSource(typeof(AsyncDataSourceHandler))]
    public string BerryName { get; set; }
}
```

## Static data sources

Static data sources are very similar to dynamic data sources. The main difference in usage is the interface and attributes you have to use to implement then. Secondly, you have to be aware that you cannot get a connection context. You should instead simply return a pre-defined `IEnumerable<DataSourceItem>`.

Blackbird compiles these static data sources on build time, meaning that when someone uses your app, they won't see a loading spinner when clicking on a static dropdown. Instead the values will be displayed instantly.

> If your app does not properly upload to Blackbird, it could be because you have duplicate values in your static data sources.

Static data source class:

```cs
public class StaticDataSourceHandler : IStaticDataSourceItemHandler
{
    public IEnumerable<DataSourceItem> GetData() =>
    [
        new("water_electric", "Water/Electric"),
        new("fighting_psychic", "Fighting/Psychic"),
        new("grass_flying", "Grass/Flying"),
    ];
}
```

And its usage as an attribute:

```cs
    [Display("Pokemon type")]
    [StaticDataSource(typeof(StaticDataSourceHandler))]
    public string PokemonType { get; set; }
```

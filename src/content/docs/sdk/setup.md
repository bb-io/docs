---
title: Setting Up a Blackbird Project
description: Learn how to create a Blackbird project using the Blackbird SDK.
sidebar:
  label: Project Setup & Cloning Apps
  order: 1
---

Use your favorite IDE to create a .NET class library to start your project. Then, install our SDK using NuGet. You can find a link to our SDK [here](https://www.nuget.org/packages/Blackbird.Applications.Sdk.Common) or search 'Blackbird' in the NuGet package manager. This guide shows you the steps in Visual Studio 2022 for Windows. Alternatively, you can create a Blackbird app from a template.

## Prerequisites

- Git installed on your local machine. For this tutorial we assume you have a basic understanding of Git (if starting from a template).
- Install Visual Studio for Windows with the .NET desktop development workload. You can [download](https://visualstudio.microsoft.com/) and install the 2022 Community edition for free, or use the Professional or Enterprise edition. Alternatively you can use any other .NET IDE environment like Rider or VS Code with the necessary plugins.
- .NET 8 (or higher) installed on your machine.

## From scratch

### Create a project

1. In Visual Studio, select _File > New > Project_.
2. In the _Create a new project_ window, enter _Class Library_ in the search box and select _C#_ and in the dropdown lists. In the resulting list of project templates, select _Class Library_ and then select _Next_.
3. In the _Configure your new project_ window, update the _Project name_ and the _Solution name_, and then select _Next_.
4. Select .NET 8.0 (or the latest version) for _Framework_ in the _Additional information window_, then select _Create_.

Visual Studio creates the project, and it appears in the Solution Explorer.

### Add the SDK

Depending on your project format, the installation of a NuGet package records the dependency in either your project file or a _packages.config_ file. For more information, see Package consumption workflow.

To use the NuGet Package Manager to install the `Blackbird.Applications.Sdk.Common` package in Visual Studio, follow these steps:

1. Select _Project > Manage NuGet Packages_.
2. On the _NuGet Package Manager_ page, choose _nuget.org_ as the _Package source_.
3. From the _Browse_ tab, search for _Blackbird.Applications.Sdk.Common_, select `Blackbird.Applications.Sdk.Common` in the list, and then select _Install_.
4. When you are prompted to verify the installation, select _OK_.

![nuget](~/assets/docs/nuget.png)

## From a template

Clone the [template app repository](https://github.com/bb-io/TemplateApp) from the command line using:

```bash
git clone https://github.com/bb-io/TemplateApp.git
```

Open the solution file and explore the project

## Cloning from an existing app

Clone the repository of the app you want to modify. You can find all Blackbird's repositories [here](https://github.com/orgs/bb-io/repositories).

When deploying your modifications, you do so in a custom app. Please see the [deployment guide](/sdk/deploying). Note that you also need to change the `Product` and the `AssemblyName` variables in the metadata strcuture. See below.

## Metadata structure

Blackbird uses properties defined in the `.csproj` file to populate metadata fields. For most custom apps, only the Version and AssemblyName are relevant (the other properties are defined in the UI). When uploading a newer version of an existing app, make sure the version number is higher.

![nuget](~/assets/docs/csproj.png)

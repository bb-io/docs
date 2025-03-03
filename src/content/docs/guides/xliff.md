---
title: Working With XLIFF
description: XLIFF is a cornerstone of translation automation, in this guide we'll show you some examples of how you can use XLIFF in Blackbird.
sidebar:
  label: Working With XLIFF
  order: 4
  hidden: false
---

XLIFF (XML Localization Interchange File Format) is the beacon of standardization in the language and localization industry, allowing for the seamless exchange of translation data. It organizes content into translation units, each comprising a source segment and its corresponding target translation.

![Image of XLIFF](~/assets/guides/xliff/ImageOfXliff.png)

While most Translation Management Systems (TMS) and Computer-Assisted Translation (CAT) tools effortlessly handle XLIFF files, some other tools may not be as file-friendly. However, in the realm of Blackbird, where interoperability reigns supreme, we've unfurled new wings—er, actions—to make XLIFFs soar even in non-file-friendly apps.

### What's Hatched?

In our latest release, we've introduced new actions that allow XLIFF files to gracefully dance through apps like OpenAI, DeepL, ModernMT, Anthropic, TAUS, and ModelFront, which typically prefer text over files.

### Why Choose XLIFF?

Why not? It's the universal language of localization! Plus, with our newly integrated apps, Okapi & Matecat filters, converting between various file formats and XLIFF has never been smoother. This means your flock of apps can now join forces in a harmonious flight, expanding the horizons of what's possible with Blackbird.

## File conversion apps

### Okapi

With the [Okapi](https://docs.blackbird.io/apps/okapi/) Framework on board, converting files to and from XLIFF is a breeze. Our two new actions, "Convert file to XLIFF" and its trusty counterpart "Convert XLIFF to file," pave the way for seamless file format transformations. Check out the supported file types for these actions [here](https://www.okapiframework.org/wiki/index.php?title=Filters) and let your files spread their wings.

### Matecat filters

Another powerful app to convert to and from XLIFF is [Matecat filters](https://docs.blackbird.io/apps/matecatfilters/) as it allows you to extract all the translatable contents from any suported file format into a convenient XLIFF file. Once the XLIFF is translated, you can use filters again to get back your file in the target language with perfectly preserved formatting.

## LLMs

### OpenAI

Introducing our advanced actions for XLIFF file processing! Blackbird offers three convinient actions to leverage the power of AI for enhancing your translation workflow:

- Process XLIFF File: This action takes an XLIFF file as input, meticulously dissecting all source segments. You can provide specific instructions via the `Prompt` input, or let [OpenAI](https://docs.blackbird.io/apps/openai/) translate by default. The results are seamlessly inserted into the target segments, ensuring a fully localized XLIFF file as output. Glossary support is available to maintain terminology consistency.
- Post-edit XLIFF: This action goes a step further by processing both the source and target segments. It refines the existing translations, making necessary edits to improve overall quality. With the option to incorporate glossaries, it ensures that your translations are not only accurate but also consistent with your preferred terminology.
- Get Quality Scores for XLIFF file: This action evaluates the quality of your translations, assigning a score to each translation unit and an overall score at file level. Find more details about this action [here](https://docs.blackbird.io/apps/openai/#xliff-operations).

### Anthropic

Similar actions have been added to [Anthropic](https://docs.blackbird.io/apps/anthropic/#xliff-actions) so that you can experiment with the model of your choice. 
Actions:

- Process XLIFF
- Post-edit XLIFF file
- Get Quality Scores for XLIFF file 

## Machine Translation

### DeepL

While [DeepL](https://docs.blackbird.io/apps/deepl/) supports several [file types](https://developers.deepl.com/docs/api-reference/document), only version 2.1 is an accepted input when it comes to XLIFF files. We have now added more behind the scenes magic to bridge this gap so that you are able to get your 1.2 XLIFF files translated through DeepL, as well as any other file previously converted into XLIFF 1.2 through our Okapi or Matecat filters actions.

### ModernMT

Our [ModernMT](https://docs.blackbird.io/apps/modernmt/) app has also been adapted so that XLIFF files can be processed either to translate whole files or to get a quality estimate. Files coming from either Okapi or Matecat filters are processed flawlessly. 

## Quality Estimate Apps ([TAUS](https://docs.blackbird.io/apps/taus/), ModernMT, OpenAI, Anthropic & [ModelFront](https://docs.blackbird.io/apps/modelfront/))

Our newest Blackbird actions allow for a bird's-eye view of your XLIFF's quality. By calculating the quality score of each segment within the XLIFF and returning an aggregated number that gives us an idea of the overall quality in the file. This was previously reserved for single segments only. Additionally, all translation units get appeneded with their individual score which is added to the extradata attribute in the XLIFF file.

![Average Scores as output](~/assets/guides/xliff/AverageScore.png)

![Image of extradata and scores](~/assets/guides/xliff/Imageofextradataandscores.png)

Optionally, Threshold, New Target State and Condition input parameters can be set to the Blackbird action to change the target state value of segments meeting the desired criteria. This means that you can signal properly translated segments and block them when importing the XLIFF file into a TMS for human revision, saving time and money and focusing efforts in those segments that actually need editing.

Example

Setting the optional input values as shown in the image below will result in all segments with a score above 0.9 to have their target state values updated to “final”. When importing these XLIFF files into TMS tools, a setting can be usually added to lock segments with a specific target value ("final" in this case), so that translators can focus on and edit only the segments of lower quality.

![Optional Input](~/assets/guides/xliff/optionalinput.png)

![Updated Target State](~/assets/guides/xliff/UpdatedTargetState.png)

## Behold, a majestic bird in action!

While the new actions on its own add great value and enable new possibilities, when chained, they become even more powerful. Below is an example bird that takes a .docx file as input, the file is then converted into XLIFF for interoperability purposes, OpenAI is then used to translate the file into the target language. After this, TAUS is used to determine the quality of said translations and a decision operator is used to define the next steps for the file: if the average quality score is above the defined 0.95 threshold, the XLIFF is then converted into a translated .docx and delivered as final. Otherwise, if the average score is below 0.95, the file is imported into a TMS for further human editing. This ensures that only files that actually need a human in the loop are uploaded into the TMS, while quality translations are immediately delivered back.

![screenshot of bird](~/assets/guides/xliff/XliffSampleBird.png)

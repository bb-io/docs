import fs from "fs";
import { Octokit } from "octokit";
import * as dotenv from "dotenv";
dotenv.config();

const auth = process.env.GITHUB_ACCESS_TOKEN;
const octokit = new Octokit({ auth: auth });

const docs_comment_begin = "<!-- begin docs -->";
const docs_comment_end = "<!-- end docs -->";

// Add altered_names here to turn repo names into nice names, f.e: HubspotCRM -> Hubspot CRM
const altered_names = {
  HubspotCRM: "Hubspot CRM",
  Hubspot: "Hubspot CMS",
  MicrosoftTeams: "Microsoft Teams",
  MicrosoftOutlook: "Microsoft 365 Email (Outlook)",
  HuggingFace: "Hugging Face",
  "Phrase-TMS": "Phrase",
  LanguageWeaver: "Language Weaver",
  AmazonBedrock: "Amazon Bedrock",
  AmazonComprehend: "Amazon Comprehend",
  AmazonTranslate: "Amazon Translate",
  AmazonWorkDocs: "Amazon WorkDocs",
  AmazonTextract: "Amazon Textract",
  AmazonS3: "Amazon S3",
  MicrosoftSharePoint: "Microsoft SharePoint",
  AmazonPolly: "Amazon Polly",
  GoogleAnalytics: "Google Analytics",
  GoogleDrive: "Google Drive",
  GoogleSheets: "Google Sheets",
  GoogleTranslate: "Google Translate",
  LanguageCloud: "Trados",
  "QuickBooks-Online": "QuickBooks Online",
  AzureImageAnalysis: "Microsoft Image Analysis",
  MicrosoftOneDrive: "Microsoft OneDrive",
  SalesforceCRM: "Salesforce CRM",
  SalesforceKnowledge: "Salesforce Knowledge",
  Twitter: "X",
  Acclaro: "My Acclaro",
  MicrosoftImageAnalysis: "Azure Image Analysis",
  MicrosoftOpenAI: "Azure OpenAI",
  MicrosoftExcel: "Microsoft Excel",
  MicrosoftAILanguage: "Azure AI Language",
  MicrosoftTranslator: "Azure AI Translator",
  MicrosoftForms: "Microsoft Forms",
  AmazonRedshift: "Amazon Redshift",
  MemoQCMS: "MemoQ CMS",
  BlackbirdPrompts: "Blackbird Prompts",
  UnbabelTranslation: "Unbabel Translation",
  UnbabelProjects: "Unbabel Projects",
  AIUtilities: "Blackbird Prompts",
  ContentQuo: "ContentQuo Evaluate",
  GoogleVertexAI: "Google Gemini AI",
  Rss: "RSS API",
  GlobalLinkNow: "GlobalLink Now",
  BWX: "Bureau Works",
  BureauWorks: "Bureau Works",
  MatecatFilters: "Matecat Filters",
  MistralAI: "Mistral AI",
  Magento: "Adobe Commerce - Magento",
  Microsoft365Calendar: "Microsoft 365 Calendar",
  Microsoft365People: "Microsoft 365 People",
  "XTRF-Customer-portal": "XTRF Customer Portal",
  "X.AI": "xAI",
  SitecoreXmCloud: "Sitecore XM Cloud",
  SitecoreXp: "Sitecore XP",
  Sitecore: "Sitecore XP",
  PhraseLanguageAI: "Phrase Language AI",
  MemoQResources: "MemoQ Resources",
  Utilities: "Blackbird Utilities",
  RePurpose: "Blackbird Repurpose",
  AdobeExperienceManager: "AEM",
  Blackbird: "Blackbird Service API",
  PhraseStrings: "Phrase Strings",
  AdobeExperienceManagerOnPremise: "AEM On Premise",
};

const skip_repos = ["docs", "template-repo", "NotionOAuth", "LanguageWire", "CraftCMS"];

const all_repos = await octokit.paginate("GET /orgs/{org}/repos", {
  org: "bb-io",
  per_page: 100,
});

await all_repos
  .filter((x) => !x.private)
  .filter((x) => !skip_repos.includes(x.name))
  .forEach(async ({ name, default_branch, html_url }) => {
    try {
      const { data: raw_readme } = await octokit.rest.repos.getContent({
        mediaType: {
          format: "raw",
        },
        owner: "bb-io",
        repo: name,
        path: "README.md",
      });

      if (!raw_readme.includes(docs_comment_begin)) return;

      const docs_section = raw_readme.substring(
        raw_readme.indexOf(docs_comment_begin) + docs_comment_begin.length + 1,
        raw_readme.lastIndexOf(docs_comment_end)
      );

      if (!docs_section) return;

      const friendly_name = name in altered_names ? altered_names[name] : name;

      console.log(name);

      const frontmatter = `---
  title: ${friendly_name}
  description: The ${friendly_name} Blackbird app
---
import { LinkCard } from "@astrojs/starlight/components";

<LinkCard title="View on Github" target="_blank" href="${html_url}" icon="github" />
`;

      const regex = /!\[[^\]]*\]\((?<filename>(?!http).*?)(?=\"|\))\)/g;
      const md_content =
        frontmatter +
        docs_section
          .replace(regex, (a, b) =>
            a.replace(b, `https://raw.githubusercontent.com/bb-io/${name}/${default_branch}/${b}`)
          )
          .replace("</br>", "")
          .replace("<br>", "");

      fs.writeFile(`./src/content/docs/apps/${friendly_name}.mdx`, md_content, function (err) {
        if (err) throw err;
      });
    } catch {}
  });

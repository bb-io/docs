import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightOpenAPI, { openAPISidebarGroups } from "starlight-openapi";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Blackbird docs",
      customCss: ["./src/styles/custom.css"],
      logo: {
        light: "./src/assets/light-logo.svg",
        dark: "./src/assets/dark-logo.svg",
        replacesTitle: true,
      },
      social: {
        github: "https://github.com/bb-io",
      },
      plugins: [
        // Generate the OpenAPI documentation pages.
        starlightOpenAPI([
          {
            base: "api",
            label: "Blacbird API",
            schema: "./schemas/openapi.json",
          },
        ]),
      ],
      sidebar: [
        {
          label: "Learning to fly",
          autogenerate: { directory: "learning-to-fly" },
        },
        {
          label: "Concepts",
          autogenerate: { directory: "concepts" },
        },
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        {
          label: "Blueprints",
          autogenerate: { directory: "blueprints" },
        },
        {
          label: "SDK",
          autogenerate: { directory: "sdk" },
        },
        {
          label: "Eggs",
          autogenerate: { directory: "eggs" },
        },
        {
          label: "More",
          autogenerate: { directory: "more" },
        },
        ...openAPISidebarGroups,
        {
          label: "Apps",
          autogenerate: { directory: "apps" },
        },
      ],
    }),
  ],
});

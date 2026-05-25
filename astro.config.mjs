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
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/bb-io",
        },
      ],
      plugins: [
        // Generate the OpenAPI documentation pages.
        starlightOpenAPI([
          {
            base: "api",
            label: "Blacbird API",
            schema: "./public/api/openapi.json",
          },
        ]),
      ],
      sidebar: [
        {
          label: "Learning to fly",
          items: [{ autogenerate: { directory: "learning-to-fly" } }],
        },
        {
          label: "Concepts",
          items: [{ autogenerate: { directory: "concepts" } }],
        },
        {
          label: "Guides",
          items: [{ autogenerate: { directory: "guides" } }],
        },
        {
          label: "Blacklake",
          items: [{ autogenerate: { directory: "blacklake" } }],
        },
        {
          label: "Blueprints",
          items: [{ autogenerate: { directory: "blueprints" } }],
        },
        {
          label: "SDK",
          items: [{ autogenerate: { directory: "sdk" } }],
        },
        {
          label: "More",
          items: [{ autogenerate: { directory: "more" } }],
        },
        ...openAPISidebarGroups,
        {
          label: "Apps",
          items: [{ autogenerate: { directory: "apps" } }],
        },
      ],
    }),
  ],
});

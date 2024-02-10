import type { MetaFunction } from "@remix-run/node";
import { siteConfig } from "~/utils/site-config";

export const meta: MetaFunction = () => {
  return [
    {
      title: siteConfig["title"],
    },
    {
      description: siteConfig["description"],
    },
    {
      property: "og:title",
      content: siteConfig["title"],
    },
    {
      property: "og:description",
      content: siteConfig["description"],
    },
    {
      property: "og:url",
      content: siteConfig["url"],
    },
    {
      property: "og:site_name",
      content: siteConfig["title"],
    },
    {
      property: "og:locale",
      content: "en_US",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary",
    },
    {
      name: "twitter:creator",
      content: "@adeen_zeeshan",
    },
    {
      name: "twitter:title",
      content: siteConfig["title"],
    },
    {
      name: "twitter:description",
      content: siteConfig["description"],
    },
  ];
};

import { Icons } from "@/components/icons";
import { siteConfig } from "@/data/site";

export const DATA = {
  url: siteConfig.url,
  lastUpdated: siteConfig.lastUpdated,
  name: "Yiyang Niu",
  description: "Personal Academic Homepage",
  chinese: {
    name: "Yiyang Niu",
  },
  navbar: [
    { href: "/", icon: Icons.home, label: "Home" },
    { href: "/blog", icon: Icons.notebook, label: "Blog" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/niuyiyang1030",
        icon: Icons.github,
        footer: true,
      },
    },
  },
} as const;

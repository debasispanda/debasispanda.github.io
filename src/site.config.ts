import type { SiteConfig } from "@/types";
import {
  EnvelopeIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  RssIcon,
  XLogoIcon,
  WhatsappLogoIcon,
  TelegramLogoIcon,
  FacebookLogoIcon,
} from "@phosphor-icons/react";

const config: SiteConfig = {
  site: "https://debasispanda.github.io",
  subTitle: "Developer, Traveller, Blogger",
  // The name of your site, used in the title and for SEO.
  title: "Debasis Panda",
  // The description of your site, used for SEO and RSS feed.
  description:
    "I am Debasis Panda and I am working as a fullstack developer and have expertise in frontend technologies.",
  // The author of the site, used in the footer, SEO, and RSS feed.
  author: "Debasis Panda",
  // Keywords for SEO, used in the meta tags.
  tags: ["Astro", "React", "Fullstack Development", "Github Pages"],
  // Font imported from @fontsource or elsewhere, used for the entire site.
  // To change this see src/styles/global.css and import a different font.
  font: "mono",
  // For pagination, the number of posts to display per page.
  // The homepage will display half this number in the "Latest Posts" section.
  pageSize: 6,
  defaultBannerUrl: "/default-banner.png",
  navLinks: [
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Posts",
      url: "/posts",
    },
    {
      name: "Tags",
      url: "/tags",
    },
  ],
  socialLinks: [
    {
      name: "Github",
      url: "https://github.com/debasispanda",
      icon: GithubLogoIcon,
    },
    {
      name: "X",
      url: "https://www.x.com/imdebasispanda",
      icon: XLogoIcon,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/imdebasispanda",
      icon: LinkedinLogoIcon,
    },
    {
      name: "Email",
      url: "mailto:imdebasispanda@gmail.com",
      icon: EnvelopeIcon,
    },
    {
      name: "Rss",
      url: "/rss.xml",
      icon: RssIcon,
    },
  ],
  shareLinks: [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/shareArticle",
      title: `Share this post via LinkedIn`,
      icon: LinkedinLogoIcon,
    },
    {
      name: "WhatsApp",
      url: "https://wa.me",
      title: `Share this post via WhatsApp`,
      icon: WhatsappLogoIcon,
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/sharer.php",
      title: `Share this post on Facebook`,
      icon: FacebookLogoIcon,
    },
    {
      name: "X",
      url: "https://x.com/intent/post",
      title: `Share this post on X`,
      icon: XLogoIcon,
    },
    {
      name: "Telegram",
      url: "https://t.me/share/url",
      title: `Share this post via Telegram`,
      icon: TelegramLogoIcon,
    },
    {
      name: "Mail",
      // url: "mailto:?subject=See%20this%20post&body=",
      url: "",
      title: `Share this post via email`,
      icon: EnvelopeIcon,
    },
  ],
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  bannerColor: [
    ["#e66465", "#9198e5"],
    ["#99f2c8", "#1f4037"],
    ["#b92b27", "#1565C0"],
    ["#f12711", "#f5af19"],
    ["#108dc7", "#ef8e38"],
    ["#00b09b", "#96c93d"],
    ["#CAC531", "#F3F9A7"],
    ["#00F260", "#0575E6"],
    ["#ff9966", "#ff5e62"],
    ["#EB5757", "#000000"],
  ],
};

export default config;

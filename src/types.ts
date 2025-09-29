import type { Icon } from "@phosphor-icons/react";

export type NavLink = {
  name: string;
  url: string;
  external?: boolean;
  icon?: Icon;
};

export interface SocialLink {
  name: string;
  title?: string;
  url: string;
  icon: Icon;
}

export type GiscusConfig = {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  reactionsEnabled: boolean;
};

export interface SiteConfig {
  site: string;
  font: string;
  title: string;
  subTitle: string;
  description: string;
  author: string;
  tags: string[];
  pageSize: number;
  defaultBannerUrl?: string;
  socialLinks: SocialLink[];
  shareLinks: SocialLink[];
  navLinks: NavLink[];
  scheduledPostMargin: number;
  bannerColor: [string, string][];
  giscus?: GiscusConfig;
}

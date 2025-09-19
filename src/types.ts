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

export interface SiteConfig {
  site: string;
  font: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  pageSize: number;
  socialLinks: SocialLink[];
  shareLinks: SocialLink[];
  navLinks: NavLink[];
  scheduledPostMargin: number;
}

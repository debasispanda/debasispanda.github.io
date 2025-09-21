import type { CollectionEntry } from "astro:content";
import { Resvg } from "@resvg/resvg-js";
import { postOgImage } from "./postOgImage";
import siteConfig from "@/site.config";

const socials = ["Github", "LinkedIn", "X"];

function svgToPng(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export const generatePostBanner = async (post: CollectionEntry<"blog">) => {
  const svg = await postOgImage(post.data);
  return svgToPng(svg);
};

export const generateRootBanner = async () => {
  const rootData = {
    title: siteConfig.title,
    description: siteConfig.subTitle,
    socials: siteConfig.socialLinks
      .filter(({ name }) => socials.includes(name))
  };
  const svg = await postOgImage(rootData);
  return svgToPng(svg);
};

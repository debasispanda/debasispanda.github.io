import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import siteConfig from "@/site.config";
import getSortedPosts from "@/utils/getSortedPosts";
import { getPath } from "@/utils/getPath";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteConfig.site,
    items: sortedPosts.map(({ data, id, filePath }) => ({
      title: data.title,
      pubDate: data.publishedAt,
      description: data.description,
      author: data.author || siteConfig.author,
      link: getPath(id, filePath),
    })),
    trailingSlash: false,
  });
}

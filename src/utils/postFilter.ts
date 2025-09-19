import type { CollectionEntry } from "astro:content";
import config from "@/site.config";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.publishedAt).getTime() - config.scheduledPostMargin;
  return !data.isDraft && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;

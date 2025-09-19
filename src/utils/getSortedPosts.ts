import type { CollectionEntry } from "astro:content";
import postFilter from "@/utils/postFilter";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modifiedAt ?? b.data.publishedAt).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modifiedAt ?? a.data.publishedAt).getTime() / 1000
        )
    );
};

export default getSortedPosts;

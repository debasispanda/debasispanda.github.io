import { getEntry } from "astro:content";
import { toCapitalize } from "@/utils/toCapitalize";

export const getBreadcrumbs = async (url: string) => {
  const currentPath = url.replace(/\/+$/, "");
  const breadcrumbs = currentPath?.split("/").slice(1);

  if (!breadcrumbs.length) return [];

  breadcrumbs[0] = toCapitalize(breadcrumbs[0]);

  const [path, subPath] = breadcrumbs;

  if (!subPath) return breadcrumbs;

  switch (path) {
    case "Posts":
      const post = await getEntry("blog", subPath);
      breadcrumbs[1] = post?.data.title as string;
      break;
    case "Tags":
      breadcrumbs[1] = `#${toCapitalize(breadcrumbs[1])}`;
      break;
    default:
      break;
  }

  return breadcrumbs;
};

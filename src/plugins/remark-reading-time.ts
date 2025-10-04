import type { RemarkPlugin } from "@astrojs/markdown-remark";
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

const remarkReadingTime: RemarkPlugin = () => {
  return function (tree, { data }) {
    if (data.astro?.frontmatter) {
      const textOnPage = toString(tree);
      const readingTime = getReadingTime(textOnPage);
      const minutes = Math.ceil(readingTime.minutes);
      data.astro.frontmatter.minutesRead = `${minutes} min${minutes > 1 ? "s" : ""} read`;
    }
  };
};

export default remarkReadingTime;

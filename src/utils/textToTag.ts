import { slugifyStr } from "./slugify";

export const textToTag = (text: string) => ({
  tag: slugifyStr(text),
  tagName: text,
});

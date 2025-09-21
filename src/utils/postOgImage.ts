import satori, { type SatoriOptions } from "satori";
import type { ReactNode } from "react";
import postOgFonts from "./postOgFonts";
import site from "@/site.config";
import type { SocialLink } from "@/types";

interface OgData {
  title: string;
  description: string;
  author?: string;
  socials?: SocialLink[];
}

export const postOgImage = async ({
  title,
  description,
  author,
  socials,
}: OgData) => {
  const color = site.bannerColor[Math.floor(Math.random() * 10)];
  return satori(
    {
      type: "div",
      props: {
        style: {
          background: `linear-gradient(45deg, ${color[0]}, ${color[1]})`,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                boxShadow: "5px 5px 10px #000",
                position: "absolute",
                top: "-1px",
                right: "-1px",
                background: color[1],
                opacity: "0.9",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                margin: "2.5rem",
                width: "88%",
                height: "80%",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                boxShadow: "5px 5px 10px #000",
                background: color[0],
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
                width: "88%",
                height: "80%",
              },
              children: {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    margin: "20px",
                    width: "90%",
                    height: "90%",
                  },
                  children: [
                    {
                      type: "h1",
                      props: {
                        style: {
                          fontSize: 72,
                          fontWeight: "bold",
                          height: 100,
                          overflow: "hidden",
                          margin: 0
                        },
                        children: title,
                      },
                    },
                    {
                      type: "h2",
                      props: {
                        style: {
                          fontSize: 32,
                          fontWeight: "bold",
                          overflow: "hidden",
                          margin: 0
                        },
                        children: description,
                      },
                    },
                    author && {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          justifyContent: "flex-end",
                          width: "100%",
                          marginBottom: "8px",
                          marginTop: "auto",
                          fontSize: 28,
                        },
                        children: [
                          {
                            type: "span",
                            props: {
                              children: [
                                "by ",
                                {
                                  type: "span",
                                  props: {
                                    style: { color: "transparent" },
                                    children: '"',
                                  },
                                },
                                {
                                  type: "span",
                                  props: {
                                    style: {
                                      overflow: "hidden",
                                      fontWeight: "bold",
                                    },
                                    children: author,
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    socials && {
                      type: "div",
                      props: {
                        style: {
                          marginTop: 70,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                        },
                        children: socials?.map(s => ({
                          type: "div",
                          props: {
                            style: {
                              display: "flex",
                            },
                            children: [
                              {
                                type: "strong",
                                props: {
                                  style: {
                                    width: 100,
                                  },
                                  children: `${s.name}: `,
                                },
                              },
                              {
                                type: "span",
                                props: {
                                  children: s.url,
                                },
                              },
                            ],
                          },
                        })),
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    } as ReactNode,
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await postOgFonts(
        `${title}${description}${author}${site.title}${socials?.map(s => `${s.name} ${s.url}`)} by`
      ),
    } as SatoriOptions
  );
};

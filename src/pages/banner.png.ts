import type { APIRoute } from "astro";
import { generateRootBanner } from "@/utils/generateBanner";

export const GET: APIRoute = async () => {
  const buffer = await generateRootBanner();
  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/png" },
  });
};

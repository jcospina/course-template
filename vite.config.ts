import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

// MDX must run BEFORE the React plugin so that the JSX it emits is then
// transformed by @vitejs/plugin-react (Fast Refresh, automatic runtime).
export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      }),
    },
    react({ include: /\.(mdx|md|jsx|tsx)$/ }),
  ],
  worker: { format: "es" },
  server: {
    port: 5173,
    open: false,
  },
});

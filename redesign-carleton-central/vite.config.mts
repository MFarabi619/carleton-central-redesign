import { defineConfig } from "vite";
import { gadget } from "gadget-server/vite";
import { remixViteOptions } from "gadget-server/remix";
import { vitePlugin as remix } from "@remix-run/dev";
import path from "path";

export default defineConfig({
  plugins: [gadget(), remix(remixViteOptions)],
  resolve: {
  alias: {
  "@": path.resolve(__dirname, "./src"),
},
}
});

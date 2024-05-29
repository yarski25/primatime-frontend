import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dynamicImport from "vite-plugin-dynamic-import";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // server: { origin: "http://0.0.0.0:5173" },
    define: {
      "process.env.REACT_APP_API_URL": JSON.stringify(env.REACT_APP_API_URL),
    },
    plugins: [react(), svgr(), dynamicImport()],
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
        assets: `${path.resolve(__dirname, "src/assets/")}`,
        components: `${path.resolve(__dirname, "src/components/")}`,
        public: `${path.resolve(__dirname, "public/")}`,
        pages: path.resolve(__dirname, "src/pages"),
        types: `${path.resolve(__dirname, "src/types")}`,
        hooks: `${path.resolve(__dirname, "src/hooks")}`,
      },
    },
  };
});

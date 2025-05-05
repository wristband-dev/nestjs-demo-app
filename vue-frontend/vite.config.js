import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

const workingDir = process.cwd();
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env =
     mode === "development"
      ? loadEnv(mode, workingDir, "VUE_APP_")
      : {};

  return {
    define: { "process.env": env },
    plugins: [vue()],
    resolve: {
      alias: [
        {
          find: /^~.+/,
          replacement: (val) => {
            return val.replace(/^~/, "");
          }
        },
      ],
    },
  };
});

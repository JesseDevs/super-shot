import { fileURLToPath, URL } from "node:url";
import eslint from "@rollup/plugin-eslint";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		{
			...eslint(),
			enforce: "pre",
			apply: "build",
		},
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});

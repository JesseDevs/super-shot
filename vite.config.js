import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslint from "@rollup/plugin-eslint";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					// treat all tags with a dash as custom elements
					isCustomElement: (tag) => tag.includes("-"),
				},
			},
		}),
		AutoImport({
			imports: ["vue"],
			dirs: [],
		}),
		Components({
			dirs: ["src/views", "src/components"],
		}),
		{
			...eslint({
				include: "src/**/*.+(js)",
			}),
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

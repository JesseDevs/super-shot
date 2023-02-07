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
					isCustomElement: (tag) => tag.includes("-"),
				},
			},
		}),
		AutoImport({
			include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],

			imports: [
				"vue",
				"vue-router",
				{
					"@vueuse/core": ["useMouse", ["useFetch", "useMyFetch"]],
					axios: [["default", "axios"]],
					"[package-name]": ["[import-names]", ["[from]", "[alias]"]],
				},
			],

			defaultExportByFilename: false,

			dirs: ["./partials", "./components", "./components/**"],
			dts: "./auto-imports.d.ts",
			vueTemplate: false,

			resolvers: [],
			eslintrc: {
				enabled: false, // Default `false`
				filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
				globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
			},
		}),
		Components({
			dts: true,
			types: [
				{
					from: "vue-router",
					names: ["RouterLink", "RouterView"],
				},
			],
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});

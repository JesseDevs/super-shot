import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from '@rollup/plugin-eslint';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					// treat all tags with a dash as custom elements
					isCustomElement: (tag) => tag.includes('-'),
				},
			},
		}),
		{
			...eslint({
				include: 'src/**/*.+(js)',
			}),
			enforce: 'pre',
			apply: 'build',
		},
		AutoImport({
			/* options */
			imports: [
				'vue',
				'pinia',
				{
					vuefire: ['useCollection', 'useDocument', 'useFirestore'],
					'vue-router': ['RouterView', 'useRoute', 'useRouter'],
					'firebase/firestore': [
						'collection',
						'addDoc',
						'getDocs',
						'setDoc',
						'doc',
					],
				},
				{ '@/services/UserService': ['useUserService'] },
			],
			dirs: ['src/services'],
			dts: true,
		}),
		Components({
			dirs: [
				'src/views',
				'src/components',
				'src/views/pages',
				'src/partials',
			],
			dts: true,
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});

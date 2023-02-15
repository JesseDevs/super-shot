/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,
	extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier'],
	rules: {
		'no-unused-vars': 'off',
		'vue/require-v-for-key': 'off',
		'no-undef': 'off',
	},
	parserOptions: {
		ecmaVersion: 'latest',
	},
	globals: {
		vue: true,
	},
};

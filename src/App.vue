<script setup>
	import { computed } from "vue";
	import { RouterView } from "vue-router";
	import SiteHeader from "./components/SiteHeader.vue";
	import SiteFooter from "./components/SiteFooter.vue";
	import SpriteSheet from "./components/SpriteSheet.vue";
	import { useCartStore } from "@/stores/cart";
	import { useInterfaceStore } from "@/stores/interface";

	const ui = useInterfaceStore();
	const cart = useCartStore();

	const addSpace = computed(function () {
		return ui.mainMenuOpen === false && cart.itemsInCart !== 0 ? "addSpace" : "";
	});
</script>

<template>
	<vue-app>
		<SpriteSheet />
		<SiteHeader />

		<main :class="`outlet ${addSpace}`">
			<RouterView />
		</main>

		<SiteFooter />
	</vue-app>
</template>

<style lang="scss">
	main.addSpace {
		section > inner-column {
			padding-bottom: 100px;
		}
	}
</style>

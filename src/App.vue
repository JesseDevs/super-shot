<script setup>
	import { computed } from "vue";
	import { RouterView, useRoute } from "vue-router";
	import SiteHeader from "./components/SiteHeader.vue";
	import SiteFooter from "./components/SiteFooter.vue";
	import SpriteSheet from "./components/SpriteSheet.vue";
	import { useCartStore } from "@/stores/cart";
	import { useInterfaceStore } from "@/stores/interface";
	import CartModal from "@/components/CartModal.vue";

	const ui = useInterfaceStore();
	const cart = useCartStore();
	const route = useRoute();

	const addSpace = computed(function () {
		return ui.mainMenuOpen === false && route.path !== "home" ? "addSpace" : "no";
	});
</script>

<template>
	<vue-app>
		<SpriteSheet />
		<SiteHeader />

		<main :class="`outlet ${addSpace} ${ui.cartClass}`" @click="ui.specificToggle()">
			<CartModal />
			<RouterView />
		</main>

		<SiteFooter />
	</vue-app>
</template>

<style lang="scss">
	main.addSpace {
		section > inner-column {
			padding-bottom: 120px;
		}
	}
</style>

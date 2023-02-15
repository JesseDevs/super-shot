<script setup>
	import { computed } from 'vue';
	import { RouterView, useRoute } from 'vue-router';
	import { useCartStore } from '@/stores/cart';
	import { useInterfaceStore } from '@/stores/interface';
	import SiteHeader from '@/partials/SiteHeader.vue';
	import SiteFooter from '@/partials/SiteFooter.vue';
	import SpriteSheet from '@/partials/SpriteSheet.vue';
	import CartModal from '@/components/CartModal.vue';

	const ui = useInterfaceStore();
	const cart = useCartStore();
	const route = useRoute();

	const addSpace = computed(function () {
		return ui.mainMenuOpen === false && route.path !== 'home' ? 'addSpace' : 'no';
	});
</script>

<template>
	<vue-app>
		<SpriteSheet />
		<SiteHeader />

		<main :class="`outlet ${addSpace} ${ui.cartClass}`">
			<section>
				<inner-column>
					<CartModal />
					<RouterView />
				</inner-column>
			</section>
		</main>

		<SiteFooter />
	</vue-app>
</template>

<style lang="scss">
	// main {
	// 	margin-top: 95.4px;
	// }
</style>

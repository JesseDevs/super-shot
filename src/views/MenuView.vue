<script setup>
	import { RouterView, useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";
	import CheckoutBtn from "../components/CheckoutBtn.vue";
	import ReturnNav from "../components/ReturnNav.vue";
	const menu = useMenuStore();
	const route = useRoute();
</script>
<template>
	<section>
		<inner-column>
			<ReturnNav v-if="$route.path == '/menu'" />

			<menu-module>
				<h1 class="attention-voice">CLASSICS & NEW FAVORITES</h1>

				<p class="category-intro">
					Our menu is full of great-tasting items that will get you going and keep you running throughout
					your busy day. Plus, they’re always made to order—just the way you like.
				</p>
			</menu-module>
			<div class="outlet">
				<RouterView :menu="menu" />
				<CheckoutBtn />
			</div>
		</inner-column>
	</section>
</template>

<style lang="scss">
	menu-module {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 10px;
		padding-top: 10px;
		padding-bottom: 1.5rem;
		h1 {
			max-width: 23ch;
			font-weight: 700;
		}
	}
</style>

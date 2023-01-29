<script setup>
	import { useCartStore } from "../stores/Cart";
	import { useInterfaceStore } from "@/stores/interface";
	import { computed } from "vue";
	import { useRoute } from "vue-router";
	import { useProfilesStore } from "../stores/Profiles";

	const profiles = useProfilesStore();
	const profile = profiles.currentUser;
	const route = useRoute();

	const redirect = computed(function () {
		if (route.path === "/") {
			return "menu";
		} else {
			return "checkout";
		}
	});

	const buttonText = computed(function () {
		if (route.path === "/menu") {
			return "Checkout";
		} else {
			return "Finish Order";
		}
	});

	const ui = useInterfaceStore();
	const cart = useCartStore();
</script>
<template>
	<checkout-block v-if="!ui.mainMenuOpen">
		<RouterLink @click="ui.specificToggle()" class="small-voice" :to="`/${redirect}`">
			<checkout-btn v-if="cart.itemsInCart !== 0">
				<p>$ {{ cart.checkoutTotal }}</p>
				<span>{{ buttonText }}</span>
			</checkout-btn>
			<checkout-btn v-else><span>Start Order</span> </checkout-btn>
		</RouterLink>
	</checkout-block>
</template>

<style lang="scss">
	checkout-block {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 70px;
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--page-opacity);
	}

	checkout-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 15px;
		width: 240px;
		border: 1.5px solid black;
		margin: 0 auto;
		padding: 15px 25px;
		border-radius: 20px;
		background-color: var(--color-soft);
		transition: 0.25s;
		user-select: none;
		cursor: pointer;
		-webkit-user-select: none;
		touch-action: manipulation;
		p {
			font-weight: 500;
		}
		span {
			text-transform: uppercase;
			font-weight: 800;
			font-size: 0.85rem;
		}

		&:hover {
			box-shadow: inset 0 0 0 2em var(--color);
			color: var(--page);
		}
	}
</style>

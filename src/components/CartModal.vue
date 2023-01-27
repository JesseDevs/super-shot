<script setup>
	import { useCartStore } from "../stores/cart";
	import SvgIcon from "../components/SvgIcon.vue";
	import { useProfilesStore } from "../stores/Profiles";

	const profiles = useProfilesStore();
	const cart = useCartStore();
</script>

<template>
	<cart-modal>
		<h2 class="chant-voice">Cart</h2>
		{{ cart.checkoutTotal }}

		<ul>
			<li v-for="item in cart.purchasingCart">{{ item.name }} - {{ item.price }}</li>
		</ul>
	</cart-modal>
</template>

<style lang="scss">
	cart-modal {
		position: fixed;
		background-color: var(--off-color);
		top: 75px;
		right: 0;
		width: 100%;
		height: 100%;

		display: block;
		place-items: center;

		overflow-y: auto;
		opacity: 0;
		z-index: 200;
		pointer-events: none;
		transition: all 0.3s ease-in-out;
	}
	header.cart-open cart-modal {
		opacity: 1;
		transform: translate(0, 0);
		pointer-events: initial;
	}

	// header.toggle-open.cart-open cart-modal {
	// 	top: 193px;
	// }
</style>

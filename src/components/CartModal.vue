<script setup>
	import { useCartStore } from "../stores/cart";
	import SvgIcon from "../components/SvgIcon.vue";
	import { useProfilesStore } from "../stores/Profiles";

	const profiles = useProfilesStore();
	const cart = useCartStore();
</script>

<template>
	<cart-modal>
		<inner-column>
			<h2 class="chant-voice">Cart</h2>
			{{ cart.checkoutTotal }}

			<ul>
				<li v-for="item in cart.purchasingCart">{{ item.name }} - {{ item.price }}</li>
			</ul>
		</inner-column>
	</cart-modal>
</template>

<style lang="scss">
	cart-modal {
		position: absolute;
		background-color: var(--off-color-soft);
		right: 0;
		top: 0;
		width: 100%;
		height: 100%;
		max-height: 85vh;

		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;

		display: flex;
		align-items: flex-start;
		flex-direction: column;

		overflow-y: auto;
		opacity: 0.4;
		transform: translate(98%, 0);
		z-index: 200;
		pointer-events: none;
		transition: all 0.3s ease-in-out;
	}
	.cart-open cart-modal {
		opacity: 1;
		transform: translate(35%, 0);
		pointer-events: initial;
	}

	// header.toggle-open.cart-open cart-modal {
	// 	top: 193px;
	// }
</style>

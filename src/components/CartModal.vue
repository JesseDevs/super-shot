<script setup>
	import { useCartStore } from "../stores/cart";
	import { useInterfaceStore } from "@/stores/interface";
	import SvgIcon from "../components/SvgIcon.vue";
	import { useProfilesStore } from "../stores/Profiles";

	const profiles = useProfilesStore();
	const cart = useCartStore();
	const ui = useInterfaceStore();

	function clear() {
		cart.purchasingCart = [];
		localStorage.setItem("myData", []);
	}
</script>

<template>
	<cart-modal>
		<h2 class="chant-voice">Shopping Cart</h2>
		<button v-if="cart.itemsInCart" @click="clear()">
			<SvgIcon icon="trash" />
		</button>

		<ul>
			<li v-for="item in cart.purchasingCart">
				{{ item.quantity }} - -{{ item.name }} - {{ item.price }}
			</li>
		</ul>
		{{ cart.checkoutTotal }}

		<RouterLink class="button strict-voice" @click="ui.specificToggle()" to="/checkout"
			>Checkout</RouterLink
		>
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
		max-width: 75%;
		max-height: 85vh;
		padding: 1rem 2rem;

		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;

		display: flex;
		align-items: flex-start;
		flex-direction: column;

		overflow-y: auto;
		opacity: 0.4;
		transform: translate(100%, 0);
		z-index: 200;
		pointer-events: none;
		transition: all 0.3s ease-in-out;

		a.button {
			background-color: var(--page);
			text-align: center;
			align-self: center;
		}

		button {
			appearance: none;
			border: none;
			outline: none;
			background-color: transparent;
		}

		inner-column * {
			opacity: 0;
		}
	}
	.cart-open cart-modal {
		opacity: 1;
		transform: translate(0, 0);
		pointer-events: initial;

		inner-column * {
			opacity: 1;
		}
	}

	// header.toggle-open.cart-open cart-modal {
	// 	top: 193px;
	// }
</style>

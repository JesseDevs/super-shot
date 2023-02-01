<script setup>
	import { useCartStore } from "../stores/cart";
	import { useInterfaceStore } from "@/stores/interface";
	import SvgIcon from "../components/SvgIcon.vue";
	import { useProfilesStore } from "../stores/Profiles";
	import { useRoute } from "vue-router";

	const profiles = useProfilesStore();
	const cart = useCartStore();
	const ui = useInterfaceStore();
	const route = useRoute();

	function remove(id) {
		cart.purchasingCart.forEach(function (item, index) {
			if (item.id === id) {
				cart.purchasingCart.splice(index, 1);
			}
		});
	}

	function increment(x) {
		x++;
	}

	function clear() {
		cart.purchasingCart = [];
		localStorage.setItem("myData", []);
	}
</script>

<template>
	<cart-modal>
		<h2 class="chant-voice">Shopping Cart</h2>

		<button v-if="!ui.editProductMode" @click="ui.toggleEditMode()" class="tiny-button tiny-voice">
			Edit
		</button>

		<button v-else @click="ui.toggleEditMode()" class="tiny-button tiny-voice">Done</button>

		<ul>
			<li class="item-in-cart" v-for="item in cart.purchasingCart">
				<RouterLink :to="`/menu/${item.category}/${item.id}`">
					<cart-card :class="`${ui.editModeClass}`">
						<text-content>
							<p>{{ item.quantity }}</p>
							<p>{{ item.name }}</p>
							<p>${{ item.price }}</p>
							<div class="arrow-box">
								<SvgIcon icon="angle-right" />
							</div>
						</text-content>

						<edit-links v-if="ui.editProductMode">
							<button class="tiny-voice">Quantity</button>
							<button class="tiny-voice" @click="remove(`${item.id}`)">Delete</button>
						</edit-links>
					</cart-card>
				</RouterLink>
			</li>
		</ul>

		<button class="trash-can" v-if="cart.itemsInCart" @click="clear()">
			<SvgIcon icon="trash" />
		</button>
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
		max-width: 80%;
		max-height: 85vh;
		padding: 1rem 1rem;

		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;

		display: flex;
		align-items: flex-start;
		flex-direction: column;

		overflow-y: auto;
		opacity: 0;
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
			cursor: pointer;
		}

		.tiny-button {
			position: absolute;
			right: 10px;
			top: 1rem;
		}

		.trash-can {
			cursor: pointer;
			position: absolute;
			right: 10px;
			bottom: 1.5rem;

			.contains-svg {
				width: 25px;
				height: 30px;
			}
		}

		ul {
			flex: 1;
			margin-top: 20px;
			width: 100%;
		}

		cart-card text-content {
			flex-direction: row;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 12px;
			min-height: 12%;
			font-weight: 600;
			p:nth-of-type(2) {
				flex: 1;
			}
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

	edit-links {
		margin-top: 5px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		text-decoration: underline;
		button,
		a {
			font-weight: 500;
		}
	}
</style>

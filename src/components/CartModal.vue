<script setup>
	import { computed, ref } from "vue";
	import { useCartStore } from "../stores/cart";
	import { useInterfaceStore } from "@/stores/interface";
	import { useProfilesStore } from "../stores/Profiles";
	import { useRoute } from "vue-router";
	import SvgIcon from "@/partials/SvgIcon.vue";

	const profiles = useProfilesStore();
	const cart = useCartStore();
	const ui = useInterfaceStore();
	const route = useRoute();
	const opacity = ref(1);

	const quantityMode = ref(false);

	function toggleQuantityMode() {
		quantityMode.value = !quantityMode.value;
	}

	const quantityModeClass = computed(() => {
		if (quantityMode.value) {
			return "quantity-mode";
		} else {
			return "";
		}
	});

	function remove(id) {
		cart.purchasingCart.forEach(function (item, index) {
			if (item.id === id) {
				cart.purchasingCart.splice(index, 1);
				route.push({ path: "/" });
			}
		});
	}

	function increment(x) {
		x++;
	}

	function clear() {
		cart.purchasingCart = [];
		localStorage.setItem("shoppingCart", []);
	}

	const itemAddedText = computed(function () {
		if (cart.itemAdded) {
			return "Item added!";
		} else return "";
	});

	const itemAddedClass = computed(function () {
		if (cart.itemAdded) {
			return "confirmation";
		} else return "";
	});

	setTimeout(function () {
		opacity.value = 0;
	}, 2000);
</script>

<template>
	<cart-modal>
		<h3 :class="`${itemAddedClass} strict-voice`">{{ itemAddedText }}</h3>

		<h2 class="chant-voice" v-if="cart.itemsInCart">Shopping Cart</h2>
		<h2 class="chant-voice" v-else>Empty Cart</h2>

		<button v-if="!ui.editProductMode" @click="ui.toggleEditMode()" class="tiny-button tiny-voice">
			Edit
		</button>

		<button v-else @click="ui.toggleEditMode()" class="tiny-button tiny-voice">Done</button>

		<ul>
			<li class="item-in-cart" v-for="product in cart.purchasingCart">
				<RouterLink :to="`/menu/${product.category}/${product.id}`">
					<cart-card :class="`${ui.editModeClass} ${quantityModeClass}`">
						<text-content>
							<p class="quantity">{{ product.quantity }}</p>
							<p>{{ product.name }}</p>
							<p>${{ product.price }}</p>
							<div class="arrow-box">
								<SvgIcon icon="angle-right" />
							</div>
						</text-content>

						<edit-links v-if="ui.editProductMode">
							<button class="tiny-voice" @click="toggleQuantityMode()">Quantity</button>
							<button class="tiny-voice" @click="remove(`${product.id}`)">Delete</button>
						</edit-links>
						<div v-if="quantityMode" class="quantity-counter">
							<button>-</button>
							{{ product.quantity }}
							<button @click="increment(product.quantity)">+</button>
						</div>
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
		position: fixed;
		background-color: var(--off-color-soft);
		right: 0;
		top: 96px;
		width: 100%;
		height: 100%;
		max-width: 90vh;
		max-height: 90vh;
		padding: 2rem;

		display: flex;
		align-items: flex-start;
		flex-direction: column;

		overflow-y: auto;
		overflow-x: hidden;
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

		h2 {
			font-weight: 600;
			width: 100%;
			padding-bottom: 20px;

			&:after {
				content: "";
				width: 150%;
				height: 1px;
				background-color: black;
				position: absolute;
				bottom: 0;
				left: -2rem;
				z-index: 100;
			}
		}

		h3.confirmation {
			position: absolute;
			top: 10px;
			right: 50%;
			transform: translate(50%, 0%);
			color: green;
			font-weight: 800;
			opacity: v-bind(opacity);
			transition: opacity 500ms ease-in-out;
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
			top: 2rem;
		}

		.trash-can {
			cursor: pointer;
			position: absolute;
			right: 10px;
			bottom: 2.6rem;

			.contains-svg {
				width: 25px;
				height: 30px;
			}
		}

		ul {
			width: 100%;
			flex: 1;
		}

		li a {
			padding: 10px;
			&:after {
				content: "";
				width: 150%;
				height: 1px;
				background-color: black;
				position: absolute;
				bottom: 0;
				left: -2rem;
				z-index: 100;
			}
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

		p.quantity {
			padding-left: 5px;
			padding-right: 5px;
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

	@media (min-width: 600px) {
		cart-modal {
			zoom: 0.8;
			max-width: 400px;
			right: 2rem;
			top: 73px;
			max-height: 80vh;
			border-radius: 25px;
			border: 2px solid black;
		}
	}
</style>

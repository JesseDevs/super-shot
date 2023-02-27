<script setup>
	import { computed, ref } from 'vue';
	import { useCartStore } from '../stores/cart';
	import { useInterfaceStore } from '@/stores/interface';
	import { useRoute } from 'vue-router';
	import SvgIcon from '@/partials/SvgIcon.vue';
	import { useUserService } from '@/services/UserService';

	const user = useUserService();
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
			return 'quantity-mode';
		} else {
			return '';
		}
	});

	const itemAdded = computed(function () {
		if (user.cart.itemAdded) {
			return {
				text: 'Item added!',
				class: 'confirmation',
			};
		} else return '';
	});
</script>

<template>
	<cart-modal>
		<transition name="fade" mode="out-in">
			<div class="box-modal">
				<p class="confirmation strict-voice" v-if="user.cart.itemAdded">{{ itemAdded.text }}</p>
			</div>
		</transition>

		<h2 class="chant-voice" v-if="cart.itemsInCart">Shopping Cart</h2>
		<h2 class="chant-voice" v-else>Empty Cart</h2>

		<button v-if="!ui.editProductMode" @click="ui.toggleEditMode()" class="tiny-button tiny-voice">
			Edit
		</button>

		<button v-else @click="ui.toggleEditMode()" class="tiny-button tiny-voice">Done</button>

		<ul>
			<li class="item-in-cart" v-for="product in user.cart.groups">
				<RouterLink :to="`/menu/${product[0].category}/${product[0].slug}`">
					<cart-card :class="`${ui.editModeClass} ${quantityModeClass}`">
						<text-content>
							<p class="quantity">{{ product.length }}</p>
							<p>{{ product[0].name }}</p>
							<p>${{ product[0].price }}</p>
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

		<div class="total-block">
			<text-content>
				<p class="quantity">{{ user.cart.total }}</p>
				<p>Total</p>
				<p>$20</p>
				<div class="arrow-box">
					<SvgIcon icon="angle-right" />
				</div>
			</text-content>
			<button class="trash-can" @click="clear()">
				<SvgIcon icon="trash" />
			</button>
			<RouterLink class="checkout-btn button strict-voice" @click="ui.specificToggle()" to="/checkout"
				>Checkout</RouterLink
			>
		</div>
	</cart-modal>
</template>

<style lang="scss">
	cart-modal {
		position: fixed;
		background-color: var(--color-soft);
		right: 0;
		top: 126px;
		width: 100%;

		max-width: 90vh;
		min-height: 82vh;
		max-height: 90vh;

		display: flex;
		align-items: flex-start;
		flex-direction: column;

		overflow-y: auto;
		overflow-x: hidden;
		opacity: 0;
		transform: translate(100%, 0);
		z-index: 400;
		pointer-events: none;
		transition: all 0.3s ease-in-out;

		li:first-of-type {
			border-top: 1px solid black;
		}

		a.button {
			text-align: center;
			align-self: center;
			margin: 20px;
		}

		h2 {
			font-weight: 600;
			width: 100%;
			padding-bottom: 20px;
			padding: 2rem;
		}

		p.confirmation {
			position: absolute;
			top: 10px;
			right: 50%;
			transform: translate(50%, 0%);
			color: green;
			font-weight: 800;
			opacity: v-bind(opacity);
			transition: opacity 2s ease-in-out;
		}

		button {
			appearance: none;
			border: none;
			outline: none;
			background-color: transparent;
			cursor: pointer;
		}

		.checkout-btn {
			border: 2px solid black;
			background-color: var(--off-color);
		}

		.tiny-button {
			position: absolute;
			right: 1rem;
			top: 2rem;
			border: 2px solid black;
		}

		.trash-can {
			cursor: pointer;
			position: absolute;
			right: 1.5rem;
			bottom: 1.6rem;

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
			padding: 10px 1.4rem;
			border-bottom: 1px solid black;
		}

		text-content {
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

	div.total-block {
		width: 100%;
		text-content {
			padding: 10px 1.4rem;
			border-top: 1px solid black;
			border-bottom: 1px solid black;
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

			li a {
				padding: 10px 2rem;
			}
		}
	}

	@media (min-width: 1400px) {
		cart-modal {
			zoom: 0.8;
			max-width: 400px;
			right: 8vw;
		}
	}
</style>

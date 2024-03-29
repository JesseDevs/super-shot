<script setup>
	import { computed, ref } from 'vue';
	import { useInterfaceStore } from '@/stores/interface';
	import SvgIcon from '@/partials/SvgIcon.vue';
	import { useUserService } from '@/services/UserService';

	const user = useUserService();
	const ui = useInterfaceStore();
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

	function toggleEditMode() {
		ui.editProductMode = !ui.editProductMode;
		if (quantityMode.value) {
			quantityMode.value = false;
		}
	}

	function closeCart() {
		ui.cartMenuOpen = false;
	}
</script>

<template>
	<cart-modal>
		<h2 class="chant-voice" v-if="user.cart.products?.length">Shopping Cart</h2>
		<h2 class="chant-voice if-scenario" v-else>Empty Cart</h2>
		<cart-actions v-if="user.cart.products?.length">
			<button v-if="!ui.editProductMode" @click="toggleEditMode()" class="tiny-button tiny-voice">
				Edit
			</button>
			<button v-else @click="toggleEditMode()" class="tiny-button tiny-voice">Done</button>
		</cart-actions>

		<ul>
			<li class="item-in-cart" v-for="product in user.cart.groups">
				<cart-card :class="`${ui.editModeClass} ${quantityModeClass}`">
					<text-content>
						<p class="quantity">{{ product.length }}</p>
						<p>{{ product[0].name }}</p>
						<p>${{ product[0].price }}</p>
						<!-- <p>${{ product[0].price * product.length }}</p> -->
						<RouterLink @click="closeCart()" :to="`/menu/${product[0].category}/${product[0].slug}`">
							<div class="arrow-box">
								<SvgIcon icon="angle-right" />
							</div>
						</RouterLink>
					</text-content>

					<edit-links v-if="ui.editProductMode">
						<button class="tiny-voice" @click="toggleQuantityMode()">Quantity</button>
						<button class="tiny-voice" @click="user.cart.clearGroup(product[0])">Delete</button>
					</edit-links>
					<div v-if="quantityMode" class="quantity-counter">
						<button @click="user.cart.groupMinus(product[0])">
							<SvgIcon icon="minus-square" />
						</button>
						{{ product.length }}
						<button @click="user.cart.groupPlus(product[0])">+</button>
					</div>
				</cart-card>
			</li>
		</ul>

		<div class="total-block" v-if="user.cart.products?.length">
			<text-content>
				<p class="quantity">{{ user.cart.total }}</p>
				<p class="letter-spacing">TOTAL</p>
				<p>Ex: $20</p>
			</text-content>
			<button class="trash-can" @click="user.cart.clearCart()">
				<SvgIcon icon="trash" />
			</button>
			<RouterLink class="checkout-btn button strict-voice" @click="ui.specificToggle()" to="/checkout"
				>Checkout</RouterLink
			>
		</div>
	</cart-modal>
</template>

<style lang="scss">
	cart-actions {
		display: contents;

		button {
			border: 2px solid black;
			background-color: var(--color);

			&:hover {
				box-shadow: inset 0 0 0 2em white;
				color: var(--color-text);
				border-color: var(--off-color-mute);
			}
		}
	}
	cart-modal {
		position: fixed;
		background-color: var(--off-color-soft);
		right: 0;
		top: var(--header-space);
		width: 100%;

		max-width: 90vh;
		min-height: 82vh;
		height: calc(100% - var(--header-space));
		max-height: 100vh;

		display: flex;
		align-items: flex-start;
		flex-direction: column;

		overflow-y: hidden;
		overflow-x: hidden;
		opacity: 0;
		transform: translate(100%, 0);
		z-index: 400;
		pointer-events: none;
		transition: all 0.2s ease-in-out;

		li:first-of-type {
			border-top: 1px solid black;
		}

		a.button {
			text-align: center;
			align-self: flex-end;
			margin: 20px;
		}

		h2 {
			font-weight: 600;
			width: 100%;
			padding-bottom: 20px;
			padding: 1.5rem 2rem;
			font-family: 'Montserrat', sans-serif;
		}

		h2.if-scenario {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			z-index: 500;
			background-color: var(--off-color-soft);
			height: 100%;
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
			background-color: var(--color);

			&:hover {
				box-shadow: inset 0 0 0 2em white;
				color: var(--color-text);
				border-color: var(--off-color-mute);
			}
		}

		.tiny-button {
			position: absolute;
			right: 1rem;
			top: 1.5rem;
			border: 2px solid black;
			background-color: var(--color);

			&:hover {
				box-shadow: inset 0 0 0 2em white;
				color: var(--color-text);
				border-color: var(--off-color-mute);
			}
		}

		.trash-can {
			cursor: pointer;
			position: absolute;
			left: 1.5rem;
			bottom: 1.6rem;

			.contains-svg {
				width: 30px;
				height: 30px;

				svg * {
					fill: var(--color-text);
				}
			}
		}

		ul {
			width: 100%;
			flex: 1;
			background-color: var(--off-color-mute);

			li {
				background-color: var(--off-color-soft);
				padding: 15px 1.4rem;
				border-bottom: 1px solid black;

				p {
					pointer-events: none;
				}

				a {
					pointer-events: stroke;

					&:hover svg * {
						fill: var(--color);
					}
				}
			}
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
		display: flex;
		flex-direction: column;
		text-content {
			padding: 15px 2rem;
			border-top: 1px solid black;
			border-bottom: 1px solid black;
		}
	}

	div.quantity-counter {
		width: 100%;
		display: flex;
	}

	@media (min-width: 600px) {
		cart-modal {
			zoom: 0.8;
			max-width: 400px;
			right: 2rem;
			top: 85px;
			max-height: 80vh;
			border-radius: 25px;
			border: 1.5px solid var(--color-text);

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

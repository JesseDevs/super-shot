<script setup>
	import SvgIcon from '../partials/SvgIcon.vue';
	import { useUserService } from '@/services/UserService';

	const user = useUserService();
</script>

<template>
	<checkout-block>
		<h2 class="loud-voice" v-if="user.cart.products?.length">Checkout</h2>
		<h2 class="loud-voice if-scenario" v-else>Empty Cart...</h2>

		<ul>
			<li class="item-in-cart" v-for="product in user.cart.groups">
				<checkout-card>
					<picture class="item-picture">
						<img :src="`${product[0].imageURL}`" alt="iced" loading="lazy" />
					</picture>
					<p>{{ product[0].name }}</p>
					<div class="quantityBox">
						<button @click="user.cart.groupPlus(product[0])">
							<SvgIcon icon="sort-asc" />
						</button>
						{{ product.length }}
						<button @click="user.cart.groupMinus(product[0])">
							<SvgIcon icon="sort-desc" />
						</button>
					</div>
					<p>${{ product[0].price }}</p>
					<!-- <p>${{ product[0].price * product.length }}</p> -->
				</checkout-card>

				<!-- <edit-links v-if="ui.editProductMode">
					<button class="tiny-voice" @click="toggleQuantityMode()">Quantity</button>
					<button class="tiny-voice" @click="nothing()">Delete</button>
				</edit-links>
				<div v-if="quantityMode" class="quantity-counter">
					<button @click="user.cart.groupMinus(product[0])">-</button>
					{{ product.quantity }}
					<button @click="user.cart.groupPlus(product[0])">+</button>
				</div> -->
			</li>
		</ul>
	</checkout-block>
</template>

<style lang="scss">
	checkout-block {
		display: flex;
		flex-direction: column;
		gap: 30px;

		checkout-card {
			display: flex;
			flex-direction: row;
			width: 100%;
			gap: 30px;
			align-items: center;
			justify-content: space-around;

			p {
				font-size: var(--step-1);
			}
		}
		h2 {
			font-weight: 700;
		}

		ul {
			border-top: 1px solid var(--support-light);
			li {
				border-bottom: 1px solid var(--support-light);
			}
		}

		picture {
			margin: 0;
			img {
				max-height: 125px;
				max-width: 100px;
			}
		}

		div.quantityBox {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			button {
				appearance: none;
				border: none;
				outline: none;
				background-color: transparent;
				cursor: pointer;

				&:hover {
					.contains-svg * {
						fill: var(--color);
					}
				}
			}
		}
	}
</style>

<script setup>
	import { computed, watch } from "vue";
	import { RouterLink } from "vue-router";
	import { useInterfaceStore } from "@/stores/interface";
	import { useCartStore } from "../stores/cart";
	import SvgIcon from "@/partials/SvgIcon.vue";
	import { useUserService } from "@/services/UserService";

	const user = useUserService();
	const ui = useInterfaceStore();
	const cart = useCartStore();

	const isMenuClosed = computed(function () {
		const currentScreenWidth = window.innerWidth;
		return currentScreenWidth >= 992;
	});

	if (isMenuClosed.value) {
		ui.mainMenuOpen = false;
	}
</script>

<template>
	<signin-block v-if="!user.current">
		<actions-block>
			<RouterLink class="tiny-button" to="/sign-up">Sign Up</RouterLink>
			<button class="tiny-button" to="/rewards">Sign Out</button>
		</actions-block>
		<p class="tiny-voice">
			Not a Dunkin' Rewards memeber?
			<RouterLink class="tiny-voice" to="/rewards">Learn More</RouterLink>
		</p>
		<div class="strict-voice cart-container" @click="ui.toggleCart()">
			<SvgIcon icon="basket" />
			<div class="items-cart-value" v-if="cart.itemsInCart !== 0">
				{{ cart.itemsInCart }}
			</div>
		</div>
	</signin-block>

	<signin-block v-else>
		<h3 class="strict-voice">Hi, User</h3>
		<actions-block>
			<button class="tiny-button" to="/rewards">Sign Out</button>
		</actions-block>
		<div class="strict-voice cart-container" @click="ui.toggleCart()">
			<SvgIcon icon="basket" />
			<div class="items-cart-value" v-if="cart.itemsInCart !== 0">
				{{ cart.itemsInCart }}
			</div>
		</div>
	</signin-block>
</template>
<style lang="scss">
	signin-block {
		display: none;
		transition: all ease-in-out 1000ms;
	}

	header.toggle-open {
		signin-block {
			display: grid;
			grid-template-columns: 125px 125px;
			text-align: center;
			justify-content: center;
			align-items: center;
			row-gap: 10px;
			padding: 7px;

			background-color: var(--page-support);

			.cart-container {
				display: none;
			}

			actions-block,
			p {
				grid-column: span 2;
			}
		}
		signin-block {
			h3 {
				grid-column: span 2;
			}
		}
	}

	@media (min-width: 900px) {
		signin-block {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 13px 1.5rem;
			gap: 8px;
			border-bottom: 2px solid var(--support-light);

			p {
				display: none;
			}

			actions-block {
				margin-top: auto;
				margin-right: 20px;
			}
		}
	}
</style>

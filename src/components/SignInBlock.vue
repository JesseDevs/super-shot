<script setup>
	import { computed, watch } from 'vue';
	import { RouterLink } from 'vue-router';
	import { useInterfaceStore } from '@/stores/interface';
	import { useCartStore } from '../stores/cart';
	import SvgIcon from '@/partials/SvgIcon.vue';
	import { useUserService } from '@/services/UserService';

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
	<signin-block v-if="user.authUser">
		<h3 class="username-name">{{ user.username }}</h3>
		<RouterLink class="username-link" @click="ui.specificToggle()" to="/profile"
			><h3>{{ user.username }}</h3></RouterLink
		>
		<actions-block>
			<RouterLink class="tiny-button" @click="ui.toggleMenu()" to="/profile">Profile</RouterLink>
			<RouterLink class="tiny-button" @click="ui.toggleMenu()" to="/sign-out">Sign Out</RouterLink>
		</actions-block>
		<div class="strict-voice cart-container" @click="ui.toggleCart()">
			<SvgIcon icon="basket" />
			<div class="items-cart-value" v-if="cart.itemsInCart !== 0">
				{{ cart.itemsInCart }}
			</div>
		</div>
	</signin-block>

	<signin-block v-else>
		<actions-block>
			<RouterLink class="tiny-button" @click="ui.specificToggle()" to="/sign-in">Sign In</RouterLink>
			<RouterLink class="tiny-button" @click="ui.specificToggle()" to="/sign-up">Sign Up</RouterLink>
		</actions-block>
		<p class="tiny-voice">
			Not a Dunkin’ Rewards memeber?
			<RouterLink class="tiny-voice" to="/rewards">Learn More</RouterLink>
		</p>
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
				font-weight: 600;
			}
		}

		a.username-link {
			display: none;
		}
	}

	@media (min-width: 800px) {
		signin-block {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding: 7px 1.5rem;
			gap: 8px;
			border-bottom: 2px solid var(--support-light);

			p {
				display: none;
			}

			actions-block {
				margin-top: auto;
				margin-right: 20px;
			}

			.contains-svg {
				height: 25px;
			}

			h3.username-name {
				display: none;
			}

			a.username-link {
				display: block;
				color: black;

				flex: 1;
				font-weight: 600;
			}

			h3.strict-voice {
				font-size: var(--step-0);
			}
		}
	}
</style>

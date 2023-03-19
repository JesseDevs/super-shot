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
		<p class="username-name strict-voice">Welcome, {{ user.username }}</p>
		<RouterLink class="username-link small-voice" @click="ui.specificToggle()" to="/">
			<p>{{ user.username }}</p>
		</RouterLink>
		<actions-block>
			<RouterLink class="tiny-button" @click="ui.specificToggle()" to="/profile">Profile</RouterLink>
			<RouterLink class="tiny-button" @click="ui.specificToggle()" to="/sign-out">Sign Out</RouterLink>
		</actions-block>
		<transition name="fade" mode="out-in">
			<div v-if="!ui.cartMenuOpen" class="strict-voice cart-container" @click="ui.toggleCart()">
				<SvgIcon icon="basket" />
				<div class="items-cart-value" v-if="user.cart.products?.length">
					{{ user.cart.products?.length }}
				</div>
			</div>

			<div v-else class="strict-voice cart-container" @click="ui.toggleCart()">
				<SvgIcon icon="times" />
			</div>
		</transition>
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
		<transition name="fade" mode="out-in">
			<div v-if="!ui.cartMenuOpen" class="strict-voice cart-container" @click="ui.toggleCart()">
				<SvgIcon icon="basket" />
				<div class="items-cart-value" v-if="user.cart.products?.length">
					{{ user.cart.products?.length }}
				</div>
			</div>

			<div v-else class="strict-voice cart-container" @click="ui.toggleCart()">
				<SvgIcon icon="times" />
			</div>
		</transition>
	</signin-block>
</template>
<style lang="scss">
	signin-block {
		display: none;
		transition: all ease-in-out 1000ms;

		div.cart-container {
			margin-right: 10px;
		}

		div.items-cart-value {
			width: 20px;
			height: 20px;
			position: absolute;
			bottom: -8px;
			right: -12px;
			background-color: var(--color-soft);
			border: 1.5px solid var(--color-mute);
			color: var(--color-text);
			border-radius: 50px;
			z-index: 10;
			font-size: 0.75rem;
			font-weight: 600;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		}
	}

	header.toggle-open {
		signin-block {
			display: grid;
			grid-template-columns: 125px 125px;
			text-align: center;
			justify-content: center;
			align-items: center;
			row-gap: 20px;
			padding: 7px;
			padding: 40px;

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
			zoom: 0.9;

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
				color: var(--color-text);

				flex: 1;
				font-weight: 600;
			}

			h3.strict-voice {
				font-size: var(--step-0);
			}
		}
	}
</style>

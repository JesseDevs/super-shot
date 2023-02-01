<script setup>
	import { RouterLink } from "vue-router";
	import { useInterfaceStore } from "@/stores/interface";
	import { useCartStore } from "../stores/cart";
	import { useProfilesStore } from "../stores/Profiles";

	const profiles = useProfilesStore();
	const ui = useInterfaceStore();
	const cart = useCartStore();
</script>

<template>
	<signin-block v-if="!profiles.isLoggedIn">
		<button class="header-action small-voice" @click="profiles.signInAnimation(profile)">Sign In</button>
		<RouterLink class="header-action sign-up small-voice" @click="ui.toggleMenu()" to="/sign-up">
			Sign Up
		</RouterLink>
		<span class="tiny-voice">Not a Dunkin' Rewards memeber?</span>
		<div class="strict-voice cart-container" @click="ui.toggleCart()">
			<SvgIcon icon="basket" />
			<div class="items-cart-value" v-if="cart.itemsInCart !== 0">
				{{ cart.itemsInCart }}
			</div>
		</div>
	</signin-block>

	<signin-block v-else>
		<h3 class="strict-voice">Hi, {{ profiles.currentUser.name }}</h3>
		<RouterLink
			class="small-voice"
			to="/create"
			@click="ui.toggleMenu()"
			:v-if="profiles.currentUser.role == 'admin'"
			>Create</RouterLink
		>
		<RouterLink class="small-voice" @click="ui.toggleMenu()" to="/sign-up"> Sign Out </RouterLink>
		<span class="tiny-voice">Checkout your Dunkin' Rewards</span>
		<div class="strict-voice cart-container" @click="ui.toggleCart()">
			<SvgIcon icon="basket" />
			<div class="items-cart-value" v-if="cart.itemsInCart !== 0">
				{{ cart.itemsInCart }}
			</div>
		</div>
	</signin-block>
</template>
<style lang="scss">
	header.toggle-open {
		signin-block {
			display: grid;
			grid-template-columns: 110px 110px;
			text-align: center;
			justify-content: center;
			align-items: center;
			row-gap: 10px;
			padding: 7px;
			background-color: var(--page-support);

			.cart-container {
				display: none;
			}

			.header-action {
				max-width: fit-content;
				margin: 0 auto;
				padding: 5px 15px;
				text-transform: uppercase;
				border-radius: 50px;
				font-weight: 600;
				line-height: 1.4;
			}
			button:first-of-type {
				grid-column: 1;
				text-align: center;
				color: var(--page);
				background-color: var(--color-mute);
				border: 1px solid var(--color-mute);
				max-width: fit-content;
			}
			a:last-of-type {
				grid-column: 2;
				background-color: var(--page);
				border: 1px solid var(--support);
			}
			span {
				grid-column: span 2;
			}
		}
		signin-block {
			h3 {
				grid-column: span 2;
			}
		}
	}
</style>

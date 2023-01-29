<script setup>
	import { RouterLink } from "vue-router";
	import { useInterfaceStore } from "@/stores/interface";

	import { useProfilesStore } from "../stores/Profiles";

	const profiles = useProfilesStore();
	const ui = useInterfaceStore();
</script>

<template>
	<signin-block v-if="!profiles.isLoggedIn">
		<button class="small-voice" @click="profiles.signInAnimation(profile)">Sign In</button>
		<RouterLink class="small-voice" @click="ui.toggleMenu()" to="/sign-up"> Sign Up </RouterLink>
		<span class="tiny-voice">Not a Dunkin' Rewards memeber?</span>
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
	</signin-block>
</template>
<style lang="scss">
	header.toggle-open {
		signin-block {
			display: grid;
			grid-template-columns: 100px 100px;
			text-align: center;
			justify-content: center;
			align-items: center;
			row-gap: 10px;
			padding: 7px;
			background-color: var(--page-support);

			a {
				max-width: fit-content;
				margin: 0 auto;
				padding: 5px 10px;
				text-transform: uppercase;
				border-radius: 50px;
				font-weight: 600;
			}
			button:first-of-type {
				grid-column: 1;
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

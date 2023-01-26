<script setup>
	import { RouterLink } from "vue-router";
	import { useInterfaceStore } from "@/stores/interface";

	import { useProfilesStore } from "../stores/profile";

	const profiles = useProfilesStore();
	const ui = useInterfaceStore();
</script>

<template>
	<signin-block v-if="!profiles.isLoggedIn">
		<RouterLink class="small-voice" to="/sign-in" @click="ui.toggleMenu()">Sign In</RouterLink>
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
	signin-block {
		h3 {
			grid-column: span 2;
		}
	}
</style>

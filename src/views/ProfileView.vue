<script setup>
	import CheckoutBtn from "../components/CheckoutBtn.vue";
	import ModuleThing from "../components/ModuleThing.vue";
	import { useProfilesStore } from "../stores/profile";

	const profiles = useProfilesStore();
</script>

<template>
	<section>
		<inner-column>
			<home-module>
				<ModuleThing />

				<RouterLink class="button" to="/sign-in">Sign In</RouterLink>
				<RouterView />

				<CheckoutBtn />
			</home-module>
		</inner-column>
	</section>
</template>

<style lang="scss"></style>

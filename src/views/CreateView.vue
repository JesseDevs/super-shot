<script setup>
	import { computed } from "vue";
	import MenuProductForm from "../components/MenuProductForm.vue";
	import { useProfilesStore } from "../stores/profile";

	const profiles = useProfilesStore();
	const admin = computed(function () {
		if (profiles.isLoggedIn && profiles.currentUser.role == "admin") {
			return true;
		} else return false;
	});
</script>

<template>
	<section>
		<inner-column>
			<create-thing v-if="admin">
				<h2 class="chant-voice">Create A Product</h2>
				<MenuProductForm />
			</create-thing>
			<create-thing v-else>
				<h2 class="chant-voice">Woah. Looks like you don't have access to this page.</h2>
				<p class="intro">Maybe sign in?</p>
				<RouterLink class="button" to="/sign-in">Sign In</RouterLink>
			</create-thing>
		</inner-column>
	</section>
</template>
<style lang="scss">
	create-thing {
		display: block;
		max-width: 450px;

		button {
			margin-top: 20px;
		}
	}
</style>

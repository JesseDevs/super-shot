<script setup>
	import MenuProductForm from "../components/MenuProductForm.vue";
	import { useUsersStore } from "../stores/users";

	const users = useUsersStore();
</script>

<template>
	<section>
		<inner-column>
			<create-thing v-if="users.isLoggedIn">
				<h2 class="chant-voice">Create A Product</h2>
				<MenuProductForm />
			</create-thing>
			<create-thing v-else>
				<h2 class="chant-voice">Not Logged In</h2>
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

<script setup>
	import MenuProductForm from "../components/MenuProductForm.vue";
	import { useUsersStore } from "../stores/users";

	const users = useUsersStore();
</script>

<template>
	<section>
		<inner-column>
			<module-thing v-if="users.isLoggedIn">
				<h2 class="chant-voice">Create A Product</h2>
				<MenuProductForm />
			</module-thing>
			<module-thing v-else>
				<h2 class="chant-voice">Not Logged In</h2>
			</module-thing>
		</inner-column>
	</section>
</template>

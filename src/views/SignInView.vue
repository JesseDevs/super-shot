<script setup>
	import LoginForm from '../components/LoginForm.vue';
	import { useUserService } from '@/services/UserService';
	const user = useUserService();

	function testFunction(formData) {
		user.signIn(formData);
	}
</script>
<template>
	<signIn-page>
		<button type="button" @click="user.signOut()">Sign Out</button>

		<h1 class="loud-voice">Log In</h1>

		<LoginForm v-if="!user.authUser" buttonText="Sign In" @formAction="testFunction" />
	</signIn-page>
</template>

<style lang="scss"></style>

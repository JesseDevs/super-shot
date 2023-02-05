<script setup>
	import LoginModal from "../components/LoginModal.vue";
	import { reactive } from "vue";
	import { useUserService } from "@/services/UserService";
	import { useFirebaseAuth } from "vuefire";

	const user = useUserService();

	const auth = useFirebaseAuth();

	const form = reactive({
		username: "",
		password: "",
	});
</script>

<template>
	<section>
		<inner-column>
			<button type="button" @click="user.signOut()">Sign Out</button>

			<h1 class="loud-voice">Log In</h1>
			<!-- <LoginModal msg="Log In" /> -->

			<form class="main-form" autocomplete="off" @submit.prevent="user.signUp()">
				<div class="form-field">
					<label for="a">Email </label>

					<input id="a" type="text" required v-model="form.username" />
				</div>
				<div class="form-field">
					<label for="b">Password </label>

					<input id="b" type="password" required v-model="form.password" />
				</div>

				<button class="button" type="submit">Log In</button>
			</form>

			<form class="main-form" autocomplete="off" @submit.prevent="user.signIn()">
				<div class="form-field">
					<label for="a">Email </label>

					<input id="a" type="text" required v-model="form.username" />
				</div>
				<div class="form-field">
					<label for="b">Password </label>

					<input id="b" type="password" required v-model="form.password" />
				</div>

				<button class="button" type="submit">Log In</button>
			</form>
		</inner-column>
	</section>
</template>

<style lang="scss"></style>

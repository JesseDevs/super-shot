<script setup>
	import { onMounted } from 'vue';
	import { getAuth, updateProfile } from '@firebase/auth';
	import { reactive } from 'vue';
	import { useUserService } from '@/services/UserService';
	import { useFirebaseAuth } from 'vuefire';

	const user = useUserService();

	// onMounted(function () {
	// 	const auth = getAuth();
	// 	updateProfile(auth.currentUser, {
	// 		displayName: "Jane",
	// 		photoURL: "",
	// 	})
	// 		.then(() => {
	// 			// profile updated
	// 		})
	// 		.catch((error) => {
	// 			// An error
	// 		});
	// });
</script>

<template>
	<section>
		<inner-column>
			<button type="button" @click="user.signOut()">Sign Out</button>

			<h1 class="loud-voice">Log In</h1>

			<form
				class="main-form"
				autocomplete="off"
				@submit.prevent="user.signIn(user.form.username, user.form.password)"
				v-if="!user.current"
			>
				<div class="form-field">
					<label for="a">Email </label>

					<input id="a" type="email" required v-model="user.form.username" />
				</div>
				<div class="form-field">
					<label for="b">Password </label>

					<input id="b" type="password" required v-model="user.form.password" />
				</div>

				<button class="button" type="submit">Log In</button>
			</form>
		</inner-column>
	</section>
</template>

<style lang="scss"></style>

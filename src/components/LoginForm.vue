<script setup>
	import { ref } from 'vue';
	import { useUserService } from '@/services/UserService';
	import { useRoute } from 'vue-router';

	defineProps({
		buttonText: {
			default: 'Sign In',
		},
	});

	const route = useRoute();
	const user = useUserService();
	const requirements = [
		'8+ characters',
		'Include upper and lowercase letters',
		'Use at least one special character',
		'Include at least one number',
	];

	const event = defineEmits(['formAction']);
	function submit() {
		event('formAction', form);
	}

	const passwordVisibility = ref('password');
	function togglePasswordVisibility() {
		passwordVisibility.value = passwordVisibility.value === 'password' ? 'text' : 'password';
	}
</script>

<template>
	<loginForm-block>
		<form class="main-form" autocomplete="off" @submit.prevent="submit()">
			<div class="form-field" v-if="route.name === 'sign-up'">
				<label for="fname">First Name <span>*</span> </label>

				<input id="fname" type="text" required v-model="user.form.firstName" />
			</div>
			<div class="form-field" v-if="route.name === 'sign-up'">
				<label for="lname">Last Name <span>*</span> </label>

				<input id="lname" type="text" required v-model="user.form.lastName" />
			</div>
			<div class="form-field">
				<label for="a">Email <span>*</span> </label>

				<input id="a" type="email" required v-model="user.form.email" />
			</div>
			<div class="form-field">
				<label for="b">Password <span>*</span> </label>

				<input id="b" :type="passwordVisibility" required v-model="user.form.password" />
				<button type="button" @click="togglePasswordVisibility()">See Password</button>

				<ul class="requirements" v-if="route.name === 'sign-up'">
					<li v-for="x in requirements">
						<div-circle>x</div-circle>
						<p class="small-voice">{{ x }}</p>
					</li>
				</ul>
			</div>

			<p class="terms tiny-voice">
				By clicking ‘Join’ below, you agree to our
				<a href="https://www.dunkindonuts.com/en/terms-of-use">Terms of Use</a>,
				<a href="https://www.dunkindonuts.com/en/dunkinrewards/dunkin-rewards-terms-and-conditions"
					>Loyalty Program Terms</a
				>, and <a href="https://www.dunkindonuts.com/en/privacy-policy">Privacy Policy</a>.
			</p>

			<button class="button" type="submit">{{ buttonText }}</button>

			<p class="small-voice" v-if="route.name === 'sign-up'">
				Already have an account? <RouterLink to="/sign-in">Sign In</RouterLink>
			</p>
			<p class="small-voice" v-else>
				Want to join our Rewards? <RouterLink to="/sign-up">Sign Up</RouterLink>
			</p>
		</form>
	</loginForm-block>
</template>

<style lang="scss"></style>

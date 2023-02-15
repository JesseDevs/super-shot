<script setup>
	import { ref } from 'vue';
	import { useUserService } from '@/services/UserService';
	const user = useUserService();
	const requirements = [
		'8+ characters',
		'Include upper and lowercase letters',
		'Use at least one special character',
		'Include at least one number',
	];

	const passwordVisibility = ref('password');
	function togglePasswordVisibility() {
		if (passwordVisibility.value == 'password') {
			passwordVisibility.value = 'text';
		}
		passwordVisibility.value = 'password';
	}
</script>

<template>
	<signup-block>
		<h1 class="yell-voice">Sign Up</h1>

		<form
			class="main-form"
			autocomplete="off"
			@submit.prevent="user.signUp(user.form.username, user.form.password)"
			v-if="!user.current"
		>
			<div class="form-field">
				<label for="fname">First Name <span>*</span> </label>

				<input id="fname" type="text" required v-model="user.form.firstName" />
			</div>
			<div class="form-field">
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
				<button @click="togglePasswordVisibility()">See Password</button>

				<ul class="requirements">
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

			<button class="button" type="submit">Join</button>

			<p class="small-voice">Already have an account? <RouterLink to="/sign-in">Sign In</RouterLink></p>
		</form>

		<div v-else>
			{{ user.current }}
			<button @click="user.signOut">Sign Out</button>
		</div>
	</signup-block>
</template>

<style lang="scss">
	signup-block {
		display: flex;
		flex-direction: column;
		gap: 30px;

		p a {
			font-size: inherit;
		}

		label span {
			color: var(--color);
		}

		p.terms {
			margin-top: 10px;
		}
	}

	ul.requirements {
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 100%;
		li {
			display: flex;
			gap: 10px;
		}
	}

	div-circle {
		border-radius: 50%;
		width: 20px;
		height: 20px;
		padding: 3px 3px 4px;

		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--off-color);
		color: var(--page);
	}
</style>

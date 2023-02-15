<script setup>
	import LoginForm from '../components/LoginForm.vue';
	import { useUserService } from '@/services/UserService';
	const user = useUserService();

	function testFunction(formData) {
		user.signUp(formData);
	}
</script>

<template>
	<signup-block>
		<h1 class="yell-voice">Sign Up</h1>

		<LoginForm v-if="!user.authUser" buttonText="Join" @formAction="testFunction" />

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

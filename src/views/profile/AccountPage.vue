<script setup>
	import { reactive, watch } from 'vue';
	import { useUserService } from '../../services/UserService';
	const user = useUserService();

	const form = reactive({
		username: 'user.userDoc?.username',
	});

	watch(user, function (a, b) {
		form.username = user?.username;
	});

	const editingUsername = ref(false);
	function toggleUsernameEdit() {
		editingUsername.value != editingUsername.value;
	}
	function updateUsername() {
		if (user.changeUsername(form.username)) {
			editingUsername.value = false;
		}
	}
</script>

<template>
	<h1>Account Page</h1>
	<p v-if="user.authUser" class="username">{{ user.authUser.email }}</p>

	<p class="username">
		{{ user?.username }}
	</p>
	<button type="button" @click="toggleUsernameEdit">Edit</button>

	<Transition>
		<form
			@sumbit.prevent="user.changeUsername(form.username)"
			class="update-username"
			v-if="editingUsername"
		>
			<div class="form-field">
				<label for="username">Username <span>*</span> </label>
				<input id="username" type="text" required v-model="form.lastName" />
			</div>
			<button type="submit">Update</button>
			<button type="submit">Cancel</button>
			<!-- close toggle to change username -->
		</form>
	</Transition>
</template>

<style lang="scss">
	p.username {
		background-color: red;
		width: 200px;
		height: 50px;
	}

	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.5s ease;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
</style>

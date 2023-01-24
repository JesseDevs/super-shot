<script setup>
	import { reactive } from "vue";
	import { useUsersStore } from "@/stores/users";
	import { useRouter } from "vue-router";
	const router = useRouter();

	defineProps({
		msg: {
			type: String,
			required: true,
		},
	});

	const form = reactive({
		username: "",
		password: "",
	});

	const users = useUsersStore();

	function checkLogin() {
		if (form.username && form.password) {
			users.database.forEach((user) => {
				if (user.username == form.username && user.password == form.password) {
					users.isLoggedIn = true;
					users.currentUser = user;
					router.push("/create");
				}
			});
		}
	}
</script>

<template>
	<login-modal>
		<form class="login-form" autocomplete="off" @submit.prevent="checkLogin()">
			<div class="form-field">
				<label for="x">Username *</label>
				<div>
					<input id="x" type="text" required v-model="form.username" />
					<span class="input-helper"></span>
				</div>
			</div>
			<div class="form-field">
				<label for="y">Password *</label>
				<div>
					<input id="y" type="password" required v-model="form.password" />
					<span class="input-helper"></span>
				</div>
			</div>

			<button class="button" type="submit">{{ msg }}</button>
		</form>
	</login-modal>
</template>

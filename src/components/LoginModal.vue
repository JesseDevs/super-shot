<script setup>
	import { reactive } from "vue";
	import { useProfilesStore } from "@/stores/Profiles";
	import { useRouter } from "vue-router";
	const router = useRouter();

	const form = reactive({
		username: "",
		password: "",
	});

	const profiles = useProfilesStore();

	function checkLogin() {
		if (form.username && form.password) {
			profiles.database.forEach((user) => {
				if (user.username == form.username && user.password == form.password) {
					profiles.isLoggedIn == true;
					profiles.currentUser = user;
					profiles.saveToStorage(user);
					router.push("/create");
				}
			});
		}
	}
</script>

<template>
	<inner-column>
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

				<button class="button" type="submit">Log In</button>
			</form>
		</login-modal>
	</inner-column>
</template>

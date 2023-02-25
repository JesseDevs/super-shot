<script setup>
	import { reactive, watch, ref } from 'vue';
	import { useUserService } from '../../services/UserService';
	const user = useUserService();

	const form = reactive({
		username: user.username,
		firstN: user.firstN,
		lastN: user.lastN,
	});

	watch(user, function (a, b) {
		form.username = user?.username;
	});

	const editingUsername = ref(false);
	function toggleUsernameEdit() {
		editingUsername.value = !editingUsername.value;
	}

	function closeUsernameEdit() {
		editingUsername.value = false;
		window.scrollTo(0, 0);
	}

	function updateUsername() {
		if (user.changeUsername(form.username, form.firstN, form.lastN)) {
			editingUsername.value = false;
		}
	}
</script>

<template>
	{{ user.firstN }}
	<account-page v-if="user">
		<div class="account-display-box">
			<picture>
				<img src="@/assets/profile/profile.webp" alt="pic" />
			</picture>
		</div>
		<div class="account-display-box">
			<p>{{ user.authUser?.email }}</p>
			<h6 class="small-voice">Email</h6>
		</div>
		<div class="account-display-box">
			<p>
				{{ user?.username }}
			</p>
			<h6 class="small-voice">Username</h6>
		</div>
		<div class="account-display-box">
			<p>
				{{ user?.firstN }}
			</p>
			<h6 class="small-voice">First Name</h6>
		</div>
		<div class="account-display-box">
			<p>
				{{ user?.lastN }}
			</p>
			<h6 class="small-voice">Last Name</h6>
		</div>

		<button v-if="!editingUsername" class="button" type="button" @click="toggleUsernameEdit()">
			Personalize
		</button>

		<Transition>
			<form
				@sumbit.prevent="user.changeUsername(form.username)"
				class="update-username main-form"
				v-if="editingUsername"
			>
				<div class="form-field">
					<label for="username">Username </label>
					<input id="username" type="text" required v-model="form.username" />
				</div>

				<div class="form-field">
					<label for="firstN">First Name</label>
					<input id="firstN" type="text" required v-model="form.firstN" />
				</div>

				<div class="form-field">
					<label for="lastN">Last Name</label>
					<input id="lastN" type="text" required v-model="form.lastN" />
				</div>

				<actions-block>
					<button class="button" type="submit">Update</button>
					<button class="button" type="button" @click.prevent="closeUsernameEdit()">Cancel</button>
				</actions-block>
			</form>
		</Transition>
	</account-page>
</template>

<style lang="scss">
	account-page {
		display: flex;
		flex-direction: column;
		gap: 10px;
		> button {
			align-self: flex-end;
			margin-top: 20px;
		}
	}
	.account-display-box {
		display: flex;
		flex-direction: column;
		position: relative;

		p {
			border-bottom: 1px solid var(--color);
			min-height: 24px;
		}
		h6 {
			align-self: flex-end;
			pointer-events: none;
		}

		picture {
			margin: 0;
		}
	}
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.3s ease-in-out;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
</style>

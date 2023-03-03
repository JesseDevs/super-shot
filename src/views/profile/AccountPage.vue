<script setup>
	import { reactive, watch, ref } from 'vue';
	import { useUserService } from '../../services/UserService';
	const user = useUserService();

	// const selectedFile = ref(null);
	// const imageUrl = ref(null);

	// const handleFileUpload = (event) => {
	// 	const file = event.target.files[0];
	// 	imageUrl.value = URL.createObjectURL(file);
	// 	selectedFile.value = file;
	// };

	const userProfile = ref({
		username: user.username,
		firstN: user.firstN,
		lastN: user.lastN,
		email: user.email,
	});

	const form = reactive({
		username: user.username,
		firstN: user.firstN,
		lastN: user.lastN,
	});

	const editingUsername = ref(false);
	function toggleUsernameEdit() {
		editingUsername.value = !editingUsername.value;
	}

	function closeUsernameEdit() {
		editingUsername.value = false;
		window.scrollTo(0, 0);
	}

	function updateProfile() {
		if (user.updateProfile(form)) {
			editingUsername.value = false;
		}
	}
</script>

<template>
	<account-page>
		<div class="account-display-box">
			<picture class="profile-poc">
				<img src="@/assets/profile/profile.webp" alt="pic" />
			</picture>
		</div>
		<div class="account-display-box">
			<p>{{ user.email }}</p>
			<h6 class="small-voice">Email</h6>
		</div>
		<div class="account-display-box">
			<p>
				{{ user.username }}
			</p>
			<h6 class="small-voice">Username</h6>
		</div>
		<div class="account-display-box">
			<p>
				{{ user.firstN }}
			</p>
			<h6 class="small-voice">First Name</h6>
		</div>
		<div class="account-display-box">
			<p>
				{{ user.lastN }}
			</p>
			<h6 class="small-voice">Last Name</h6>
		</div>

		<button v-if="!editingUsername" class="button" type="button" @click="toggleUsernameEdit()">
			Personalize
		</button>

		<Transition>
			<form
				@submit.prevent="user.updateProfile(form)"
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

				<!-- <div class="form-field">
					<label for="img">Profile Picture</label>
					<input type="file" id="img" @change="handleFileUpload" />
					<img :src="imageUrl" alt="Selected Image" />
				</div> -->

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
		max-width: 50ch;

		p {
			border-bottom: 1px solid var(--color);
			background-color: var(--page);
			min-height: 24px;
		}
		h6 {
			align-self: flex-end;
			pointer-events: none;
		}

		picture {
			margin: 0;
			margin-bottom: 20px;
			img {
				max-height: none;
				width: fit-content;
				height: fit-content;
				max-width: 300px;
			}
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

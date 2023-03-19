<script setup>
	import { reactive, watch, ref } from 'vue';
	import { useUserService } from '../../services/UserService';
	import SvgIcon from '@/partials/SvgIcon.vue';
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
		// window.scrollTo(0, 0);
	}

	function updateProfile() {
		if (user.updateProfile(form)) {
			editingUsername.value = false;
		}
	}

	const thumbnailSource = computed(function () {
		if (user.url) {
			return url;
		} else {
			return;
		}
	});

	// make the form appear on top of their current info then submit
	//have a button appear on the photo to add a photo when the customize button is clicked
</script>

<template>
	<account-page class="wrapper">
		<div class="account-display-box profile-pic-container">
			<picture class="profile-pic" v-if="user.profilePic == ''">
				<img src="@/assets/profile/profile.webp" alt="pic" />
			</picture>

			<!-- <picture class="profile-pic" v-else>
				<img :src="user.url" alt="" />
			</picture> -->
			<button class="add-portrait">
				<SvgIcon icon="pencil" />
			</button>
		</div>
		<profile-block-inner>
			<form
				@submit.prevent="user.updateProfile(form)"
				enctype="multipart/form-data"
				class="update-username main-form"
			>
				<div class="account-display-box">
					<input id="username" type="text" required v-model="form.username" v-if="editingUsername" />
					<p @click="toggleUsernameEdit()" v-else class="strict-voice">
						{{ user.username }}
					</p>
					<em class="small-voice">Username</em>
				</div>
				<div class="account-display-box">
					<input id="firstN" type="text" required v-model="form.firstN" v-if="editingUsername" />
					<p @click="toggleUsernameEdit()" v-else class="strict-voice">
						{{ user.firstN }}
					</p>
					<em class="small-voice">First Name</em>
				</div>
				<div class="account-display-box">
					<input id="lastN" type="text" required v-if="editingUsername" v-model="form.lastN" />
					<p @click="toggleUsernameEdit()" v-else class="strict-voice">
						{{ user.lastN }}
					</p>
					<em class="small-voice">Last Name</em>
				</div>
				<div class="account-display-box">
					<p class="strict-voice">{{ user.email }}</p>
					<em class="small-voice">Email</em>
				</div>
				<actions-block v-if="editingUsername">
					<button class="button" type="submit">Update</button>
					<button class="button" type="button" @click.prevent="closeUsernameEdit()">Cancel</button>
				</actions-block>
			</form>
		</profile-block-inner>
	</account-page>
</template>

<style lang="scss">
	account-page {
		display: block;
		position: relative;

		.add-portrait {
			position: absolute;
			z-index: 20;
			bottom: 30px;
			right: 20px;
			background-color: var(--color-soft);
			border-radius: 50%;
			padding: 10px;

			border: 2px solid var(--color);

			svg * {
				fill: black;
			}
		}

		.profile-pic-container {
			position: absolute;
			z-index: 3;
			border-radius: 5px;
			left: 0;
			top: 0;
			max-width: 300px;
			width: 100%;
			transition: all 0.35s cubic-bezier(0.71, 0.03, 0.56, 0.85);
			picture {
				margin: 0;
				margin-bottom: 20px;
				border-radius: 50%;
				overflow: hidden;

				img {
					max-height: none;
					width: 100%;
					height: 100%;
					max-width: 300px;
				}
			}
		}
	}

	profile-block-inner {
		display: flex;
		flex-direction: column;
		gap: 10px;

		background: #fff;
		// box-shadow: 0 30px 60px 0 var(--off-color-soft);
		border-radius: 10px;

		margin-top: 110px;
		padding: 50px 20px;
		padding-top: 175px;

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

		input {
			border-bottom: 2px solid var(--color);

			&:focus {
				border-bottom: 2px solid var(--color);
				background-color: rgb(var(--color-soft-rgb), 0.3);
			}
		}

		p {
			border-bottom: 1px solid var(--color);
			background-color: #fff;
			min-height: 24px;
			font-weight: 600;
		}
		em {
			align-self: flex-end;
			pointer-events: none;
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

	.wrapper {
		min-height: 75vh;

		padding: 50px 0;
	}
</style>

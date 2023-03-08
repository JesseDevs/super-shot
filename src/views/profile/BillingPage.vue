<script setup>
	import { useUserService } from '../../services/UserService';

	const user = useUserService();
	const currentCardBackground = ref(Math.floor(Math.random() * 25 + 1));
</script>

<template>
	<billing-page class="wrapper">
		<profile-block-inner>
			<form class="main-form" autocomplete="off">
				<div class="form-field">
					<label for="name">Name</label>
					<input id="name" type="text" required />
				</div>

				<div class="form-field">
					<label for="desc">Description</label>
					<input id="desc" type="text" required />
				</div>

				<div class="form-field">
					<label for="tagline">Tagline</label>
					<input id="tagline" type="text" required />
				</div>

				<div class="form-field">
					<label for="image">Image URL</label>
					<input id="image" type="text" required />
				</div>

				<button class="button" type="submit">Save Card</button>
			</form>
		</profile-block-inner>
	</billing-page>
</template>

<style lang="scss">
	billing-page {
		profile-block-inner {
			margin-top: 0;

			button {
				align-self: flex-end;
			}
		}
	}
</style>

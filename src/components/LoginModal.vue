<script setup>
	import { useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";

	defineProps({
		msg: {
			type: String,
			required: true,
		},
	});

	const route = useRoute();
	const menu = useMenuStore();
</script>

<template>
	<login-modal>
		<form class="login-form" autocomplete="off" @submit.prevent="login()">
			<div class="form-field">
				<label for="x">Username *</label>
				<div>
					<input id="x" type="text" required />
					<span class="input-helper"></span>
				</div>
			</div>
			<div class="form-field">
				<label for="y">Password *</label>
				<div>
					<input id="y" type="password" required />
					<span class="input-helper"></span>
				</div>
			</div>

			<button class="button" type="submit">{{ msg }}</button>
		</form>
	</login-modal>
</template>

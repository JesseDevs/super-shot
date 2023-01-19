<script setup>
	import { reactive } from "vue";
	import { useMenuStore } from "@/stores/menu";
	import slugid from "slugid";

	const menu = useMenuStore();

	const product = reactive({
		name: "",
		age: "",
	});

	function save() {
		const record = {
			id: slugid.nice(),
			name: product.name,
			slug: product.toLowerCase().replace(/ /g, "-"),
			desc: product.desc,
			category: product.category,
			tags: product.tags,
		};
		// monsters.add(record);
		clear();
	}

	function clear() {
		product.name = "";
		product.age = "";
	}
</script>

<template>
	<form class="monster-form" autocomplete="off" @submit.prevent="save()">
		<div class="form-field">
			<label for="x">Name?</label>
			<div>
				<input id="x" type="text" required min="0" v-model="monster.name" />
				<span class="input-helper"></span>
			</div>
		</div>
		<div class="form-field">
			<label for="y">Age?</label>
			<div>
				<input id="y" type="number" required min="0" v-model.number="monster.age" />
				<span class="input-helper"></span>
			</div>
		</div>

		<button class="button" type="submit">Add</button>
	</form>
</template>

<style lang="scss">
	form.monster-form {
		padding: 10px;
		margin: 20px auto;
		max-width: 700px;
	}

	div.form-field {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 20px;
		margin-bottom: 20px;
		justify-content: center;
		align-items: center;
		position: relative;

		div {
			width: 85%;
		}
		input {
			padding: 7px 10px;
			font-size: 1.1rem;
		}

		input:focus + span.input-helper {
			right: 0%;
			bottom: 0%;
		}
		input:focus {
			border: 2px solid var(--support);
			outline: none;
		}

		label {
			font-weight: 500;
		}
		span.input-helper {
			content: "";
			background-color: var(--support-soft);
			width: 100%;
			z-index: -2;
			position: absolute;
			height: 100%;
			right: -7px;
			bottom: -7px;
			transition: 0.2s;
		}
	}
</style>

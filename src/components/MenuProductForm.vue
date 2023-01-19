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
			slug: product.name.toLowerCase().replace(/ /g, "-"),
			desc: product.desc,
			category: product.category.toLowerCase(),
			tags: product.tags,
		};
		menu.add(record);
		clear();
	}

	function clear() {
		product.name = "";
	}
</script>

<template>
	<form class="product-form" autocomplete="off" @submit.prevent="save()">
		<div class="form-field">
			<label for="x">Name?</label>
			<div>
				<input id="x" type="text" required v-model="product.name" />
				<span class="input-helper"></span>
			</div>
		</div>
		<div class="form-field">
			<label for="y">Category?</label>
			<div>
				<select id="y" v-model="product.category">
					<option disabled value="">Please select one</option>
					<option>Coffee</option>
					<option>Donuts</option>
					<option>Sandwiches</option>
				</select>
				<span class="input-helper"></span>
			</div>
		</div>
		<div class="form-field">
			<label for="z">Description?</label>
			<div class="contains-textarea">
				<textarea id="z" type="text" v-model="product.desc">
Enter Description...
</textarea
				>
				<span class="input-helper"></span>
			</div>
		</div>
		<div class="form-field">
			<label for="w">Tags?</label>
			<div>
				<input id="w" type="text" multiple separator="/" v-model="product.tags" />
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

		div.contains-textarea {
			height: 100px;
		}

		select {
			border: 1px solid black;
		}

		input,
		select,
		textarea {
			width: 100%;
			font-family: "Sofia Sans", sans-serif;
			padding: 7px 10px;
			font-size: 1.1rem;
			border: 1px solid black;
			outline: none;
			resize: none;
			&:focus {
				border: 1px solid var(--support);
				outline: 1px solid var(--support);
			}
		}

		textarea {
			min-height: 100px;
		}

		input:focus + span.input-helper,
		select:focus + span.input-helper,
		textarea:focus + span.input-helper {
			right: 0%;
			bottom: 0%;
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

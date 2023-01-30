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
			image: product.imageURL,
		};
		menu.add(record);
		clear();
	}

	function clear() {
		product.name = "";
	}
</script>

<template>
	<form class="main-form" autocomplete="off" @submit.prevent="save()">
		<div class="form-field">
			<label for="x">Name?</label>

			<input id="x" type="text" required v-model="product.name" />
		</div>
		<div class="form-field">
			<label for="y">Category?</label>

			<select id="y" v-model="product.category">
				<option disabled value="">Please select one</option>
				<option>Coffee</option>
				<option>Donuts</option>
				<option>Sandwiches</option>
			</select>
		</div>
		<div class="form-field">
			<label for="z">Description?</label>

			<textarea id="z" type="text" v-model="product.desc">
Enter Description...
</textarea
			>
		</div>
		<div class="form-field">
			<label for="w">Image URL?</label>

			<input id="w" type="text" v-model="product.imageURL" />
		</div>

		<button class="button" type="submit">Add</button>
	</form>
</template>

<style lang="scss">
	form.main-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	div.form-field {
		display: flex;
		flex-direction: column;
		gap: 10px;
		justify-content: center;
		align-items: center;
		width: 100%;
		position: relative;

		div {
			width: 85%;
		}

		div.contains-textarea {
			height: 100px;
		}

		select {
			appearance: none;
			border: 1px solid black;
		}

		label {
			text-align: left;
			font-weight: 500;
			padding-left: 25px;
		}
	}
</style>

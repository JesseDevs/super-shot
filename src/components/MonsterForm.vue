<script setup>
	import { reactive } from "vue";
	import { useAlbumsStore } from "@/stores/albums";

	const library = useAlbumsStore();

	const album = reactive({
		name: "",
		age: "",
	});

	function save() {
		const record = {
			name: album.name,
			age: album.age,
		};
		library.add(record);
		clear();
	}

	function clear() {
		album.name = "";
		album.age = "";
	}
</script>

<template>
	<form autocomplete="off" @submit.prevent="save()">
		<div class="form-field">
			<label for="x">Name?</label>
			<input id="x" type="text" required min="0" v-model="album.name" />
		</div>
		<div class="form-field">
			<label for="y">Age?</label>
			<input id="y" type="number" required min="0" v-model.number="album.age" />
		</div>

		<button type="submit">Calculate</button>
	</form>

	<ul>
		<li v-for="album in library.list">
			{{ album.name }}
		</li>
	</ul>
</template>

<style scoped lang="scss">
	#app {
		text-align: center;
		margin-top: 60px;
	}

	h1 {
		border-bottom: 1px solid black;
		margin: 0 auto;
		width: fit-content;
		font-size: 2rem;
	}

	span {
		display: block;
		padding: 15px 0;
	}

	output {
		margin: 40px auto;
		max-width: 85%;

		display: flex;
		flex-direction: column;
		gap: 10px;
		font-weight: bold;
	}

	form {
		padding: 10px;
		margin: 20px auto;
		max-width: 700px;
		display: flex;
		flex-direction: column;
	}

	div.form-field {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 20px;
		margin-bottom: 20px;
		justify-content: center;
		align-items: center;

		label {
			font-size: 1.1rem;
		}

		input {
			width: 60%;
			padding: 7px 0;
			font-size: 1.1rem;
			text-align: center;
		}
	}

	a,
	button {
		color: white;
	}

	button {
		background-color: v-bind(color);
		border: solid 2px;
		border-radius: 2em;
		font: inherit;
		font-weight: 700;
		margin: auto;
		letter-spacing: 0.5px;
		padding: 0.75em 2em;
		max-width: fit-content;

		&:hover {
			background-color: white;
			color: v-bind(color);
		}
	}
</style>

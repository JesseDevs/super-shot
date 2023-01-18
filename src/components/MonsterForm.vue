<script setup>
	import { reactive } from "vue";
	import { useMonsterStore } from "@/stores/monsters";
	import slugid from "slugid";

	const monsters = useMonsterStore();

	const monster = reactive({
		name: "",
		age: "",
	});

	function save() {
		const record = {
			id: slugid.nice(),
			name: monster.name,
			age: monster.age,
			slug: monster.name.toLowerCase(),
		};
		monsters.add(record);
		clear();
	}

	function clear() {
		monster.name = "";
		monster.age = "";
	}
</script>

<template>
	<form autocomplete="off" @submit.prevent="save()">
		<div class="form-field">
			<label for="x">Name?</label>
			<input id="x" type="text" required min="0" v-model="monster.name" />
		</div>
		<div class="form-field">
			<label for="y">Age?</label>
			<input id="y" type="number" required min="0" v-model.number="monster.age" />
		</div>

		<button class="button" type="submit">Calculate</button>
	</form>
</template>

<style lang="scss">
	form {
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

		input {
			width: 60%;
			padding: 7px 0;
			font-size: 1.1rem;
			text-align: center;
		}
	}
</style>

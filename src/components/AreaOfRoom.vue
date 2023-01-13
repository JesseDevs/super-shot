<script setup>
	import { ref, computed } from "vue";
	/////////////////////////

	const outputA = ref("");
	const width = ref();
	const length = ref();
	const area = computed(function () {
		return length.value * width.value;
	});

	function calcArea() {
		outputA.value = area.value + " sq feet";
	}

	///////////////////////

	const outputP = ref("");
	const paint = computed(function () {
		return Math.ceil(area.value / 350);
	});

	function calcPaint() {
		outputP.value = paint.value + " cans of paint.";
	}

	const color = "#4fc08d";
</script>

<template>
	<form autocomplete="off" @submit.prevent="calcArea()">
		<h1>Calculate Area In Feet</h1>
		<div class="form-field">
			<label for="length">What is the length of the room?</label>
			<input type="number" required min="0" v-model.number="length" />
		</div>
		<div class="form-field">
			<label for="width">What is the width of the room?</label>
			<input type="number" required min="0" v-model.number="width" />
		</div>

		<button class="action-link" type="submit">Calculate</button>
		<output>{{ outputA }}</output>
	</form>

	<form autocomplete="off" @submit.prevent="calcPaint()">
		<h1>Calculate the Amount of Paint?</h1>
		<span>350 sq feet requires 1 gallon of paint.</span>

		<button type="submit">Calculate</button>
		<output>{{ outputP }}</output>
	</form>
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

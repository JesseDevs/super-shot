<script setup>
	import { computed, reactive } from 'vue';
	import SvgIcon from '@/partials/SvgIcon.vue';

	defineProps(['product']);

	const sizes = ['s', 'm', 'l', 'xl'];
	const dairies = ['None', 'Coconutmilk', 'Oatmilk', ' Whole Milk', 'Skim Milk'];
	const sweets = ['None', 'Sugar'];
	const flavors = ['None', 'Caramel Swirl', 'French Vanilla', 'Mocha Swirl'];
	const breads = ['Bagel', 'Biscuit', 'Croissant', 'English Muffin'];
	const miniDonuts = ['Glazed', 'Cinnamon', 'BlueBerry', 'Chocolate', 'Old Fashioned', 'Jelly', 'Powdered'];

	const customizations = reactive({
		size: 'm',
		dairy: 'None',
		flavor: 'None',
		sweet: 'None',
		bread: 'Bagel',
		miniDonut: 'Glazed',
	});
</script>

<template>
	<form v-if="product" class="main-form edit-form" autocomplete="off" @submit.prevent="saveNewProduct()">
		<h5 class="strict-voice">CUSTOMIZATION</h5>
		<div class="size-block option-block" v-if="product[0].options.includes('size')">
			<h6 class="calm-voice">Size</h6>

			<ul class="cup-size">
				<li v-for="size in sizes">
					<label :for="size">
						<input
							class="radio-button"
							type="radio"
							:id="size"
							name="size"
							:value="size"
							:aria-label="size"
							:key="size"
							v-model="customizations.size"
						/>
						<span> {{ size.toUpperCase() }}</span>
					</label>
				</li>
			</ul>
		</div>

		<div class="dairy-block option-block" v-if="product[0].options.includes('dairy')">
			<h6 class="calm-voice">Dairy</h6>

			<div class="select-box-container">
				<select v-model="customizations.dairy" class="custom-select">
					<option v-for="dairy in dairies" :value="dairy" :key="dairy">{{ dairy }}</option>
				</select>
				<span> <SvgIcon icon="angle-down" /></span>
			</div>
		</div>

		<div class="sweetener-block option-block" v-if="product[0].options.includes('sweetener')">
			<h6 class="calm-voice">Sweetener</h6>

			<div class="select-box-container">
				<select v-model="customizations.sweet" class="custom-select">
					<option v-for="sweet in sweets" :value="sweet" :key="sweet">{{ sweet }}</option>
				</select>
				<span> <SvgIcon icon="angle-down" /></span>
			</div>
		</div>

		<div class="flavor-block option-block" v-if="product[0].options.includes('flavor')">
			<h6 class="calm-voice">Flavor</h6>

			<div class="select-box-container">
				<select v-model="customizations.flavor" class="custom-select">
					<option v-for="flavor in flavors" :value="flavor" :key="flavor">{{ flavor }}</option>
				</select>
				<span> <SvgIcon icon="angle-down" /></span>
			</div>
		</div>

		<div class="bread-block option-block" v-if="product[0].options.includes('bread')">
			<h6 class="calm-voice">Bread</h6>

			<div class="select-box-container">
				<select v-model="customizations.bread" class="custom-select">
					<option v-for="bread in breads" :value="bread" :key="bread">{{ bread }}</option>
				</select>
				<span> <SvgIcon icon="angle-down" /></span>
			</div>
		</div>

		<div class="mini-donut-flavor-block option-block" v-if="product[0].options.includes('miniDonutFlavor')">
			<h6 class="calm-voice">Flavor</h6>

			<div class="select-box-container">
				<select v-model="customizations.miniDonut" class="custom-select">
					<option v-for="miniDonut in miniDonuts" :value="miniDonut" :key="miniDonut">
						{{ miniDonut }}
					</option>
				</select>
				<span> <SvgIcon icon="angle-down" /></span>
			</div>
		</div>
	</form>
</template>
<style lang="scss">
	.edit-form {
		padding-top: 16px;

		@media (min-width: 570px) {
			padding-top: 0;
		}

		h5 {
			text-align: center;
			font-weight: 500;
		}
	}
	.option-block {
		display: flex;
		flex-direction: column;
		h6 {
			padding-bottom: 5px;
		}
	}

	.custom-select {
		appearance: none;
	}

	div.select-box-container {
		position: relative;

		select {
			border-radius: 50px;
			cursor: pointer;
			width: 100%;
			font-family: 'Sofia Sans', sans-serif;
			padding: 10px 20px;
			font-size: 1rem;
			border: 1.5px solid var(--support-soft);
			outline: none;
			resize: none;
			font-weight: 500;
		}

		select:active + span {
			transform: rotate(180deg);
		}

		span {
			position: absolute;
			top: 7px;
			right: 8px;
			pointer-events: none;
		}
	}

	ul.cup-size {
		display: flex;
		gap: 10px;

		li {
			transition: background-color 0.3s ease-in-out;
			border-radius: 50%;
		}

		li:hover {
			background-color: var(--off-color-soft);
		}

		label {
			cursor: default;
			display: block;
			width: 43px;
			height: 40px;
			position: relative;
		}
		.radio-button {
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			width: 100%;
			height: 100%;
			border-radius: 50%;
			border: 1.5px solid var(--support-soft);
			position: absolute;
			outline: 0;
		}

		.radio-button + span {
			display: block;
			display: grid;
			place-items: center;
			width: 43px;
			height: 40px;
			text-align: center;
			font-weight: 700;
			cursor: pointer;
		}

		.radio-button:checked {
			outline: 0;
			background-color: var(--off-color);
		}

		.radio-button:checked + span {
			color: var(--page);
		}
	}
</style>

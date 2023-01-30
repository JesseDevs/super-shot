<script setup>
	import { computed, reactive } from "vue";
	import { useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";
	import { useCartStore } from "@/stores/cart";
	import SvgIcon from "@/components/SvgIcon.vue";
	import slugid from "slugid";

	const cart = useCartStore();
	const route = useRoute();
	const menu = useMenuStore();
	const sizes = ["s", "m", "l", "xl"];
	const dairies = ["None", "Coconutmilk", "Oatmilk", " Whole Milk", "Skim Milk"];
	const sweets = ["None", "Sugar"];
	const flavors = ["None", "Caramel Swirl", "French Vanilla", "Mocha Swirl"];

	const product = computed(function () {
		return menu.products.find(function (record) {
			return record.id == route.params.id;
		});
	});

	const newAdditions = reactive({
		size: "m",
		dairy: "None",
		flavor: "None",
		sweet: "None",
	});

	const newID = computed(function () {
		return slugid.nice();
	});

	function saveNewProduct() {
		let newRecord = { ...product.value, ...newAdditions, id: newID.value };

		cart.addItem(newRecord);
		localStorage.setItem("myData", JSON.stringify(cart.purchasingCart));
	}

	function revertToDefault() {
		newAdditions.value = { size: "m", dairy: "None", flavor: "None", sweet: "None" };
	}
</script>

<template>
	<edit-block>
		<landing-block>
			<picture class="item-picture">
				<img :src="`${product.imageURL}`" alt="iced" loading="lazy" />
			</picture>
			<h2 class="chant-voice">{{ product.name }}</h2>
			<p class="tag">{{ product.tagline }}</p>
			<p class="intro">
				{{ product.desc }}
			</p>

			<button class="button" @click="saveNewProduct()" v-if="cart.itemsInCart !== 0">Add to cart</button>
			<button class="button" @click="saveNewProduct()" v-else>Start Order</button>

			<p class="price">
				Price: <span>${{ product.price }}</span>
			</p>
		</landing-block>

		<form class="main-form edit-form" autocomplete="off" @submit.prevent="saveNewProduct()">
			<div class="size-block" v-if="route.params.slug === 'coffee'">
				<h4 class="calm-voice">Size</h4>

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
								v-model="newAdditions.size"
							/>
							<span> {{ size.toUpperCase() }}</span>
						</label>
					</li>
				</ul>
			</div>

			<div class="dairy-block" v-if="route.params.slug === 'coffee'">
				<h4 class="calm-voice">Dairy</h4>

				<div class="select-box-container">
					<select v-model="newAdditions.dairy" class="custom-select">
						<option v-for="dairy in dairies" :value="dairy" :key="dairy">{{ dairy }}</option>
					</select>
					<span> <SvgIcon icon="angle-down" /></span>
				</div>
			</div>

			<div class="sweetener-block" v-if="route.params.slug === 'coffee'">
				<h4 class="calm-voice">Sweetener</h4>

				<div class="select-box-container">
					<select v-model="newAdditions.sweet" class="custom-select">
						<option v-for="sweet in sweets" :value="sweet" :key="sweet">{{ sweet }}</option>
					</select>
					<span> <SvgIcon icon="angle-down" /></span>
				</div>
			</div>

			<div class="flavor-block" v-if="route.params.slug === 'coffee'">
				<h4 class="calm-voice">Flavor</h4>

				<div class="select-box-container">
					<select v-model="newAdditions.flavor" class="custom-select">
						<option v-for="flavor in flavors" :value="flavor" :key="flavor">{{ flavor }}</option>
					</select>
					<span> <SvgIcon icon="angle-down" /></span>
				</div>
			</div>
		</form>
	</edit-block>
</template>

<style lang="scss">
	.edit-form {
		min-width: 280px;
	}
	edit-block {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;

		h4 {
			font-weight: 700;
			padding-left: 15px;
		}

		landing-block {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			gap: 10px;
			width: fit-content;
			border-bottom: 1px solid var(--support);
			padding-bottom: 1rem;
			picture.item-picture img {
				max-height: 160px;
			}
			h2 {
				font-weight: 700;
			}
			p.tag {
				font-weight: 500;
				margin: 5px 0;
			}
			.intro {
				font-size: clamp(0.65rem, calc(0.63rem + 0.13vw), 0.72rem);
				max-width: 53ch;
			}

			@media (min-width: 600px) {
				.intro {
					font-size: clamp(0.94rem, calc(0.87rem + 0.34vw), 1.13rem);
					max-width: 64ch;
				}
			}
		}
	}

	.custom-select {
		appearance: none;
	}

	div.select-box-container {
		position: relative;

		select {
			border-radius: 50px;
			width: 100%;
			font-family: "Sofia Sans", sans-serif;
			padding: 10px 20px;
			font-size: 1rem;
			border: 1.5px solid var(--support-soft);
			outline: none;
			resize: none;
			font-weight: 500;
		}

		span {
			position: absolute;
			top: 7px;
			right: 3px;
			pointer-events: none;
		}
	}

	ul.cup-size {
		display: flex;
		gap: 10px;

		label {
			cursor: default;
			display: block;
			width: 40px;
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
			width: 40px;
			height: 40px;
			text-align: center;
			font-weight: 700;
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

<script setup>
	import { computed, reactive, ref } from "vue";
	import { useRoute } from "vue-router";
	import { useMenuStore } from "@/stores/menu";
	import { useCartStore } from "@/stores/cart";
	import OptionsForm from "@/components/OptionsForm.vue";
	import slugid from "slugid";
	import { useInterfaceStore } from "@/stores/interface";

	const cart = useCartStore();
	const route = useRoute();
	const menu = useMenuStore();
	const ui = useInterfaceStore();

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
		bread: "Bagel",
		miniDonut: "Glazed",
	});

	const newID = computed(function () {
		return slugid.nice();
	});

	function saveNewProduct() {
		ui.cartMenuOpen = true;
		cart.itemAdded = true;
		ui.toggleBodyClass();
		let newRecord = { ...product.value, ...newAdditions, id: newID.value };

		cart.addItem(newRecord);

		localStorage.setItem("shoppingCart", JSON.stringify(cart.purchasingCart));
	}
</script>

<template>
	<edit-block>
		<landing-block>
			<picture class="item-picture">
				<img :src="`${product.imageURL}`" alt="iced" loading="lazy" />
			</picture>

			<text-content>
				<h5 class="chant-voice">{{ product.name }}</h5>
				<p class="tag">{{ product.tagline }}</p>
				<p class="intro">
					{{ product.desc }}
				</p>

				<button class="button" @click="saveNewProduct()">
					<span class="price"> ${{ product.price }}</span
					>Add to cart
				</button>
			</text-content>
		</landing-block>
		<OptionsForm />
	</edit-block>
</template>

<style lang="scss">
	span.price {
		padding-right: 15px;
		font-size: var(--step-0);
	}
	edit-block {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;

		landing-block {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			text-align: center;
			gap: 10px;
			width: fit-content;
			border-bottom: 1px solid var(--black);
			padding-bottom: 2rem;
			padding-top: 1rem;

			button {
				margin-top: 20px;
			}

			picture.item-picture img {
				max-height: 160px;
			}

			h5 {
				font-weight: 700;
			}

			p.tag {
				font-weight: 600;
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

	@media (min-width: 570px) {
		edit-block {
			display: grid;
			grid-template-columns: 50% 50%;
			justify-content: flex-start;
			align-items: flex-start;

			landing-block {
				&:after {
					position: absolute;
					top: 0;
					right: 0;
					content: "";
					background-color: var(--black);
					width: 1px;
					height: 75vh;
				}
				border: none;
				padding: 0 26px;
			}

			div.option-block {
				width: 70%;
				margin: 0 auto;
			}
		}
	}

	@media (min-width: 900px) {
		edit-block {
			display: flex;
			flex-direction: column;

			p.price {
				bottom: auto;
				top: 10px;
			}

			landing-block {
				display: grid;
				grid-template-columns: 1fr 1fr;

				&:after {
					display: none;
				}

				text-content {
					grid-column: 1;
					grid-row: 1;
					text-align: left;
					align-items: flex-start;
					gap: 15px;

					h5.chant-voice {
						font-size: var(--step-6);
					}
				}
				picture.item-picture {
					grid-column: 2;
					height: 450px;
					width: 100%;
					img {
						position: absolute;
						bottom: -40px;
						right: 50px;
						max-width: none;
						max-height: none;
					}
				}
			}
		}

		form.edit-form {
			padding-left: 32px;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			max-width: none;
			min-width: auto;
			width: 100%;

			div.option-block {
				width: 100%;
				margin: auto;
			}

			h5 {
				text-align: left;
				grid-column: span 5;
			}
		}
	}
</style>

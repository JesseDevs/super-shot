<script setup>
	import { useRoute } from 'vue-router';

	import OptionsForm from '@/components/OptionsForm.vue';
	import { useDocument } from 'vuefire';
	import { query, where } from 'firebase/firestore';
	import { useProductsService } from '@/services/ProductsService';
	import { useUserService } from '../../services/UserService';

	const route = useRoute();
	const user = useUserService();
	const p = useProductsService();
	const currentP = query(p.productsData, where('slug', '==', route.params.id));
	const product = useDocument(currentP);

	const customizations = reactive({
		size: 'm',
		dairy: 'None',
		flavor: 'None',
		sweet: 'None',
		bread: 'Bagel',
		miniDonut: 'Glazed',
	});

	// function saveNewProduct() {
	// 	ui.cartMenuOpen = true;
	// 	cart.itemAdded = true;
	// 	ui.toggleBodyClass();
	// 	let newRecord = { ...product.value, ...newAdditions, id: newID.value };

	// 	cart.addItem(newRecord);

	// 	localStorage.setItem('shoppingCart', JSON.stringify(cart.purchasingCart));
	// }

	// function handleFavorites() {
	// 	if()
	//concept to add/ remove favorites dependant on the heart
	// }

	const isFavorited = computed(function () {
		if (product && product.value && product.value.length > 0) {
			return user.favorites.find(function (f) {
				console.log(f.id);
				return f.id == product?.value[0].id;
			});
		} else {
			return false;
		}
	});
</script>

<template>
	<edit-block>
		<landing-block v-if="product">
			<button
				type="button"
				:class="`heart ${isFavorited?.class}`"
				@click="user.toggleFavorite(product[0].id)"
			>
				<SvgIcon icon="heart" />
			</button>

			<picture class="item-picture">
				<img :src="`${product[0].imageURL}`" alt="iced" loading="lazy" />
			</picture>

			<text-content>
				<p class="price">
					<span class="price"> ${{ product[0].price }}</span>
				</p>
				<h5 class="chant-voice">{{ product[0].name }}</h5>
				<p class="tag small-voice">{{ product[0].tagline }}</p>
				<p class="intro tiny-voice">
					{{ product[0].desc }}
				</p>

				<button class="button" @click="user.cart.addToCart(product[0])">Add to cart</button>
			</text-content>
		</landing-block>
		<OptionsForm :product="product" />
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

		p.price {
			align-self: flex-start;
			font-weight: 600;
		}

		landing-block {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			text-align: left;
			gap: 10px;
			width: fit-content;
			border-bottom: 1px solid var(--black);
			padding-bottom: 2rem;
			padding-top: 1rem;
			min-height: 55vh;

			text-content {
				align-items: flex-start;
				gap: 8px;
			}

			button {
				margin-top: 20px;
				align-self: flex-end;
			}

			picture.item-picture img {
				max-height: 230px;
			}

			h5 {
				font-weight: 100;
				text-transform: uppercase;
			}

			p.tag {
				font-weight: 500;
				margin: 5px 0;
				color: var(--color-mute);
			}
			.intro {
				max-width: 53ch;
				text-align: left;
			}

			button.heart {
				position: absolute;
				top: 0;
				left: 26px;
				padding: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				outline: none;
				background-color: var(--support-light);
				cursor: pointer;
				border: none !important;
				z-index: 100;

				.contains-svg {
					padding-top: 4.3px;
				}

				&.selected-fav {
					.contains-svg * {
						fill: red;
					}
				}
			}

			button.redHeart {
				.contains-svg * {
					fill: red;
				}
			}

			@media (min-width: 600px) {
				.intro {
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
			padding: 40px 0;

			landing-block {
				min-height: 300px;
				&:after {
					position: absolute;
					top: 0;
					right: 0;
					content: '';
					background-color: var(--color-text);
					width: 1px;
					height: 62vh;
				}
				border: none;
				padding: 0 26px;
			}

			form.edit-form {
				min-height: auto;
				row-gap: 15px;
				column-gap: 30px;
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

				button.heart {
					bottom: 0;
					top: auto;
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
			min-height: 200px;

			div.option-block {
				width: 100%;
				margin: auto;
			}

			h5 {
				text-align: left;
				grid-column: span 5;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
		}
	}
</style>

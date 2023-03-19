<script setup>
	defineProps(['allProducts']);
</script>

<template>
	<div class="product-outlet">
		<transition-group name="fade" tag="ul" v-if="allProducts" class="main-grid">
			<li
				v-for="(product, index) in allProducts"
				:style="{ animationDelay: index * 150 + 'ms' }"
				class="fade-item"
			>
				<RouterLink :to="`${product.category}/${product.slug}`">
					<general-card>
						<picture class="item-picture">
							<img :src="`${product.imageURL}`" alt="iced" loading="lazy" />
						</picture>
						<div class="name-highlight">
							<span class="tiny-voice">{{ product.name }}</span>
						</div>
					</general-card>
				</RouterLink>
			</li>
		</transition-group>
	</div>
</template>

<style lang="scss">
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
				max-width: 53ch;
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

			landing-block {
				&:after {
					position: absolute;
					top: 0;
					right: 0;
					content: '';
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

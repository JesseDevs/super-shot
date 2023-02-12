<script setup></script>

<template>
	<ul class="main-grid">
		<li v-for="product in allProductsInCategory">
			<RouterLink :to="`${product.category}/${product.id}`">
				<general-card>
					<picture class="item-picture">
						<img :src="`${product.imageURL}`" alt="iced" loading="lazy" />
					</picture>
					<div class="name-highlight">
						<span class="small-voice">{{ product.name }}</span>
					</div>
				</general-card>
			</RouterLink>
		</li>
	</ul>
</template>

<style lang="scss"></style>

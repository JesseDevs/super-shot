<script setup>
	import { useProductsService } from '@/services/ProductsService';
	const productsService = useProductsService();
</script>

<template>
	<form class="main-form create-form" autocomplete="off" @submit.prevent="productsService.addCategory()">
		<div class="form-field">
			<label for="name">Name</label>
			<input id="name" type="text" required v-model="productsService.form.name" />
		</div>

		<div class="form-field">
			<label for="desc">Description</label>
			<input id="desc" type="text" required v-model="productsService.form.desc" />
		</div>

		<div class="form-field">
			<label for="tagline">Tagline</label>
			<input id="tagline" type="text" required v-model="productsService.form.tagline" />
		</div>

		<div class="form-field">
			<label for="image">Image URL</label>
			<input id="image" type="text" required v-model="productsService.form.imageURL" />
		</div>

		<div class="form-field contains-number">
			<label for="pCategory">Category</label>

			<select id="pCategory" class="custom-select" v-model="productsService.form.category">
				<option disabled>Please select one</option>
				<option>Coffee</option>
				<option>Donuts</option>
				<option>Sandwiches</option>
			</select>
		</div>

		<div class="form-field contains-number">
			<label for="price">Original Price</label>
			<input id="price" type="text" required v-model="productsService.form.price" />
		</div>

		<div class="form-field checkbox-grid">
			<ul>
				<li>
					<input type="checkbox" id="size" v-model="size" />
					<label for="checkbox">Size</label>
				</li>
				<li>
					<input type="checkbox" id="dairy" v-model="dairy" />
					<label for="checkbox">Dairy</label>
				</li>
				<li>
					<input type="checkbox" id="sweetener" v-model="sweetener" />
					<label for="checkbox">Sweet</label>
				</li>
				<li>
					<input type="checkbox" id="flavor" v-model="flavor" />
					<label for="checkbox">Flavor</label>
				</li>
				<li>
					<input type="checkbox" id="bread" v-model="bread" />
					<label for="checkbox">Bread</label>
				</li>
				<li>
					<input type="checkbox" id="miniDonutFlavor" v-model="miniDonutFlavor" />
					<label for="checkbox">Donut</label>
				</li>
			</ul>
		</div>

		<button class="button" type="submit">Add</button>
	</form>
</template>
<style lang="scss">
	div.form-field.contains-number {
		flex-direction: row;
	}

	div.checkbox-grid {
		ul {
			width: 100%;
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
			gap: 10px;
		}
		li {
			display: flex;
			gap: 5px;
			min-width: 30%;
		}
		label {
			padding: 0;
		}
	}
</style>

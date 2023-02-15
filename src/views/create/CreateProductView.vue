<script setup>
	import CategoryForm from '@/partials/CategoryForm.vue';
	import ProductForm from '@/partials/ProductForm.vue';

	const createWhat = ref('');
	const formIntroClass = computed(function () {
		if (createWhat === '') {
			return 'form-intro';
		}
		return '';
	});
</script>

<template>
	<create-thing>
		<div :class="`choose-path ${formIntroClass}`">
			<h2 class="chant-voice">Create?</h2>
			<div class="wrapper">
				<div class="custom-input create-category">
					<input type="radio" id="category" value="category" v-model="createWhat" />
					<label for="category">Category</label>
				</div>
				<div class="custom-input create-product">
					<input type="radio" id="product" v-model="createWhat" value="product" />
					<label for="product">Product</label>
				</div>
			</div>
		</div>

		<transition name="fade" appear>
			<CategoryForm v-if="createWhat === 'category'" />
		</transition>

		<transition name="fade" appear>
			<ProductForm v-if="createWhat === 'product'" />
		</transition>
	</create-thing>
</template>
<style lang="scss"></style>

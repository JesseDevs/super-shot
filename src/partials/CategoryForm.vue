<script setup>
	import { useCategoryService } from '@/services/CategoryService';
	const categoryService = useCategoryService();

	// Testing active class idea for transitions
	// :class="{ 'main-form active-form': createWhat === 'category' }"
</script>

<template>
	<form class="main-form" autocomplete="off" @submit.prevent="categoryService.addCategory()">
		<div class="form-field">
			<label for="title">Title</label>
			<input id="title" type="text" required v-model="categoryService.form.title" />
		</div>

		<div class="form-field">
			<label for="info">Info Blurb</label>
			<textarea id="info" type="text" required v-model="categoryService.form.info" />
		</div>

		<div class="form-field">
			<label for="image">Image URL</label>
			<input id="image" type="text" required v-model="categoryService.form.imageURL" />
		</div>

		<button class="button" type="submit">Add</button>
	</form>
</template>

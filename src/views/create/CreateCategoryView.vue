<script setup>
	import { useCategoryService } from '@/services/CategoryService';
	const categoryService = useCategoryService();
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

	<!-- 
		<ul>
			<li v-for="category in categoryService.sortedList">
				{{ category.title }}

				<button @click="categoryService.removeCategory(category.id)" type="button">X</button>

				<button @click="categoryService.editCategory(category.id)">Edit</button>

				<div v-if="categoryService.editing === category.id" />
				<input type="text" v-model="category.title" />
				<button>Update</button>
			</li>
		</ul> -->
</template>
<style lang="scss"></style>

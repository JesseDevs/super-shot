<script setup>
	import { useCategoryService } from "@/services/CategoryService";
	const categoryService = useCategoryService();
</script>

<template>
	<create-thing>
		<h2 class="chant-voice">Create A Category</h2>

		<form class="main-form" autocomplete="off" @submit.prevent="categoryService.addCategory()">
			<div class="form-field">
				<label for="title">Title?</label>
				<input id="title" type="text" required v-model="categoryService.form.title" />
			</div>

			<div class="form-field">
				<label for="info">Info blurb?</label>
				<input id="info" type="text" required v-model="categoryService.form.info" />
			</div>

			<div class="form-field">
				<label for="image">Image URL?</label>
				<input id="image" type="text" required v-model="categoryService.form.imageURL" />
			</div>

			<button class="button" type="submit">Add</button>
		</form>

		<ul>
			<li v-for="category in categoryService.sortedList">
				{{ category.title }}

				<button @click="categoryService.removeCategory(category.id)" type="button">X</button>

				<button @click="categoryService.editCategory(category.id)">Edit</button>

				<div v-if="categoryService.editing === category.id" />
				<input type="text" v-model="category.title" />
				<button>Update</button>
			</li>
		</ul>
	</create-thing>
</template>
<style lang="scss">
	create-thing {
		display: block;
		max-width: 450px;
	}

	form.main-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	div.form-field {
		display: flex;
		flex-direction: column;
		gap: 10px;
		justify-content: center;
		align-items: center;
		width: 100%;
		position: relative;

		div {
			width: 85%;
		}

		div.contains-textarea {
			height: 100px;
		}

		select {
			appearance: none;
			border: 1px solid black;
		}

		label {
			text-align: left;
			font-weight: 500;
			padding-left: 25px;
		}
	}
</style>

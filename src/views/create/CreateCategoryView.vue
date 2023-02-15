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
<style lang="scss">
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.3s ease-in-out;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
		transform: translateX(-150px);
	}

	create-thing {
		display: block;
		max-width: 450px;
		position: relative;

		h2 {
			text-align: center;
		}

		.wrapper {
			display: flex;
			padding: 4px;
			// background-color: var(--off-color-mute);
		}

		.custom-input {
			flex-grow: 1;
		}

		.custom-input input[type='radio'] {
			display: none;
		}

		.custom-input label {
			display: block;
			padding: 6px 8px;
			color: black;
			font-weight: bold;
			text-align: center;
			transition: all 0.4s 0s ease;
		}

		.custom-input input[type='radio']:checked + label {
			background-color: #f5f5f5;
			color: #000;
			border-radius: 4px;
		}
	}

	form.main-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	div.form-field {
		display: flex;
		flex-direction: column;
		gap: 3px;
		padding: 8px;
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
			border: 1px solid black;
			height: 100%;
			width: 100%;
		}

		label {
			text-align: left;
			font-weight: 500;
			padding-left: 8px;
		}

		&:hover {
			background-color: rgba(var(--color-soft-rgb), 0.3);
		}

		&:hover :is(input, textarea, select) {
			border-color: var(--color);
		}

		:is(input, textarea, select):focus {
			box-shadow: 0 0 0 0.2rem rgba(233, 110, 76, 0.25);
		}
	}
</style>

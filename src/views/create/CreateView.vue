<script setup>
	const createWhat = ref('');
	const formIntroClass = computed(function () {
		if (createWhat.value === '') {
			return '';
		}
		if (createWhat.value === 'category') {
			return 'overlay-category';
		}

		if (createWhat.value === 'product') {
			return 'overlay-product';
		}
	});

	function handleCreateCategoryClick() {
		createWhat.value = 'category';
	}

	function handleCreateProductClick() {
		createWhat.value = 'product';
	}
</script>

<template>
	<create-thing>
		<RouterLink class="small-voice" to="create" @click="handleCreateCategoryClick()">
			<h2 class="chant-voice">BUILD THE DATA</h2>
		</RouterLink>

		<create-block class="create-actions">
			<overlay-block :class="formIntroClass"></overlay-block>
			<RouterLink class="small-voice" to="create-category" @click="handleCreateCategoryClick()"
				>Category</RouterLink
			>
			<RouterLink class="small-voice" to="create-product" @click="handleCreateProductClick()"
				>Product</RouterLink
			>
		</create-block>
	</create-thing>

	<main class="outlet">
		<RouterView />
	</main>
</template>
<style lang="scss">
	create-thing {
		h2 {
			font-weight: 600;
		}
	}
	create-block.create-actions {
		display: flex;
		flex-direction: row;
		background-color: var(--off-color);
		color: var(--page);
		justify-content: space-around;
		gap: 5px;

		a {
			width: 100%;
			text-align: center;
			padding: 10px;
		}

		overlay-block {
			position: absolute;
			height: 100%;
			width: 50%;
			opacity: 0;
			box-shadow: 0 3px 10px var(--off-color);
		}

		overlay-block.overlay-category,
		overlay-block.overlay-product {
			height: 100%;
			transform: translateX(-100%);
			background: rgba(176, 175, 175, 0.488);

			transition: transform 0.3s ease-in-out;
			opacity: 1;
		}

		overlay-block.overlay-category {
			transform: translateX(-50%);
		}

		overlay-block.overlay-product {
			transform: translateX(50%);
		}
	}

	create-thing {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 450px;
		position: relative;
		padding-bottom: 40px;

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

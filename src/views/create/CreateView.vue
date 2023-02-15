<script setup>
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
		<h2 class="chant-voice">Create?</h2>
		<actions-block>
			<RouterLink class="small-voice" to="create-category">Category</RouterLink>
			<RouterLink class="small-voice" to="create-product">Product</RouterLink>
		</actions-block>
	</create-thing>
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

		// form.main-form {
		// 	position: absolute;
		// 	width: 100%;
		// 	height: 100%;
		// 	top: 100px;
		// 	left: 0;
		// }

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

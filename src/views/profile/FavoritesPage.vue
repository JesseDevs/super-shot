<script setup>
	const selectedFile = ref(null);
	const imageUrl = ref(null);

	const handleFileUpload = (event) => {
		// Get the selected file
		const file = event.target.files[0];

		// Create a URL for the selected file
		imageUrl.value = URL.createObjectURL(file);

		// Save the selected file for uploading
		selectedFile.value = file;
	};
</script>

<template>
	<h1>Favorites</h1>

	<div class="form-field">
		<input type="file" @change="handleFileUpload" />
		<img :src="imageUrl" alt="Selected Image" />
	</div>
</template>

<style lang="scss"></style>

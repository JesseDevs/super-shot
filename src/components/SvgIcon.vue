<script setup>
	defineProps(["icon"]);
</script>
<template>
	<div class="contains-svg">
		<svg :class="icon"><use :xlink:href="`#icon-${icon}`"></use></svg>
	</div>
</template>

<style lang="scss">
	div.contains-svg {
		width: 40px;
		height: 40px;
		svg * {
			fill: black;
		}
	}
</style>

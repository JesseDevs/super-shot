<script setup>
	import CategoryCard from '@/components/CategoryCard.vue';

	defineProps(['categories']);
</script>

<template>
	<menu-list>
		<transition-group name="fade" tag="ul" class="list main-grid">
			<li
				v-for="(category, index) in categories"
				:style="{ animationDelay: index * 200 + 'ms' }"
				class="fade-item"
			>
				<CategoryCard :category="category" />
			</li>
		</transition-group>
	</menu-list>
</template>

<style lang="scss">
	menu-list {
		display: block;
	}
</style>

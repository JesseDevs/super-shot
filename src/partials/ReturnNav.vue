<script setup>
	import { RouterLink, useRoute } from 'vue-router';
	import SvgIcon from '@/partials/SvgIcon.vue';
	import { useCategoryService } from '@/services/CategoryService';

	const route = useRoute();
</script>

<template>
	<return-nav>
		<div>
			<div class="arrow-box">
				<SvgIcon icon="angle-left" />
			</div>
			<RouterLink class="small-voice" to="/menu">Menu</RouterLink>
			/
			<a v-if="route.name == 'menu/detail/product-detail'" class="small-voice" @click="$router.back()">{{
				route.params.slug
			}}</a>
		</div>
	</return-nav>
</template>

<style lang="scss">
	return-nav {
		display: block;

		div {
			display: flex;
			gap: 5px;
			align-items: center;
			justify-content: flex-start;

			a {
				font-weight: 500;
				cursor: pointer;

				+ a {
					text-transform: capitalize;
				}

				&:hover {
					color: var(--color);
					text-decoration: underline;
				}
			}
		}
	}
</style>

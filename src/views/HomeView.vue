<script setup>
	import MenuProductForm from "../components/MenuProductForm.vue";
</script>

<template>
	<section>
		<inner-column>
			<home-module>
				<h1 class="attention-voice">*ReDACTED* CLASSICS & NEW FAVORITES</h1>

				<p class="tiny-voice home-intro">
					Our menu is full of great-tasting items that will get you going and keep you running throughout
					your busy day. Plus, they’re always made to order—just the way you like.
				</p>

				<RouterLink class="button" to="/sign-in">Sign In</RouterLink>
			</home-module>
		</inner-column>
	</section>
</template>

<style lang="scss">
	home-module {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 10px;
		h1 {
			max-width: 23ch;
			font-weight: 700;
		}
	}
	.home-intro {
		max-width: 50ch;
	}
</style>

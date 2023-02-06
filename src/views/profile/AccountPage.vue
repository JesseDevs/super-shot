<script setup></script>

<template>
	<section>
		<inner-column>
			<home-module>
				<ModuleThing :pageData="pageData" />

				<RouterView />

				<CheckoutBtn />
			</home-module>
		</inner-column>
	</section>
</template>

<style lang="scss"></style>

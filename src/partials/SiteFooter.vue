<script setup></script>

<template>
	<footer class="site-footer">
		<inner-column>
			<nav>
				<div class="quick-links">
					<h4 class="strict-voice">Quick Links</h4>
					<ul>
						<li>
							<RouterLink class="tiny-voice" to="/">Home</RouterLink>
						</li>
						<li>
							<RouterLink class="tiny-voice" to="/menu">Menu</RouterLink>
						</li>
						<li>
							<RouterLink class="tiny-voice" to="/menu/coffee">Coffee</RouterLink>
						</li>
						<li>
							<RouterLink class="tiny-voice" to="/rewards">Rewards</RouterLink>
						</li>
						<li>
							<RouterLink class="tiny-voice" to="/sign-in">Sign In</RouterLink>
						</li>
					</ul>
				</div>
			</nav>
		</inner-column>
	</footer>
</template>

<style lang="scss">
	footer.site-footer {
		border-top: 1px solid var(--support-light);
		background-color: rgba(241, 238, 238, 0.708);
	}
	footer {
		.quick-links {
			width: 260px;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			gap: 20px;
		}

		h4 {
			text-align: center;
			padding: 5px;
			z-index: 21;
			&:before {
				width: 25%;
				position: absolute;
				height: 1px;
				background-color: var(--support-mute);
				content: '';

				right: 0;
				top: 50%;
				z-index: 20;
			}
			&:after {
				width: 25%;
				position: absolute;
				height: 1px;
				background-color: var(--support-mute);
				content: '';

				left: 0;
				top: 50%;
				z-index: 20;
			}
		}

		ul {
			display: grid;
			grid-template-columns: 1fr 1fr;
			text-align: center;

			gap: 10px;

			a {
				text-decoration: underline;
				text-align: left;
			}

			a:hover {
				background-color: var(--off-color-soft);
				text-decoration: none;
			}
		}
		inner-column {
			padding: 2rem 2rem;
			background-color: transparent;

			nav {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
				gap: 20px;
			}
		}
	}
</style>

<script setup></script>

<template>
	<footer class="site-footer">
		<inner-column>
			<nav>
				<div class="quick-links">
					<h4>
						<span></span>
						<p class="tiny-voice">Quick Links</p>
					</h4>
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

				<div class="quick-links">
					<h4>
						<span></span>
						<p class="tiny-voice">Follow Us</p>
					</h4>
					<ul class="follow-link">
						<li>
							<a class="tiny-voice" target="social" href="https://twitter.com/dunkindonuts?lang=en">
								<SvgIcon icon="social-twitter" />
							</a>
						</li>
						<li>
							<a class="tiny-voice" target="social" href="https://www.instagram.com/dunkin/?hl=en">
								<SvgIcon icon="social-instagram" />
							</a>
						</li>
						<li>
							<a class="tiny-voice" target="social" href="https://www.pinterest.com/DunkinDonuts/">
								<SvgIcon icon="social-pinterest" />
							</a>
						</li>
						<li>
							<a class="tiny-voice" target="social" href="https://www.youtube.com/user/dunkindonuts#">
								<SvgIcon icon="social-youtube" />
							</a>
						</li>
						<li>
							<a class="tiny-voice" target="social" href="https://www.facebook.com/DunkinUS/">
								<SvgIcon icon="social-facebook" />
							</a>
						</li>
					</ul>
				</div>

				<div class="quick-links">
					<h4>
						<span></span>
						<p class="tiny-voice">Our Partners</p>
					</h4>
					<ul class="partner-list">
						<li>
							<a href="http://www.jetblue.com/" target="partner">
								<picture>
									<img src="@/assets/dunkin-images/jetblue.png" alt="" />
								</picture>
							</a>
						</li>
						<li>
							<a href="http://www.baskinrobbins.com/" target="partner">
								<picture>
									<img src="@/assets/dunkin-images/BR_Logo_New.png" alt="" />
								</picture>
							</a>
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
		background-color: rgba(239, 237, 237);
	}
	footer {
		.quick-links {
			width: 100%;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		h4 {
			text-align: center;
			text-transform: uppercase;

			p {
				width: fit-content;
				margin: 0 auto;
				z-index: 21;
				background-color: rgba(239, 237, 237);
				padding: 5px 10px;
			}
			span {
				width: 100%;
				position: absolute;
				height: 1px;
				background-color: var(--support-mute);
				content: '';

				right: 0;
				top: 15px;
				z-index: 19;
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

		.partner-list {
			gap: 25px;
			align-items: center;
		}

		.follow-link {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
		}
		inner-column {
			padding: 2rem 2rem;
			background-color: transparent;

			nav {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
				gap: 30px;
			}
		}
		picture img {
			max-width: 70px;
			justify-content: center;
			align-items: center;
			margin: 0 auto;
		}
	}
</style>

<script setup>
	defineProps(['pageData']);
</script>

<template>
	<ad-block>
		<p class="small-voice">
			Come run with us! Apply to join our exceptional team <RouterLink to="/sign-up">here</RouterLink>.
		</p>
	</ad-block>
	<home-module>
		<h1 class="yell-voice">
			<span class="main-color">Dunkin</span><span class="off-color">’ Rewards</span>
		</h1>

		<p class="intro strict-voice">
			{{ pageData.subHeading }}
		</p>
		<ul>
			<li>
				<dunkin-card>
					<picture>
						<img src="@/assets/dunkin-images/dunkin-card.png" alt="cards" />
					</picture>
					<text-content>
						<h4 class="strict-voice">EARN POINTS WHEN YOU PAY</h4>
						<p>
							Order ahead in the app or scan your Dunkin’ Rewards ID in-store to earn 10 points per $1
							spent
						</p>
					</text-content>
				</dunkin-card>
			</li>
			<li>
				<dunkin-card>
					<picture>
						<img src="@/assets/dunkin-images/dunkin-items.png" alt="items" />
					</picture>
					<text-content>
						<h4 class="strict-voice">TURN POINTS INTO REWARDS</h4>
						<p>Rewards start at just 150 points – only $15 spent!</p>
					</text-content>
				</dunkin-card>
			</li>
			<li>
				<dunkin-card>
					<picture>
						<img src="@/assets/dunkin-images/dunkin-rocket.png" alt="rocket" />
					</picture>
					<text-content>
						<h4 class="strict-voice">UNLOCK BOOSTED STATUS</h4>
						<p>12 visits in a calendar month earns 12 points per dollar!</p>
					</text-content>
				</dunkin-card>
			</li>
		</ul>

		<actions-block>
			<RouterLink class="button" to="/sign-up">Sign Up</RouterLink>
			<RouterLink class="button" to="/rewards">Learn More</RouterLink>
		</actions-block>
	</home-module>
</template>

<style lang="scss">
	home-module {
		display: flex;
		flex-direction: column;
		position: relative;
		align-items: center;
		justify-content: center;
		text-align: center;
		margin-top: 8vh;
		h1 {
			font-weight: 700;
		}
		p.intro {
			color: var(--black);
			font-weight: 700;
		}

		ul {
			margin: 3vh auto;
			display: flex;
			flex-direction: column;
			row-gap: 10px;
		}
	}

	ad-block {
		display: block;
		position: absolute;
		width: 100%;
		padding: 5px;
		left: 0;
		top: 0;

		background-color: var(--off-color);
		color: var(--page);

		p {
			text-align: center;
			margin: 0 auto;
			max-width: 80%;
		}

		p,
		a {
			font-size: var(--step-0);
		}

		p a {
			color: var(--page);
			&:hover {
				background-color: var(--off-color-soft);
				color: var(--black);
			}
		}
	}

	dunkin-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		zoom: 0.7;
		text-align: left;
		gap: 20px;
		text-content {
			align-items: flex-start;
		}
		h4 {
			font-weight: 700;
		}
		img {
			transition: scale 200ms ease-in-out;
		}
		&:hover img {
			scale: 1.1;
		}
	}

	header.toggle-open + main {
		ad-block {
			display: none;
		}
	}

	actions-block {
		display: flex;
		gap: 10px;
		justify-content: center;
		align-items: center;
	}

	@media (min-width: 450px) {
		home-module ul {
			margin: 20px auto;
		}

		dunkin-card {
			zoom: 0.8;
			gap: 20px;
		}
	}

	@media (min-width: 600px) {
		home-module ul {
			display: grid;
			width: 100%;
			grid-template-columns: repeat(auto-fit, minmax(136px, 1fr));
			gap: 20px;
			margin: 3vh auto 7vh;
		}
		dunkin-card {
			text-align: center;
			flex-direction: column;
			h4 {
				text-align: center;
				margin: 0 auto;
			}
		}
	}

	@media (min-width: 900px) {
		home-module ul {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			max-width: 1120px;
		}

		dunkin-card {
			flex-direction: column;
			zoom: 1;
		}
	}
</style>

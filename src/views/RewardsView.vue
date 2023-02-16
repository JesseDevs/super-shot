<script setup>
	defineProps(['pageData']);
</script>

<template>
	<!-- <picture class="reward-pic"> </picture> -->
	<rewards-module>
		<module-thing>
			<h1 class="yell-voice">
				<span class="main-color">Dunkin</span><span class="off-color">’ Rewards</span>
			</h1>

			<p class="intro">
				Runnin' has its rewards. Join <span class="main-color">Dunkin</span
				><span class="off-color">’ Rewards</span> to earn your choice of free food and drinks, unlock
				Boosted Status to earn points faster and score members-only exclusive offers.
			</p>
		</module-thing>
		<ul>
			<li>
				<reward-card>
					<picture>
						<img src="@/assets/dunkin-images/10-points.png" alt="cards" />
					</picture>
					<text-content>
						<h4 class="strict-voice">EARN POINTS WHEN YOU PAY</h4>
						<p>
							Members earn <strong>10 POINTS PER $1</strong> spent on qualifying purchases in-store or
							when they order ahead in the app.
						</p>
					</text-content>
				</reward-card>
			</li>
		</ul>
		<actions-block>
			<RouterLink class="button" to="/sign-up">Join Now</RouterLink>
			<RouterLink class="button" to="/sign-in">Sign In</RouterLink>
		</actions-block>
	</rewards-module>
</template>

<style lang="scss">
	// picture.reward-pic {
	// 	position: absolute;
	// 	top: 0;
	// 	left: -1rem;
	// 	right: -1rem;
	// 	bottom: -1rem;
	// 	width: 100%;
	// 	height: 300px;
	// 	background-image: url('../assets/dunkin-images/dunkin-header.png');
	// 	background-repeat: no-repeat;
	// 	background-attachment: fixed;
	// 	background-position: center;
	// }
	rewards-module {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 3vh;

		actions-block {
			margin-top: 10px;
		}
	}

	reward-card {
		display: flex;
		flex-direction: column;
		border: 1.5px solid var(--support-mute);
		border-radius: 10px;
		padding: 15px;
		justify-content: center;
		align-items: center;

		text-content {
			h4 {
				font-weight: 500;
				max-width: fit-content;
				margin: 0 auto;
				text-align: center;
			}

			p {
				max-width: 40ch;
			}
			text-align: left;
			gap: 8px;
			padding: 20px;
		}
	}

	@media (min-width: 550px) {
		reward-card {
			flex-direction: row-reverse;

			text-content {
				align-items: flex-start;
				h4 {
					font-weight: 500;
					max-width: none;
					margin: 0;
					text-align: left;
				}
			}
		}
	}
</style>

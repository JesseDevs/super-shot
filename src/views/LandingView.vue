<script setup>
	import { reactive, ref } from 'vue';
	import { useFirestore, useCollection } from 'vuefire';
	import { collection, doc, addDoc, deleteDoc, setDoc } from 'firebase/firestore';

	defineProps(['pageData']);

	const db = useFirestore();
	const categories = useCollection(collection(db, 'categories'));

	const form = reactive({
		title: '',
	});

	const editing = ref(false);

	function addCategory() {
		addDoc(collection(db, 'categories'), {
			title: form.title,
		});
		form.title = '';
	}

	async function removeCategory(docID) {
		const record = doc(db, 'categories', docID);
		if (confirm('Are you sure?')) {
			await deleteDoc(record);
		}
	}

	function editCategory(id) {
		editing.value = id;
	}

	function updateCategory(id, c) {
		setDoc(doc(db, 'categories', id), {
			title: c,
		});
		clearEdit();
	}

	function clearEdit() {
		editing.value = false;
	}
</script>

<template>
	<home-module>
		<form @submit.prevent="addCategory()">
			<div class="form-field">
				<label for="title">Category title?</label>

				<input id="title" type="text" required v-model="form.title" />
			</div>

			<button class="button" type="submit">Add</button>
		</form>
	</home-module>
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
			font-weight: 700;
		}

		.display-animation {
			position: fixed;
			background-color: var(--page-opacity);
			top: 114px;
			right: 50;
			width: 2%;
			height: 100%;

			display: block;
			place-items: center;

			overflow-y: auto;
			opacity: 0;
			z-index: 200;
			pointer-events: none;
			transition: all 0.5s ease-in-out;

			login-modal {
				display: block;
				opacity: 0;

				pointer-events: initial;
				transition: all 1.2s ease-in-out;
			}
		}
	}

	home-module.in-animation {
		.display-animation {
			opacity: 1;
			background-color: var(--page);
			transform: translate(0, 0);
			width: 100%;
			pointer-events: initial;

			login-modal {
				opacity: 1;
				pointer-events: initial;
			}
		}
	}
</style>

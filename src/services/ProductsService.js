import { reactive, ref } from 'vue';
import { useFirestore, useCollection } from 'vuefire';
import { collection, doc, addDoc, deleteDoc, setDoc, query, orderBy } from 'firebase/firestore';
import { defineStore } from 'pinia';

export const useProductsService = defineStore('products', function () {
	const db = useFirestore();

	// Get category data
	const productsData = collection(db, 'products');
	const sortedProducts = query(productsData, orderBy('name'));
	const list = useCollection(sortedProducts);

	// Add category data
	const editing = ref(false);

	const form = reactive({
		name: '',
		desc: '',
		imageURL: '',
		tagline: '',
		price: '',
		options: [],
	});

	function clearForm() {
		form.name = '';
		form.desc = '';
		form.imageURL = '';
		form.tagline = '';
		form.price = '';
		form.options = [];
	}

	function addCategory() {
		addDoc(collection(db, 'products'), {
			name: form.name,
			slug: form.name.toLowerCase().replace(/ /g, '-'),
			desc: form.desc,
			imageURL: form.imageURL,
			tagline: form.tagline,
			size: 'M',
			price: form.price,
			options: form.options,
		});
		clearForm();
	}

	// async function removeCategory(docID) {
	// 	const record = doc(db, "categories", docID);
	// 	if (confirm("Are you sure?")) {
	// 		await deleteDoc(record);
	// 	}
	// }

	// function editCategory(id) {
	// 	editing.value = id;
	// }

	// function updateCategory(id, c) {
	// 	setDoc(doc(db, "categories", id), {
	// 		title: c,
	// 	});
	// 	clearEdit();
	// }

	// function clearEdit() {
	// 	editing.value = false;
	// }

	return {
		db,
		list,
		productsData,
		// editing,
		form,
		addCategory,
		// removeCategory,
		// editCategory,
		// updateCategory,
		// clearEdit,
	};
});

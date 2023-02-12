import { reactive, ref } from "vue";
import { useFirestore, useCollection } from "vuefire";
import { collection, doc, addDoc, deleteDoc, setDoc, query, orderBy } from "firebase/firestore";
import { defineStore } from "pinia";

export const useCategoryService = defineStore("categories", function () {
	const db = useFirestore();

	// Get category data
	const categoriesData = collection(db, "categories");
	const sorted = query(categoriesData, orderBy("title"));
	const sortedList = useCollection(sorted);

	// Add category data
	const editing = ref(false);

	const form = reactive({
		title: "",
		info: "",
		imageURL: "",
	});

	function clearForm() {
		form.title = "";
		form.info = "";
		form.imageURL = "";
	}

	function addCategory() {
		addDoc(collection(db, "categories"), {
			title: form.title,
			info: form.info,
			imageURL: form.imageURL,
		});
		clearForm();
	}

	async function removeCategory(docID) {
		const record = doc(db, "categories", docID);
		if (confirm("Are you sure?")) {
			await deleteDoc(record);
		}
	}

	function editCategory(id) {
		editing.value = id;
	}

	function updateCategory(id, c) {
		setDoc(doc(db, "categories", id), {
			title: c,
		});
		clearEdit();
	}

	function clearEdit() {
		editing.value = false;
	}

	return {
		db,
		sortedList,
		categoriesData,
		editing,
		form,
		addCategory,
		removeCategory,
		editCategory,
		updateCategory,
		clearEdit,
	};
});

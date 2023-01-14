import { reactive } from "vue";
import { defineStore } from "pinia";

export const useAlbumsStore = defineStore("library", function () {
	const list = reactive([]);
	function add(monster) {
		list.push(monster);
	}

	return {
		list,
		add,
	};
});

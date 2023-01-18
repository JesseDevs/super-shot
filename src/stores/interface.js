import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useInterfaceStore = defineStore("interface", function () {
	const mainMenuOpen = ref(false);
	function toggleMenu() {
		mainMenuOpen.value = !mainMenuOpen.value;
	}

	const menuClass = computed(() => {
		if (mainMenuOpen.value) {
			return "toggle-open";
		} else {
			return "toggle-close";
		}
	});

	return {
		mainMenuOpen,
		toggleMenu,
		menuClass,
	};
});

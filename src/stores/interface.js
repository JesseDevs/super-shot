import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useInterfaceStore = defineStore("interface", function () {
	const mainMenuOpen = ref(false);
	const cartMenuOpen = ref(false);

	function toggleCart() {
		cartMenuOpen.value = !cartMenuOpen.value;
	}

	const cartClass = computed(() => {
		if (cartMenuOpen.value) {
			return "cart-open";
		} else {
			return "cart-close";
		}
	});

	function toggleMenu() {
		mainMenuOpen.value = !mainMenuOpen.value;
		cartMenuOpen.value = false;
	}

	function specificToggle() {
		if (mainMenuOpen.value == true) {
			mainMenuOpen.value = !mainMenuOpen.value;
		}
		if (cartMenuOpen.value == true) {
			cartMenuOpen.value = !cartMenuOpen.value;
		}
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
		cartMenuOpen,
		cartClass,
		toggleCart,
		specificToggle,
		menuClass,
	};
});

import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useInterfaceStore = defineStore("interface", function () {
	const mainMenuOpen = ref(false);
	const cartMenuOpen = ref(false);
	const editProductMode = ref(false);
	const bodyElement = ref(document.body);

	function toggleBodyClass() {
		bodyElement.value.classList.toggle("menu-open");
	}

	const openMenu = computed(function () {
		if (cartMenuOpen.value || mainMenuOpen.value) {
			return "menu-open";
		} else return "";
	});

	function toggleEditMode() {
		editProductMode.value = !editProductMode.value;
	}

	const editModeClass = computed(() => {
		if (editProductMode.value) {
			return "edit-mode";
		} else {
			return "";
		}
	});

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
		toggleEditMode,
		editModeClass,
		editProductMode,
		openMenu,
		bodyElement,
		toggleBodyClass,
	};
});

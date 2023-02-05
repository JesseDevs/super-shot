import { defineStore } from "pinia";
import { reactive } from "vue";

import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut as fbSignOut,
	signInWithEmailAndPassword,
} from "firebase/auth";

import { useCurrentUser } from "vuefire";
import { Vue } from "vue-demi";

export const useUserService = defineStore("user", function () {
	const auth = getAuth();

	const current = useCurrentUser();

	const form = reactive({
		username: "",
		password: "",
	});

	function clearForm() {
		form.username = "";
		form.password = "";
	}

	function signUp(email, password) {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log("user.signUp");
				clearForm();
			})
			.catch((error) => {
				console.log(error.code, error.message);
			});
	}

	function signIn(email, password) {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log("user.signIn");
				clearForm();
			})
			.catch((error) => {
				console.log(error.code, error.message);
			});
	}

	function signOut() {
		fbSignOut(auth)
			.then(() => {
				console.log("user.signOut");
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return {
		signUp,
		signIn,
		signOut,
		current,
		form,
	};
});

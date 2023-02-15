import { defineStore } from 'pinia';
import { reactive } from 'vue';

import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut as fbSignOut,
	signInWithEmailAndPassword,
} from 'firebase/auth';

import { useCurrentUser } from 'vuefire';
import { firebaseApp } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
const db = useFirestore();

export const useUserService = defineStore('user', function () {
	const auth = getAuth();

	const current = useCurrentUser();

	const form = reactive({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});

	function clearForm() {
		form.firstName = '';
		form.lastName = '';
		form.email = '';
		form.password = '';
	}

	function signUp(email, password) {
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				console.log('user.signUp');
				// clearForm(form);

				await addDoc(collection(db, 'users'), {
					// Add a new document with a generated id.
					authUid: userCredential.user.uid,
					roles: {
						guest: true,
					},
				});
			})
			.catch((error) => {
				console.log(error.code, error.message);
			});
	}

	function signIn(email, password) {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log('user.signIn');
				clearForm();
			})
			.catch((error) => {
				console.log(error.code, error.message);
			});
	}

	function signOut() {
		fbSignOut(auth)
			.then(() => {
				console.log('user.signOut');
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

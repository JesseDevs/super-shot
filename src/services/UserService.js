import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut as fbSignOut,
	signInWithEmailAndPassword,
} from 'firebase/auth';

import { useCurrentUser, useDocument } from 'vuefire';
import { firebaseApp } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
const db = useFirestore();

export const useUserService = defineStore('user', function () {
	const auth = getAuth();
	// User
	const current = useCurrentUser();
	// firebase auth
	const userDoc = useDocument(doc(db, 'user', 'avNPhmV1Y2ZiMLhGUqa1WiGNIBp1'));

	async function alsoCreateUserDoc(authUser) {
		// Add custom claims to the user's authentication token
		await setCustomUserClaims(authUser.uid, {
			roles: {
				guest: true,
			},
			firstName: form.firstName,
			lastName: form.lastName,
		});

		// Create a new user document in Firestore
		await setDoc(doc(db, 'user', authUser.uid), {
			firstName: form.firstName,
			lastName: form.lastName,
			roles: {
				guest: true,
			},
		});
	}

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
					email: form.email,
					password: form.password,
					firstName: form.firstName,
					lastName: form.lastName,
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

	const info = computed(async function () {
		const idTokenResult = await current.value.getIdTokenResult();
		const customClaims = idTokenResult.claims;

		return {
			id: authUser.value.uid,
			firstName: customClaims.firstName,
			lastName: customClaims.lastName,
			roles: customClaims.roles,
		};
	});

	return {
		signUp,
		signIn,
		signOut,
		current,
		form,
	};
});

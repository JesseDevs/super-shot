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
import { useRoute, useRouter } from 'vue-router';
const db = useFirestore();

const router = useRouter();
const route = useRoute();

export const useUserService = defineStore('user', function () {
	const auth = getAuth();
	// User
	const authUser = useCurrentUser();
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
		createUserWithEmailAndPassword(auth, form.email, form.password)
			.then(async (userCredential) => {
				console.log('user.signUp');
				alsoCreateUserDoc(userCredential.user.uid);
				route.push({ path: '/profile' });
			})
			.catch((error) => {
				console.log('code', error.code);
				console.log('message', error.message);
			});
	}

	function signIn(form) {
		const { email, password } = form;
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log('user.signIn');
				clearForm(form);
				router.push(route.query.redirect || '/');
			})
			.catch((error) => {
				console.log('error:', error);
			});
	}

	function signOut() {
		fbSignOut(auth)
			.then(() => {
				console.log('user.signOut');
				route.push({ path: '/' });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const info = computed(async function () {
		const idTokenResult = await authUser.value.getIdTokenResult();
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
		authUser,
		form,
	};
});

import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut as fbSignOut,
	signInWithEmailAndPassword,
} from 'firebase/auth';

import { useCollection, useCurrentUser, useDocument } from 'vuefire';
import { firebaseApp } from '@/firebase';
import { collection, addDoc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useFirestore } from 'vuefire';
import { useRoute, useRouter } from 'vue-router';

export const useUserService = defineStore('user', function () {
	const auth = getAuth();
	const authUser = useCurrentUser();
	const db = useFirestore();

	const userDoc = ref(null);

	watch(authUser, async function (after, before) {
		const id = authUser.value?.uid;

		if (id) {
			const found = doc(collection(db, 'users'), id);
			const docSnap = await getDoc(found);
			userDoc.value = docSnap.data();
		} else {
			console.log('id not ready');
		}
	});

	const router = useRouter();
	const route = useRoute();

	function alsoCreateUserDoc(userId) {
		// Create a new user document in Firestore
		setDoc(doc(db, 'users', userId), {
			username: '',
		});
	}

	const form = reactive({
		email: '',
		password: '',
		username: '',
	});

	function clearForm() {
		form.email = '';
		form.password = '';
		form.username = '';
	}

	function signUp(email, password) {
		createUserWithEmailAndPassword(auth, form.email, form.password)
			.then(async (userCredential) => {
				console.log('user.signUp', userCredential);
				alsoCreateUserDoc(userCredential.user.uid);
				clearForm(form);
				router.push({ path: '/profile' });
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
				router.push({ path: '/' });
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

	function changeUsername(newUsername) {
		updateDoc(doc(db, 'users', authUser.value.uid), {
			username: newUsername,
		});
	}

	return {
		signUp,
		signIn,
		signOut,
		authUser,
		form,
		userDoc,
		changeUsername,
	};
});

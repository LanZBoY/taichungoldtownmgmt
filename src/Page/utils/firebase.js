import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import firebaseConfig from './config'

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);


export default firestore;
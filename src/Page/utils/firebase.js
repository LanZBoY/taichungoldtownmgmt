import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage} from 'firebase/storage'
import firebaseConfig from './config'

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {firestore, storage};
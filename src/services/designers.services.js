import { addDoc, collection } from 'firebase/firestore';

import db from '../lib/firebase';

export const createDesignerService = async (body) => {
  const docRef = await addDoc(collection(db, 'designers'), body);

  return docRef;
};
